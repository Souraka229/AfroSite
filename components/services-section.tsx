const services = [
  {
    title: "Site Vitrine",
    description: "Présentez votre entreprise, vos services et crédibilisez votre activité en ligne. Un site professionnel qui convertit les visiteurs en clients.",
  },
  {
    title: "Restaurant / Bar",
    description: "Menu en ligne, système de réservation, photos des plats. Vos clients découvrent votre établissement 24h/24 avant de venir.",
  },
  {
    title: "Boutique E-Commerce",
    description: "Vendez en ligne avec paiement sécurisé, gestion des stocks et livraisons. Transformez votre boutique en commerce digital.",
  },
  {
    title: "Application Web",
    description: "Solutions sur mesure pour digitaliser vos processus, gérer vos données et améliorer votre productivité. Adapté à votre métier.",
  },
  {
    title: "Vitrine Trading",
    description: "Présentez vos produits, tarifs et modalités de commande. Gagnez des clients sur les réseaux sociaux et Google.",
  },
  {
    title: "Portfolios & CV",
    description: "Mettez en avant vos compétences et réalisations. Un portfolio professionnel qui vous distingue de la concurrence.",
  },
  {
    title: "Blog & Contenu",
    description: "Créez du contenu engageant, bloguez régulièrement. Attirez du trafic organique et fidélisez votre audience.",
  },
  {
    title: "Tout type de site",
    description: "Aucune limitation. Si tu peux le rêver, nous pouvons le créer. Scolaire, ONG, SaaS, communauté... tout est possible.",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Tous les types de sites
          </h2>
          <p className="mt-4 text-base text-muted text-pretty">
            Restaurants, traders, boutiques, entreprises — nous créons tout genre de site. Aucune limitation.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative flex flex-col rounded border border-border bg-white p-6 transition-all hover:border-foreground hover:shadow-md"
            >
              <h3 className="text-base font-semibold text-foreground">{service.title}</h3>
              <p className="mt-3 text-xs text-muted leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
