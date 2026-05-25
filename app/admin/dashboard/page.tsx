import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardContent } from "./dashboard-content"

export default async function AdminDashboardPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/admin/login")
  }

  // Check if user is admin
  const { data: adminData } = await supabase
    .from("admins")
    .select("*")
    .eq("user_id", user.id)
    .single()

  if (!adminData) {
    redirect("/admin/login")
  }

  return <DashboardContent admin={adminData} />
}
