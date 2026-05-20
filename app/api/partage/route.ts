import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fichier_id, nom } = body

    if (!fichier_id || !nom) {
      return NextResponse.json(
        { error: "fichier_id et nom sont requis" },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    
    // Check if user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      )
    }

    // Generate unique token
    const token = crypto.randomBytes(32).toString("hex")

    // Create share link
    const { data, error } = await supabase
      .from("fichier_shares")
      .insert({
        fichier_id,
        nom,
        token,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/partage/${token}`

    return NextResponse.json({
      success: true,
      share_link: shareUrl,
      token,
      data,
    })
  } catch (error) {
    console.error("Error creating share link:", error)
    return NextResponse.json(
      { error: "Erreur lors de la création du lien" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const supabase = await createClient()

    // Check if user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      )
    }

    // Get all share links
    const { data, error } = await supabase
      .from("fichier_shares")
      .select("*, fichiers(*)")
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error) {
    console.error("Error fetching share links:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération des liens" },
      { status: 500 }
    )
  }
}
