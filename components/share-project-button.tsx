"use client"

import { useState } from "react"

interface ShareProjectButtonProps {
  projectId: string
  projectName: string
}

export function ShareProjectButton({ projectId, projectName }: ShareProjectButtonProps) {
  const [shareUrl, setShareUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const generateShareLink = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/share-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId }),
      })

      if (!response.ok) throw new Error("Failed to generate link")

      const data = await response.json()
      setShareUrl(data.previewUrl)
    } catch (error) {
      alert("Erreur lors de la génération du lien")
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="space-y-3">
      {!shareUrl ? (
        <button
          onClick={generateShareLink}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Génération...
            </>
          ) : (
            <>
              <span>🔗</span>
              Générer lien de partage
            </>
          )}
        </button>
      ) : (
        <div className="space-y-2 p-4 rounded-lg bg-blue-50 border border-blue-200">
          <p className="text-xs font-semibold text-blue-900 uppercase">Lien de prévisualisation</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 px-3 py-2 bg-white border border-blue-200 rounded text-sm font-mono text-blue-900"
            />
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition-colors"
            >
              {copied ? "✓ Copié" : "Copier"}
            </button>
          </div>
          <p className="text-xs text-blue-800">
            📲 Partagez ce lien avec votre client. Il verra uniquement l'aperçu du site.
          </p>
          <a
            href={`https://wa.me/22955530826?text=Bonjour,%20voici%20l'aperçu%20du%20site%20pour%20${projectName}:%20${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center w-full py-2 bg-green-600 text-white rounded font-semibold hover:bg-green-700 transition-colors text-sm"
          >
            📱 Envoyer sur WhatsApp
          </a>
        </div>
      )}
    </div>
  )
}
