"use client"

import { QuoteForm } from "./quote-form"
import { Mail, Phone, MapPin } from "lucide-react"

export function ContactSection() {
  return (
    <section id="devis" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Left: Info */}
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Contact</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6 text-balance">
              Demandez votre devis gratuit
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Parlez-nous de votre projet et recevez une estimation personnalisee sous 24-48h. 
              Aucun engagement, juste une conversation pour comprendre vos besoins.
            </p>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Email</h4>
                  <a 
                    href="mailto:souraka@restafy.shop" 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    souraka@restafy.shop
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Telephone</h4>
                  <p className="text-muted-foreground">+229 XX XX XX XX</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Localisation</h4>
                  <p className="text-muted-foreground">Seme City, Benin</p>
                  <p className="text-sm text-primary">La future Silicon Valley d&apos;Afrique</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-card border border-border rounded-2xl p-8 lg:p-10">
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>
  )
}
