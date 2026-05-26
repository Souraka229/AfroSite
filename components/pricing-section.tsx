const plans = [
  {
    name: "Site Vitrine",
    price: "100 000",
    originalPrice: "150 000",
    description: "Parfait pour démarrer",
    features: [
      "4 à 5 pages",
      "Design responsive",
      "Formulaire de contact",
      "Google Maps intégré",
      "SEO de base",
      "1 mois de support",
      "0 FCFA avant validation",
    ],
  },
  {
    name: "Restaurant / Boutique",
    price: "180 000",
    originalPrice: "250 000",
    description: "Notre offre la plus populaire",
    features: [
      "Menu en ligne dynamique",
      "Système de réservation",
      "Galerie photos",
      "Blog intégré",
      "Panier & commandes",
      "3 mois de support",
      "SEO inclus",
      "0 FCFA avant validation",
    ],
    highlight: true,
  },
  {
    name: "E-Commerce",
    price: "350 000",
    originalPrice: "500 000",
    description: "Pour vendre en ligne",
    features: [
      "Produits illimités",
      "Paiement sécurisé",
      "Gestion des stocks",
      "Emails automatiques",
      "Analytics avancé",
      "6 mois de support",
      "Intégration paiement mobile",
      "0 FCFA avant validation",
    ],
  },
  {
    name: "Sur Mesure",
    price: "Sur devis",
    description: "Pour vos besoins spécifiques",
    features: [
      "Toutes les fonctionnalités",
      "Infrastructure complète",
      "API personnalisée",
      "Intégrations tierces",
      "Support prioritaire",
      "1 an de maintenance",
      "Audit SEO complet",
      "0 FCFA avant validation",
    ],
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-28 bg-[#f8fafc]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-2xl text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-foreground/5 text-foreground text-xs font-semibold uppercase tracking-widest mb-4">
            Tarifs
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Tarifs transparents
          </h2>
          <p className="mt-5 text-lg text-muted max-w-xl mx-auto">
            Paiement après validation. Zéro risque. Zéro frais cachés.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-xl p-6 transition-all ${
                plan.highlight
                  ? "border-2 border-foreground bg-foreground text-white shadow-xl"
                  : "border border-border bg-white hover:border-foreground/30 hover:shadow-md"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-block px-3 py-1 rounded-full bg-accent text-white text-xs font-bold tracking-wider uppercase">
                    Populaire
                  </span>
                </div>
              )}

              <div className="mb-5">
                <h3 className={`text-sm font-bold ${plan.highlight ? "text-white" : "text-foreground"}`}>
                  {plan.name}
                </h3>
                <p className={`mt-1 text-xs ${plan.highlight ? "text-white/70" : "text-muted"}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className={`text-3xl font-black ${plan.highlight ? "text-white" : "text-foreground"}`}>
                    {plan.price}
                  </span>
                  {plan.originalPrice && (
                    <span className={`text-xs ${plan.highlight ? "text-white/60" : "text-muted"}`}>FCFA</span>
                  )}
                </div>
                {plan.originalPrice && (
                  <span className={`text-xs line-through ${plan.highlight ? "text-white/40" : "text-muted/50"}`}>
                    {plan.originalPrice} FCFA
                  </span>
                )}
              </div>

              <ul className="space-y-2.5 flex-1 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-xs">
                    <svg
                      className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${plan.highlight ? "text-white/70" : "text-foreground/60"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className={plan.highlight ? "text-white/85" : "text-muted"}>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://wa.me/22955530826"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full rounded-lg py-3 text-center text-xs font-bold transition-all ${
                  plan.highlight
                    ? "bg-white text-foreground hover:bg-white/90"
                    : "bg-foreground text-white hover:bg-foreground/90"
                }`}
              >
                Commencer
              </a>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-border bg-white p-6 text-center">
          <p className="text-sm text-muted">
            Une question sur les tarifs ?{" "}
            <a
              href="https://wa.me/22955530826"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground font-semibold hover:underline"
            >
              Contactez-nous sur WhatsApp
            </a>{" "}
            — réponse en moins d&apos;une heure.
          </p>
        </div>

      </div>
    </section>
  )
}
