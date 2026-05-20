import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params

    const supabase = await createClient()

    // Get share link with fichier details
    const { data: share, error: shareError } = await supabase
      .from("fichier_shares")
      .select("*, fichiers(*)")
      .eq("token", token)
      .single()

    if (shareError || !share) {
      return NextResponse.json(
        { error: "Lien de partage non trouvé ou expiré" },
        { status: 404 }
      )
    }

    // Check if share link is expired
    if (share.expires_at && new Date(share.expires_at) < new Date()) {
      return NextResponse.json(
        { error: "Lien de partage expiré" },
        { status: 403 }
      )
    }

    return NextResponse.json({
      success: true,
      data: share,
    })
  } catch (error) {
    console.error("Error fetching share:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération du fichier" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params

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

    // Delete share link
    const { error } = await supabase
      .from("fichier_shares")
      .delete()
      .eq("token", token)

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Lien de partage supprimé",
    })
  } catch (error) {
    console.error("Error deleting share:", error)
    return NextResponse.json(
      { error: "Erreur lors de la suppression du lien" },
      { status: 500 }
    )
  }
}
