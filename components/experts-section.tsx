import { Expert } from "@/lib/types"

interface ExpertsSectionProps {
  experts: Expert[]
}

export function ExpertsSection({ experts }: ExpertsSectionProps) {
  const getInitials = (prenom: string, nom: string) => {
    return `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase()
  }

  return (
    <section id="experts" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Notre Equipe
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Nos Experts
          </h2>
          <p className="mt-4 text-lg text-muted text-pretty">
            Une equipe passionnee et multidisciplinaire au service de vos projets digitaux.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {experts.map((expert) => (
            <div
              key={expert.id}
              className="group relative flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center transition-all hover:border-transparent hover:shadow-xl"
            >
              <div
                className="flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold text-white"
                style={{ background: `linear-gradient(135deg, ${expert.avatar_color}, ${expert.avatar_color}dd)` }}
              >
                {getInitials(expert.prenom, expert.nom)}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {expert.prenom} {expert.nom}
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-primary">
                {expert.role}
              </p>
              {expert.description && (
                <p className="mt-3 text-sm text-muted leading-relaxed line-clamp-3">
                  {expert.description}
                </p>
              )}
              {expert.competences && expert.competences.length > 0 && (
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {expert.competences.slice(0, 3).map((competence) => (
                    <span
                      key={competence}
                      className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
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
