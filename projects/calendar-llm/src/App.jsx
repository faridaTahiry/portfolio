import { useState } from 'react'
import { useGoogleCalendar } from './hooks/useGoogleCalendar'
import { useCalendarAdvice } from './hooks/useCalendarAdvice'
import './App.css'

function renderSimpleMarkdown(text) {
  if (!text) return null
  const lines = text.split('\n')
  return lines.map((line, i) => {
    const trimmed = line.trim()
    const withBold = trimmed.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    if (trimmed === '') return <br key={i} />
    return <p key={i} className="advice-paragraph" dangerouslySetInnerHTML={{ __html: withBold }} />
  })
}

function formatEventTime(start, end, allDay) {
  if (!start) return ''
  const s = new Date(start)
  if (allDay) return s.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
  const e = end ? new Date(end) : null
  const time = s.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
  const endTime = e ? e.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' }) : ''
  return `${s.toLocaleDateString(undefined, { weekday: 'short' })} ${time}${endTime ? ` – ${endTime}` : ''}`
}

function App() {
  const {
    events,
    loading: calendarLoading,
    error: calendarError,
    connected,
    connectAndLoad,
    disconnect,
    hasClientId,
  } = useGoogleCalendar()
  const { advice, loading: adviceLoading, error: adviceError, getAdvice, clear, hasApiUrl } = useCalendarAdvice()
  const [adviceRequested, setAdviceRequested] = useState(false)

  const handleGetAdvice = () => {
    setAdviceRequested(true)
    getAdvice(events)
  }

  return (
    <div className="app">
      <header className="header">
        <a href="/" className="back">← Portfolio</a>
        <h1>Calendar Coach</h1>
        <p className="tagline">Connect your calendar. Get AI-powered time management advice.</p>
      </header>

      <main className="main">
        <section className="card connect-card">
          <h2>1. Connect Google Calendar</h2>
          {!hasClientId && (
            <p className="hint">
              Add <code>VITE_GOOGLE_CLIENT_ID</code> to <code>.env</code> in this project (and in Netlify for production). See README.
            </p>
          )}
          {connected ? (
            <div className="connected">
              <span className="badge">Connected</span>
              <button type="button" className="btn btn-ghost" onClick={disconnect}>
                Disconnect
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={connectAndLoad}
              disabled={calendarLoading || !hasClientId}
            >
              {calendarLoading ? 'Connecting…' : 'Connect Google Calendar'}
            </button>
          )}
          {calendarError && <p className="error">{calendarError}</p>}
        </section>

        {connected && (
          <section className="card events-card">
            <h2>2. Your next 7 days</h2>
            {events.length === 0 && !calendarLoading && (
              <p className="muted">No upcoming events in the next week.</p>
            )}
            <ul className="event-list">
              {events.map((e) => (
                <li key={e.id} className="event-item">
                  <span className="event-title">{e.summary}</span>
                  <span className="event-time">{formatEventTime(e.start, e.end, e.allDay)}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {connected && (
          <section className="card advice-card">
            <h2>3. Get time management advice</h2>
            {!hasApiUrl && (
              <p className="hint">
                Set <code>VITE_CALENDAR_API_URL</code> to your Python backend URL (see README). Backend runs on Python (FastAPI).
              </p>
            )}
            <button
              type="button"
              className="btn btn-accent"
              onClick={handleGetAdvice}
              disabled={adviceLoading || events.length === 0 || !hasApiUrl}
            >
              {adviceLoading ? 'Thinking…' : 'Get AI advice'}
            </button>
            {adviceError && <p className="error">{adviceError}</p>}
            {adviceRequested && (advice || advice === '') && (
              <div className="advice-box">
                <h3>Your personalized advice</h3>
                <div className="advice-content">{renderSimpleMarkdown(advice)}</div>
                <button type="button" className="btn btn-ghost btn-sm" onClick={clear}>
                  Clear
                </button>
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="footer">
        <p>Uses Google Calendar (read-only) and an LLM for advice. Your calendar data is not stored.</p>
      </footer>
    </div>
  )
}

export default App
