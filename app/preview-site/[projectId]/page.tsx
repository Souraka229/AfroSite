import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

async function getProjectFiles(projectId: string) {
  const supabase = await createClient()

  const { data: projet } = await supabase
    .from("projets")
    .select("nom")
    .eq("id", projectId)
    .single()

  if (!projet) {
    return null
  }

  const { data: fichiers } = await supabase
    .from("fichiers")
    .select("*")
    .eq("projet_id", projectId)
    .order("nom", { ascending: true })

  return { projet, fichiers: fichiers || [] }
}

export default async function PreviewSitePage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params
  const data = await getProjectFiles(projectId)

  if (!data) {
    notFound()
  }

  const { projet, fichiers } = data

  // Find index.html
  const indexFile = fichiers.find((f) => f.nom.toLowerCase() === "index.html")
  const previewUrl = indexFile?.blob_url

  return (
    <div className="w-full h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b p-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">{projet.nom}</h1>
          <p className="text-sm text-muted">Aperçu du site</p>
        </div>
        {previewUrl && (
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Ouvrir en plein écran
          </a>
        )}
      </div>

      {/* Preview */}
      <div className="w-full h-[calc(100%-80px)]">
        {previewUrl ? (
          <iframe
            src={previewUrl}
            className="w-full h-full border-0"
            title="Site preview"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-100">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun fichier index.html</h3>
              <p className="text-sm text-gray-600">Uploadez un fichier index.html pour voir l'aperçu</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
