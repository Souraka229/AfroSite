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
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Pourquoi nous choisir?
          </h2>
          <p className="mt-4 text-base text-muted text-pretty">
            Nous ne sommes pas juste des développeurs, nous sommes vos partenaires de succès.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="rounded border border-border bg-white p-8 hover:shadow-md transition-all"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded bg-foreground text-white font-bold">
                ✓
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">{reason.title}</h3>
              <p className="mt-2 text-xs text-muted leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
