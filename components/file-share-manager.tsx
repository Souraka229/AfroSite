'use client'

import { useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface FileShare {
  id: string
  fichier_id: string
  nom: string
  token: string
  created_at: string
}

export function FileShareManager({ projetId, fichiers }: { projetId: string; fichiers: any[] }) {
  const router = useRouter()
  const supabase = createClient()
  const [shares, setShares] = useState<FileShare[]>([])
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  const generateShareLink = useCallback(async (fichier: any) => {
    setLoading(true)
    try {
      // Générer un token unique
      const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      
      // Sauvegarder le partage
      const { error } = await supabase
        .from('fichier_shares')
        .insert({
          fichier_id: fichier.id,
          nom: fichier.nom,
          token,
          created_at: new Date().toISOString()
        })

      if (error) throw error

      // Générer le lien public
      const shareUrl = `${window.location.origin}/partage/${token}`
      
      // Ajouter à la liste
      setShares([...shares, {
        id: `${fichier.id}-${token}`,
        fichier_id: fichier.id,
        nom: fichier.nom,
        token,
        created_at: new Date().toISOString()
      }])

      // Copier le lien
      navigator.clipboard.writeText(shareUrl)
      setCopied(token)
      setTimeout(() => setCopied(null), 2000)
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la génération du lien')
    } finally {
      setLoading(false)
    }
  }, [shares, supabase])

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Partager les fichiers</h3>
      <div className="grid gap-4">
        {fichiers?.map((fichier) => (
          <div key={fichier.id} className="flex items-center justify-between rounded border border-border p-4">
            <div>
              <p className="font-medium">{fichier.nom}</p>
              <p className="text-xs text-muted">{fichier.type}</p>
            </div>
            <button
              onClick={() => generateShareLink(fichier)}
              disabled={loading}
              className="rounded bg-blue-500 px-4 py-2 text-xs font-medium text-white hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Génération...' : 'Générer lien'}
            </button>
          </div>
        ))}
      </div>
      
      {shares.length > 0 && (
        <div className="mt-8 space-y-3 rounded-lg bg-blue-50 p-4">
          <h4 className="font-semibold text-blue-900">Liens de partage générés</h4>
          {shares.map((share) => (
            <div key={share.id} className="flex items-center justify-between rounded bg-white p-3">
              <div className="flex-1">
                <p className="text-xs font-medium text-foreground">{share.nom}</p>
                <p className="text-xs text-muted">
                  {`${window.location.origin}/partage/${share.token}`}
                </p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/partage/${share.token}`)
                  setCopied(share.token)
                  setTimeout(() => setCopied(null), 2000)
                }}
                className="ml-2 rounded bg-foreground px-3 py-1 text-xs text-white hover:bg-black"
              >
                {copied === share.token ? '✓ Copié' : 'Copier'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
