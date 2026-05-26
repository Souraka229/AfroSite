import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { ExpertCard } from "@/components/expert-card"

async function getTeamData() {
  const supabase = await createClient()

  const [
    { data: experts },
    { count: totalClients },
    { count: totalProjects },
    { count: projetsTermines },
  ] = await Promise.all([
    supabase.from("experts").select("*").order("created_at", { ascending: true }),
    supabase.from("clients").select("id", { count: "exact", head: true }),
    supabase.from("projets").select("id", { count: "exact", head: true }),
    supabase.from("projets").select("id", { count: "exact", head: true }).eq("statut", "termine"),
  ])

  return {
    experts: experts || [],
    stats: {
      clients: totalClients || 0,
      projects: totalProjects || 0,
      projetsTermines: projetsTermines || 0,
    },
  }
}

export default async function TeamPage() {
  const { experts, stats } = await getTeamData()

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Équipe</h1>
          <p className="mt-1 text-sm text-muted">{experts.length} expert{experts.length !== 1 ? "s" : ""} dans l&apos;équipe</p>
        </div>
        <Link
          href="/admin/experts"
          className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-semibold text-white hover:bg-foreground/90 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Gérer les experts
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Experts", value: experts.length },
          { label: "Projets livrés", value: stats.projetsTermines },
          { label: "Clients satisfaits", value: stats.clients },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-white p-5">
            <p className="text-xs font-semibold text-muted uppercase tracking-wider">{s.label}</p>
            <p className="mt-2 text-4xl font-black text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Experts grid */}
      {experts.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-border p-16 text-center">
          <p className="text-sm text-muted mb-4">Aucun expert dans l&apos;équipe</p>
          <Link
            href="/admin/experts"
            className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-white hover:bg-foreground/90 transition-colors"
          >
            Ajouter un expert
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {experts.map((expert) => (
            <ExpertCard key={expert.id} expert={expert} />
          ))}
        </div>
      )}

    </div>
  )
}
