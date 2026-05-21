import { createClient } from "@/lib/supabase/server"

function generateSlugFromName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
    .substring(0, 50)
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  try {
    const supabase = await createClient()

    // Fetch all projects and find by slug
    const { data: projets, error: projetsError } = await supabase
      .from("projets")
      .select("id, nom")

    if (projetsError || !projets) {
      return new Response("Projet non trouvé", { status: 404 })
    }

    // Find project where generated slug matches
    const projet = projets.find(
      (p) => generateSlugFromName(p.nom) === slug
    )

    if (!projet) {
      return new Response("Projet non trouvé", { status: 404 })
    }

    // Fetch HTML files for this project
    const { data: fichiers, error: fichiersError } = await supabase
      .from("fichiers")
      .select("*")
      .eq("projet_id", projet.id)
      .in("type", ["html"])
      .order("nom", { ascending: true })

    if (fichiersError || !fichiers || fichiers.length === 0) {
      return new Response("Aucun fichier HTML trouvé", { status: 404 })
    }

    // Get index.html if it exists, otherwise get the first HTML file
    const indexFile = fichiers.find((f) => f.nom.toLowerCase() === "index.html")
    const htmlFile = indexFile || fichiers[0]

    if (!htmlFile.contenu) {
      return new Response("Contenu du fichier vide", { status: 500 })
    }

    // Serve HTML as-is
    return new Response(htmlFile.contenu, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    })
  } catch (error) {
    console.error("Erreur API site-by-slug:", error)
    return new Response("Erreur serveur", { status: 500 })
  }
}
