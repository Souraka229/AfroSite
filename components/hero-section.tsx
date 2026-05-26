import Link from "next/link"
import { StatCounter } from "@/components/stat-counter"

export function HeroSection() {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(to right, #e2e8f0 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="mx-auto max-w-4xl text-center">

          {/* Badge */}
          <div className="hero-line hero-line-1 mb-8 flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-[#f8fafc] text-xs font-semibold text-muted uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Agence Web — Bénin
            </span>
          </div>

          {/* Headline */}
          <div className="mb-7 overflow-hidden">
            <h1 className="hero-line hero-line-2 text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-foreground leading-[1.0]">
              Votre site web
            </h1>
            <h1 className="hero-line hero-line-3 text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-accent leading-[1.0]">
              livré en 2–4 sem.
            </h1>
          </div>

          {/* Subheading */}
          <p className="hero-line hero-line-4 text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-12 leading-relaxed">
            Vous ne payez qu&apos;après validation complète.{" "}
            <strong className="text-foreground font-semibold">Zéro avance. Révisions illimitées.</strong>{" "}
            Des sites modernes qui génèrent des clients.
          </p>

          {/* CTAs */}
          <div className="hero-line hero-line-5 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
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

          {/* Stats — animated counters */}
          <div className="hero-grid flex items-center justify-center gap-10 sm:gap-16">
            <div className="text-center">
              <div className="text-3xl font-black text-foreground">
                <StatCounter value={50} suffix="+" />
              </div>
              <p className="text-xs text-muted mt-1 uppercase tracking-wider">Projets livrés</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <div className="text-3xl font-black text-foreground">
                <StatCounter value={100} suffix="%" />
              </div>
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
