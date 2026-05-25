import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-display"
})

export const metadata: Metadata = {
  title: 'AfroSite | Agence Digitale Premium au Benin',
  description: 'AfroSite est votre partenaire digital de confiance au Benin. Developpement web, design UI/UX, cybersecurite. Transformez votre vision en realite numerique.',
  keywords: ['agence digitale', 'benin', 'developpement web', 'design UI/UX', 'cybersecurite', 'afrique'],
  authors: [{ name: 'AfroSite Team' }],
  openGraph: {
    title: 'AfroSite | Agence Digitale Premium',
    description: 'Votre partenaire digital de confiance en Afrique',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${spaceGrotesk.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
