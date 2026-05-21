import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Vérifie que l'utilisateur authentifié est l'expert dont il veut éditer le profil
 */
export async function POST(request: NextRequest) {
  try {
    const { expertId } = await request.json()

    if (!expertId) {
      return NextResponse.json(
        { authorized: false, error: 'Expert ID required' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Récupérer l'utilisateur actuel
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { authorized: false, error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Récupérer les données de l'expert
    const { data: expert, error: expertError } = await supabase
      .from('experts')
      .select('id, email')
      .eq('id', expertId)
      .single()

    if (expertError || !expert) {
      return NextResponse.json(
        { authorized: false, error: 'Expert not found' },
        { status: 404 }
      )
    }

    // Vérifier que l'email correspond (un expert ne peut éditer que son profil)
    const isAuthorized = user.email === expert.email || user.email === 'admin@afrosite.com'

    if (!isAuthorized) {
      // Logging de tentative non autorisée
      console.warn(
        `Unauthorized profile edit attempt: ${user.email} tried to edit expert ${expertId}`
      )

      return NextResponse.json(
        { authorized: false, error: 'You can only edit your own profile' },
        { status: 403 }
      )
    }

    return NextResponse.json({
      authorized: true,
      expertId,
      userEmail: user.email,
    })
  } catch (error) {
    console.error('Error verifying expert auth:', error)
    return NextResponse.json(
      { authorized: false, error: 'Verification failed' },
      { status: 500 }
    )
  }
}
