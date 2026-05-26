import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { DeleteProjetButton } from "./delete-button"

async function getProjets() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("projets")
    .select("*, clients(nom, email), experts(prenom, nom)")
    .order("created_at", { ascending: false })

  if (error) return []
  return data || []
}

const statusConfig: Record<string, { label: string; className: string }> = {
  en_attente: { label: "En attente", className: "bg-yellow-50 text-yellow-700 border border-yellow-200" },
  en_cours: { label: "En cours", className: "bg-blue-50 text-blue-700 border border-blue-200" },
  termine: { label: "Terminé", className: "bg-green-50 text-green-700 border border-green-200" },
  annule: { label: "Annulé", className: "bg-red-50 text-red-700 border border-red-200" },
}

export default async function ProjetsPage() {
  const projets = await getProjets()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projets</h1>
          <p className="mt-1 text-sm text-muted">{projets.length} projet{projets.length !== 1 ? "s" : ""} au total</p>
        </div>
        <Link
          href="/admin/projets/nouveau"
          className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-semibold text-white hover:bg-foreground/90 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Nouveau projet
        </Link>
      </div>

      <div className="rounded-xl border border-border bg-white overflow-hidden">
        {projets.length === 0 ? (
          <div className="py-16 text-center">
            <div className="mx-auto h-12 w-12 rounded-xl border-2 border-dashed border-border flex items-center justify-center mb-4">
              <svg className="h-5 w-5 text-muted" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-foreground mb-1">Aucun projet</p>
            <p className="text-xs text-muted mb-5">Créez votre premier projet pour commencer</p>
            <Link
              href="/admin/projets/nouveau"
              className="inline-flex items-center rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-white hover:bg-foreground/90 transition-colors"
            >
              Créer un projet
            </Link>
          </div>
        ) : (
          <table className="min-w-full">
            <thead className="bg-[#f8fafc] border-b border-border">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted">Projet</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted">Client</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted">Expert</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted">Statut</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted">Prix</th>
                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {projets.map((projet) => (
                <tr key={projet.id} className="hover:bg-[#f8fafc] transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="text-sm font-semibold text-foreground">{projet.nom}</div>
                    {projet.description && (
                      <p className="text-xs text-muted truncate max-w-xs mt-0.5">{projet.description}</p>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-muted">
                    {projet.clients?.nom || "—"}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-muted">
                    {projet.experts ? `${projet.experts.prenom} ${projet.experts.nom}` : "—"}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusConfig[projet.statut]?.className || "bg-gray-100 text-gray-600"}`}>
                      {statusConfig[projet.statut]?.label || projet.statut}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-foreground font-medium">
                    {projet.prix ? `${projet.prix.toLocaleString()} F` : "—"}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/projets/${projet.id}/fichiers`}
                        className="rounded-lg p-2 text-muted hover:bg-[#f1f5f9] hover:text-foreground transition-colors"
                        title="Fichiers"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                      </Link>
                      <Link
                        href={`/admin/projets/${projet.id}`}
                        className="rounded-lg p-2 text-muted hover:bg-[#f1f5f9] hover:text-foreground transition-colors"
                        title="Modifier"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                      </Link>
                      <DeleteProjetButton projetId={projet.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
