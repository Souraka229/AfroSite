import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
                A
              </div>
              <span className="text-xl font-bold text-foreground">AfroSite</span>
            </Link>
            <p className="mt-4 text-sm text-muted max-w-md">
              Agence web africaine specialisee dans la creation de sites web professionnels. Nous aidons les entreprises a reussir leur transformation digitale.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Services</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="#" className="text-sm text-muted hover:text-foreground transition-colors">
                  Creation de sites web
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted hover:text-foreground transition-colors">
                  E-commerce
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted hover:text-foreground transition-colors">
                  Applications web
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Contact</h3>
            <ul className="mt-4 space-y-3">
              <li className="text-sm text-muted">contact@afrosite.com</li>
              <li className="text-sm text-muted">+229 XX XX XX XX</li>
              <li className="text-sm text-muted">Cotonou, Benin</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted">
            &copy; {new Date().getFullYear()} AfroSite. Tous droits reserves.
          </p>
        </div>
      </div>
    </footer>
  )
}
