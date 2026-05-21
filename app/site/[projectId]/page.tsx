"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

export default function SitePreviewPage() {
  const params = useParams()
  const projectId = params?.projectId as string
  const [htmlContent, setHtmlContent] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHtml = async () => {
      try {
        const res = await fetch(`/api/site/${projectId}`)

        if (!res.ok) {
          if (res.status === 404) {
            setError("Site non trouvé")
          } else {
            setError("Erreur lors du chargement du site")
          }
          setLoading(false)
          return
        }

        const data = await res.json()
        setHtmlContent(data.html)
        setLoading(false)
      } catch (err) {
        setError("Erreur lors du chargement du site")
        setLoading(false)
      }
    }

    if (projectId) {
      fetchHtml()
    }
  }, [projectId])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du site...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Erreur</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: htmlContent,
      }}
    />
  )
}
