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
    <section className="py-24 bg-secondary">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Questions Fréquentes
          </h2>
          <p className="mt-4 text-base text-muted text-pretty">
            Les réponses à vos questions les plus courantes.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-3xl space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded border border-border bg-white overflow-hidden transition-all"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-secondary transition-colors"
              >
                <h3 className="text-sm font-semibold text-foreground">{faq.question}</h3>
                <svg
                  className={`h-5 w-5 text-muted transition-transform ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {activeIndex === index && (
                <div className="px-6 pb-4 border-t border-border">
                  <p className="text-xs text-muted leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
