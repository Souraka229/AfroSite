"use client"

import { useEffect, useState } from "react"

export default function RestafyPage() {
  const [iframeUrl, setIframeUrl] = useState<string>("")
  const [method, setMethod] = useState<"direct" | "proxy" | "postMessage">("direct")

  useEffect(() => {
    // À remplacer par l'URL réelle de Restafy
    const restafyUrl = process.env.NEXT_PUBLIC_RESTAFY_EMBED_URL || "https://restafy.example.com/embed"

    if (method === "proxy") {
      setIframeUrl(`/api/proxy-iframe?url=${encodeURIComponent(restafyUrl)}`)
    } else {
      setIframeUrl(restafyUrl)
    }
  }, [method])

  return (
    <div className="w-full h-screen flex flex-col bg-gray-50">
      {/* Controls */}
      <div className="bg-white border-b p-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Restafy Integration</h1>
          <p className="text-sm text-muted mt-1">Test différentes méthodes d'intégration</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setMethod("direct")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              method === "direct"
                ? "bg-primary text-primary-foreground"
                : "bg-gray-200 text-foreground hover:bg-gray-300"
            }`}
          >
            Direct
          </button>
          <button
            onClick={() => setMethod("proxy")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              method === "proxy"
                ? "bg-primary text-primary-foreground"
                : "bg-gray-200 text-foreground hover:bg-gray-300"
            }`}
          >
            Proxy (Déblocage)
          </button>
          <button
            onClick={() => setMethod("postMessage")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              method === "postMessage"
                ? "bg-primary text-primary-foreground"
                : "bg-gray-200 text-foreground hover:bg-gray-300"
            }`}
          >
            PostMessage API
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {method === "direct" && (
          <iframe
            src={iframeUrl}
            className="w-full h-full border-0"
            title="Restafy Direct"
            allow="payment; geolocation"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
          />
        )}

        {method === "proxy" && (
          <iframe
            src={iframeUrl}
            className="w-full h-full border-0"
            title="Restafy Proxy"
            allow="payment; geolocation"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
          />
        )}

        {method === "postMessage" && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted mb-4">PostMessage API method requires Restafy to support it</p>
              <p className="text-sm text-gray-500">
                Contact Restafy support pour activer l'intégration PostMessage
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Debug Info */}
      <div className="bg-white border-t p-4 text-sm text-muted font-mono">
        <p>URL actuelle: {iframeUrl}</p>
        <p>Méthode: {method}</p>
      </div>
    </div>
  )
}
