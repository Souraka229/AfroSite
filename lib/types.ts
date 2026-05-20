export interface Expert {
  id: string
  nom: string
  prenom: string
  role: string
  description: string | null
  competences: string[]
  avatar_color: string
  email: string | null
  linkedin: string | null
  created_at: string
  updated_at: string
}

export interface Client {
  id: string
  nom: string
  email: string
  telephone: string | null
  entreprise: string | null
  created_at: string
  updated_at: string
}

export interface Projet {
  id: string
  client_id: string
  expert_id: string | null
  nom: string
  description: string | null
  statut: 'en_attente' | 'en_cours' | 'termine' | 'annule'
  date_debut: string | null
  date_fin: string | null
  prix: number | null
  created_at: string
  updated_at: string
  client?: Client
  expert?: Expert
}

export interface Fichier {
  id: string
  projet_id: string
  nom: string
  type: string
  contenu: string | null
  url: string | null
  taille: number | null
  created_at: string
  updated_at: string
}
