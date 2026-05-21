export function PricingSection() {
  const pricing = [
    {
      name: "Site Vitrine",
      price: "100 000",
      originalPrice: "150 000",
      description: "Parfait pour démarrer",
      features: [
        "4-5 pages",
        "Responsive Design",
        "Contact Form",
        "Google Maps intégré",
        "SEO Basique",
        "1 mois de support gratuit",
        "0 FCFA avant validation"
      ]
    },
    {
      name: "Restaurant / Boutique",
      price: "180 000",
      originalPrice: "250 000",
      description: "Notre bestseller",
      features: [
        "Menu en ligne dynamique",
        "Système de réservation",
        "Galerie photos",
        "Blog intégré",
        "Panier & commandes",
        "3 mois de support gratuit",
        "Mise à jour SEO incluse",
        "0 FCFA avant validation"
      ],
      highlight: true
    },
    {
      name: "E-Commerce",
      price: "350 000",
      originalPrice: "500 000",
      description: "Pour vendre en ligne",
      features: [
        "Produits illimités",
        "Paiement sécurisé",
        "Gestion stocks",
        "Emails automats",
        "Analytics avancé",
        "6 mois de support gratuit",
        "Intégration paiement",
        "0 FCFA avant validation"
      ]
    },
    {
      name: "Sur Mesure",
      price: "À partir de 500K",
      description: "Vos besoins spécifiques",
      features: [
        "Toutes les fonctionnalités",
        "Infrastructure complète",
        "API personnalisée",
        "Intégration tiers",
        "Support prioritaire",
        "1 an de maintenance",
        "Audit SEO complet",
        "0 FCFA avant validation"
      ]
    }
  ]

  return (
    <section id="pricing" className="py-32 bg-gradient-to-br from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            TARIFS
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
            Tarifs Transparents & Équitables
          </h2>
          <p className="mt-6 text-lg text-muted text-pretty max-w-xl mx-auto">
            Paiement APRÈS validation de votre site. Zéro risque. Zéro frais cachés. Révisions illimitées.
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pricing.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-xl border-2 p-8 transition-all ${
                plan.highlight
                  ? "border-primary bg-gradient-to-br from-primary/5 to-white shadow-xl scale-105"
                  : "border-border bg-white hover:border-primary/50 hover:shadow-lg"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-6 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold">
                  ⭐ POPULAIRE
                </div>
              )}

              <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
              <p className="mt-2 text-sm text-muted">{plan.description}</p>

              <div className="mt-8 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="text-sm text-muted">FCFA</span>
                {plan.originalPrice && (
                  <span className="text-sm text-muted line-through ml-2">{plan.originalPrice}</span>
                )}
              </div>

              <ul className="mt-8 space-y-4 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://wa.me/22955530826"
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 w-full rounded-lg py-3 text-center font-semibold transition-all ${
                  plan.highlight
                    ? "bg-primary text-white hover:bg-primary/90 shadow-lg"
                    : "bg-foreground text-white hover:bg-foreground/90"
                }`}
              >
                Commencer Maintenant
              </a>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-xl bg-white border-2 border-primary/20 p-8 text-center">
          <h3 className="text-xl font-bold text-foreground">💡 Vous avez une question ?</h3>
          <p className="mt-3 text-muted">Contactez-nous directement sur WhatsApp pour discuter de votre projet.</p>
          <a
            href="https://wa.me/22955530826"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all"
          >
            Parler avec un Expert
          </a>
        </div>
      </div>
    </section>
  )
}
