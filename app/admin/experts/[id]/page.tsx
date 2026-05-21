import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { EditExpertForm } from "./edit-form"

async function getExpertData(id: string) {
  const supabase = await createClient()

  const [expertRes, projectsRes] = await Promise.all([
    supabase.from("experts").select("*").eq("id", id).single(),
    supabase
      .from("projets")
      .select("id, nom, statut, created_at")
      .eq("expert_id", id)
      .order("created_at", { ascending: false }),
  ])

  return {
    expert: expertRes.data,
    projects: projectsRes.data || [],
  }
}

export default async function ExpertProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { expert, projects } = await getExpertData(id)

  if (!expert) {
    notFound()
  }

  const completedProjects = projects.filter((p) => p.statut === "termine").length
  const ongoingProjects = projects.filter((p) => p.statut === "en_cours").length

  return (
    <div className="space-y-8">
      {/* Retour */}
      <a
        href="/admin/team"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Retour à l'équipe
      </a>

      {/* Grid principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profil */}
        <div className="lg:col-span-2">
          <EditExpertForm expert={expert} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Info rapide */}
          <div className="rounded-xl border border-border bg-white p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Profil</h3>
            <div className="space-y-4">
              {/* Avatar */}
              <div className="flex justify-center mb-4">
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-full text-3xl font-bold text-white"
                  style={{
                    background: `linear-gradient(135deg, ${expert.avatar_color}, ${expert.avatar_color}dd)`,
                  }}
                >
                  {expert.prenom.charAt(0)}{expert.nom.charAt(0)}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted uppercase mb-1">Nom</p>
                <p className="font-semibold text-foreground">
                  {expert.prenom} {expert.nom}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted uppercase mb-1">Rôle</p>
                <p className="font-semibold text-primary">{expert.role}</p>
              </div>

              {expert.email && (
                <div>
                  <p className="text-xs font-semibold text-muted uppercase mb-1">Email</p>
                  <a href={`mailto:${expert.email}`} className="text-sm text-primary hover:underline break-all">
                    {expert.email}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="rounded-xl border border-border bg-white p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">📊 Statistiques</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                <span className="text-sm font-medium text-foreground">Projets</span>
                <span className="text-2xl font-bold text-primary">{projects.length}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
                <span className="text-sm font-medium text-green-900">Livrés</span>
                <span className="text-2xl font-bold text-green-600">{completedProjects}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
                <span className="text-sm font-medium text-blue-900">En cours</span>
                <span className="text-2xl font-bold text-blue-600">{ongoingProjects}</span>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="rounded-xl border border-border bg-white p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">🏆 Badges</h3>
            <div className="space-y-2">
              {completedProjects >= 10 && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                  <span className="text-lg">🏆</span>
                  <div>
                    <p className="text-sm font-bold text-yellow-900">Expert</p>
                    <p className="text-xs text-yellow-700">{completedProjects} projets livrés</p>
                  </div>
                </div>
              )}
              {completedProjects >= 5 && completedProjects < 10 && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="text-lg">📈</span>
                  <div>
                    <p className="text-sm font-bold text-blue-900">Senior</p>
                    <p className="text-xs text-blue-700">{completedProjects} projets livrés</p>
                  </div>
                </div>
              )}
              {projects.length > 0 && completedProjects === projects.length && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-200">
                  <span className="text-lg">✅</span>
                  <div>
                    <p className="text-sm font-bold text-green-900">100% Taux</p>
                    <p className="text-xs text-green-700">Tous les projets livrés</p>
                  </div>
                </div>
              )}
              {projects.length === 0 && (
                <p className="text-sm text-muted">Pas encore de badges</p>
              )}
            </div>
          </div>

          {/* Projets récents */}
          {projects.length > 0 && (
            <div className="rounded-xl border border-border bg-white p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">📁 Projets récents</h3>
              <div className="space-y-2">
                {projects.slice(0, 5).map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{project.nom}</p>
                      <p className="text-xs text-muted">
                        {new Date(project.created_at).toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      project.statut === "termine"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      {project.statut === "termine" ? "✓" : "⏳"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
