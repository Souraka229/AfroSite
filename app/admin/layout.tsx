import { AdminSidebar } from "@/components/admin-sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <div className="pl-64">
        <main className="min-h-screen p-8">{children}</main>
      </div>
    </div>
  )
}
