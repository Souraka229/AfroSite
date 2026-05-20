"use client"

import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function NouveauClientPage() {
  const [nom, setNom] = useState("")
  const [email, setEmail] = useState("")
  const [telephone, setTelephone] = useState("")
  const [entreprise, setEntreprise] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    const supabase = createClient()

    const { error } = await supabase.from("clients").insert({
      nom,
      email,
      telephone: telephone || null,
      entreprise: entreprise || null,
    })

    if (error) {
      setError(error.message)
      setIsLoading(false)
      return
    }

    router.push("/admin/clients")
    router.refresh()
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/clients"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Retour aux clients
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-foreground">Nouveau client</h1>
        <p className="mt-1 text-sm text-muted">Ajoutez les informations du nouveau client</p>
      </div>

      <div className="max-w-2xl rounded-xl border border-border bg-card p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="nom" className="block text-sm font-medium text-foreground">
                Nom complet *
              </label>
              <input
                id="nom"
                type="text"
                required
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="mt-2 block w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Jean Dupont"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                Email *
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 block w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="jean@exemple.com"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="telephone" className="block text-sm font-medium text-foreground">
                Telephone
              </label>
              <input
                id="telephone"
                type="tel"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                className="mt-2 block w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="+229 XX XX XX XX"
              />
            </div>
            <div>
              <label htmlFor="entreprise" className="block text-sm font-medium text-foreground">
                Entreprise
              </label>
              <input
                id="entreprise"
                type="text"
                value={entreprise}
                onChange={(e) => setEntreprise(e.target.value)}
                className="mt-2 block w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Nom de l'entreprise"
              />
            </div>
          </div>
          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}
          <div className="flex items-center justify-end gap-4">
            <Link
              href="/admin/clients"
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              Annuler
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
