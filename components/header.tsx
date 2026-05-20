import Link from "next/link"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
            A
          </div>
          <span className="text-xl font-bold text-foreground">AfroSite</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#services" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
            Services
          </Link>
          <Link href="#experts" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
            Experts
          </Link>
          <Link href="#contact" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/auth/login"
            className="hidden sm:inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-muted hover:text-foreground transition-colors"
          >
            Connexion
          </Link>
          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Espace Admin
          </Link>
        </div>
      </div>
    </header>
  )
}
