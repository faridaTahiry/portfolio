# Deploying to Netlify (one site, portfolio + projects)

Everything runs on **one Netlify site**—no extra sites or cost.

- **Portfolio:** `https://yoursite.netlify.app/`
- **Projects:** `https://yoursite.netlify.app/projects/demo/`, `/projects/my-app/`, etc.

## Deploy with Git (recommended)

1. **Install dependencies for the demo project** (only needed once, or when you add projects):
   ```bash
   cd projects/demo && npm install && cd ../..
   ```

2. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

3. **Connect to Netlify**
   - Go to [netlify.com](https://www.netlify.com) → **Add new site** → **Import an existing project**.
   - Choose **GitHub** and select your **portfolio** repo.

4. **Build settings** (from `netlify.toml`):
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

5. Click **Deploy site**. The build will:
   - Build the portfolio → `dist/`
   - Build each app in `projects/` → `dist/projects/<name>/`

Your portfolio and all projects will be live on the same domain.

## Calendar Coach (Python backend)

The **Calendar Coach** app (`/projects/calendar-llm/`) uses a **Python (FastAPI)** backend in `backend/`. Netlify Functions don’t support Python, so deploy that backend separately:

1. Deploy `backend/` to Render, Railway, or Fly.io (see `backend/README.md`). Set `OPENAI_API_KEY` there.
2. In Netlify, add **Environment variable:** `VITE_CALENDAR_API_URL` = your backend URL (e.g. `https://calendar-coach-api.onrender.com`).
3. Redeploy the site so the frontend uses that URL for “Get AI advice”.

## Adding more projects

See **`projects/README.md`** for how to add another app under `projects/` and link it from your portfolio with `liveUrl: '/projects/your-app/'`.

## Manual deploy (drag & drop)

1. Install and build everything:
   ```bash
   npm install
   cd projects/demo && npm install && cd ../..
   npm run build
   ```
2. In Netlify: **Sites** → **Add new site** → **Deploy manually** → drag the **dist** folder.
