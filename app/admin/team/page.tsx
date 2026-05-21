import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { ExpertCard } from "@/components/expert-card"

async function getExperts() {
  const supabase = await createClient()
  const { data: experts, error } = await supabase
    .from("experts")
    .select("*")
    .order("created_at", { ascending: true })

  if (error) {
    console.error("Error fetching experts:", error)
    return []
  }

  return experts || []
}

async function getTeamStats() {
  const supabase = await createClient()

  const [
    { count: totalClients },
    { count: totalProjects },
    { count: totalExperts },
  ] = await Promise.all([
    supabase
      .from("clients")
      .select("id", { count: "exact", head: true }),
    supabase
      .from("projets")
      .select("id", { count: "exact", head: true }),
    supabase
      .from("experts")
      .select("id", { count: "exact", head: true }),
  ])

  return {
    clients: totalClients || 0,
    projects: totalProjects || 0,
    experts: totalExperts || 0,
  }
}

export default async function TeamPage() {
  const experts = await getExperts()
  const stats = await getTeamStats()

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Notre Équipe</h1>
        <p className="mt-2 text-muted">Retrouvez les profils de tous nos experts</p>
      </div>

      {/* Stats globales */}
      <div className="grid grid-cols-3 gap-6">
        <div className="rounded-xl border border-border bg-white p-6">
          <div className="text-sm font-semibold text-muted mb-2">EXPERTS</div>
          <div className="text-4xl font-bold text-foreground">{stats.experts}</div>
          <p className="text-xs text-muted mt-2">Membres actifs</p>
        </div>
        <div className="rounded-xl border border-border bg-white p-6">
          <div className="text-sm font-semibold text-muted mb-2">PROJETS LIVRÉS</div>
          <div className="text-4xl font-bold text-foreground">{stats.projects}</div>
          <p className="text-xs text-muted mt-2">Tous les projets</p>
        </div>
        <div className="rounded-xl border border-border bg-white p-6">
          <div className="text-sm font-semibold text-muted mb-2">CLIENTS</div>
          <div className="text-4xl font-bold text-foreground">{stats.clients}</div>
          <p className="text-xs text-muted mt-2">Satisfaits</p>
        </div>
      </div>

      {/* Équipe */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Experts</h2>
          <Link
            href="/admin/experts"
            className="text-sm font-semibold text-primary hover:underline"
          >
            Gérer les experts →
          </Link>
        </div>

        {experts.length === 0 ? (
          <div className="rounded-xl border border-border bg-white p-12 text-center">
            <p className="text-muted mb-4">Aucun expert pour le moment</p>
            <Link
              href="/admin/experts"
              className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary/90"
            >
              Ajouter un expert
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experts.map((expert) => (
              <ExpertCard key={expert.id} expert={expert} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
