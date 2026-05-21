import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { projectId } = await request.json()

    if (!projectId) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Get project details
    const { data: project, error: projectError } = await supabase
      .from('projets')
      .select('*')
      .eq('id', projectId)
      .single()

    if (projectError || !project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    // Generate share token (use project ID directly as simple token)
    const shareToken = projectId
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_APP_URL || 'https://afrosite-nu.vercel.app'

    const previewUrl = `${baseUrl}/preview/${projectId}`
    const shortUrl = `/preview/${projectId}`

    return NextResponse.json({
      projectId,
      projectName: project.nom,
      previewUrl,
      shortUrl,
      fullUrl: previewUrl,
    })
  } catch (error) {
    console.error('Error creating share:', error)
    return NextResponse.json(
      { error: 'Failed to create share link' },
      { status: 500 }
    )
  }
}
