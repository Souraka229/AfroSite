"use client"

import { Expert } from "@/lib/types"
import Link from "next/link"
import { useState, useEffect } from "react"

interface ExpertCardProps {
  expert: Expert
}

export function ExpertCard({ expert }: ExpertCardProps) {
  const [projectCount, setProjectCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch project count for this expert
    fetch(`/api/expert-stats/${expert.id}`)
      .then(res => res.json())
      .then(data => setProjectCount(data.projectCount || 0))
      .catch(() => setProjectCount(0))
      .finally(() => setIsLoading(false))
  }, [expert.id])

  const getInitials = (prenom: string, nom: string) => {
    return `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase()
  }

  const competences = expert.competences || []
  const displayCompetences = competences.slice(0, 4)
  const remainingCompetences = competences.length - displayCompetences.length

  return (
    <Link href={`/admin/experts/${expert.id}`}>
      <div className="group rounded-xl border border-border bg-white p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer">
        {/* Avatar */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white shadow-lg group-hover:scale-110 transition-transform"
            style={{
              background: `linear-gradient(135deg, ${expert.avatar_color}, ${expert.avatar_color}dd)`,
            }}
          >
            {getInitials(expert.prenom, expert.nom)}
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-primary">
              {projectCount} projets
            </div>
            <div className="text-xs text-muted">livrés</div>
          </div>
        </div>

        {/* Nom et rôle */}
        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
          {expert.prenom} {expert.nom}
        </h3>
        <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
          {expert.role}
        </p>

        {/* Bio */}
        {expert.description && (
          <p className="text-sm text-muted leading-relaxed line-clamp-3 mb-4">
            {expert.description}
          </p>
        )}

        {/* Stats badges */}
        <div className="flex gap-2 mb-4">
          <div className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            ⭐ Actif
          </div>
          {projectCount >= 10 && (
            <div className="px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
              🏆 Expert
            </div>
          )}
          {projectCount >= 5 && (
            <div className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
              📈 Senior
            </div>
          )}
        </div>

        {/* Compétences */}
        {displayCompetences.length > 0 && (
          <div className="space-y-2 pt-4 border-t border-border/50">
            <p className="text-xs font-semibold text-muted uppercase">Compétences</p>
            <div className="flex flex-wrap gap-1.5">
              {displayCompetences.map((competence) => (
                <span
                  key={competence}
                  className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-foreground hover:bg-slate-200 transition-colors"
                >
                  {competence}
                </span>
              ))}
              {remainingCompetences > 0 && (
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-muted">
                  +{remainingCompetences}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action */}
        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="text-xs font-semibold text-primary group-hover:underline">
            Voir le profil →
          </div>
        </div>
      </div>
    </Link>
  )
}
