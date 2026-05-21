import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden pt-20 pb-20">
      {/* Premium animated background */}
      <div className="absolute inset-0">
        {/* Grid background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23ffffff" fill-opacity="0.03"><path d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/></g></g></svg>')] opacity-50"></div>

        {/* Animated orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        <div className="mx-auto max-w-5xl text-center">
          {/* Premium badge */}
          <div className="mb-12 flex justify-center">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-1000"></div>
              <span className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black border border-primary/50 text-primary text-sm font-bold">
                <span className="inline-block w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                🏆 Agence Web Premium au Bénin
              </span>
            </div>
          </div>

          {/* Main heading with gradient */}
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tighter text-white leading-tight mb-8">
            Votre Site Web
            <br />
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary text-6xl sm:text-7xl lg:text-8xl">
              Sans Risque
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto mb-12 font-light">
            <span className="text-white font-semibold">Zéro avance.</span> Vous ne payez que quand c'est parfait.
            <br />
            <span className="text-primary font-semibold">Sites modernes qui convertissent</span> et génèrent des ventes.
          </p>

          {/* Trust metrics */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-16 px-4">
            <div className="group">
              <div className="text-3xl sm:text-4xl font-black text-primary mb-2">50+</div>
              <p className="text-xs sm:text-sm text-gray-400 group-hover:text-white transition">Clients satisfaits</p>
            </div>
            <div className="group">
              <div className="text-3xl sm:text-4xl font-black text-primary mb-2">100%</div>
              <p className="text-xs sm:text-sm text-gray-400 group-hover:text-white transition">Taux de satisfaction</p>
            </div>
            <div className="group">
              <div className="text-3xl sm:text-4xl font-black text-primary mb-2">24/7</div>
              <p className="text-xs sm:text-sm text-gray-400 group-hover:text-white transition">Support réactif</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
            <a
              href="https://wa.me/22955530826?text=Bonjour,%20j'aimerais%20discuter%20de%20mon%20projet%20web"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full sm:w-auto"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-xl opacity-75 group-hover:opacity-100 blur transition duration-300"></div>
              <div className="relative px-12 py-4 bg-black rounded-xl flex items-center justify-center gap-3">
                <span className="text-xl">💬</span>
                <span className="text-white font-bold">Démarrer Maintenant</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </a>

            <Link
              href="#pricing"
              className="w-full sm:w-auto px-12 py-4 border-2 border-primary text-white font-bold rounded-xl hover:bg-primary/10 transition-all duration-300 text-center"
            >
              Voir les Tarifs
            </Link>
          </div>

          {/* Features preview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-sm">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-primary/50 transition">
              <span className="text-2xl">✅</span>
              <p className="text-gray-400 mt-2">Pas d'avance</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-primary/50 transition">
              <span className="text-2xl">♾️</span>
              <p className="text-gray-400 mt-2">Révisions</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-primary/50 transition">
              <span className="text-2xl">⚡</span>
              <p className="text-gray-400 mt-2">Rapide</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-primary/50 transition">
              <span className="text-2xl">🔒</span>
              <p className="text-gray-400 mt-2">Sécurisé</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-10 animate-pulse">
        <span className="text-gray-500 text-sm">Explorez nos services</span>
        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  )
}
