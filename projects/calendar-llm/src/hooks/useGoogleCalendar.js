import { useState, useCallback } from 'react'

const CALENDAR_SCOPE = 'https://www.googleapis.com/auth/calendar.readonly'
const CALENDAR_API = 'https://www.googleapis.com/calendar/v3'

function getClientId() {
  return import.meta.env.VITE_GOOGLE_CLIENT_ID || ''
}

export function useGoogleCalendar() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [connected, setConnected] = useState(false)

  const fetchEvents = useCallback(async (accessToken, options = {}) => {
    const { timeMin, timeMax, maxResults = 50 } = options
    const params = new URLSearchParams({
      singleEvents: 'true',
      orderBy: 'startTime',
      maxResults: String(maxResults),
    })
    if (timeMin) params.set('timeMin', new Date(timeMin).toISOString())
    if (timeMax) params.set('timeMax', new Date(timeMax).toISOString())

    const res = await fetch(
      `${CALENDAR_API}/calendars/primary/events?${params}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    )
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.error?.message || `Calendar API error: ${res.status}`)
    }
    const data = await res.json()
    return (data.items || []).map((e) => ({
      id: e.id,
      summary: e.summary || '(No title)',
      start: e.start?.dateTime || e.start?.date,
      end: e.end?.dateTime || e.end?.date,
      allDay: !!e.start?.date,
      calendarId: e.organizer?.email || 'primary',
    }))
  }, [])

  const connectAndLoad = useCallback(() => {
    const clientId = getClientId()
    if (!clientId) {
      setError('Google Client ID not set. Add VITE_GOOGLE_CLIENT_ID to your .env.')
      return
    }

    if (typeof window === 'undefined' || !window.google?.accounts?.oauth2) {
      setError('Google Sign-In script not loaded. Refresh the page.')
      return
    }

    setLoading(true)
    setError(null)

    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: CALENDAR_SCOPE,
      callback: async (response) => {
        if (response.error) {
          setError(response.error)
          setLoading(false)
          return
        }
        const token = response.access_token
        setConnected(true)
        try {
          const now = new Date()
          const weekEnd = new Date(now)
          weekEnd.setDate(weekEnd.getDate() + 7)
          const items = await fetchEvents(token, {
            timeMin: now.toISOString(),
            timeMax: weekEnd.toISOString(),
            maxResults: 30,
          })
          setEvents(items)
        } catch (err) {
          setError(err.message)
        } finally {
          setLoading(false)
        }
      },
    })
    client.requestAccessToken()
  }, [fetchEvents])

  const disconnect = useCallback(() => {
    if (window.google?.accounts?.oauth2?.revoke) {
      window.google.accounts.oauth2.revoke()
    }
    setEvents([])
    setConnected(false)
    setError(null)
  }, [])

  return {
    events,
    loading,
    error,
    connected,
    connectAndLoad,
    disconnect,
    refetch: connectAndLoad,
    hasClientId: !!getClientId(),
  }
}
