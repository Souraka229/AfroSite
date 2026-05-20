"use client"

import { createClient } from "@/lib/supabase/client"
import { Fichier } from "@/lib/types"
import { useRouter } from "next/navigation"
import { useState, useRef } from "react"

interface FichiersManagerProps {
  projetId: string
  initialFichiers: Fichier[]
}

export function FichiersManager({ projetId, initialFichiers }: FichiersManagerProps) {
  const [fichiers, setFichiers] = useState<Fichier[]>(initialFichiers)
  const [isUploading, setIsUploading] = useState(false)
  const [showEditor, setShowEditor] = useState(false)
  const [editingFichier, setEditingFichier] = useState<Fichier | null>(null)
  const [newFileName, setNewFileName] = useState("")
  const [newFileType, setNewFileType] = useState("html")
  const [newFileContent, setNewFileContent] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)
    const supabase = createClient()

    for (const file of Array.from(files)) {
      const content = await file.text()
      const fileType = file.name.split(".").pop() || "html"

      await supabase.from("fichiers").insert({
        projet_id: projetId,
        nom: file.name,
        type: fileType,
        contenu: content,
        taille: file.size,
      })
    }

    router.refresh()
    setIsUploading(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    
    // Reload fichiers
    const { data } = await supabase
      .from("fichiers")
      .select("*")
      .eq("projet_id", projetId)
      .order("created_at", { ascending: false })
    
    if (data) setFichiers(data)
  }

  const handleCreateFile = async () => {
    if (!newFileName) return

    const supabase = createClient()
    const fullName = newFileName.includes(".") ? newFileName : `${newFileName}.${newFileType}`

    await supabase.from("fichiers").insert({
      projet_id: projetId,
      nom: fullName,
      type: newFileType,
      contenu: newFileContent,
      taille: new Blob([newFileContent]).size,
    })

    setNewFileName("")
    setNewFileContent("")
    setShowEditor(false)
    router.refresh()
    
    const { data } = await supabase
      .from("fichiers")
      .select("*")
      .eq("projet_id", projetId)
      .order("created_at", { ascending: false })
    
    if (data) setFichiers(data)
  }

  const handleUpdateFile = async () => {
    if (!editingFichier) return

    const supabase = createClient()

    await supabase
      .from("fichiers")
      .update({
        contenu: newFileContent,
        taille: new Blob([newFileContent]).size,
        updated_at: new Date().toISOString(),
      })
      .eq("id", editingFichier.id)

    setEditingFichier(null)
    setNewFileContent("")
    router.refresh()
    
    const { data } = await supabase
      .from("fichiers")
      .select("*")
      .eq("projet_id", projetId)
      .order("created_at", { ascending: false })
    
    if (data) setFichiers(data)
  }

  const handleDeleteFile = async (fichierId: string) => {
    if (!confirm("Etes-vous sur de vouloir supprimer ce fichier?")) return

    const supabase = createClient()
    await supabase.from("fichiers").delete().eq("id", fichierId)
    router.refresh()
    setFichiers(fichiers.filter((f) => f.id !== fichierId))
  }

  const handleDownloadFile = (fichier: Fichier) => {
    const blob = new Blob([fichier.contenu || ""], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = fichier.nom
    a.click()
    URL.revokeObjectURL(url)
  }

  const openEditModal = (fichier: Fichier) => {
    setEditingFichier(fichier)
    setNewFileContent(fichier.contenu || "")
  }

  const getFileIcon = (type: string) => {
    if (type === "html") return "text-orange-500"
    if (type === "css") return "text-blue-500"
    if (type === "js") return "text-yellow-500"
    return "text-gray-500"
  }

  const formatSize = (bytes: number | null) => {
    if (!bytes) return "0 B"
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex items-center gap-4">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".html,.css,.js,.json,.txt"
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
          </svg>
          {isUploading ? "Upload..." : "Importer des fichiers"}
        </label>
        <button
          onClick={() => setShowEditor(true)}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Creer un fichier
        </button>
      </div>

      {/* Create file modal */}
      {showEditor && (
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Nouveau fichier</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                placeholder="Nom du fichier"
                className="flex-1 rounded-lg border border-input bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <select
                value={newFileType}
                onChange={(e) => setNewFileType(e.target.value)}
                className="rounded-lg border border-input bg-background px-4 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="js">JavaScript</option>
                <option value="json">JSON</option>
                <option value="txt">Text</option>
              </select>
            </div>
            <textarea
              value={newFileContent}
              onChange={(e) => setNewFileContent(e.target.value)}
              placeholder="Contenu du fichier..."
              rows={15}
              className="w-full rounded-lg border border-input bg-background px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowEditor(false)
                  setNewFileName("")
                  setNewFileContent("")
                }}
                className="rounded-lg px-4 py-2 text-sm font-medium text-muted hover:text-foreground transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleCreateFile}
                disabled={!newFileName}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                Creer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit file modal */}
      {editingFichier && (
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Modifier: {editingFichier.nom}
          </h3>
          <div className="space-y-4">
            <textarea
              value={newFileContent}
              onChange={(e) => setNewFileContent(e.target.value)}
              rows={20}
              className="w-full rounded-lg border border-input bg-background px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setEditingFichier(null)
                  setNewFileContent("")
                }}
                className="rounded-lg px-4 py-2 text-sm font-medium text-muted hover:text-foreground transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleUpdateFile}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Files list */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {fichiers.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <svg className="mx-auto h-12 w-12 text-muted" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-foreground">Aucun fichier</h3>
            <p className="mt-2 text-sm text-muted">Importez ou creez des fichiers pour ce projet</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-secondary/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Fichier</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Taille</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Modifie</th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {fichiers.map((fichier) => (
                <tr key={fichier.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-3">
                      <svg className={`h-5 w-5 ${getFileIcon(fichier.type)}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                      </svg>
                      <span className="font-medium text-foreground">{fichier.nom}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-foreground uppercase">
                      {fichier.type}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-muted">
                    {formatSize(fichier.taille)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-muted">
                    {new Date(fichier.updated_at).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(fichier)}
                        className="rounded-lg p-2 text-muted hover:bg-secondary hover:text-foreground transition-colors"
                        title="Modifier"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDownloadFile(fichier)}
                        className="rounded-lg p-2 text-muted hover:bg-secondary hover:text-foreground transition-colors"
                        title="Telecharger"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteFile(fichier.id)}
                        className="rounded-lg p-2 text-muted hover:bg-destructive/10 hover:text-destructive transition-colors"
                        title="Supprimer"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
