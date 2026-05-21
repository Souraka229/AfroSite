export function ContactSection() {
  return (
    <section id="contact" className="py-32 bg-gradient-to-br from-foreground to-foreground/95 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-semibold mb-4">
            CONTACT
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl text-balance">
            Prêt à lancer votre projet?
          </h2>
          <p className="mt-6 text-lg text-white/80 text-pretty max-w-xl mx-auto">
            Contactez-nous pour discuter de votre projet et obtenir un devis personnalisé. Réponse en 24h.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-lg">
          <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-8 sm:p-10">
            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="nom" className="block text-sm font-medium text-white">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    className="mt-2 block w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-white placeholder:text-white/60 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/30"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-2 block w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-white placeholder:text-white/60 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/30"
                    placeholder="vous@exemple.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="sujet" className="block text-sm font-medium text-white">
                  Sujet
                </label>
                <input
                  type="text"
                  id="sujet"
                  name="sujet"
                  className="mt-2 block w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-white placeholder:text-white/60 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/30"
                  placeholder="Site vitrine, e-commerce..."
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-2 block w-full resize-none rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-white placeholder:text-white/60 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/30"
                  placeholder="Décrivez votre projet..."
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-white text-foreground px-6 py-3 text-base font-semibold hover:bg-white/90 transition-all hover:shadow-xl"
              >
                Envoyer le message
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-center text-sm text-white/80">
                💬 Préférez le chat directe?{" "}
                <a
                  href="https://wa.me/22955530826"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-white hover:underline"
                >
                  Contactez-nous sur WhatsApp
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
