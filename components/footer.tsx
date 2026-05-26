import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#060d1a]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-1 mb-4">
              <span className="text-base font-bold text-foreground">Afro</span>
              <span className="text-base font-bold text-primary">Site</span>
            </div>
            <p className="text-sm text-muted max-w-sm leading-relaxed">
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
                <a
                  href="https://wa.me/22955530826"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted hover:text-primary transition-colors"
                >
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

        <div className="mt-10 border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} AfroSite Agency — Tous droits réservés.
          </p>
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted">Fait avec</span>
            <span className="text-xs text-primary font-medium">passion</span>
            <span className="text-xs text-muted">au Bénin</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
