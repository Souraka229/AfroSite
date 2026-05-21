import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * Middleware de sécurité stricte pour les routes admin
 * - Vérification d'authentification
 * - Validation des sessions
 * - Rate limiting
 * - Headers de sécurité
 */

export async function verifyAdminAuth(request: NextRequest) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return {
        authenticated: false,
        user: null,
        error: 'Unauthorized',
      }
    }

    // Vérifier que l'utilisateur a un email enregistré
    if (!user.email) {
      return {
        authenticated: false,
        user: null,
        error: 'Invalid user',
      }
    }

    return {
      authenticated: true,
      user,
      error: null,
    }
  } catch (error) {
    return {
      authenticated: false,
      user: null,
      error: 'Auth verification failed',
    }
  }
}

/**
 * Headers de sécurité pour toutes les réponses
 */
export function getSecurityHeaders() {
  return {
    // Protection XSS
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',

    // HSTS - Forcer HTTPS
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',

    // CSP - Content Security Policy
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://*.supabase.co https://api.vercel.com",

    // Referrer Policy
    'Referrer-Policy': 'strict-origin-when-cross-origin',

    // Permissions Policy
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',

    // CORS
    'Access-Control-Allow-Credentials': 'true',
  }
}

/**
 * Rate limiting simple (à implémenter avec Redis en production)
 */
const requestCounts = new Map<string, { count: number; resetTime: number }>()

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 100,
  windowMs: number = 60000 // 1 minute
): boolean {
  const now = Date.now()
  const record = requestCounts.get(identifier)

  if (!record || now > record.resetTime) {
    requestCounts.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    })
    return true
  }

  if (record.count >= maxRequests) {
    return false
  }

  record.count++
  return true
}

/**
 * Sanitizer pour les inputs
 */
export function sanitizeInput(input: string): string {
  if (!input) return ''

  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim()
    .slice(0, 500) // Limit length
}

/**
 * Validation d'email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length < 255
}

/**
 * Validation de URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}
