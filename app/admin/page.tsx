import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"

async function getDashboardData() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  const [
    { count: totalProjets },
    { count: projetsEnCours },
    { count: projetsTermines },
    { count: totalClients },
    { count: totalExperts },
    { data: recentProjets },
    { data: recentClients },
  ] = await Promise.all([
    supabase.from("projets").select("id", { count: "exact", head: true }),
    supabase.from("projets").select("id", { count: "exact", head: true }).eq("statut", "en_cours"),
    supabase.from("projets").select("id", { count: "exact", head: true }).eq("statut", "termine"),
    supabase.from("clients").select("id", { count: "exact", head: true }),
    supabase.from("experts").select("id", { count: "exact", head: true }),
    supabase.from("projets").select("id, nom, statut, prix, created_at, clients(nom)").order("created_at", { ascending: false }).limit(5),
    supabase.from("clients").select("id, nom, email, entreprise, created_at").order("created_at", { ascending: false }).limit(4),
  ])

  return {
    stats: {
      totalProjets: totalProjets || 0,
      projetsEnCours: projetsEnCours || 0,
      projetsTermines: projetsTermines || 0,
      totalClients: totalClients || 0,
      totalExperts: totalExperts || 0,
    },
    recentProjets: recentProjets || [],
    recentClients: recentClients || [],
  }
}

const statusConfig: Record<string, { label: string; className: string }> = {
  en_attente: { label: "En attente", className: "bg-yellow-50 text-yellow-700 border border-yellow-200" },
  en_cours: { label: "En cours", className: "bg-blue-50 text-blue-700 border border-blue-200" },
  termine: { label: "Terminé", className: "bg-green-50 text-green-700 border border-green-200" },
  annule: { label: "Annulé", className: "bg-red-50 text-red-700 border border-red-200" },
}

export default async function DashboardPage() {
  const { stats, recentProjets, recentClients } = await getDashboardData()

  const statCards = [
    {
      label: "Projets total",
      value: stats.totalProjets,
      href: "/admin/projets",
      sub: `${stats.projetsEnCours} en cours`,
    },
    {
      label: "Projets livrés",
      value: stats.projetsTermines,
      href: "/admin/projets",
      sub: "Complétés",
    },
    {
      label: "Clients",
      value: stats.totalClients,
      href: "/admin/clients",
      sub: "Enregistrés",
    },
    {
      label: "Experts",
      value: stats.totalExperts,
      href: "/admin/team",
      sub: "Dans l'équipe",
    },
  ]

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">Vue d&apos;ensemble de votre activité</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="group rounded-xl border border-border bg-white p-5 hover:border-foreground/20 hover:shadow-sm transition-all"
          >
            <p className="text-xs font-semibold text-muted uppercase tracking-wider">{card.label}</p>
            <p className="mt-2 text-4xl font-black text-foreground">{card.value}</p>
            <p className="mt-1 text-xs text-muted">{card.sub}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Nouveau projet", href: "/admin/projets/nouveau" },
          { label: "Nouveau client", href: "/admin/clients/nouveau" },
          { label: "Nouveau site", href: "/admin/sites/nouveau" },
          { label: "Gérer l'équipe", href: "/admin/team" },
        ].map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="flex items-center justify-center rounded-lg border border-border bg-white px-4 py-3 text-xs font-semibold text-foreground hover:bg-[#f8fafc] hover:border-foreground/20 transition-all text-center"
          >
            {action.label}
          </Link>
        ))}
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Projets récents */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-white overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="text-sm font-bold text-foreground">Projets récents</h2>
            <Link href="/admin/projets" className="text-xs text-muted hover:text-foreground transition-colors">
              Voir tout →
            </Link>
          </div>
          {recentProjets.length === 0 ? (
            <div className="py-10 text-center text-sm text-muted">Aucun projet</div>
          ) : (
            <div className="divide-y divide-border">
              {recentProjets.map((projet: any) => (
                <Link
                  key={projet.id}
                  href={`/admin/projets/${projet.id}`}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-[#f8fafc] transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground truncate">{projet.nom}</p>
                    <p className="text-xs text-muted">{projet.clients?.nom || "—"}</p>
                  </div>
                  <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                    {projet.prix && (
                      <span className="text-xs font-medium text-foreground">
                        {projet.prix.toLocaleString()} F
                      </span>
                    )}
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusConfig[projet.statut]?.className || "bg-gray-100 text-gray-600"}`}>
                      {statusConfig[projet.statut]?.label || projet.statut}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Clients récents */}
        <div className="rounded-xl border border-border bg-white overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="text-sm font-bold text-foreground">Clients récents</h2>
            <Link href="/admin/clients" className="text-xs text-muted hover:text-foreground transition-colors">
              Voir tout →
            </Link>
          </div>
          {recentClients.length === 0 ? (
            <div className="py-10 text-center text-sm text-muted">Aucun client</div>
          ) : (
            <div className="divide-y divide-border">
              {recentClients.map((client: any) => (
                <Link
                  key={client.id}
                  href={`/admin/clients/${client.id}`}
                  className="flex items-center gap-3 px-5 py-3.5 hover:bg-[#f8fafc] transition-colors"
                >
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-foreground/8 text-xs font-bold text-foreground">
                    {client.nom.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground truncate">{client.nom}</p>
                    <p className="text-xs text-muted truncate">{client.entreprise || client.email}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
