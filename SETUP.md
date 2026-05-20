# AfroSite - Configuration et Démarrage

## Variables d'Environnement

Le fichier `.env.local` a été créé à la racine du projet. Vous devez ajouter vos variables Supabase:

```
SUPABASE_URL=votre_supabase_url
NEXT_PUBLIC_SUPABASE_URL=votre_supabase_url
SUPABASE_ANON_KEY=votre_anon_key
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_anon_key
SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key
SUPABASE_JWT_SECRET=votre_jwt_secret
```

### Comment obtenir ces clés:

1. Allez à [supabase.com](https://supabase.com)
2. Ouvrez votre projet
3. Allez dans **Settings** → **API**
4. Copiez:
   - **Project URL** → `SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `SUPABASE_ANON_KEY` et `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret** → `SUPABASE_SERVICE_ROLE_KEY`

## Pages et Routes

### Frontend (Public)
- **/** - Page d'accueil avec le site vitrine AfroSite (iframe)
- **/admin/login** - Connexion administrateur

### Admin (Protégé par authentification)
- **/admin** - Tableau de bord principal
- **/admin/dashboard** - Vue complète avec:
  - Demandes de devis (réception)
  - Analytics (page views)
  - Interactions des visiteurs
  - Statistiques en temps réel

### Auth
- **/auth/sign-up** - Créer un compte admin
- **/auth/callback** - Callback d'authentification
- **/auth/error** - Page d'erreur d'authentification

## Utilisateurs Administrateurs

Trois utilisateurs administrateurs sont pré-configurés:

1. **Souraka HAMIDA** (CEO & Fondateur)
   - Email: souraka@restafy.shop

2. **DAGA Bienvenu** (Design UI/UX)
   - Email: bienvenu@afrosite.bj

3. **CHITOU Hamdaane** (Developer & Cybersecurity)
   - Email: hamdaane@afrosite.bj

Pour accéder au dashboard:
1. Allez à `/auth/sign-up`
2. Créez un compte avec l'un des emails ci-dessus
3. Confirmez votre email
4. Connectez-vous à `/admin/login`

## Fonctionnalités

### Dashboard Admin
- **Demandes de Devis**: Reçoive et gérez les demandes des clients
- **Analytics**: Suivez les pages visitées, les visiteurs uniques
- **Interactions**: Traquez les clics, les formulaires remplis
- **Statistiques**: Vue d'ensemble en temps réel

### Site Vitrine
- Page d'accueil professionnelle
- Section services
- Section experts (affiche les 3 administrateurs)
- Formulaire de demande de devis
- Contact (email + WhatsApp)

## Commandes

```bash
# Installation des dépendances
pnpm install

# Lancer le serveur de développement
pnpm dev

# Build pour la production
pnpm build

# Lancer la production
pnpm start
```

## Architecture

```
/vercel/share/v0-project/
├── app/
│   ├── admin/          # Pages admin protégées
│   ├── auth/           # Pages d'authentification
│   ├── page.tsx        # Page d'accueil (iframe)
│   ├── layout.tsx      # Layout principal
│   └── globals.css     # Styles globaux
├── lib/
│   ├── supabase/       # Clients Supabase
│   └── data.ts         # Data constants
├── hooks/
│   └── use-analytics.ts # Hook pour le tracking
├── components/         # Composants réutilisables
├── public/
│   └── index.html      # HTML du site vitrine
├── .env.local          # Variables d'environnement
└── middleware.ts       # Middleware Supabase
```

## Dépannage

### Erreur: "Environment variables are not set"
→ Vérifiez que le fichier `.env.local` existe et contient les bonnes clés

### Erreur: "User is not admin"
→ Assurez-vous d'utiliser un email admin (souraka@restafy.shop, etc.)

### Formulaire de devis ne fonctionne pas
→ Vérifiez que Supabase est correctement connecté et que la table `project_requests` existe

## Support

Pour toute question ou erreur, contactez:
- Email: souraka@restafy.shop
- WhatsApp: +229 55 53 08 26
