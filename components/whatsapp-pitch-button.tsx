"use client"

import { useState } from "react"
import Link from "next/link"

interface WhatsappPitchButtonProps {
  projectName: string
  projectDescription?: string
  projectCategory?: string
  clientName: string
  clientEmail?: string
}

export function WhatsappPitchButton({
  projectName,
  projectDescription,
  projectCategory,
  clientName,
  clientEmail,
}: WhatsappPitchButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)

  const generatePitch = async () => {
    setIsLoading(true)
    setError(null)
    setMessage(null)

    try {
      const response = await fetch("/api/generate-pitch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectName,
          description: projectDescription,
          category: projectCategory,
          clientName,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate message")
      }

      const data = await response.json()
      setMessage(data.message)
      setShowPreview(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error generating message")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <button
        onClick={generatePitch}
        disabled={isLoading}
        className="flex items-center gap-2 w-full p-4 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
      >
        {isLoading ? (
          <>
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Génération en cours...
          </>
        ) : (
          <>
            <span>🤖</span>
            Générer message IA
          </>
        )}
      </button>

      {error && (
        <div className="p-4 rounded-lg bg-red-100 text-red-800 text-sm">
          {error}
        </div>
      )}

      {showPreview && message && (
        <div className="space-y-3 p-4 rounded-lg bg-slate-50 border border-slate-200">
          <div>
            <p className="text-xs font-semibold text-muted uppercase mb-2">Message généré par l'IA</p>
            <div className="p-4 rounded-lg bg-white border-l-4 border-green-500 text-sm text-foreground leading-relaxed">
              "{message}"
            </div>
          </div>

          <div className="flex gap-2">
            <a
              href={`https://wa.me/22955530826?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              <span>📤</span>
              Envoyer sur WhatsApp
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText(message)
                alert("Message copié!")
              }}
              className="flex items-center justify-center gap-2 bg-slate-200 text-foreground px-4 py-2.5 rounded-lg font-semibold hover:bg-slate-300 transition-colors"
            >
              <span>📋</span>
              Copier
            </button>
            <button
              onClick={() => setShowPreview(false)}
              className="flex items-center justify-center gap-2 bg-slate-200 text-foreground px-4 py-2.5 rounded-lg font-semibold hover:bg-slate-300 transition-colors"
            >
              <span>✕</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
