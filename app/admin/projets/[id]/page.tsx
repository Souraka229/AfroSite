import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { EditProjetForm } from "./edit-form"

async function getData(id: string) {
  const supabase = await createClient()
  
  const [projetRes, clientsRes, expertsRes] = await Promise.all([
    supabase.from("projets").select("*").eq("id", id).single(),
    supabase.from("clients").select("*").order("nom"),
    supabase.from("experts").select("*").order("prenom"),
  ])

  return {
    projet: projetRes.data,
    clients: clientsRes.data || [],
    experts: expertsRes.data || [],
  }
}

export default async function EditProjetPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { projet, clients, experts } = await getData(id)

  if (!projet) {
    notFound()
  }

  return <EditProjetForm projet={projet} clients={clients} experts={experts} />
}
