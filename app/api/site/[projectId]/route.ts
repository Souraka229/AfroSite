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

    // Sanitize HTML to prevent XSS attacks
    const sanitizedHtml = sanitizeHtml(htmlFile.contenu)

    return Response.json({ html: sanitizedHtml })
  } catch (error) {
    console.error("Erreur API site:", error)
    return Response.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

function sanitizeHtml(html: string): string {
  // Remove dangerous scripts that could compromise security
  let sanitized = html

  // Remove inline event handlers
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, "")
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*[^\s>]*/gi, "")

  // Allow safe script tags (but strip dangerous ones)
  // Keep script tags but ensure they're only for analytics or safe libraries
  // Remove scripts that fetch to external dangerous domains
  sanitized = sanitized.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    (match) => {
      // Allow analytics and safe libraries
      if (
        match.includes("analytics") ||
        match.includes("cdn.jsdelivr.net") ||
        match.includes("unpkg.com")
      ) {
        return match
      }
      // Remove other scripts for safety
      return ""
    }
  )

  return sanitized
}
