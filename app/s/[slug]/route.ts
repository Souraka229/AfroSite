export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  // Delegate to the API
  const apiUrl = new URL(request.url)
  apiUrl.pathname = `/api/site-by-slug/${slug}`

  const res = await fetch(apiUrl.toString())
  return new Response(res.body, {
    status: res.status,
    headers: res.headers,
  })
}
