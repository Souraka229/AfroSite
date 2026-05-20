import { createClient } from "@/lib/supabase/server"
import { NouveauProjetForm } from "./form"

async function getData() {
  const supabase = await createClient()
  
  const [clientsRes, expertsRes] = await Promise.all([
    supabase.from("clients").select("*").order("nom"),
    supabase.from("experts").select("*").order("prenom"),
  ])

  return {
    clients: clientsRes.data || [],
    experts: expertsRes.data || [],
  }
}

export default async function NouveauProjetPage() {
  const { clients, experts } = await getData()

  return <NouveauProjetForm clients={clients} experts={experts} />
}
