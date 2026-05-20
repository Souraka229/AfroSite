import Link from "next/link"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-bold text-foreground tracking-tight">AfroSite</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#services" className="text-xs font-medium text-muted hover:text-foreground transition-colors uppercase tracking-wider">
            Services
          </Link>
          <Link href="#experts" className="text-xs font-medium text-muted hover:text-foreground transition-colors uppercase tracking-wider">
            Nos Experts
          </Link>
          <Link href="#contact" className="text-xs font-medium text-muted hover:text-foreground transition-colors uppercase tracking-wider">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/22955530826"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center text-xs font-medium text-muted hover:text-foreground transition-colors"
          >
            WhatsApp
          </a>
          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center rounded px-3 py-2 text-xs font-medium bg-foreground text-white hover:bg-black transition-colors"
          >
            Admin
          </Link>
        </div>
      </div>
    </header>
  )
}
