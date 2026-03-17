import { useState } from 'react'

const API_BASE = import.meta.env.VITE_CALENDAR_API_URL || ''

export function useCalendarAdvice() {
  const [advice, setAdvice] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getAdvice = async (events) => {
    if (!API_BASE) {
      setError('Backend URL not set. Add VITE_CALENDAR_API_URL to .env (see projects/calendar-llm/README.md).')
      return
    }
    setLoading(true)
    setError(null)
    setAdvice(null)
    try {
      const res = await fetch(`${API_BASE}/advice`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ events: events || [] }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.detail || data.error || `Request failed (${res.status})`)
        return
      }
      setAdvice(data.advice || '')
    } catch (err) {
      setError(err.message || 'Network error')
    } finally {
      setLoading(false)
    }
  }

  const clear = () => {
    setAdvice(null)
    setError(null)
  }

  return { advice, loading, error, getAdvice, clear, hasApiUrl: !!API_BASE }
}
