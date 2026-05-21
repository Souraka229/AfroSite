import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { PricingSection } from "@/components/pricing-section"
import { WhyUsSection } from "@/components/why-us-section"
import { ExpertsSection } from "@/components/experts-section"
import { FAQSection } from "@/components/faq-section"
import { ContactSection } from "@/components/contact-section"
import { Expert } from "@/lib/types"

async function getExperts(): Promise<Expert[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("experts")
    .select("*")
    .order("created_at", { ascending: true })

  if (error) {
    console.error("Error fetching experts:", error)
    return []
  }

  return data || []
}

async function getProjects() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("projets")
    .select("id, nom, description, categorie, image_url, url_site")
    .eq("statut", "termine")
    .order("created_at", { ascending: false })
    .limit(6)

  if (error) {
    console.error("Error fetching projects:", error)
    return []
  }

  return data || []
}

export default async function HomePage() {
  const [experts, projects] = await Promise.all([
    getExperts(),
    getProjects(),
  ])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <PortfolioSection projects={projects} />
        <PricingSection />
        <WhyUsSection />
        <ExpertsSection experts={experts} />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
