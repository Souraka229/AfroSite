import { Expert } from "@/lib/types"

interface ExpertsSectionProps {
  experts: Expert[]
}

export function ExpertsSection({ experts }: ExpertsSectionProps) {
  const getInitials = (prenom: string, nom: string) => {
    return `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase()
  }

  return (
    <section id="experts" className="py-32 bg-gradient-to-br from-white to-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            NOTRE ÉQUIPE
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
            Nos Experts
          </h2>
          <p className="mt-6 text-lg text-muted text-pretty max-w-xl mx-auto">
            Une équipe passionnée et multidisciplinaire au service de vos projets digitaux.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {experts.map((expert) => (
            <div
              key={expert.id}
              className="group relative flex flex-col items-center rounded-2xl border border-border bg-white p-8 text-center transition-all hover:border-primary/50 hover:shadow-xl hover:scale-105"
            >
              <div
                className="flex h-24 w-24 items-center justify-center rounded-full text-3xl font-bold text-white shadow-lg"
                style={{ background: `linear-gradient(135deg, ${expert.avatar_color}, ${expert.avatar_color}dd)` }}
              >
                {getInitials(expert.prenom, expert.nom)}
              </div>
              <h3 className="mt-6 text-xl font-bold text-foreground">
                {expert.prenom} {expert.nom}
              </h3>
              <p className="mt-2 text-sm font-semibold text-primary uppercase tracking-wider">
                {expert.role}
              </p>
              {expert.description && (
                <p className="mt-4 text-sm text-muted leading-relaxed line-clamp-3 flex-1">
                  {expert.description}
                </p>
              )}
              {expert.competences && expert.competences.length > 0 && (
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {expert.competences.slice(0, 3).map((competence) => (
                    <span
                      key={competence}
                      className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
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
