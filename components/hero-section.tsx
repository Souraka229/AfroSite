import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative bg-white pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl text-balance leading-tight">
            Votre site web.
            <br />
            <span className="text-muted">Vous payez seulement si vous êtes satisfait.</span>
          </h1>
          <p className="mt-8 text-lg text-muted leading-relaxed max-w-xl mx-auto">
            Agence web professionnelle au Bénin. Restaurants, traders, boutiques, entreprises — nous créons tout genre de site. Zéro risque, zéro avance.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/22955530826"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-black text-white px-8 py-3 text-base font-medium hover:bg-gray-900 transition-colors"
            >
              Démarrer sur WhatsApp
            </a>
            <Link
              href="#pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center border border-border bg-white text-foreground px-8 py-3 text-base font-medium hover:bg-secondary transition-colors"
            >
              Voir les tarifs
            </Link>
          </div>
          <div className="mt-12 pt-8 border-t border-border">
            <div className="grid grid-cols-3 gap-4 sm:gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">0 FCFA</div>
                <p className="mt-1 text-xs text-muted">vous payez avant validation du site</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">5.0</div>
                <p className="mt-1 text-xs text-muted">Note / 5</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">∞</div>
                <p className="mt-1 text-xs text-muted">Révisions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
