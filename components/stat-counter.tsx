"use client"

import { useEffect, useRef, useState } from "react"

interface StatCounterProps {
  value: number
  suffix?: string
  className?: string
}

export function StatCounter({ value, suffix = "", className }: StatCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1400
          const steps = Math.floor(duration / 16)
          let step = 0
          const timer = setInterval(() => {
            step++
            const progress = step / steps
            const eased = 1 - Math.pow(1 - progress, 4)
            setCount(Math.round(eased * value))
            if (step >= steps) {
              setCount(value)
              clearInterval(timer)
            }
          }, 16)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={ref} className={className}>
      {count}{suffix}
    </span>
  )
}
