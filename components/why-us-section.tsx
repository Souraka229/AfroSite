const reasons = [
  {
    title: "Paiement après validation",
    description: "Zéro avance, zéro risque. Vous payez seulement quand le résultat vous satisfait. C'est vous qui décidez.",
  },
  {
    title: "Révisions illimitées",
    description: "Pas satisfait d'un détail ? On modifie sans limite jusqu'à ce que ce soit parfait.",
  },
  {
    title: "Livraison en 2-4 semaines",
    description: "Rapides, efficaces et respectueux des délais. Votre site en ligne sans attente interminable.",
  },
  {
    title: "Équipe expérimentée",
    description: "Nos experts comprennent votre secteur. Nous créons des sites pensés pour convertir.",
  },
  {
    title: "Support post-livraison",
    description: "Support gratuit inclus les premiers mois. Maintenance mensuelle très abordable au-delà.",
  },
  {
    title: "Aucune limite de projet",
    description: "Restaurants, e-commerce, SaaS, ONG, portfolios — tout type de site, toute complexité.",
  },
]

export function WhyUsSection() {
  return (
    <section className="py-32 bg-[#070f1e]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full border border-primary/30 text-primary text-xs font-semibold uppercase tracking-widest mb-5">
            Pourquoi nous
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Votre partenaire de confiance
          </h2>
          <p className="mt-5 text-lg text-muted max-w-xl mx-auto leading-relaxed">
            Nous ne sommes pas de simples développeurs — nous sommes investis dans le succès de votre activité.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="group relative flex flex-col rounded-xl border border-white/7 bg-[#0c1628] p-7 hover:border-primary/30 hover:bg-[#0d1a30] transition-all duration-300"
            >
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20 bg-primary/5 text-primary text-sm font-bold">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="text-base font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {reason.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed flex-1">{reason.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
