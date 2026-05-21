import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import Link from "next/link"
import { FichiersManager } from "./fichiers-manager"

async function getData(id: string) {
  const supabase = await createClient()
  
  const [projetRes, fichiersRes] = await Promise.all([
    supabase.from("projets").select("*, clients(nom)").eq("id", id).single(),
    supabase.from("fichiers").select("*").eq("projet_id", id).order("created_at", { ascending: false }),
  ])

  return {
    projet: projetRes.data,
    fichiers: fichiersRes.data || [],
  }
}

export default async function FichiersPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { projet, fichiers } = await getData(id)

  if (!projet) {
    notFound()
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/projets"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Retour aux projets
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-foreground">Fichiers du projet</h1>
        <p className="mt-1 text-sm text-muted">
          Projet: <span className="font-medium text-foreground">{projet.nom}</span> - Client: <span className="font-medium text-foreground">{projet.clients?.nom}</span>
        </p>
      </div>

      <FichiersManager projetId={id} projetNom={projet.nom} initialFichiers={fichiers} />
    </div>
  )
}
