import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { DeleteClientButton } from "./delete-button"
import { QuickAddClient } from "./quick-add"

async function getClients() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) return []
  return data || []
}

export default async function ClientsPage() {
  const clients = await getClients()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Clients</h1>
          <p className="mt-1 text-sm text-muted">{clients.length} client{clients.length !== 1 ? "s" : ""} enregistré{clients.length !== 1 ? "s" : ""}</p>
        </div>
        <Link
          href="/admin/clients/nouveau"
          className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-semibold text-white hover:bg-foreground/90 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Nouveau client
        </Link>
      </div>

      {/* Quick add */}
      <div className="rounded-xl border border-border bg-white p-5">
        <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-4">Ajout rapide</p>
        <QuickAddClient />
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-white overflow-hidden">
        {clients.length === 0 ? (
          <div className="py-16 text-center">
            <div className="mx-auto h-12 w-12 rounded-xl border-2 border-dashed border-border flex items-center justify-center mb-4">
              <svg className="h-5 w-5 text-muted" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-foreground mb-1">Aucun client</p>
            <p className="text-xs text-muted mb-5">Ajoutez votre premier client pour commencer</p>
            <Link
              href="/admin/clients/nouveau"
              className="inline-flex items-center rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-white hover:bg-foreground/90 transition-colors"
            >
              Ajouter un client
            </Link>
          </div>
        ) : (
          <table className="min-w-full">
            <thead className="bg-[#f8fafc] border-b border-border">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted">Nom</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted">Email</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted">Téléphone</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted">Entreprise</th>
                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-[#f8fafc] transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-foreground/8 text-xs font-bold text-foreground">
                        {client.nom.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-semibold text-foreground">{client.nom}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-muted">{client.email}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-muted">{client.telephone || "—"}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-muted">{client.entreprise || "—"}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/clients/${client.id}`}
                        className="rounded-lg p-2 text-muted hover:bg-[#f1f5f9] hover:text-foreground transition-colors"
                        title="Modifier"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                      </Link>
                      <DeleteClientButton clientId={client.id} />
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
