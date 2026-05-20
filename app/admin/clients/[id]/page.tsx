import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { EditClientForm } from "./edit-form"

async function getClient(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .single()
  
  if (error || !data) {
    return null
  }
  
  return data
}

export default async function EditClientPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const client = await getClient(id)

  if (!client) {
    notFound()
  }

  return <EditClientForm client={client} />
}
