"use client"

import { createClient } from "@/lib/supabase/client"
import { Client, Expert } from "@/lib/types"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface NouveauProjetFormProps {
  clients: Client[]
  experts: Expert[]
}

export function NouveauProjetForm({ clients, experts }: NouveauProjetFormProps) {
  const [nom, setNom] = useState("")
  const [description, setDescription] = useState("")
  const [clientId, setClientId] = useState("")
  const [expertId, setExpertId] = useState("")
  const [statut, setStatut] = useState("en_attente")
  const [prix, setPrix] = useState("")
  const [dateDebut, setDateDebut] = useState("")
  const [dateFin, setDateFin] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    if (!clientId) {
      setError("Veuillez selectionner un client")
      setIsLoading(false)
      return
    }

    const supabase = createClient()

    const { error } = await supabase.from("projets").insert({
      nom,
      description: description || null,
      client_id: clientId,
      expert_id: expertId || null,
      statut,
      prix: prix ? parseFloat(prix) : null,
      date_debut: dateDebut || null,
      date_fin: dateFin || null,
    })

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
      <div className="mb-8">
        <Link
          href="/admin/projets"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Retour aux projets
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-foreground">Nouveau projet</h1>
        <p className="mt-1 text-sm text-muted">Creez un nouveau projet pour un client</p>
      </div>

      <div className="max-w-2xl rounded-xl border border-border bg-card p-6">
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
              placeholder="Site vitrine entreprise X"
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
              placeholder="Description du projet..."
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
                <option value="">Selectionner un client</option>
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
                onChange={(e) => setStatut(e.target.value)}
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
              placeholder="150000"
            />
          </div>
          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}
          <div className="flex items-center justify-end gap-4">
            <Link
              href="/admin/projets"
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              Annuler
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creation..." : "Creer le projet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
