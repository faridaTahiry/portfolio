import { readdirSync, existsSync } from 'fs'
import { join, resolve } from 'path'
import { fileURLToPath } from 'url'
import { spawnSync } from 'child_process'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const rootDir = resolve(__dirname, '..')
const projectsDir = join(rootDir, 'projects')

if (!existsSync(projectsDir)) {
  console.log('No projects/ folder found. Skipping project builds.')
  process.exit(0)
}

const entries = readdirSync(projectsDir, { withFileTypes: true })
const projectDirs = entries.filter((e) => e.isDirectory()).map((e) => e.name)

if (projectDirs.length === 0) {
  console.log('No project folders in projects/. Skipping project builds.')
  process.exit(0)
}

for (const name of projectDirs) {
  const projectPath = join(projectsDir, name)
  const pkgPath = join(projectPath, 'package.json')
  if (!existsSync(pkgPath)) {
    console.log(`Skipping ${name} (no package.json)`)
    continue
  }

  console.log(`\nBuilding project: ${name} -> dist/projects/${name}/\n`)
  const installResult = spawnSync('npm', ['install'], {
    cwd: projectPath,
    stdio: 'inherit',
    shell: true,
  })
  if (installResult.status !== 0) {
    console.error(`npm install failed for project: ${name}`)
    process.exit(1)
  }
  const result = spawnSync('npm', ['run', 'build'], {
    cwd: projectPath,
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, NETLIFY_PROJECT_PATH: `/projects/${name}` },
  })
  if (result.status !== 0) {
    console.error(`Build failed for project: ${name}`)
    process.exit(1)
  }
}

console.log('\nAll projects built successfully.')
