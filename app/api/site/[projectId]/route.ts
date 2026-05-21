import { createClient } from "@/lib/supabase/server"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const { projectId } = await params

  try {
    const supabase = await createClient()

    // Fetch the project to verify it exists
    const { data: projet, error: projetError } = await supabase
      .from("projets")
      .select("id, nom")
      .eq("id", projectId)
      .single()

    if (projetError || !projet) {
      return Response.json(
        { error: "Projet non trouvé" },
        { status: 404 }
      )
    }

    // Fetch HTML files for this project
    const { data: fichiers, error: fichiersError } = await supabase
      .from("fichiers")
      .select("*")
      .eq("projet_id", projectId)
      .in("type", ["html"])
      .order("nom", { ascending: true })

    if (fichiersError) {
      return Response.json(
        { error: "Erreur lors du chargement des fichiers" },
        { status: 500 }
      )
    }

    if (!fichiers || fichiers.length === 0) {
      return Response.json(
        { error: "Aucun fichier HTML trouvé" },
        { status: 404 }
      )
    }

    // Get index.html if it exists, otherwise get the first HTML file
    const indexFile = fichiers.find((f) => f.nom.toLowerCase() === "index.html")
    const htmlFile = indexFile || fichiers[0]

    if (!htmlFile.contenu) {
      return Response.json(
        { error: "Contenu du fichier vide" },
        { status: 500 }
      )
    }

    // Serve HTML as-is without modifications
    return new Response(htmlFile.contenu, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    })
  } catch (error) {
    console.error("Erreur API site:", error)
    return new Response("Erreur serveur", { status: 500 })
  }
}
