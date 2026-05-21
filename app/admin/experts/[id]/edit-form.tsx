"use client"

import { Expert } from "@/lib/types"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface EditExpertFormProps {
  expert: Expert
}

export function EditExpertForm({ expert }: EditExpertFormProps) {
  const router = useRouter()
  const [prenom, setPrenom] = useState(expert.prenom)
  const [nom, setNom] = useState(expert.nom)
  const [role, setRole] = useState(expert.role)
  const [email, setEmail] = useState(expert.email || "")
  const [description, setDescription] = useState(expert.description || "")
  const [competences, setCompetences] = useState(expert.competences?.join(", ") || "")
  const [avatarColor, setAvatarColor] = useState(expert.avatar_color)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setIsLoading(true)

    try {
      const supabase = createClient()

      const { error: updateError } = await supabase
        .from("experts")
        .update({
          prenom,
          nom,
          role,
          email: email || null,
          description: description || null,
          competences: competences
            .split(",")
            .map((c) => c.trim())
            .filter((c) => c),
          avatar_color: avatarColor,
          updated_at: new Date().toISOString(),
        })
        .eq("id", expert.id)

      if (updateError) throw updateError

      setSuccess(true)
      setTimeout(() => router.refresh(), 1000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error saving profile")
    } finally {
      setIsLoading(false)
    }
  }

  const colors = [
    "#3B82F6", // blue
    "#8B5CF6", // purple
    "#EC4899", // pink
    "#F59E0B", // amber
    "#10B981", // emerald
    "#06B6D4", // cyan
    "#EF4444", // red
    "#F97316", // orange
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-xl border border-border bg-white p-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Éditer mon profil</h2>

        {/* Informations personnelles */}
        <div className="mb-8 pb-8 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            ℹ️ Informations personnelles
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="prenom" className="block text-sm font-medium text-foreground mb-2">
                Prénom
              </label>
              <input
                id="prenom"
                type="text"
                required
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label htmlFor="nom" className="block text-sm font-medium text-foreground mb-2">
                Nom
              </label>
              <input
                id="nom"
                type="text"
                required
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="role" className="block text-sm font-medium text-foreground mb-2">
                Rôle / Titre
              </label>
              <input
                id="role"
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>

        {/* Bio et description */}
        <div className="mb-8 pb-8 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            📝 À propos de moi
          </h3>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
              Bio (max 500 caractères)
            </label>
            <textarea
              id="description"
              rows={4}
              maxLength={500}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              placeholder="Parlez-nous de vous, vos expériences, vos passions..."
            />
            <p className="text-xs text-muted mt-1">
              {description.length}/500 caractères
            </p>
          </div>
        </div>

        {/* Compétences */}
        <div className="mb-8 pb-8 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            🎯 Compétences
          </h3>

          <div>
            <label htmlFor="competences" className="block text-sm font-medium text-foreground mb-2">
              Compétences (séparées par des virgules)
            </label>
            <input
              id="competences"
              type="text"
              value={competences}
              onChange={(e) => setCompetences(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="React, Node.js, Design UI/UX, ..."
            />
            <p className="text-xs text-muted mt-2">
              Exemple: React, Next.js, TypeScript, Tailwind CSS
            </p>

            {competences && (
              <div className="mt-4 flex flex-wrap gap-2">
                {competences
                  .split(",")
                  .map((c) => c.trim())
                  .filter((c) => c)
                  .map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Couleur avatar */}
        <div className="mb-8 pb-8 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            🎨 Couleur du profil
          </h3>

          <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setAvatarColor(color)}
                className={`h-12 w-12 rounded-full border-4 transition-all ${
                  avatarColor === color
                    ? "border-foreground scale-110 shadow-lg"
                    : "border-border hover:border-foreground/50"
                }`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>

          <div className="mt-4 flex items-center gap-3">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white"
              style={{
                background: `linear-gradient(135deg, ${avatarColor}, ${avatarColor}dd)`,
              }}
            >
              {prenom.charAt(0)}{nom.charAt(0)}
            </div>
            <p className="text-sm text-muted">
              Voici comment votre avatar apparaîtra
            </p>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-100 text-red-800 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 rounded-lg bg-green-100 text-green-800 text-sm">
            ✓ Profil mis à jour avec succès!
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-4">
          <a
            href="/admin/team"
            className="px-6 py-2.5 text-sm font-medium text-muted hover:text-foreground transition-colors"
          >
            Annuler
          </a>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {isLoading ? "Enregistrement..." : "Enregistrer le profil"}
          </button>
        </div>
      </div>
    </form>
  )
}
