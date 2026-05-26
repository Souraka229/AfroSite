import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(to right, #e2e8f0 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="mx-auto max-w-4xl text-center">

          {/* Badge */}
          <div className="mb-8 flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-secondary text-xs font-semibold text-muted uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Agence Web — Bénin
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-foreground leading-[1.0] mb-7">
            Votre site web
            <br />
            <span className="text-accent">livré en 2-4 sem.</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-12 leading-relaxed">
            Vous ne payez qu&apos;après validation complète.{" "}
            <strong className="text-foreground font-semibold">Zéro avance. Révisions illimitées.</strong>{" "}
            Des sites modernes qui génèrent des clients.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="https://wa.me/22955530826?text=Bonjour,%20j'aimerais%20discuter%20de%20mon%20projet%20web"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-foreground text-white font-bold text-sm hover:bg-foreground/90 transition-all active:scale-95"
            >
              Démarrer mon projet
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
            <Link
              href="#pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-border text-foreground font-semibold text-sm hover:border-foreground transition-all"
            >
              Voir les tarifs
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-10 sm:gap-16">
            <div className="text-center">
              <div className="text-3xl font-black text-foreground">50+</div>
              <p className="text-xs text-muted mt-1 uppercase tracking-wider">Projets livrés</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <div className="text-3xl font-black text-foreground">100%</div>
              <p className="text-xs text-muted mt-1 uppercase tracking-wider">Satisfaction</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <div className="text-3xl font-black text-foreground">0 F</div>
              <p className="text-xs text-muted mt-1 uppercase tracking-wider">Avant validation</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
