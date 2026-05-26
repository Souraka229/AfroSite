"use client"

import Image from "next/image"

interface Project {
  id: string
  nom: string
  description: string
  categorie?: string
  image_url?: string
  url_site?: string
}

interface PortfolioSectionProps {
  projects: Project[]
}

export function PortfolioSection({ projects }: PortfolioSectionProps) {
  if (!projects || projects.length === 0) return null

  const featured = projects.slice(0, 6)

  return (
    <section className="py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-2xl text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-foreground/5 text-foreground text-xs font-semibold uppercase tracking-widest mb-4" data-animate>
            Portfolio
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl" data-animate data-delay="1">
            Nos réalisations
          </h2>
          <p className="mt-5 text-lg text-muted max-w-xl mx-auto" data-animate data-delay="2">
            Des sites livrés pour des entreprises, restaurants et services au Bénin.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, index) => (
            <div
              key={project.id}
              data-animate="scale"
              data-delay={String((index % 3) + 1)}
              className="group overflow-hidden rounded-xl border border-border bg-white hover:border-foreground/20 hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-48 w-full overflow-hidden bg-[#f8fafc]">
                {project.image_url ? (
                  <Image
                    src={project.image_url}
                    alt={project.nom}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="text-5xl font-black text-border select-none">
                      {project.nom.charAt(0)}
                    </span>
                  </div>
                )}
                {project.categorie && (
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-2.5 py-1 rounded-full bg-white border border-border text-xs font-medium text-foreground shadow-sm">
                      {project.categorie}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-5">
                <h3 className="text-sm font-bold text-foreground mb-1.5 group-hover:text-accent transition-colors">{project.nom}</h3>
                <p className="text-sm text-muted leading-relaxed line-clamp-2">{project.description}</p>
                {project.url_site && (
                  <a
                    href={project.url_site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
                  >
                    Voir le site
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
