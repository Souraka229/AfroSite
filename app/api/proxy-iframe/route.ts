export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")

  if (!url) {
    return Response.json({ error: "URL manquante" }, { status: 400 })
  }

  try {
    // Fetch le contenu sans les headers restrictifs
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    })

    const content = await response.text()

    // Retirer les headers problématiques
    return new Response(content, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        // Pas de X-Frame-Options ou CSP pour autoriser les iframes
      },
    })
  } catch (error) {
    return Response.json(
      { error: "Erreur lors du chargement" },
      { status: 500 }
    )
  }
}
