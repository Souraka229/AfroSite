"use client"

import { useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

function generateSessionId(): string {
  const stored = typeof window !== "undefined" ? sessionStorage.getItem("afrosite_session") : null
  if (stored) return stored
  const id = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  if (typeof window !== "undefined") {
    sessionStorage.setItem("afrosite_session", id)
  }
  return id
}

export function useAnalytics() {
  const supabase = createClient()

  useEffect(() => {
    const sessionId = generateSessionId()
    
    // Track page view
    const trackPageView = async () => {
      try {
        await supabase.from("page_views").insert({
          page: window.location.pathname,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent,
          session_id: sessionId,
        })
      } catch (error) {
        console.error("Error tracking page view:", error)
      }
    }

    trackPageView()
  }, [supabase])

  const trackInteraction = async (eventType: string, element: string, metadata?: Record<string, unknown>) => {
    const sessionId = generateSessionId()
    try {
      await supabase.from("interactions").insert({
        session_id: sessionId,
        event_type: eventType,
        element,
        page: window.location.pathname,
        metadata: metadata || null,
      })
    } catch (error) {
      console.error("Error tracking interaction:", error)
    }
  }

  return { trackInteraction }
}
