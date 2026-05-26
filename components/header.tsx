import Link from "next/link"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-1">
          <span className="text-base font-bold text-foreground">AfroSite</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="#services" className="text-xs font-medium text-muted hover:text-foreground transition-colors uppercase tracking-widest">
            Services
          </Link>
          <Link href="#pricing" className="text-xs font-medium text-muted hover:text-foreground transition-colors uppercase tracking-widest">
            Tarifs
          </Link>
          <Link href="#experts" className="text-xs font-medium text-muted hover:text-foreground transition-colors uppercase tracking-widest">
            Equipe
          </Link>
          <Link href="#contact" className="text-xs font-medium text-muted hover:text-foreground transition-colors uppercase tracking-widest">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/22955530826"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline text-xs font-medium text-muted hover:text-foreground transition-colors"
          >
            +229 55 53 08 26
          </a>
          <a
            href="https://wa.me/22955530826?text=Bonjour%2C%20j%27aimerais%20discuter%20de%20mon%20projet%20web"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold bg-foreground text-white hover:bg-foreground/90 transition-colors"
          >
            Démarrer
          </a>
        </div>
      </div>
    </header>
  )
}
