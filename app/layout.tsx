import type { Metadata } from "next"
import "./globals.css"
import { ScrollAnimations } from "@/components/scroll-animations"

export const metadata: Metadata = {
  title: "AfroSite - Agence Web Africaine",
  description: "AfroSite est une agence web spécialisée dans la création de sites web professionnels pour les entreprises au Bénin.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="h-full antialiased bg-background">
      <body className="min-h-full flex flex-col">
        {children}
        <ScrollAnimations />
      </body>
    </html>
  )
}
