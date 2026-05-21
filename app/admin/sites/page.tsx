import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { redirect } from "next/navigation"

async function getSites() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/auth/login")

  const { data } = await supabase
    .from("sites")
    .select("*")
    .order("created_at", { ascending: false })

  return data || []
}

export default async function SitesPage() {
  const sites = await getSites()

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mes Sites</h1>
          <p className="mt-1 text-sm text-muted">Gérez vos sites web statiques</p>
        </div>
        <Link
          href="/admin/sites/nouveau"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Nouveau site
        </Link>
      </div>

      {sites.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-border p-12 text-center">
          <svg className="mx-auto h-12 w-12 text-muted mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.853A8.063 8.063 0 0112 3c-4.97 0-9 3.582-9 8s4.03 8 9 8a8.063 8.063 0 013.362-.853m0 0a8.025 8.025 0 013.362.853c4.97 0 9-3.582 9-8s-4.03-8-9-8a8.025 8.025 0 00-3.362.853" />
          </svg>
          <h3 className="text-lg font-semibold text-foreground mb-2">Aucun site</h3>
          <p className="text-sm text-muted mb-6">Créez votre premier site pour commencer</p>
          <Link
            href="/admin/sites/nouveau"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Créer un site
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sites.map((site) => (
            <Link
              key={site.id}
              href={`/admin/sites/${site.id}`}
              className="rounded-xl border border-border bg-white p-6 hover:border-primary hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-lg">{site.nom}</h3>
                  <p className="text-sm text-muted mt-1">ID: {site.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted">Créé le</p>
                  <p className="text-sm font-medium text-foreground">
                    {new Date(site.created_at).toLocaleDateString("fr-FR")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-4 border-t border-border">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
                <span className="text-sm text-primary font-medium">Gérer →</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
