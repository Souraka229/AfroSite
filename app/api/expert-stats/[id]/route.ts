import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()

    const { data: projects, error } = await supabase
      .from("projets")
      .select("id, statut")
      .eq("expert_id", params.id)

    if (error) {
      return NextResponse.json({ projectCount: 0, completedCount: 0 })
    }

    const projectCount = projects?.length || 0
    const completedCount =
      projects?.filter((p) => p.statut === "termine").length || 0

    return NextResponse.json({
      projectCount,
      completedCount,
      ongoingCount: projectCount - completedCount,
    })
  } catch (error) {
    console.error("Error fetching expert stats:", error)
    return NextResponse.json({ projectCount: 0, completedCount: 0 })
  }
}
