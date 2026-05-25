"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Loader2, BarChart3, FileText, LogOut } from "lucide-react"
import Link from "next/link"

export default function AdminPage() {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push("/admin/login")
      }
    }

    checkAuth()
  }, [router, supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-black">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">AfroSite Admin</h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-red-800 text-red-400 hover:bg-red-950"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Projects Card */}
          <Link href="/admin/dashboard">
            <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-8 hover:border-amber-500/50 transition cursor-pointer h-full">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-amber-500/10 rounded-lg">
                  <FileText className="w-6 h-6 text-amber-500" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Demandes de Devis</h2>
              <p className="text-zinc-400 mb-4">
                Gérez toutes les demandes de devis reçues des clients
              </p>
              <div className="flex items-center text-amber-500 font-semibold">
                Accéder au tableau de bord
                <span className="ml-2">→</span>
              </div>
            </div>
          </Link>

          {/* Analytics Card */}
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-8 h-full">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Analytics</h2>
            <p className="text-zinc-400 mb-4">
              Consultez les statistiques et interactions des visiteurs
            </p>
            <div className="flex items-center text-blue-500 font-semibold">
              Les données s'affichent dans le tableau de bord
              <span className="ml-2">→</span>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-zinc-900 rounded-lg border border-zinc-800 p-8">
          <h3 className="text-lg font-bold text-white mb-4">Bienvenue sur le Dashboard AfroSite</h3>
          <ul className="space-y-2 text-zinc-400">
            <li className="flex items-start">
              <span className="text-amber-500 mr-3">✓</span>
              <span>Consultez et gérez toutes les demandes de devis</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-500 mr-3">✓</span>
              <span>Suivez les analytics et interactions des visiteurs</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-500 mr-3">✓</span>
              <span>Approuvez ou rejetez les projets</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-500 mr-3">✓</span>
              <span>Accédez aux données complètes de votre agence</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
