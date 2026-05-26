const services = [
  {
    title: "Site Vitrine",
    description: "Présentez votre entreprise avec un site professionnel qui inspire confiance et convertit les visiteurs en clients.",
  },
  {
    title: "Restaurant & Bar",
    description: "Menu en ligne, réservation et galerie photos. Vos clients découvrent votre établissement avant de venir.",
  },
  {
    title: "Boutique E-Commerce",
    description: "Vendez en ligne avec paiement sécurisé, gestion des stocks et tableau de bord complet.",
  },
  {
    title: "Application Web",
    description: "Solutions sur mesure pour digitaliser vos processus et améliorer votre productivité.",
  },
  {
    title: "Vitrine Trading",
    description: "Présentez vos produits, tarifs et modalités. Attirez des clients via les réseaux et Google.",
  },
  {
    title: "Portfolio & CV",
    description: "Mettez en avant vos compétences et réalisations avec un portfolio qui vous distingue.",
  },
  {
    title: "Blog & Contenu",
    description: "Créez du contenu engageant, attirez du trafic organique et fidélisez votre audience.",
  },
  {
    title: "Sur Mesure",
    description: "Aucune limite. SaaS, ONG, plateforme, application métier — si vous le rêvez, nous le créons.",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-28 bg-[#f8fafc]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-2xl text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-foreground/5 text-foreground text-xs font-semibold uppercase tracking-widest mb-4">
            Services
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Tous types de projets web
          </h2>
          <p className="mt-5 text-lg text-muted max-w-xl mx-auto">
            Restaurants, traders, boutiques, entreprises — aucune limite.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group flex flex-col rounded-xl border border-border bg-white p-6 hover:border-foreground/30 hover:shadow-md transition-all duration-200"
            >
              <div className="mb-3 text-xs font-semibold text-muted uppercase tracking-widest">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="text-sm font-bold text-foreground mb-2">{service.title}</h3>
              <p className="text-sm text-muted leading-relaxed flex-1">{service.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
