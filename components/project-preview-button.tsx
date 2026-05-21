"use client"

import { useState } from "react"
import Link from "next/link"

interface ProjectPreviewButtonProps {
  projectId: string
  projectName: string
  projectDescription?: string
}

export function ProjectPreviewButton({
  projectId,
  projectName,
  projectDescription,
}: ProjectPreviewButtonProps) {
  const [showModal, setShowModal] = useState(false)
  const previewUrl = `/preview/${projectId}`
  const fullUrl = `${typeof window !== 'undefined' ? window.location.origin : 'https://afrosite-nu.vercel.app'}${previewUrl}`

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 w-full p-3 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 font-medium transition-colors"
      >
        <span>👁️</span> Visualiser le site
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="rounded-xl bg-white p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground">
                Aperçu - {projectName}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-muted hover:text-foreground transition-colors"
              >
                ✕
              </button>
            </div>

            {projectDescription && (
              <p className="text-muted mb-6">{projectDescription}</p>
            )}

            <div className="space-y-4 mb-6">
              {/* Preview embed */}
              <div className="rounded-lg border border-border overflow-hidden bg-slate-100">
                <iframe
                  src={previewUrl}
                  title={projectName}
                  className="w-full h-96 border-0"
                />
              </div>

              {/* URLs pour partage */}
              <div className="space-y-3 p-4 rounded-lg bg-slate-50">
                <p className="text-sm font-semibold text-foreground">
                  Lien de prévisualisation:
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={fullUrl}
                    readOnly
                    className="flex-1 px-3 py-2 text-sm bg-white border border-border rounded-lg font-mono"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(fullUrl)
                      alert('Lien copié!')
                    }}
                    className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    Copier
                  </button>
                </div>

                <a
                  href={`https://wa.me/22955530826?text=Voici%20l'aperçu%20du%20site%20${projectName}:%20${encodeURIComponent(fullUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center w-full py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  📱 Partager sur WhatsApp
                </a>
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Ouvrir en plein écran
              </Link>
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-3 bg-gray-200 text-foreground rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
