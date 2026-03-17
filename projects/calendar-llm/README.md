# Calendar Coach

Connect your Google Calendar and get AI-powered time management advice.

- **Same Netlify site:** frontend runs at `/projects/calendar-llm/`
- **Google Calendar:** read-only, OAuth in the browser
- **Backend:** **Python (FastAPI)** in `backend/` — deploy to Render, Railway, or Fly.io. It calls OpenAI for advice.

## Setup

### 1. Google Calendar API (for “Connect Google Calendar”)

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create or select a project → **APIs & Services** → **Library** → enable **Google Calendar API**.
3. **APIs & Services** → **Credentials** → **Create credentials** → **OAuth client ID**.
4. Application type: **Web application**.
5. Under **Authorized JavaScript origins** add:
   - `http://localhost:5173` (local dev)
   - `https://YOUR-NETLIFY-SITE.netlify.app` (production)
6. Copy the **Client ID**.

Add to `.env` in this folder (`projects/calendar-llm/`):

```env
VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
```

For **production**, add the same in Netlify: **Site settings** → **Environment variables**, then redeploy.

### 2. Python backend (for “Get AI advice”)

The backend is in **`backend/`** at the repo root. It’s a FastAPI app that calls OpenAI.

- **Run locally:** see `backend/README.md`. Example:  
  `cd backend && pip install -r requirements.txt && OPENAI_API_KEY=sk-... uvicorn main:app --reload --port 8000`
- **Deploy:** use Render, Railway, or Fly.io (see `backend/README.md`). Set `OPENAI_API_KEY` on the host.
- **Frontend:** point the app at your backend URL with:

```env
VITE_CALENDAR_API_URL=http://localhost:8000
```

For production, set `VITE_CALENDAR_API_URL` to your deployed backend URL (e.g. `https://calendar-coach-api.onrender.com`) in Netlify env and redeploy.

## Run locally

```bash
cd projects/calendar-llm
npm install
npm run dev
```

Open `http://localhost:5173/projects/calendar-llm/`.

To use “Get AI advice”, run the Python backend (see above) and set `VITE_CALENDAR_API_URL=http://localhost:8000` in `projects/calendar-llm/.env`.

## Build

From repo root, `npm run build` builds the portfolio and all projects. This app ends up in `dist/projects/calendar-llm/`.
