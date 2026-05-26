import { AdminSidebar } from "@/components/admin-sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <AdminSidebar />
      <div className="pl-60">
        <main className="min-h-screen p-8 max-w-6xl">{children}</main>
      </div>
    </div>
  )
}
