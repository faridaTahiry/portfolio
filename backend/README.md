# Calendar Coach API (Python)

FastAPI backend for the Calendar Coach project. It reads calendar events from the frontend and returns time-management advice using OpenAI.

## Run locally

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
export OPENAI_API_KEY=your-key-here
uvicorn main:app --reload --port 8000
```

API: http://localhost:8000  
- `POST /advice` — body `{ "events": [...] }`, returns `{ "advice": "..." }`  
- `GET /health` — health check

## Deploy (Python backend)

Netlify Functions don’t support Python, so deploy this backend to a Python-friendly host and point the frontend at it.

### Render

1. New → Web Service, connect your repo.
2. Root directory: `backend`
3. Build: `pip install -r requirements.txt`
4. Start: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add env var: `OPENAI_API_KEY`
6. Copy the service URL (e.g. `https://calendar-coach-api.onrender.com`).

### Railway / Fly.io

Same idea: set root to `backend`, run `uvicorn main:app --host 0.0.0.0 --port $PORT` (or the port the platform gives), set `OPENAI_API_KEY`.

## Frontend

In the **calendar-llm** frontend (or in Netlify env for production), set:

- `VITE_CALENDAR_API_URL=https://your-python-api.onrender.com`  
  (no trailing slash)

The app will send `POST {VITE_CALENDAR_API_URL}/advice` with the calendar events.
