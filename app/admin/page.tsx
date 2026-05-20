import { createClient } from "@/lib/supabase/server"
import Link from "next/link"

async function getStats() {
  const supabase = await createClient()
  
  const [clientsRes, projetsRes, expertsRes] = await Promise.all([
    supabase.from("clients").select("id", { count: "exact", head: true }),
    supabase.from("projets").select("id", { count: "exact", head: true }),
    supabase.from("experts").select("id", { count: "exact", head: true }),
  ])

  return {
    clients: clientsRes.count || 0,
    projets: projetsRes.count || 0,
    experts: expertsRes.count || 0,
  }
}

async function getRecentProjets() {
  const supabase = await createClient()
  const { data } = await supabase
    .from("projets")
    .select("*, clients(nom, email)")
    .order("created_at", { ascending: false })
    .limit(5)
  
  return data || []
}

export default async function AdminDashboard() {
  const stats = await getStats()
  const recentProjets = await getRecentProjets()

  const statCards = [
    {
      name: "Clients",
      value: stats.clients,
      href: "/admin/clients",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
        </svg>
      ),
      color: "bg-blue-500",
    },
    {
      name: "Projets",
      value: stats.projets,
      href: "/admin/projets",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
        </svg>
      ),
      color: "bg-green-500",
    },
    {
      name: "Experts",
      value: stats.experts,
      href: "/admin/experts",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      ),
      color: "bg-purple-500",
    },
  ]

  const statusColors: Record<string, string> = {
    en_attente: "bg-yellow-100 text-yellow-800",
    en_cours: "bg-blue-100 text-blue-800",
    termine: "bg-green-100 text-green-800",
    annule: "bg-red-100 text-red-800",
  }

  const statusLabels: Record<string, string> = {
    en_attente: "En attente",
    en_cours: "En cours",
    termine: "Termine",
    annule: "Annule",
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Tableau de bord</h1>
        <p className="mt-1 text-sm text-muted">Bienvenue dans votre espace d&apos;administration AfroSite</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {statCards.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="group flex items-center gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/50"
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color} text-white`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-muted">{stat.name}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold text-foreground">Projets recents</h2>
          <Link
            href="/admin/projets"
            className="text-sm font-medium text-primary hover:underline"
          >
            Voir tout
          </Link>
        </div>
        <div className="divide-y divide-border">
          {recentProjets.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-muted">Aucun projet pour le moment</p>
              <Link
                href="/admin/projets/nouveau"
                className="mt-4 inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Creer un projet
              </Link>
            </div>
          ) : (
            recentProjets.map((projet) => (
              <div key={projet.id} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="font-medium text-foreground">{projet.nom}</p>
                  <p className="text-sm text-muted">
                    {projet.clients?.nom || "Client inconnu"}
                  </p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[projet.statut] || "bg-gray-100 text-gray-800"}`}>
                  {statusLabels[projet.statut] || projet.statut}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
