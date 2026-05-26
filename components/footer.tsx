import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <span className="text-base font-bold text-foreground">AfroSite</span>
            <p className="mt-3 text-sm text-muted max-w-sm leading-relaxed">
              Agence de création de sites web professionnels au Bénin. Tous types de projets. Paiement après satisfaction garantie.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-widest mb-4">Navigation</h3>
            <ul className="space-y-2.5">
              {[
                { label: "Services", href: "#services" },
                { label: "Tarifs", href: "#pricing" },
                { label: "Équipe", href: "#experts" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-xs text-muted hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-widest mb-4">Contact</h3>
            <ul className="space-y-2.5">
              <li>
                <a href="https://wa.me/22955530826" target="_blank" rel="noopener noreferrer" className="text-xs text-muted hover:text-foreground transition-colors">
                  WhatsApp +229 55 53 08 26
                </a>
              </li>
              <li>
                <a href="mailto:contact@afrosite.bj" className="text-xs text-muted hover:text-foreground transition-colors">
                  contact@afrosite.bj
                </a>
              </li>
              <li>
                <span className="text-xs text-muted">Cotonou, Bénin</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-8">
          <p className="text-center text-xs text-muted">
            © {new Date().getFullYear()} AfroSite Agency — Tous droits réservés.
          </p>
        </div>

      </div>
    </footer>
  )
}
