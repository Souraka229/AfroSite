"use client"

import Image from "next/image"
import Link from "next/link"

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
  if (!projects || projects.length === 0) {
    return null
  }

  const featuredProjects = projects.slice(0, 6)

  return (
    <section className="py-32 bg-gradient-to-br from-white to-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            PORTFOLIO
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
            Nos réalisations
          </h2>
          <p className="mt-6 text-lg text-muted text-pretty max-w-xl mx-auto leading-relaxed">
            Des sites web modernes et performants créés pour des entreprises, restaurants, traders et services du Bénin.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-xl border border-border bg-white shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {project.image_url ? (
                <div className="relative h-64 w-full overflow-hidden bg-muted">
                  <Image
                    src={project.image_url}
                    alt={project.nom}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              ) : (
                <div className="h-64 w-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary/30">∞</div>
                  </div>
                </div>
              )}

              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-lg font-semibold text-foreground line-clamp-2">
                    {project.nom}
                  </h3>
                  {project.categorie && (
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium flex-shrink-0">
                      {project.categorie}
                    </span>
                  )}
                </div>

                <p className="text-sm text-muted leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                <div className="mt-4 flex gap-3">
                  {project.url_site && (
                    <a
                      href={project.url_site}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Voir le site →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length > 6 && (
          <div className="mt-16 text-center">
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-3 text-base font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Voir tous les projets
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
