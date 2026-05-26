import { createClient } from '@supabase/supabase-js';

const url = "https://qopdjxnktryuhclbwdej.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvcGRqeG5rdHJ5dWhjbGJ3ZGVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyOTUyMTAsImV4cCI6MjA5NDg3MTIxMH0.c_3HYzoWnAOoZC2zxPPckG1USBGqyo37GHDZkiG7RK8";

const supabase = createClient(url, key);

const projects = [
  {
    nom: 'Restaurant Elite',
    description: 'Site de réservation avec menu interactif et système de booking',
    statut: 'termine',
    image_url: 'https://api.dicebear.com/7.x/initials/svg?seed=RE&backgroundColor=22d3ee&size=200',
    categorie: 'Restaurant',
    url_site: 'https://restaurant-elite.example.com',
  },
  {
    nom: 'E-Commerce Mode',
    description: 'Boutique en ligne avec paiement sécurisé et gestion de stocks',
    statut: 'termine',
    image_url: 'https://api.dicebear.com/7.x/initials/svg?seed=EC&backgroundColor=0f172a&size=200',
    categorie: 'E-Commerce',
    url_site: 'https://ecommerce-mode.example.com',
  },
  {
    nom: 'Portfolio Dev',
    description: 'Site portfolio pour développeur avec galerie de projets',
    statut: 'termine',
    image_url: 'https://api.dicebear.com/7.x/initials/svg?seed=PD&backgroundColor=10b981&size=200',
    categorie: 'Portfolio',
    url_site: 'https://portfolio-dev.example.com',
  },
  {
    nom: 'Agence Marketing',
    description: 'Site vitrine agence marketing avec cas clients et services',
    statut: 'termine',
    image_url: 'https://api.dicebear.com/7.x/initials/svg?seed=AM&backgroundColor=f97316&size=200',
    categorie: 'Vitrine',
    url_site: 'https://agence-marketing.example.com',
  },
  {
    nom: 'Blog Tech',
    description: 'Blog technologie avec système de commentaires et newsletter',
    statut: 'termine',
    image_url: 'https://api.dicebear.com/7.x/initials/svg?seed=BT&backgroundColor=8b5cf6&size=200',
    categorie: 'Blog',
    url_site: 'https://blog-tech.example.com',
  },
  {
    nom: 'Consulting Finance',
    description: 'Site consulting finance avec calculateurs et formulaires avancés',
    statut: 'termine',
    image_url: 'https://api.dicebear.com/7.x/initials/svg?seed=CF&backgroundColor=06b6d4&size=200',
    categorie: 'Services',
    url_site: 'https://consulting-finance.example.com',
  },
];

async function addProjects() {
  try {
    const { data, error } = await supabase
      .from('projets')
      .insert(projects)
      .select();

    if (error) throw error;
    console.log('Projets ajoutés:', data.length);
    data.forEach(p => console.log(`✓ ${p.nom}`));
  } catch (err) {
    console.error('Erreur:', err.message);
  }
}

addProjects();
