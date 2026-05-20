export function PricingSection() {
  const pricing = [
    {
      name: "Site Vitrine",
      price: "150 000",
      description: "Perfect pour les startups et petites entreprises",
      features: [
        "4-5 pages",
        "Responsive Design",
        "Contact Form",
        "Google Maps",
        "SEO Basique",
        "1 mois de support"
      ]
    },
    {
      name: "Restaurant / Boutique",
      price: "250 000",
      description: "Pour les commerces et restaurants",
      features: [
        "Menu en ligne",
        "Réservation système",
        "Galerie photos",
        "Blog articles",
        "Livraison intégrée",
        "3 mois de support"
      ],
      highlight: true
    },
    {
      name: "E-Commerce",
      price: "500 000",
      description: "Pour les boutiques en ligne",
      features: [
        "Illimité produits",
        "Paiement sécurisé",
        "Gestion stocks",
        "Emails automats",
        "Analytics",
        "6 mois de support"
      ]
    },
    {
      name: "Application Custom",
      price: "À partir de 1M",
      description: "Solutions sur mesure",
      features: [
        "Infrastructure complète",
        "Database intégrée",
        "API personnalisée",
        "Authentification",
        "Support prioritaire",
        "Maintenance incluse"
      ]
    }
  ]

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Tarifs Transparents
          </h2>
          <p className="mt-4 text-base text-muted text-pretty">
            Paiement APRÈS validation de votre site. Zéro risque. Pas de frais cachés.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pricing.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded border p-8 transition-all ${
                plan.highlight
                  ? "border-foreground bg-foreground text-white shadow-lg"
                  : "border-border bg-white text-foreground hover:border-foreground"
              }`}
            >
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className={`mt-2 text-xs ${plan.highlight ? "text-white/80" : "text-muted"}`}>
                {plan.description}
              </p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className={`text-xs ${plan.highlight ? "text-white/80" : "text-muted"}`}>FCFA</span>
              </div>
              <ul className="mt-8 space-y-3 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-xs">
                    <span className={`mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full ${
                      plan.highlight ? "bg-white" : "bg-foreground"
                    }`} />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="https://wa.me/22955530826"
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 w-full rounded border py-2 text-center text-xs font-medium transition-colors ${
                  plan.highlight
                    ? "border-white bg-white text-foreground hover:bg-white/90"
                    : "border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-white"
                }`}
              >
                Commander
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
