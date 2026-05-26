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
  if (!projects || projects.length === 0) {
    return null
  }

  const featured = projects.slice(0, 6)

  return (
    <section className="py-32 bg-[#060d1a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full border border-primary/30 text-primary text-xs font-semibold uppercase tracking-widest mb-5">
            Portfolio
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Nos réalisations
          </h2>
          <p className="mt-5 text-lg text-muted max-w-xl mx-auto leading-relaxed">
            Des sites modernes livrés pour des entreprises, restaurants et services au Bénin.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-xl border border-white/7 bg-[#0c1628] hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.06)]"
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden bg-[#0a1020]">
                {project.image_url ? (
                  <Image
                    src={project.image_url}
                    alt={project.nom}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="text-6xl font-black text-primary/10 select-none">
                      {project.nom.charAt(0)}
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1628] to-transparent opacity-60" />
                {project.categorie && (
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-2.5 py-1 rounded-full bg-[#060d1a]/80 border border-primary/30 text-primary text-xs font-medium backdrop-blur-sm">
                      {project.categorie}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.nom}
                </h3>
                <p className="text-sm text-muted leading-relaxed line-clamp-2">
                  {project.description}
                </p>
                {project.url_site && (
                  <a
                    href={project.url_site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
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
