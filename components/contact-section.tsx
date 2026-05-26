export function ContactSection() {
  return (
    <section id="contact" className="py-28 bg-[#f8fafc]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-2xl text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-foreground/5 text-foreground text-xs font-semibold uppercase tracking-widest mb-4">
            Contact
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Démarrons votre projet
          </h2>
          <p className="mt-5 text-lg text-muted max-w-xl mx-auto">
            Décrivez votre projet et recevez un devis personnalisé sous 24h.
          </p>
        </div>

        <div className="mx-auto max-w-lg">
          <div className="rounded-2xl border border-border bg-white p-8 sm:p-10 shadow-sm">
            <form className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="nom" className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    className="block w-full rounded-lg border border-border bg-[#f8fafc] px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:border-foreground/40 focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-colors"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="block w-full rounded-lg border border-border bg-[#f8fafc] px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:border-foreground/40 focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-colors"
                    placeholder="vous@exemple.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="sujet" className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                  Type de projet
                </label>
                <input
                  type="text"
                  id="sujet"
                  name="sujet"
                  className="block w-full rounded-lg border border-border bg-[#f8fafc] px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:border-foreground/40 focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-colors"
                  placeholder="Site vitrine, e-commerce, application..."
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="block w-full resize-none rounded-lg border border-border bg-[#f8fafc] px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:border-foreground/40 focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-colors"
                  placeholder="Décrivez votre projet, vos objectifs..."
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-foreground text-white px-6 py-3.5 text-sm font-bold hover:bg-foreground/90 transition-all"
              >
                Envoyer le message
              </button>
            </form>

            <div className="mt-7 pt-7 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-muted">Réponse garantie sous 24h</p>
              <a
                href="https://wa.me/22955530826"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-foreground hover:underline"
              >
                Ou directement sur WhatsApp →
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
