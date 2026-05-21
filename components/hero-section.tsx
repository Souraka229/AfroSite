import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden pt-20 pb-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/50 text-primary text-sm font-semibold">
              <span className="inline-block w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              Agence Web Premium au Bénin
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-tight mb-6">
            Votre Site Web
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary animate-gradient">
              Sans Risque
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-2xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-8">
            Zéro avance. Révisions illimitées. Vous ne payez que quand c'est parfait.
            <br />
            <span className="text-primary font-semibold">Sites modernes qui convertissent.</span>
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span className="text-gray-300">Plus de 50 clients satisfaits</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <span className="text-gray-300">Note 5.0/5</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🚀</span>
              <span className="text-gray-300">Livraison en 2-4 semaines</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="https://wa.me/22955530826?text=Bonjour,%20j'aimerais%20discuter%20de%20mon%20projet%20web"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full sm:w-auto inline-flex items-center justify-center bg-gradient-to-r from-primary to-blue-600 text-white px-10 py-4 text-lg font-bold rounded-xl hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative flex items-center gap-2">
                💬 Démarrer sur WhatsApp
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </a>

            <Link
              href="#pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center border-2 border-gray-600 hover:border-primary text-white px-10 py-4 text-lg font-bold rounded-xl hover:bg-white/5 transition-all duration-300"
            >
              Voir les Tarifs
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-12 border-t border-gray-700">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-black text-primary mb-2">0 FCFA</div>
              <p className="text-sm text-gray-400">Avant validation</p>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-black text-primary mb-2">50+</div>
              <p className="text-sm text-gray-400">Projets livrés</p>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-black text-primary mb-2">∞</div>
              <p className="text-sm text-gray-400">Révisions incluses</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-gray-500 text-sm">Découvrez nos services</span>
        <svg className="w-6 h-6 text-primary animate-bounce" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
