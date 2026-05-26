import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-[#060d1a] overflow-hidden flex items-center">
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Glow orbs */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute -bottom-40 left-1/3 w-[400px] h-[400px] rounded-full bg-primary/8 blur-[100px]" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#060d1a] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="mx-auto max-w-4xl text-center">

          {/* Badge */}
          <div className="mb-10 flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Agence Web — Bénin
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tight text-white leading-[0.95] mb-8">
            Votre site web
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-300 to-blue-400">
              livré en 2-4 sem.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-14 leading-relaxed">
            Vous ne payez qu&apos;après validation complète.{" "}
            <span className="text-foreground font-medium">Zéro avance. Révisions illimitées.</span>{" "}
            Des sites modernes qui génèrent des clients.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-10 sm:gap-16 mb-14">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-primary">50+</div>
              <p className="text-xs text-muted mt-1 uppercase tracking-wider">Projets livrés</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-primary">100%</div>
              <p className="text-xs text-muted mt-1 uppercase tracking-wider">Satisfaction</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-primary">0 FCFA</div>
              <p className="text-xs text-muted mt-1 uppercase tracking-wider">Avant validation</p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/22955530826?text=Bonjour,%20j'aimerais%20discuter%20de%20mon%20projet%20web"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-base hover:bg-primary/90 transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] active:scale-95"
            >
              Démarrer mon projet
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
            <Link
              href="#pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/15 text-foreground font-semibold text-base hover:border-primary/50 hover:bg-white/5 transition-all"
            >
              Voir les tarifs
            </Link>
          </div>

          {/* Feature pills */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
            {["Sans avance", "Révisions illimitées", "Livraison rapide", "Support inclus"].map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/8 text-xs text-muted"
              >
                <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
        <span className="text-xs text-muted/60 uppercase tracking-widest">Découvrir</span>
        <svg className="w-4 h-4 text-muted/40 animate-bounce" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </section>
  )
}
