import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-white via-white to-slate-50 pt-40 pb-32 sm:pt-48 sm:pb-40 lg:pt-56 lg:pb-48">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              Agence Web au Bénin
            </span>
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl xl:text-8xl text-balance leading-tight">
            Votre site web.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
              Zéro avance. Vous payez après validation.
            </span>
          </h1>

          <p className="mt-12 text-lg sm:text-xl text-muted leading-relaxed max-w-2xl mx-auto">
            Agence web professionnelle spécialisée dans la création de sites modernes pour restaurants, traders, boutiques et entreprises au Bénin.
          </p>

          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/22955530826"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-black text-white px-8 py-3.5 text-base font-semibold rounded-lg hover:bg-gray-900 transition-all hover:shadow-lg"
            >
              Démarrer sur WhatsApp
            </a>
            <Link
              href="#pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center border-2 border-foreground bg-transparent text-foreground px-8 py-3 text-base font-semibold rounded-lg hover:bg-foreground hover:text-white transition-all"
            >
              Voir les tarifs
            </Link>
          </div>

          <div className="mt-20 pt-12 border-t border-border">
            <div className="grid grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-foreground">0 FCFA</div>
                <p className="mt-2 text-sm text-muted">Vous payez après validation</p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-foreground">5.0</div>
                <p className="mt-2 text-sm text-muted">Note / 5</p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-foreground">∞</div>
                <p className="mt-2 text-sm text-muted">Révisions incluses</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
