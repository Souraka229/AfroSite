"use client"

import { useState } from "react"

export function FAQSection() {
  const faqs = [
    {
      question: "Je dois payer d'avance?",
      answer: "Non. Vous payez seulement après validation et approbation complète de votre site. C'est vous qui décidez si c'est satisfaisant. Zéro risque."
    },
    {
      question: "Quel est le délai de livraison?",
      answer: "Entre 2 à 4 semaines selon la complexité du projet. Nous livrons rapidement mais avec qualité. Les délais sont discutés lors du devis."
    },
    {
      question: "Pouvez-vous faire le SEO?",
      answer: "Oui, le SEO de base est inclus (structure, performance, metadata). Pour un SEO avancé, nous pouvons vous aider avec une stratégie complémentaire."
    },
    {
      question: "Et après la livraison?",
      answer: "Nous offrions du support gratuit les premiers mois. Au-delà, vous pouvez souscrire à un forfait de maintenance mensuel très abordable."
    },
    {
      question: "Puis-je modifier mon site après?",
      answer: "Bien sûr! Vous recevrez les identifiants et aurez accès complet. Nous vous formons à modifier votre site facilement."
    },
    {
      question: "Avez-vous une portfolio?",
      answer: "Oui, une dizaine de projets réalisés avec succès. Contactez-nous pour voir les références et études de cas détaillées."
    }
  ]

  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section className="py-32 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            FAQ
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
            Questions Fréquentes
          </h2>
          <p className="mt-6 text-lg text-muted text-pretty max-w-xl mx-auto">
            Les réponses à vos questions les plus courantes sur nos services.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-3xl space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border border-border bg-white overflow-hidden transition-all hover:border-primary/30 hover:shadow-md"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full px-6 sm:px-8 py-5 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <h3 className="text-base sm:text-lg font-semibold text-foreground">{faq.question}</h3>
                <svg
                  className={`h-5 w-5 text-primary flex-shrink-0 ml-4 transition-transform ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {activeIndex === index && (
                <div className="px-6 sm:px-8 pb-5 border-t border-border bg-slate-50">
                  <p className="text-sm sm:text-base text-muted leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
