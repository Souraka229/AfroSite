"use client"

import { createClient } from "@/lib/supabase/client"
import { Client, Expert, Projet } from "@/lib/types"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { WhatsappPitchButton } from "@/components/whatsapp-pitch-button"
import { ShareProjectButton } from "@/components/share-project-button"

interface EditProjetFormProps {
  projet: Projet
  clients: Client[]
  experts: Expert[]
}

export function EditProjetForm({ projet, clients, experts }: EditProjetFormProps) {
  const [nom, setNom] = useState(projet.nom)
  const [description, setDescription] = useState(projet.description || "")
  const [clientId, setClientId] = useState(projet.client_id)
  const [expertId, setExpertId] = useState(projet.expert_id || "")
  const [statut, setStatut] = useState(projet.statut)
  const [prix, setPrix] = useState(projet.prix?.toString() || "")
  const [dateDebut, setDateDebut] = useState(projet.date_debut || "")
  const [dateFin, setDateFin] = useState(projet.date_fin || "")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    const supabase = createClient()

    const { error } = await supabase
      .from("projets")
      .update({
        nom,
        description: description || null,
        client_id: clientId,
        expert_id: expertId || null,
        statut,
        prix: prix ? parseFloat(prix) : null,
        date_debut: dateDebut || null,
        date_fin: dateFin || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", projet.id)

    if (error) {
      setError(error.message)
      setIsLoading(false)
      return
    }

    router.push("/admin/projets")
    router.refresh()
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link
            href="/admin/projets"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-4"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Retour aux projets
          </Link>
          <h1 className="text-3xl font-bold text-foreground">{nom}</h1>
          <p className="mt-2 text-sm text-muted">Gérez les détails du projet et partagez avec le client</p>
        </div>
        <div className="flex gap-3">
          <a
            href={`/preview/${projet.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-primary/10 text-primary px-4 py-2 text-sm font-semibold hover:bg-primary/20 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            Aperçu
          </a>
          <a
            href={`https://wa.me/22955530826?text=Bonjour, je demande un suivi sur le projet: ${nom}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-green-100 text-green-700 px-4 py-2 text-sm font-semibold hover:bg-green-200 transition-colors"
          >
            💬 Contacter client
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-border bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-foreground mb-6">Informations du projet</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="nom" className="block text-sm font-medium text-foreground">
              Nom du projet *
            </label>
            <input
              id="nom"
              type="text"
              required
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="mt-2 block w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-foreground">
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 block w-full resize-none rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="client" className="block text-sm font-medium text-foreground">
                Client *
              </label>
              <select
                id="client"
                required
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className="mt-2 block w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.nom} ({client.email})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="expert" className="block text-sm font-medium text-foreground">
                Expert assigne
              </label>
              <select
                id="expert"
                value={expertId}
                onChange={(e) => setExpertId(e.target.value)}
                className="mt-2 block w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="">Aucun expert</option>
                {experts.map((expert) => (
                  <option key={expert.id} value={expert.id}>
                    {expert.prenom} {expert.nom} - {expert.role}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <label htmlFor="statut" className="block text-sm font-medium text-foreground">
                Statut
              </label>
              <select
                id="statut"
                value={statut}
                onChange={(e) => setStatut(e.target.value as Projet["statut"])}
                className="mt-2 block w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="en_attente">En attente</option>
                <option value="en_cours">En cours</option>
                <option value="termine">Termine</option>
                <option value="annule">Annule</option>
              </select>
            </div>
            <div>
              <label htmlFor="dateDebut" className="block text-sm font-medium text-foreground">
                Date de debut
              </label>
              <input
                id="dateDebut"
                type="date"
                value={dateDebut}
                onChange={(e) => setDateDebut(e.target.value)}
                className="mt-2 block w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label htmlFor="dateFin" className="block text-sm font-medium text-foreground">
                Date de fin prevue
              </label>
              <input
                id="dateFin"
                type="date"
                value={dateFin}
                onChange={(e) => setDateFin(e.target.value)}
                className="mt-2 block w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
          <div>
            <label htmlFor="prix" className="block text-sm font-medium text-foreground">
              Prix (FCFA)
            </label>
            <input
              id="prix"
              type="number"
              min="0"
              step="1000"
              value={prix}
              onChange={(e) => setPrix(e.target.value)}
              className="mt-2 block w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}
          <div className="flex items-center justify-end gap-4 pt-4 border-t border-border">
            <Link
              href="/admin/projets"
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              Annuler
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading ? "Enregistrement..." : "Enregistrer les modifications"}
            </button>
          </div>
            </form>
          </div>
        </div>

        {/* Sidebar collaboration */}
        <div className="space-y-6">
          {/* Statut rapide */}
          <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-foreground mb-4">État du projet</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-muted uppercase mb-2">Statut actuel</p>
                <div className={`inline-block px-3 py-2 rounded-lg text-sm font-semibold ${
                  statut === 'termine' ? 'bg-green-100 text-green-800' :
                  statut === 'en_cours' ? 'bg-blue-100 text-blue-800' :
                  statut === 'en_attente' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {statut === 'termine' ? '✓ Terminé' :
                   statut === 'en_cours' ? '⏳ En cours' :
                   statut === 'en_attente' ? '⏱️ En attente' :
                   '✕ Annulé'}
                </div>
              </div>

              {dateDebut && (
                <div>
                  <p className="text-xs font-semibold text-muted uppercase mb-1">Commencé le</p>
                  <p className="text-sm font-medium text-foreground">
                    {new Date(dateDebut).toLocaleDateString('fr-FR', { dateStyle: 'long' })}
                  </p>
                </div>
              )}

              {dateFin && (
                <div>
                  <p className="text-xs font-semibold text-muted uppercase mb-1">Fin prévue</p>
                  <p className="text-sm font-medium text-foreground">
                    {new Date(dateFin).toLocaleDateString('fr-FR', { dateStyle: 'long' })}
                  </p>
                </div>
              )}

              {prix && (
                <div>
                  <p className="text-xs font-semibold text-muted uppercase mb-1">Budget</p>
                  <p className="text-2xl font-bold text-primary">{parseInt(prix).toLocaleString()} FCFA</p>
                </div>
              )}
            </div>
          </div>

          {/* Sharing */}
          <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-foreground mb-4">📤 Partager avec le client</h3>
            <ShareProjectButton projectId={projet.id} projectName={nom} />
          </div>

          {/* Actions */}
          <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-foreground mb-4">Actions</h3>
            <div className="space-y-2">
              <a
                href={`/admin/projets/${projet.id}/fichiers`}
                className="flex items-center gap-2 w-full p-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-sm font-medium text-foreground transition-colors"
              >
                <span>📁</span> Gérer les fichiers
              </a>
              <a
                href={`/preview/${projet.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 w-full p-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-sm font-medium text-foreground transition-colors"
              >
                <span>👁️</span> Voir l'aperçu
              </a>
            </div>
          </div>

          {/* IA Pitch */}
          <div className="rounded-xl border border-border bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-6">
            <h3 className="text-lg font-bold text-foreground mb-2">🤖 Message IA</h3>
            <p className="text-xs text-muted mb-4">
              L'IA génère un message de pitch personnalisé pour annoncer le site au client.
            </p>
            <WhatsappPitchButton
              projectName={nom}
              projectDescription={description}
              projectCategory={clientId}
              clientName={clients.find(c => c.id === clientId)?.nom || "Client"}
            />
          </div>

          {/* Collaboration */}
          <div className="rounded-xl border border-border bg-gradient-to-br from-primary/5 to-primary/0 p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">💬 Contact Direct</h3>
            <p className="text-sm text-muted mb-4">
              Contactez le client rapidement sur WhatsApp.
            </p>
            <a
              href={`https://wa.me/22955530826?text=Bonjour, suivi du projet: ${nom}`}
              className="block w-full text-center bg-primary text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-primary/90 transition-all text-sm"
            >
              Contacter le client
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
