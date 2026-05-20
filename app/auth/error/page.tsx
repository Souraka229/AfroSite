"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const errorMessage = searchParams.get("message") || "Une erreur d'authentification est survenue"

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-red-500/10 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-500" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white mb-2">
            Erreur d'authentification
          </h1>
          <p className="text-zinc-400 mb-6">
            {errorMessage}
          </p>

          <div className="space-y-3">
            <Link href="/admin/login" className="block">
              <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à la connexion
              </Button>
            </Link>
            <Link href="/" className="block">
              <Button variant="outline" className="w-full border-zinc-700 text-white hover:bg-zinc-800">
                Retour à l'accueil
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
