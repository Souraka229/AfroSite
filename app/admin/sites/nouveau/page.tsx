"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

export default function NewSitePage() {
  const [nom, setNom] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const supabase = createClient()

      const { data, error: insertError } = await supabase
        .from("sites")
        .insert([{ nom }])
        .select()

      if (insertError) {
        setError(insertError.message)
        return
      }

      if (data && data[0]) {
        router.push(`/admin/sites/${data[0].id}`)
      }
    } catch (err) {
      setError("Erreur lors de la création du site")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Link
        href="/admin/sites"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-6"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        Retour
      </Link>

      <div className="rounded-xl border border-border bg-white p-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Créer un site</h1>
        <p className="text-muted mb-8">Donnez un nom à votre site web</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Nom du site
            </label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Ex: Mon Restaurant, Portfolio, etc..."
              required
              className="w-full px-4 py-3 border border-input rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <Link
              href="/admin/sites"
              className="flex-1 px-4 py-3 border border-border rounded-lg text-center font-medium text-foreground hover:bg-secondary transition-colors"
            >
              Annuler
            </Link>
            <button
              type="submit"
              disabled={loading || !nom}
              className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {loading ? "Création..." : "Créer le site"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
