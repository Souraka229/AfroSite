"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

export function QuickAddClient() {
  const [nom, setNom] = useState("")
  const [email, setEmail] = useState("")
  const [telephone, setTelephone] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const supabase = createClient()

      const { error } = await supabase.from("clients").insert([
        {
          nom: nom.trim(),
          email: email.trim(),
          telephone: telephone.trim(),
        },
      ])

      if (error) throw error

      setSuccess(true)
      setNom("")
      setEmail("")
      setTelephone("")

      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      alert("Erreur lors de l'ajout du client")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
          className="px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <input
          type="tel"
          placeholder="Téléphone"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          className="px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {isLoading ? "Ajout..." : "➕ Ajouter rapidement"}
        </button>

        {success && (
          <div className="px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
            ✓ Ajouté!
          </div>
        )}
      </div>
    </form>
  )
}
