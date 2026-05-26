import { Expert } from "@/lib/types"

interface ExpertsSectionProps {
  experts: Expert[]
}

export function ExpertsSection({ experts }: ExpertsSectionProps) {
  const getInitials = (prenom: string, nom: string) => {
    return `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase()
  }

  if (!experts || experts.length === 0) return null

  return (
    <section id="experts" className="py-32 bg-[#060d1a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full border border-primary/30 text-primary text-xs font-semibold uppercase tracking-widest mb-5">
            Notre équipe
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Les experts derrière vos projets
          </h2>
          <p className="mt-5 text-lg text-muted max-w-xl mx-auto leading-relaxed">
            Une équipe passionnée et multidisciplinaire dédiée à vos projets digitaux.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {experts.map((expert) => (
            <div
              key={expert.id}
              className="group relative flex flex-col items-center rounded-xl border border-white/7 bg-[#0c1628] p-7 text-center hover:border-primary/30 transition-all duration-300"
            >
              {/* Avatar */}
              <div
                className="flex h-16 w-16 items-center justify-center rounded-xl text-lg font-bold text-white shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${expert.avatar_color || "#22d3ee"}, ${expert.avatar_color || "#3b82f6"}99)`,
                }}
              >
                {getInitials(expert.prenom, expert.nom)}
              </div>

              {/* Info */}
              <h3 className="mt-5 text-base font-bold text-foreground group-hover:text-primary transition-colors">
                {expert.prenom} {expert.nom}
              </h3>
              <p className="mt-1 text-xs font-semibold text-primary uppercase tracking-widest">
                {expert.role}
              </p>
              {expert.description && (
                <p className="mt-3 text-xs text-muted leading-relaxed line-clamp-3 flex-1">
                  {expert.description}
                </p>
              )}

              {/* Skills */}
              {expert.competences && expert.competences.length > 0 && (
                <div className="mt-5 flex flex-wrap justify-center gap-1.5">
                  {expert.competences.slice(0, 3).map((competence) => (
                    <span
                      key={competence}
                      className="inline-block rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-xs text-primary"
                    >
                      {competence}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
