"use client"

import { useState } from "react"

const faqs = [
  {
    question: "Dois-je payer d'avance ?",
    answer: "Non. Vous payez seulement après avoir validé et approuvé votre site. Zéro avance, zéro risque.",
  },
  {
    question: "Quel est le délai de livraison ?",
    answer: "Entre 2 et 4 semaines selon la complexité du projet. Les délais sont définis ensemble lors du devis.",
  },
  {
    question: "Le SEO est-il inclus ?",
    answer: "Oui, le SEO de base est inclus : structure, performance, métadonnées. Pour un SEO avancé, nous proposons une prestation complémentaire.",
  },
  {
    question: "Que se passe-t-il après la livraison ?",
    answer: "Support gratuit inclus les premiers mois selon l'offre. Au-delà, forfait de maintenance mensuel à prix abordable.",
  },
  {
    question: "Puis-je modifier mon site après livraison ?",
    answer: "Oui. Vous recevez tous les accès et une formation pour gérer votre contenu facilement. Votre site vous appartient.",
  },
  {
    question: "Avez-vous des exemples de réalisations ?",
    answer: "Oui, une dizaine de projets réalisés. Contactez-nous pour voir les références selon votre secteur.",
  },
]

export function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section className="py-28 bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-foreground/5 text-foreground text-xs font-semibold uppercase tracking-widest mb-4">
            FAQ
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Questions fréquentes
          </h2>
          <p className="mt-5 text-lg text-muted">
            Tout ce que vous devez savoir avant de démarrer.
          </p>
        </div>

        <div className="divide-y divide-border border border-border rounded-xl overflow-hidden">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white">
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-[#f8fafc] transition-colors"
              >
                <span className="text-sm font-semibold text-foreground">{faq.question}</span>
                <svg
                  className={`w-4 h-4 text-muted flex-shrink-0 transition-transform duration-200 ${activeIndex === index ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {activeIndex === index && (
                <div className="px-6 pb-5 bg-[#f8fafc] border-t border-border">
                  <p className="pt-4 text-sm text-muted leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
