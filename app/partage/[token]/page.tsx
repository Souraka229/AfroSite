import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

export default async function SharePage({ params }: { params: { token: string } }) {
  const supabase = await createClient()

  // Récupérer le fichier partagé
  const { data: share, error: shareError } = await supabase
    .from('fichier_shares')
    .select('*, fichiers(*)')
    .eq('token', params.token)
    .single()

  if (shareError || !share) {
    notFound()
  }

  const fichier = share.fichiers

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-lg border border-border bg-card p-8">
          <h1 className="text-2xl font-bold text-foreground">Fichier Partagé</h1>
          <p className="mt-2 text-muted">
            {fichier.nom} - {fichier.type}
          </p>

          <div className="mt-8 space-y-4">
            {/* Affichage du contenu HTML */}
            {fichier.type === 'html' && fichier.contenu && (
              <div className="rounded border border-border p-4">
                <h2 className="mb-4 text-lg font-semibold">Aperçu</h2>
                <iframe
                  srcDoc={fichier.contenu}
                  className="h-96 w-full rounded border border-border"
                  title="HTML Preview"
                />
              </div>
            )}

            {/* Bouton de téléchargement */}
            <div className="flex gap-3">
              {fichier.url && (
                <a
                  href={fichier.url}
                  download={fichier.nom}
                  className="rounded bg-foreground px-6 py-2 text-white hover:bg-black transition-colors"
                >
                  Télécharger
                </a>
              )}
              {fichier.contenu && (
                <button
                  onClick={() => {
                    const blob = new Blob([fichier.contenu], { type: 'text/html' })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = fichier.nom
                    document.body.appendChild(a)
                    a.click()
                    document.body.removeChild(a)
                    URL.revokeObjectURL(url)
                  }}
                  className="rounded border border-foreground px-6 py-2 text-foreground hover:bg-secondary transition-colors"
                >
                  Télécharger le contenu
                </button>
              )}
            </div>

            {/* Informations */}
            <div className="rounded bg-secondary p-4">
              <p className="text-xs text-muted">
                Partagé le{' '}
                {new Date(share.created_at).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
