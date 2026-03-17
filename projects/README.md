# Projects (same Netlify site)

Projects in this folder are built and deployed **under the same Netlify site** as your portfolio.

- **Portfolio:** `https://yoursite.netlify.app/`
- **Project "demo":** `https://yoursite.netlify.app/projects/demo/`
- **Project "my-app":** `https://yoursite.netlify.app/projects/my-app/` (once you add it)

## Adding a new project

1. **Copy the `demo` folder** and rename it (e.g. `my-app`).

2. **Edit the project’s `vite.config.js`:**
   - Set `base` to your path: `base: '/projects/my-app/'`
   - Set `build.outDir` to: `'../../dist/projects/my-app'`

   Example:
   ```js
   export default defineConfig({
     plugins: [react()],
     base: '/projects/my-app/',
     build: {
       outDir: '../../dist/projects/my-app',
       emptyOutDir: true,
     },
   })
   ```

3. **Install dependencies** (from repo root or from the project folder):
   ```bash
   cd projects/my-app && npm install
   ```

4. **Link from your portfolio:** In `src/components/Projects.jsx`, set that project’s `liveUrl` to your path (use a relative path so it works on any domain):
   ```js
   liveUrl: '/projects/my-app/',
   ```

5. **Deploy:** Push to GitHub. Netlify will run the root `npm run build`, which builds the portfolio and every app in `projects/` into one `dist/`.

## Using a project from another repo

If the app lives in a different repo, you can add it here by copying its source into a new folder under `projects/<name>`, then:

- Add a `vite.config.js` (or adjust its build config) with the same `base` and `outDir` as above.
- Ensure it has a `package.json` with a `build` script (e.g. `vite build`).

The root build script will pick up any folder under `projects/` that has a `package.json` and run `npm run build` there.
