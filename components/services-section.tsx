const services = [
  {
    title: "Site Vitrine",
    description: "Présentez votre entreprise avec un site professionnel qui inspire confiance et convertit les visiteurs en clients.",
  },
  {
    title: "Restaurant & Bar",
    description: "Menu en ligne, système de réservation et galerie photos. Vos clients découvrent votre établissement avant de venir.",
  },
  {
    title: "Boutique E-Commerce",
    description: "Vendez en ligne avec paiement sécurisé, gestion des stocks et tableau de bord. Votre boutique ouverte 24h/24.",
  },
  {
    title: "Application Web",
    description: "Solutions sur mesure pour digitaliser vos processus, gérer vos données et améliorer la productivité.",
  },
  {
    title: "Vitrine Trading",
    description: "Présentez vos produits, tarifs et modalités. Attirez des clients via les réseaux sociaux et Google.",
  },
  {
    title: "Portfolio & CV",
    description: "Mettez en avant vos compétences et réalisations. Un portfolio professionnel qui vous distingue.",
  },
  {
    title: "Blog & Contenu",
    description: "Créez du contenu engageant, attirez du trafic organique et fidélisez votre audience en ligne.",
  },
  {
    title: "Sur Mesure",
    description: "Aucune limite. SaaS, ONG, plateforme communautaire, application métier — si vous le rêvez, nous le créons.",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-32 bg-[#060d1a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full border border-primary/30 text-primary text-xs font-semibold uppercase tracking-widest mb-5">
            Services
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Tous types de projets web
          </h2>
          <p className="mt-5 text-lg text-muted max-w-xl mx-auto leading-relaxed">
            Restaurants, traders, boutiques, entreprises — aucune limite de type ou de complexité.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4 bg-white/5 rounded-2xl overflow-hidden border border-white/5">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative flex flex-col bg-[#060d1a] p-7 hover:bg-[#0c1628] transition-colors duration-300"
            >
              <div className="mb-4 text-xs font-semibold text-primary/60 uppercase tracking-widest">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="text-base font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed flex-1">{service.description}</p>
              <div className="mt-5 pt-4 border-t border-white/5">
                <span className="text-xs font-medium text-muted group-hover:text-primary transition-colors">
                  En savoir plus →
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
