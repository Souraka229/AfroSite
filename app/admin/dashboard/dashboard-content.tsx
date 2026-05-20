"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  LogOut,
  Eye,
  MousePointerClick,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  RefreshCw,
} from "lucide-react"

interface Admin {
  id: string
  name: string
  role: string
  email: string
}

interface ProjectRequest {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  project_type: string
  budget: string | null
  description: string
  status: string
  created_at: string
}

interface PageView {
  id: string
  page: string
  referrer: string | null
  created_at: string
  session_id: string
}

interface Interaction {
  id: string
  event_type: string
  element: string
  page: string
  created_at: string
}

export function DashboardContent({ admin }: { admin: Admin }) {
  const [activeTab, setActiveTab] = useState<"overview" | "requests" | "analytics">("overview")
  const [requests, setRequests] = useState<ProjectRequest[]>([])
  const [pageViews, setPageViews] = useState<PageView[]>([])
  const [interactions, setInteractions] = useState<Interaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const [requestsRes, viewsRes, interactionsRes] = await Promise.all([
        supabase.from("project_requests").select("*").order("created_at", { ascending: false }),
        supabase.from("page_views").select("*").order("created_at", { ascending: false }).limit(100),
        supabase.from("interactions").select("*").order("created_at", { ascending: false }).limit(100),
      ])

      if (requestsRes.data) setRequests(requestsRes.data)
      if (viewsRes.data) setPageViews(viewsRes.data)
      if (interactionsRes.data) setInteractions(interactionsRes.data)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  const updateRequestStatus = async (id: string, status: string) => {
    try {
      await supabase
        .from("project_requests")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id)
      fetchData()
    } catch (error) {
      console.error("Error updating status:", error)
    }
  }

  const uniqueVisitors = new Set(pageViews.map((v) => v.session_id)).size
  const todayViews = pageViews.filter(
    (v) => new Date(v.created_at).toDateString() === new Date().toDateString()
  ).length
  const pendingRequests = requests.filter((r) => r.status === "pending").length

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border p-6 flex flex-col">
        <Link href="/" className="flex items-center gap-2 mb-10">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">A</span>
          </div>
          <span className="text-lg font-bold text-foreground">
            Afro<span className="text-primary">Site</span>
          </span>
        </Link>

        <nav className="flex-1 space-y-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "overview"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Vue d&apos;ensemble
          </button>
          <button
            onClick={() => setActiveTab("requests")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "requests"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            <FileText className="w-5 h-5" />
            Demandes
            {pendingRequests > 0 && (
              <span className="ml-auto bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded-full">
                {pendingRequests}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "analytics"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            Analytics
          </button>
        </nav>

        <div className="pt-6 border-t border-border">
          <div className="mb-4">
            <p className="font-medium text-foreground">{admin.name}</p>
            <p className="text-sm text-muted-foreground">{admin.role}</p>
          </div>
          <Button variant="outline" className="w-full" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Deconnexion
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {activeTab === "overview" && "Vue d'ensemble"}
              {activeTab === "requests" && "Demandes de Devis"}
              {activeTab === "analytics" && "Analytics"}
            </h1>
            <p className="text-muted-foreground">
              Bienvenue, {admin.name}
            </p>
          </div>
          <Button onClick={fetchData} variant="outline" disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Actualiser
          </Button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-muted-foreground">Total Demandes</span>
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-3xl font-bold text-foreground">{requests.length}</p>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-muted-foreground">En Attente</span>
                      <Clock className="w-5 h-5 text-yellow-500" />
                    </div>
                    <p className="text-3xl font-bold text-foreground">{pendingRequests}</p>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-muted-foreground">Visiteurs Uniques</span>
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-3xl font-bold text-foreground">{uniqueVisitors}</p>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-muted-foreground">Vues Aujourd&apos;hui</span>
                      <Eye className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-3xl font-bold text-foreground">{todayViews}</p>
                  </div>
                </div>

                {/* Recent Requests */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">
                    Demandes Recentes
                  </h2>
                  <div className="space-y-4">
                    {requests.slice(0, 5).map((request) => (
                      <div
                        key={request.id}
                        className="flex items-center justify-between p-4 bg-secondary rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-foreground">{request.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {request.project_type} - {request.email}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            request.status === "pending"
                              ? "bg-yellow-500/10 text-yellow-500"
                              : request.status === "approved"
                              ? "bg-green-500/10 text-green-500"
                              : "bg-red-500/10 text-red-500"
                          }`}
                        >
                          {request.status === "pending"
                            ? "En attente"
                            : request.status === "approved"
                            ? "Approuvee"
                            : "Rejetee"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Requests Tab */}
            {activeTab === "requests" && (
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-secondary">
                      <tr>
                        <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                          Client
                        </th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                          Projet
                        </th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                          Budget
                        </th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                          Statut
                        </th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {requests.map((request) => (
                        <tr key={request.id} className="hover:bg-secondary/50">
                          <td className="px-6 py-4">
                            <p className="font-medium text-foreground">{request.name}</p>
                            <p className="text-sm text-muted-foreground">{request.email}</p>
                            {request.company && (
                              <p className="text-sm text-muted-foreground">{request.company}</p>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-medium text-foreground">{request.project_type}</p>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {request.description}
                            </p>
                          </td>
                          <td className="px-6 py-4 text-foreground">
                            {request.budget || "Non specifie"}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 text-xs font-medium rounded-full ${
                                request.status === "pending"
                                  ? "bg-yellow-500/10 text-yellow-500"
                                  : request.status === "approved"
                                  ? "bg-green-500/10 text-green-500"
                                  : "bg-red-500/10 text-red-500"
                              }`}
                            >
                              {request.status === "pending"
                                ? "En attente"
                                : request.status === "approved"
                                ? "Approuvee"
                                : "Rejetee"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-green-500 hover:text-green-600 hover:bg-green-500/10"
                                onClick={() => updateRequestStatus(request.id, "approved")}
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                                onClick={() => updateRequestStatus(request.id, "rejected")}
                              >
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === "analytics" && (
              <div className="space-y-8">
                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-muted-foreground">Pages Vues</span>
                      <Eye className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-3xl font-bold text-foreground">{pageViews.length}</p>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-muted-foreground">Visiteurs Uniques</span>
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-3xl font-bold text-foreground">{uniqueVisitors}</p>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-muted-foreground">Interactions</span>
                      <MousePointerClick className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-3xl font-bold text-foreground">{interactions.length}</p>
                  </div>
                </div>

                {/* Page Views Table */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">
                    Pages les plus visitees
                  </h2>
                  <div className="space-y-3">
                    {Object.entries(
                      pageViews.reduce((acc, view) => {
                        acc[view.page] = (acc[view.page] || 0) + 1
                        return acc
                      }, {} as Record<string, number>)
                    )
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 5)
                      .map(([page, count]) => (
                        <div
                          key={page}
                          className="flex items-center justify-between p-3 bg-secondary rounded-lg"
                        >
                          <span className="text-foreground">{page}</span>
                          <span className="text-primary font-medium">{count} vues</span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Recent Interactions */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">
                    Interactions Recentes
                  </h2>
                  <div className="space-y-3">
                    {interactions.slice(0, 10).map((interaction) => (
                      <div
                        key={interaction.id}
                        className="flex items-center justify-between p-3 bg-secondary rounded-lg"
                      >
                        <div>
                          <span className="text-foreground font-medium">
                            {interaction.event_type}
                          </span>
                          <p className="text-sm text-muted-foreground">
                            {interaction.element} sur {interaction.page}
                          </p>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(interaction.created_at).toLocaleString("fr-FR")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
