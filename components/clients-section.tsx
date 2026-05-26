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

  return (
    <section className="py-14 border-y border-border bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <p className="text-center text-xs font-semibold text-muted uppercase tracking-widest mb-10">
          Ils nous ont confié leur présence en ligne
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
          {clients.map((client) => (
            <div
              key={client.id}
              className="group flex items-center gap-3 px-5 py-3 rounded-xl border border-border bg-white hover:border-foreground/20 hover:shadow-sm transition-all"
            >
              {client.image_url && (
                <div className="relative w-8 h-8 flex-shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={client.image_url}
                    alt={client.nom}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <span className="text-sm font-semibold text-foreground/80 group-hover:text-foreground transition-colors whitespace-nowrap">
                {client.nom}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
