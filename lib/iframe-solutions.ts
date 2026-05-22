/**
 * Solutions pour débloquer les iframes bloquées
 */

export const IFRAME_SOLUTIONS = {
  // 1. Proxy API - Enlève les headers restrictifs
  proxy: {
    name: "Proxy API",
    description: "Utilise une API backend pour enlever X-Frame-Options et CSP",
    implementation: `
      <iframe
        src="/api/proxy-iframe?url=https://restafy.example.com"
        sandbox="allow-same-origin allow-scripts allow-forms"
      />
    `,
    pros: ["Fonctionne avec la plupart des sites", "Contrôle total"],
    cons: ["Nécessite un backend", "Plus lent"],
  },

  // 2. Fetch + innerHTML - Charge le contenu et l'injecte
  fetchAndInject: {
    name: "Fetch + innerHTML",
    description: "Récupère le contenu via fetch et l'injecte dans la page",
    implementation: `
      fetch('/api/proxy-iframe?url=https://restafy.example.com')
        .then(r => r.text())
        .then(html => document.getElementById('container').innerHTML = html)
    `,
    pros: ["Simple", "Pas de CORS"],
    cons: ["Perd l'isolation de l'iframe", "Scripts peuvent affecter la page"],
  },

  // 3. Service Worker - Intercepte les requêtes
  serviceWorker: {
    name: "Service Worker",
    description: "Intercepte et modifie les réponses des requêtes",
    implementation: `
      // Dans le Service Worker
      fetch(event.request).then(response => {
        const newResponse = new Response(response.body, response)
        newResponse.headers.delete('X-Frame-Options')
        newResponse.headers.delete('Content-Security-Policy')
        return newResponse
      })
    `,
    pros: ["Fonctionne hors ligne", "Très flexible"],
    cons: ["Complexe à setup", "Nécessite HTTPS"],
  },

  // 4. Sandbox attributes - Utilise les attributs sandbox
  sandbox: {
    name: "Sandbox Attributes",
    description: "Utilise les attributs sandbox pour contrôler les permissions",
    implementation: `
      <iframe
        src="https://restafy.example.com"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation allow-presentation"
        allow="payment; geolocation; camera; microphone"
      />
    `,
    pros: ["Sécurisé", "Natif aux navigateurs"],
    cons: ["Certains sites blocages quand-même"],
  },

  // 5. JSONP Proxy - Pour les APIs
  jsonp: {
    name: "JSONP Proxy",
    description: "Utilise JSONP pour bypasser les CORS",
    implementation: `
      fetch('/api/jsonp-proxy?url=...')
        .then(r => r.json())
        .then(data => loadContent(data))
    `,
    pros: ["Bypass CORS"],
    cons: ["Seulement pour APIs JSON"],
  },

  // 6. Window.open - Ouvre dans une nouvelle fenêtre
  windowOpen: {
    name: "window.open()",
    description: "Ouvre le contenu dans une nouvelle fenêtre/tab",
    implementation: `
      <button onClick={() => window.open('https://restafy.example.com')}>
        Ouvrir Restafy
      </button>
    `,
    pros: ["Aucun blocage", "Simple"],
    cons: ["Pas intégré à la page"],
  },
}

/**
 * Checker pour identifier le type de blocage
 */
export async function checkIframeBlockage(url: string): Promise<string[]> {
  const issues: string[] = []

  try {
    const response = await fetch(url, { method: "HEAD" })
    const headers = response.headers

    if (headers.has("x-frame-options")) {
      issues.push(`X-Frame-Options: ${headers.get("x-frame-options")}`)
    }

    if (headers.has("content-security-policy")) {
      const csp = headers.get("content-security-policy")
      if (csp?.includes("frame-ancestors")) {
        issues.push(`CSP frame-ancestors détecté`)
      }
    }

    if (!response.ok) {
      issues.push(`HTTP ${response.status}`)
    }
  } catch (error) {
    issues.push(`Erreur de fetch: ${error}`)
  }

  if (issues.length === 0) {
    issues.push("Aucun blocage détecté (mais l'iframe peut quand-même être bloquée par le navigateur)")
  }

  return issues
}
