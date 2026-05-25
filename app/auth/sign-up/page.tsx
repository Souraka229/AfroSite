"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Lock, Mail } from "lucide-react"
import Link from "next/link"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      setIsLoading(false)
      return
    }

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
            `${window.location.origin}/auth/callback`,
        },
      })

      if (signUpError) throw signUpError

      setSuccess(true)
      setEmail("")
      setPassword("")
      setConfirmPassword("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-8">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-amber-500/10 rounded-lg">
              <Lock className="w-6 h-6 text-amber-500" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white text-center mb-2">
            Créer un compte
          </h1>
          <p className="text-zinc-400 text-center mb-6">
            Admin AfroSite
          </p>

          {success ? (
            <div className="bg-green-900/20 border border-green-800 rounded-lg p-4 mb-6">
              <p className="text-green-400 text-sm">
                Vérifiez votre email pour confirmer votre compte
              </p>
            </div>
          ) : null}

          {error ? (
            <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 mb-6">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          ) : null}

          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white"
                disabled={isLoading || success}
                required
              />
            </div>

            <div>
              <Input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white"
                disabled={isLoading || success}
                required
              />
            </div>

            <div>
              <Input
                type="password"
                placeholder="Confirmer le mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white"
                disabled={isLoading || success}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading || success}
              className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Inscription...
                </>
              ) : (
                "S'inscrire"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-zinc-400">
            Vous avez déjà un compte?{" "}
            <Link href="/admin/login" className="text-amber-500 hover:text-amber-400">
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
