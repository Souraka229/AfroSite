import Link from "next/link"

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <div className="text-9xl font-black text-red-500/20 mb-4">403</div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Accès Refusé
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Vous n'avez pas la permission d'accéder à cette ressource.
          </p>
        </div>

        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-8 max-w-md">
          <p className="text-sm text-gray-400">
            Si vous croyez que c'est une erreur, veuillez contacter l'administrateur.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}
