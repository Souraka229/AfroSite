import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { notFound } from "next/navigation"

export default async function SharePage({
  params,
}: {
  params: { token: string }
}) {
  const supabase = await createClient()

  const { data: share, error } = await supabase
    .from("fichier_shares")
    .select("*, fichiers(*)")
    .eq("token", params.token)
    .single()

  if (error || !share) {
    notFound()
  }

  // Check if expired
  if (share.expires_at && new Date(share.expires_at) < new Date()) {
    notFound()
  }

  const fichier = share.fichiers

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-border bg-white p-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {share.nom}
            </h1>
            <p className="text-sm text-muted mb-8">
              Fichier partagé par AfroSite Agency
            </p>

            <div className="space-y-6">
              <div className="rounded-lg bg-secondary p-6">
                <h2 className="font-semibold text-foreground mb-4">
                  Informations
                </h2>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-muted">Nom:</span>
                    <p className="font-medium text-foreground">{fichier.nom}</p>
                  </div>
                  <div>
                    <span className="text-muted">Type:</span>
                    <p className="font-medium text-foreground uppercase">{fichier.type}</p>
                  </div>
                  {fichier.taille && (
                    <div>
                      <span className="text-muted">Taille:</span>
                      <p className="font-medium text-foreground">
                        {(fichier.taille / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  )}
                  <div>
                    <span className="text-muted">Créé le:</span>
                    <p className="font-medium text-foreground">
                      {new Date(fichier.created_at).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {fichier.type === "html" && fichier.contenu && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Aperçu
                  </h3>
                  <div className="border border-border rounded-lg overflow-hidden bg-white">
                    <iframe
                      srcDoc={fichier.contenu}
                      className="w-full h-96"
                      title="Aperçu du site"
                      sandbox="allow-scripts allow-same-origin"
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                {fichier.type === "html" && fichier.contenu && (
                  <a
                    href={`data:text/html;charset=utf-8,${encodeURIComponent(fichier.contenu)}`}
                    download={`${fichier.nom}.html`}
                    className="inline-flex items-center justify-center bg-black text-white px-6 py-3 rounded font-medium hover:bg-gray-900 transition-colors"
                  >
                    Télécharger le fichier HTML
                  </a>
                )}
                {fichier.url && (
                  <a
                    href={fichier.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center border border-border bg-white text-foreground px-6 py-3 rounded font-medium hover:bg-secondary transition-colors"
                  >
                    Ouvrir le fichier
                  </a>
                )}
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-border text-center">
              <p className="text-xs text-muted mb-4">
                Besoin d&apos;aide? Contactez l&apos;équipe AfroSite
              </p>
              <a
                href="https://wa.me/22955530826"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-black hover:underline"
              >
                Nous contacter via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
