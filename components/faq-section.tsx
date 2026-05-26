"use client"

import { useState } from "react"

const faqs = [
  {
    question: "Dois-je payer d'avance ?",
    answer: "Non. Vous payez seulement après avoir validé et approuvé votre site. C'est vous qui décidez si c'est satisfaisant. Zéro avance, zéro risque.",
  },
  {
    question: "Quel est le délai de livraison ?",
    answer: "Entre 2 et 4 semaines selon la complexité du projet. Nous livrons rapidement sans sacrifier la qualité. Les délais sont définis lors du devis.",
  },
  {
    question: "Le SEO est-il inclus ?",
    answer: "Oui, le SEO de base est inclus dans toutes les offres : structure, performance, métadonnées. Pour un SEO avancé avec stratégie de contenu, nous proposons une prestation complémentaire.",
  },
  {
    question: "Que se passe-t-il après la livraison ?",
    answer: "Support gratuit inclus les premiers mois selon l'offre. Au-delà, vous pouvez souscrire à un forfait de maintenance mensuel à prix abordable.",
  },
  {
    question: "Puis-je modifier mon site après livraison ?",
    answer: "Oui. Vous recevez tous les accès et une formation pour gérer votre contenu facilement. Votre site vous appartient entièrement.",
  },
  {
    question: "Avez-vous des exemples de réalisations ?",
    answer: "Oui, une dizaine de projets réalisés avec succès. Contactez-nous pour voir les références et les études de cas détaillées selon votre secteur.",
  },
]

export function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section className="py-32 bg-[#070f1e]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full border border-primary/30 text-primary text-xs font-semibold uppercase tracking-widest mb-5">
            FAQ
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Questions fréquentes
          </h2>
          <p className="mt-5 text-lg text-muted max-w-xl mx-auto leading-relaxed">
            Tout ce que vous devez savoir avant de démarrer votre projet.
          </p>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-xl border transition-all duration-200 ${
                activeIndex === index
                  ? "border-primary/30 bg-[#0c1628]"
                  : "border-white/7 bg-[#0c1628] hover:border-white/15"
              }`}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
              >
                <span className="text-sm sm:text-base font-medium text-foreground">
                  {faq.question}
                </span>
                <span className={`flex-shrink-0 w-5 h-5 text-primary transition-transform duration-200 ${activeIndex === index ? "rotate-45" : ""}`}>
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </span>
              </button>

              {activeIndex === index && (
                <div className="px-6 pb-5 border-t border-white/5">
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
