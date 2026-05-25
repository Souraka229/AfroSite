"use client"

import { useAnalytics } from "@/hooks/use-analytics"
import { ArrowUpRight } from "lucide-react"

const portfolioItems = [
  {
    id: 1,
    title: "Restafy",
    category: "Application Web",
    description: "Plateforme de gestion pour restaurants",
  },
  {
    id: 2,
    title: "E-commerce Mode",
    category: "E-commerce",
    description: "Boutique en ligne de mode africaine",
  },
  {
    id: 3,
    title: "Dashboard Analytics",
    category: "Application Web",
    description: "Tableau de bord pour startup tech",
  },
  {
    id: 4,
    title: "Site Corporate",
    category: "Site Vitrine",
    description: "Site institutionnel pour entreprise",
  },
]

export function PortfolioSection() {
  const { trackInteraction } = useAnalytics()

  return (
    <section id="portfolio" className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Portfolio</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6 text-balance">
            Nos dernieres realisations
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Decouvrez quelques-uns de nos projets recents qui illustrent notre expertise et notre creativite.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-secondary overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer"
              onClick={() => trackInteraction("click", "portfolio_item", { project: item.title })}
            >
              {/* Placeholder visual */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl font-bold text-primary/20">{item.id}</div>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-primary text-sm font-medium mb-2">{item.category}</span>
                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>

              {/* Arrow */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="w-5 h-5 text-primary" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
