import { put } from "@vercel/blob"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const projetId = formData.get("projetId") as string

    if (!file || !projetId) {
      return Response.json(
        { error: "Fichier ou projet manquant" },
        { status: 400 }
      )
    }

    // Upload to Vercel Blob
    const blob = await put(
      `sites/${projetId}/${file.name}`,
      file,
      { access: "public" }
    )

    // Save file reference in Supabase
    const supabase = await createClient()
    await supabase.from("fichiers").insert({
      projet_id: projetId,
      nom: file.name,
      type: file.name.split(".").pop() || "file",
      contenu: blob.url,
      taille: file.size,
      blob_url: blob.url,
    })

    return Response.json({
      success: true,
      url: blob.url,
      fileName: file.name,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return Response.json(
      { error: "Erreur lors de l'upload" },
      { status: 500 }
    )
  }
}
