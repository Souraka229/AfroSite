import { updateSession } from '@/lib/supabase/middleware'
import { getSecurityHeaders, checkRateLimit } from '@/lib/security'
import { type NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  // Vérifier rate limiting
  const ip = request.headers.get('x-forwarded-for') || 'unknown'
  if (!checkRateLimit(ip, 1000, 60000)) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    )
  }

  // Mettre à jour la session
  let response = await updateSession(request)

  // Ajouter les headers de sécurité
  const securityHeaders = getSecurityHeaders()
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  // Empêcher l'accès aux chemins sensibles
  const pathname = request.nextUrl.pathname

  // Bloquer les chemins dangereux
  if (
    pathname.includes('cgi-bin') ||
    pathname.includes('.env') ||
    pathname.includes('wp-admin') ||
    pathname.includes('phpmyadmin') ||
    pathname.match(/\/\.|\.env|\.git/)
  ) {
    return NextResponse.json(
      { error: 'Forbidden' },
      { status: 403 }
    )
  }

  // Désactiver les redirects automatiques vers cgi-bin et autres chemins suspects
  if (pathname.endsWith('/') === false && request.method === 'GET') {
    const url = request.nextUrl.clone()
    if (!pathname.includes('.')) {
      // N'ajouter pas de slash automatiquement - évite les redirects 308
      return response
    }
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
