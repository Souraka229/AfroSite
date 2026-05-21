import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import Image from "next/image"

export default async function ProjectPreviewPage({
  params,
}: {
  params: { projectId: string }
}) {
  const supabase = await createClient()

  const { data: project, error } = await supabase
    .from("projets")
    .select("*, clients(nom, email)")
    .eq("id", params.projectId)
    .single()

  if (error || !project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header minimaliste */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-border z-50 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">{project.nom}</h1>
            <p className="text-sm text-muted">Aperçu du projet</p>
          </div>
          <div className="flex items-center gap-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              project.statut === 'termine' ? 'bg-green-100 text-green-800' :
              project.statut === 'en_cours' ? 'bg-blue-100 text-blue-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {project.statut === 'termine' ? '✓ Terminé' :
               project.statut === 'en_cours' ? '⏳ En cours' :
               '⏱️ En attente'}
            </span>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="pt-20">
        {/* Section Hero avec image */}
        <div className="relative h-96 bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden">
          {project.image_url ? (
            <Image
              src={project.image_url}
              alt={project.nom}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-6xl font-bold text-primary/20">∞</div>
                <p className="mt-4 text-muted">Aperçu du projet</p>
              </div>
            </div>
          )}
        </div>

        {/* Détails du projet */}
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-slate-50 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-muted uppercase mb-2">Client</h3>
              <p className="text-2xl font-bold text-foreground">{project.clients?.nom || 'Non spécifié'}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-muted uppercase mb-2">Catégorie</h3>
              <p className="text-2xl font-bold text-foreground">{project.categorie || 'Autre'}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-muted uppercase mb-2">Statut</h3>
              <p className="text-2xl font-bold text-foreground">
                {project.statut === 'termine' ? '100%' :
                 project.statut === 'en_cours' ? '60%' : '0%'}
              </p>
            </div>
          </div>

          {/* Description */}
          {project.description && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-6">À propos du projet</h2>
              <p className="text-lg text-muted leading-relaxed">{project.description}</p>
            </div>
          )}

          {/* Galerie d'images */}
          {project.fichiers && project.fichiers.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-6">Galerie</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.fichiers.slice(0, 6).map((fichier: any) => (
                  <div
                    key={fichier.id}
                    className="rounded-xl overflow-hidden bg-slate-100 aspect-video flex items-center justify-center"
                  >
                    {fichier.type?.includes('image') ? (
                      <Image
                        src={fichier.url}
                        alt={fichier.nom}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <p className="text-muted">{fichier.nom}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="border-t border-border pt-12 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">Besoin de modifications?</h3>
            <p className="text-muted mb-6">Contactez-nous directement via WhatsApp</p>
            <a
              href="https://wa.me/22955530826"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all"
            >
              Contactez-nous
            </a>
          </div>
        </div>
      </main>

      {/* Footer minimaliste */}
      <footer className="bg-foreground text-white py-8 mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-sm">
          <p>© 2026 AfroSite. Créé avec passion au Bénin.</p>
        </div>
      </footer>
    </div>
  )
}
