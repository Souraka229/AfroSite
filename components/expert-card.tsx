"use client"

import { Expert } from "@/lib/types"
import Link from "next/link"
import { useState, useEffect } from "react"

interface ExpertCardProps {
  expert: Expert
}

export function ExpertCard({ expert }: ExpertCardProps) {
  const [projectCount, setProjectCount] = useState(0)

  useEffect(() => {
    fetch(`/api/expert-stats/${expert.id}`)
      .then(res => res.json())
      .then(data => setProjectCount(data.projectCount || 0))
      .catch(() => setProjectCount(0))
  }, [expert.id])

  const initials = `${expert.prenom.charAt(0)}${expert.nom.charAt(0)}`.toUpperCase()
  const skills = (expert.competences || []).slice(0, 4)

  return (
    <Link href={`/admin/experts/${expert.id}`}>
      <div className="group rounded-xl border border-border bg-white p-6 hover:border-foreground/20 hover:shadow-md transition-all cursor-pointer">
        <div className="flex items-start justify-between mb-5">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl text-base font-bold text-white"
            style={{
              background: `linear-gradient(135deg, ${expert.avatar_color || "#0f172a"}, ${expert.avatar_color || "#334155"})`,
            }}
          >
            {initials}
          </div>
          <div className="text-right">
            <p className="text-lg font-black text-foreground">{projectCount}</p>
            <p className="text-xs text-muted">projets</p>
          </div>
        </div>

        <h3 className="text-sm font-bold text-foreground group-hover:text-accent transition-colors">
          {expert.prenom} {expert.nom}
        </h3>
        <p className="text-xs font-semibold text-muted uppercase tracking-wider mt-0.5 mb-3">
          {expert.role}
        </p>

        {expert.description && (
          <p className="text-xs text-muted leading-relaxed line-clamp-2 mb-4">
            {expert.description}
          </p>
        )}

        {skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border">
            {skills.map((s) => (
              <span key={s} className="inline-block rounded-full bg-[#f1f5f9] px-2.5 py-0.5 text-xs font-medium text-foreground/70">
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
