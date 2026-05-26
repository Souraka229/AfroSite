import { Expert } from "@/lib/types"

interface ExpertsSectionProps {
  experts: Expert[]
}

export function ExpertsSection({ experts }: ExpertsSectionProps) {
  const getInitials = (prenom: string, nom: string) =>
    `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase()

  if (!experts || experts.length === 0) return null

  return (
    <section id="experts" className="py-28 bg-[#f8fafc]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-2xl text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-foreground/5 text-foreground text-xs font-semibold uppercase tracking-widest mb-4">
            Notre équipe
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Les experts derrière vos projets
          </h2>
          <p className="mt-5 text-lg text-muted max-w-xl mx-auto">
            Une équipe passionnée et multidisciplinaire à votre service.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {experts.map((expert) => (
            <div
              key={expert.id}
              className="group flex flex-col items-center rounded-xl border border-border bg-white p-7 text-center hover:border-foreground/20 hover:shadow-md transition-all"
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-xl text-sm font-bold text-white"
                style={{
                  background: `linear-gradient(135deg, ${expert.avatar_color || "#0f172a"}, ${expert.avatar_color || "#334155"})`,
                }}
              >
                {getInitials(expert.prenom, expert.nom)}
              </div>

              <h3 className="mt-4 text-sm font-bold text-foreground">
                {expert.prenom} {expert.nom}
              </h3>
              <p className="mt-1 text-xs font-semibold text-muted uppercase tracking-widest">
                {expert.role}
              </p>
              {expert.description && (
                <p className="mt-3 text-xs text-muted leading-relaxed line-clamp-3">{expert.description}</p>
              )}
              {expert.competences && expert.competences.length > 0 && (
                <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                  {expert.competences.slice(0, 3).map((competence) => (
                    <span
                      key={competence}
                      className="inline-block rounded-full bg-foreground/5 px-2.5 py-0.5 text-xs text-foreground/70"
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
