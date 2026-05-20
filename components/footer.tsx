import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-lg font-bold text-foreground">AfroSite</h2>
            <p className="mt-4 text-sm text-muted max-w-md">
              Agence de création de sites web professionnels au Bénin. Tous types de projets. Paiement après satisfaction garantie.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Navigation</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-xs text-muted hover:text-foreground transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-xs text-muted hover:text-foreground transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-xs text-muted hover:text-foreground transition-colors">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-xs text-muted hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="https://wa.me/22955530826" target="_blank" rel="noopener noreferrer" className="text-xs text-muted hover:text-foreground transition-colors">
                  WhatsApp +229 55 53 08 26
                </a>
              </li>
              <li className="text-xs text-muted">contact@afrosite.bj</li>
              <li className="text-xs text-muted">Cotonou, Bénin 🇧🇯</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-xs text-muted">
            © {new Date().getFullYear()} AfroSite Agency — Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
