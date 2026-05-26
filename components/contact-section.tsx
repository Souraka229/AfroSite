export function ContactSection() {
  return (
    <section id="contact" className="py-32 bg-[#060d1a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full border border-primary/30 text-primary text-xs font-semibold uppercase tracking-widest mb-5">
            Contact
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Prêt à lancer votre projet ?
          </h2>
          <p className="mt-5 text-lg text-muted max-w-xl mx-auto leading-relaxed">
            Décrivez votre projet et recevez un devis personnalisé sous 24h.
          </p>
        </div>

        <div className="mx-auto max-w-lg">
          <div className="rounded-2xl border border-white/7 bg-[#0c1628] p-8 sm:p-10">
            <form className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="nom" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    className="block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
                    placeholder="vous@exemple.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="sujet" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                  Type de projet
                </label>
                <input
                  type="text"
                  id="sujet"
                  name="sujet"
                  className="block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
                  placeholder="Site vitrine, e-commerce, application..."
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="block w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
                  placeholder="Décrivez votre projet, vos objectifs..."
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-primary text-primary-foreground px-6 py-3.5 text-sm font-bold hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(34,211,238,0.25)] transition-all"
              >
                Envoyer le message
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-white/7 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-muted">Réponse garantie sous 24h</p>
              <a
                href="https://wa.me/22955530826"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Ou écrivez-nous sur WhatsApp
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
