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
    <div className="space-y-8">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tableau de bord</h1>
          <p className="mt-2 text-sm text-muted">Gérez vos projets et collaborez avec vos clients en temps réel</p>
        </div>
        <Link
          href="/admin/projets/nouveau"
          className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
        >
          + Nouveau projet
        </Link>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {statCards.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="group flex flex-col rounded-xl border border-border bg-white p-6 transition-all hover:shadow-lg hover:border-primary/50"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${stat.color} text-white shadow-lg`}>
                {stat.icon}
              </div>
              <p className="text-sm font-medium text-muted">{stat.name}</p>
            </div>
            <p className="text-4xl font-bold text-foreground">{stat.value}</p>
          </Link>
        ))}
      </div>

      {/* Projets en cours et récents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Projets en cours */}
        <div className="rounded-xl border border-border bg-white">
          <div className="flex items-center justify-between border-b border-border px-6 py-5">
            <div>
              <h2 className="text-lg font-bold text-foreground">En cours</h2>
              <p className="text-xs text-muted mt-1">Projets actifs cette semaine</p>
            </div>
            <Link
              href="/admin/projets?filter=en_cours"
              className="text-sm font-semibold text-primary hover:underline"
            >
              Voir tous
            </Link>
          </div>
          <div className="divide-y divide-border">
            {recentProjets.filter(p => p.statut === 'en_cours').length === 0 ? (
              <div className="px-6 py-8 text-center text-sm text-muted">
                Aucun projet en cours
              </div>
            ) : (
              recentProjets.filter(p => p.statut === 'en_cours').slice(0, 3).map((projet) => (
                <Link
                  key={projet.id}
                  href={`/admin/projets/${projet.id}`}
                  className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors group"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {projet.nom}
                    </p>
                    <p className="text-xs text-muted mt-1">
                      {projet.clients?.nom || "Sans client"}
                    </p>
                  </div>
                  <svg className="h-4 w-4 text-muted group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Projets récents */}
        <div className="rounded-xl border border-border bg-white">
          <div className="flex items-center justify-between border-b border-border px-6 py-5">
            <div>
              <h2 className="text-lg font-bold text-foreground">Récents</h2>
              <p className="text-xs text-muted mt-1">Derniers projets créés</p>
            </div>
            <Link
              href="/admin/projets"
              className="text-sm font-semibold text-primary hover:underline"
            >
              Voir tous
            </Link>
          </div>
          <div className="divide-y divide-border">
            {recentProjets.length === 0 ? (
              <div className="px-6 py-8 text-center text-sm text-muted">
                Aucun projet pour le moment
              </div>
            ) : (
              recentProjets.slice(0, 3).map((projet) => (
                <Link
                  key={projet.id}
                  href={`/admin/projets/${projet.id}`}
                  className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors group"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {projet.nom}
                    </p>
                    <p className="text-xs text-muted mt-1">
                      {projet.clients?.nom || "Sans client"}
                    </p>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusColors[projet.statut] || "bg-gray-100 text-gray-800"}`}>
                    {statusLabels[projet.statut] || projet.statut}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="rounded-xl border border-border bg-gradient-to-br from-primary/5 to-primary/0 p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Actions rapides</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            href="/admin/clients/nouveau"
            className="flex items-center gap-2 p-3 rounded-lg bg-white border border-border hover:border-primary/50 hover:shadow-md transition-all text-sm font-medium text-foreground"
          >
            <span>👤</span> Nouveau client
          </Link>
          <Link
            href="/admin/projets/nouveau"
            className="flex items-center gap-2 p-3 rounded-lg bg-white border border-border hover:border-primary/50 hover:shadow-md transition-all text-sm font-medium text-foreground"
          >
            <span>📁</span> Nouveau projet
          </Link>
          <Link
            href="/admin/experts"
            className="flex items-center gap-2 p-3 rounded-lg bg-white border border-border hover:border-primary/50 hover:shadow-md transition-all text-sm font-medium text-foreground"
          >
            <span>👨‍💼</span> Gérer experts
          </Link>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 rounded-lg bg-white border border-border hover:border-primary/50 hover:shadow-md transition-all text-sm font-medium text-foreground"
          >
            <span>👁️</span> Voir site
          </a>
        </div>
      </div>
    </div>
  )
}
