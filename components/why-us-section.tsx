export function WhyUsSection() {
  const reasons = [
    {
      title: "Paiement après validation",
      description: "Zéro avance, zéro risque. Vous payez seulement quand vous êtes satisfait. C'est VOUS qui décidez."
    },
    {
      title: "Révisions illimitées",
      description: "Pas satisfait? On modifie jusqu'à ce que ce soit parfait. Pas de limite de révisions."
    },
    {
      title: "Livraison rapide",
      description: "2 à 4 semaines. Nous sommes rapides, efficaces et nous respectons les délais."
    },
    {
      title: "Équipe expérimentée",
      description: "Nos experts comprennent votre métier. Nous créons des sites qui convertissent."
    },
    {
      title: "Support inclus",
      description: "Après livraison, vous avez du support gratuit. Au-delà, maintenance très abordable."
    },
    {
      title: "Tous les types de sites",
      description: "Restaurants, traders, boutiques, applications custom — aucune limitation. Si tu peux le rêver, nous le créons."
    }
  ]

  return (
    <section className="py-32 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            POURQUOI NOUS
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
            Partenaires de votre succès
          </h2>
          <p className="mt-6 text-lg text-muted text-pretty max-w-xl mx-auto">
            Nous ne sommes pas juste des développeurs, nous comprenons votre métier et créons des sites qui convertissent.
          </p>
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="group relative flex flex-col rounded-xl border border-border bg-white p-8 hover:border-primary/50 hover:shadow-lg transition-all hover:scale-105"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-white font-bold text-xl">
                {index + 1}
              </div>
              <h3 className="mt-6 text-lg font-semibold text-foreground">{reason.title}</h3>
              <p className="mt-3 text-sm text-muted leading-relaxed flex-1">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
