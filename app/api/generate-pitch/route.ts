import { NextRequest, NextResponse } from 'next/server'
import { Anthropic } from '@anthropic-ai/sdk'

const client = new Anthropic()

export async function POST(request: NextRequest) {
  try {
    const { projectName, description, category, clientName } = await request.json()

    if (!projectName || !clientName) {
      return NextResponse.json(
        { error: 'Project name and client name are required' },
        { status: 400 }
      )
    }

    const prompt = `Tu es un expert en marketing et en communication digitale.

Un projet web vient d'être complété. Génère un message WhatsApp court (max 2-3 phrases) et enthousiaste pour l'entreprise cliente pour lui annoncer que son site est prêt et fonctionnel.

Le message doit:
- Être court et percutant
- Exprimer la qualité du travail
- Inviter à visiter le site
- Être amical et professionnel
- Inclure un emoji pertinent

Détails du projet:
- Nom du projet: ${projectName}
- Client: ${clientName}
- Catégorie: ${category || 'Site Web'}
- Description: ${description || 'Site web professionnel'}

Réponds UNIQUEMENT avec le message WhatsApp, sans explications supplémentaires.`

    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 200,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type')
    }

    const whatsappMessage = content.text.trim()
    const whatsappUrl = `https://wa.me/22955530826?text=${encodeURIComponent(whatsappMessage)}`

    return NextResponse.json({
      message: whatsappMessage,
      whatsappUrl,
      clientName,
      projectName,
    })
  } catch (error) {
    console.error('Error generating pitch:', error)
    return NextResponse.json(
      { error: 'Failed to generate message' },
      { status: 500 }
    )
  }
}
