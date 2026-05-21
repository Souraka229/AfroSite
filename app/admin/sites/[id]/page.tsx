"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

interface Site {
  id: string
  nom: string
  created_at: string
}

interface SiteFile {
  id: string
  nom: string
  type: string
  taille: number
  blob_url: string
  created_at: string
}

export default function SiteDetailPage() {
  const params = useParams()
  const siteId = params?.id as string
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [site, setSite] = useState<Site | null>(null)
  const [files, setFiles] = useState<SiteFile[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [shareLink, setShareLink] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()

      // Fetch site
      const { data: siteData } = await supabase
        .from("sites")
        .select("*")
        .eq("id", siteId)
        .single()

      if (siteData) setSite(siteData)

      // Fetch files
      const { data: filesData } = await supabase
        .from("fichiers")
        .select("*")
        .eq("projet_id", siteId)
        .order("created_at", { ascending: false })

      if (filesData) setFiles(filesData)

      setLoading(false)
    }

    if (siteId) fetchData()
  }, [siteId])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    setUploading(true)

    for (const file of Array.from(files)) {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("projetId", siteId)

      await fetch("/api/upload-site-file", {
        method: "POST",
        body: formData,
      })
    }

    // Refresh files
    const supabase = createClient()
    const { data: filesData } = await supabase
      .from("fichiers")
      .select("*")
      .eq("projet_id", siteId)
      .order("created_at", { ascending: false })

    if (filesData) setFiles(filesData)
    setUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const generateShareLink = () => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
    setShareLink(`${baseUrl}/preview-site/${siteId}`)
  }

  const copyToClipboard = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink)
      alert("Lien copié!")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/sites"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-4"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Retour
        </Link>
        <h1 className="text-3xl font-bold text-foreground">{site?.nom}</h1>
      </div>

      {/* Upload Section */}
      <div className="rounded-xl border border-border bg-white p-8 mb-8">
        <h2 className="text-xl font-bold text-foreground mb-4">📁 Uploader des fichiers</h2>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".html,.css,.js,.json,.txt,.png,.jpg,.jpeg,.gif,.svg"
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="block w-full p-8 border-2 border-dashed border-primary rounded-lg cursor-pointer hover:bg-primary/5 transition-colors text-center"
        >
          <svg className="mx-auto w-8 h-8 text-primary mb-2" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33A3 3 0 0116.5 19.5H6.75Z" />
          </svg>
          <p className="font-medium text-foreground">{uploading ? "Upload..." : "Cliquez pour uploader ou glissez les fichiers"}</p>
          <p className="text-sm text-muted mt-1">HTML, CSS, JS, images</p>
        </label>
      </div>

      {/* Files List */}
      <div className="rounded-xl border border-border bg-white p-8 mb-8">
        <h2 className="text-xl font-bold text-foreground mb-6">📄 Fichiers ({files.length})</h2>
        {files.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted">Aucun fichier uploadé</p>
          </div>
        ) : (
          <div className="space-y-3">
            {files.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-xl">
                    {file.type === "html" ? "🔗" : file.type === "css" ? "🎨" : file.type === "js" ? "⚙️" : "📦"}
                  </span>
                  <div>
                    <p className="font-medium text-foreground">{file.nom}</p>
                    <p className="text-xs text-muted">{(file.taille / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                {file.blob_url && (
                  <a
                    href={file.blob_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
                  >
                    Voir →
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Preview & Share */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Preview */}
        <Link
          href={`/preview-site/${siteId}`}
          className="rounded-xl border border-primary bg-gradient-to-br from-primary/10 to-primary/5 p-8 text-center hover:border-primary/70 transition-colors"
        >
          <svg className="mx-auto w-12 h-12 text-primary mb-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0Z" />
          </svg>
          <h3 className="font-bold text-foreground mb-1">Aperçu</h3>
          <p className="text-sm text-muted">Voir le site en direct</p>
        </Link>

        {/* Share */}
        <div className="rounded-xl border border-border bg-white p-8">
          <h3 className="font-bold text-foreground mb-4">🔗 Partager</h3>
          {!shareLink ? (
            <button
              onClick={generateShareLink}
              className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Générer un lien
            </button>
          ) : (
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareLink}
                  readOnly
                  className="flex-1 px-3 py-2 border border-input rounded-lg text-sm font-mono bg-gray-50"
                />
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors text-sm font-medium"
                >
                  Copier
                </button>
              </div>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Voici mon site: ${shareLink}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-center text-sm font-medium"
              >
                💬 WhatsApp
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
