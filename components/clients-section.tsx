import Image from "next/image"

interface Client {
  id: string
  nom: string
  image_url?: string
  categorie?: string
}

interface ClientsSectionProps {
  clients: Client[]
}

export function ClientsSection({ clients }: ClientsSectionProps) {
  if (!clients || clients.length === 0) return null

  const items = clients.length < 4 ? [...clients, ...clients, ...clients] : clients
  const doubled = [...items, ...items]

  return (
    <section className="py-12 border-y border-border bg-white overflow-hidden" data-animate>
      <p className="text-center text-xs font-semibold text-muted uppercase tracking-widest mb-8 px-4">
        Ils nous ont confié leur présence en ligne
      </p>

      <div className="relative">
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-white to-transparent z-10" />
        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex marquee-track">
          {doubled.map((client, i) => (
            <div
              key={`${client.id}-${i}`}
              className="flex-shrink-0 flex items-center gap-2.5 mx-5 px-5 py-2.5 rounded-xl border border-border bg-white"
            >
              {client.image_url && (
                <div className="relative w-7 h-7 flex-shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={client.image_url}
                    alt={client.nom}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <span className="text-sm font-semibold text-foreground/75 whitespace-nowrap">
                {client.nom}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
