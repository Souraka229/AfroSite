"use client"

import { experts } from "@/lib/data"
import { Linkedin, Twitter, Mail } from "lucide-react"

export function ExpertsSection() {
  return (
    <section id="experts" className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Notre Equipe</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6 text-balance">
            Les experts derriere AfroSite
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Une equipe passionnee et multidisciplinaire, dediee a la reussite de vos projets digitaux.
          </p>
        </div>

        {/* Experts Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {experts.map((expert) => (
            <div
              key={expert.id}
              className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 text-center"
            >
              {/* Avatar */}
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border-2 border-primary/30 group-hover:border-primary transition-colors">
                  <span className="text-4xl font-bold text-primary">
                    {expert.name.split(" ")[0][0]}
                    {expert.name.split(" ")[1]?.[0] || ""}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-card" />
              </div>

              {/* Info */}
              <h3 className="text-xl font-bold text-foreground mb-1">{expert.name}</h3>
              <p className="text-primary font-medium mb-4">{expert.role}</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">{expert.bio}</p>

              {/* Skills */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {expert.skills.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-4">
                <button className="p-2 rounded-lg bg-secondary hover:bg-primary/10 transition-colors">
                  <Linkedin className="w-4 h-4 text-muted-foreground hover:text-primary" />
                </button>
                <button className="p-2 rounded-lg bg-secondary hover:bg-primary/10 transition-colors">
                  <Twitter className="w-4 h-4 text-muted-foreground hover:text-primary" />
                </button>
                <button className="p-2 rounded-lg bg-secondary hover:bg-primary/10 transition-colors">
                  <Mail className="w-4 h-4 text-muted-foreground hover:text-primary" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
