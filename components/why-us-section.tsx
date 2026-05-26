const reasons = [
  {
    title: "Paiement après validation",
    description: "Zéro avance, zéro risque. Vous payez seulement quand le résultat vous satisfait.",
  },
  {
    title: "Révisions illimitées",
    description: "On modifie sans limite jusqu'à ce que ce soit parfait. Aucun compromis.",
  },
  {
    title: "Livraison en 2-4 semaines",
    description: "Rapides et respectueux des délais. Votre site en ligne sans attente.",
  },
  {
    title: "Équipe expérimentée",
    description: "Nos experts comprennent votre secteur et créent des sites pensés pour convertir.",
  },
  {
    title: "Support post-livraison",
    description: "Support gratuit inclus les premiers mois. Maintenance abordable au-delà.",
  },
  {
    title: "Aucune limite de projet",
    description: "Restaurants, e-commerce, SaaS, ONG, portfolios — tout type de site.",
  },
]

export function WhyUsSection() {
  return (
    <section className="py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-2xl text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-foreground/5 text-foreground text-xs font-semibold uppercase tracking-widest mb-4">
            Pourquoi nous
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Votre partenaire de confiance
          </h2>
          <p className="mt-5 text-lg text-muted max-w-xl mx-auto">
            Nous ne sommes pas de simples développeurs — nous sommes investis dans votre succès.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="group flex gap-5 rounded-xl border border-border bg-white p-6 hover:border-foreground/20 hover:shadow-sm transition-all"
            >
              <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-lg bg-foreground/5 text-foreground text-xs font-bold">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground mb-1.5">{reason.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
