# GitHub Repository Setup Guide

## Method 1: Using GitHub Website (Easiest)

### Step 1: Create Repository on GitHub
1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `portfolio` (or `farida-tahiry-portfolio`)
   - **Description**: "Personal portfolio website built with React and Vite"
   - **Visibility**: Choose **Public** (or Private if you prefer)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

### Step 2: Push Your Code
After creating the repo, GitHub will show you commands. Run these in your terminal:

```bash
cd "/Users/faridatahiry/Desktop/Coding Project/Portfolio"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Portfolio website"

# Add your GitHub repository as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Method 2: Using GitHub CLI (If you have it installed)

```bash
cd "/Users/faridatahiry/Desktop/Coding Project/Portfolio"

# Initialize git
git init

# Add files
git add .

# Commit
git commit -m "Initial commit: Portfolio website"

# Create repo and push (replace YOUR_USERNAME)
gh repo create portfolio --public --source=. --remote=origin --push
```

---

## Important Notes

### Files Already Ignored (in .gitignore)
- `node_modules/` - Dependencies (don't commit)
- `dist/` - Build output (don't commit)
- `.env` files - Environment variables (don't commit)
- `backend/.env` - Backend environment variables (don't commit)

### What Will Be Committed
- All source code (`src/` folder)
- Configuration files (`package.json`, `vite.config.js`, etc.)
- README and documentation
- Backend code (but not `.env` files)

---

## After Pushing to GitHub

### Update Your Portfolio Links
If you want to add GitHub links to your portfolio:

1. **In `src/components/Hero.jsx`**: Update GitHub link
2. **In `src/components/Footer.jsx`**: Update GitHub link

Replace `https://github.com` with your actual repository URL:
```jsx
href="https://github.com/YOUR_USERNAME/portfolio"
```

---

## Deploying to Netlify

After pushing to GitHub, you can easily deploy to Netlify:

1. Go to [Netlify](https://netlify.com)
2. Sign in with GitHub
3. Click **"Add new site"** → **"Import an existing project"**
4. Select your GitHub repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click **"Deploy site"**

Your portfolio will be live at: `https://your-site-name.netlify.app`

---

## Troubleshooting

### Authentication Error: "Password authentication is not supported"

**Problem:** GitHub no longer accepts passwords for Git operations. You need a Personal Access Token (PAT).

**Solution: Create and use a Personal Access Token**

#### Step 1: Create a Personal Access Token
1. Go to GitHub.com and sign in
2. Click your profile picture (top right) → **Settings**
3. Scroll down to **Developer settings** (left sidebar, at the bottom)
4. Click **Personal access tokens** → **Tokens (classic)**
5. Click **Generate new token** → **Generate new token (classic)**
6. Give it a name: `Portfolio Project`
7. Select expiration: Choose how long it should last (90 days, 1 year, or no expiration)
8. Select scopes: Check **`repo`** (this gives full control of private repositories)
9. Click **Generate token** at the bottom
10. **COPY THE TOKEN IMMEDIATELY** - you won't see it again! It looks like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

#### Step 2: Use the Token Instead of Password
When Git asks for credentials:
- **Username:** Your GitHub username
- **Password:** Paste your Personal Access Token (NOT your GitHub password)

#### Step 3: Push Your Code
```bash
git push -u origin main
```
When prompted:
- Username: `your-github-username`
- Password: `ghp_your-token-here` (paste the token)

#### Alternative: Store Credentials (Optional)
To avoid entering the token every time:
```bash
# Store credentials (macOS)
git config --global credential.helper osxkeychain

# Then push (will prompt once, then save)
git push -u origin main
```

### If you get "remote origin already exists" or need to change the URL
```bash
# Remove the existing remote
git remote remove origin

# Add the correct remote URL
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
```

### To change/update the origin URL (if you set it incorrectly)
```bash
# Method 1: Remove and re-add
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Method 2: Update the URL directly (faster)
git remote set-url origin https://github.com/YOUR_USERNAME/portfolio.git

# Verify the URL is correct
git remote -v
```

### If you need to update your .gitignore
Make sure these are in your `.gitignore`:
```
node_modules
dist
.env
backend/.env
*.log
.DS_Store
```

### If you want to exclude the backend folder
If you don't want to commit the backend, add to `.gitignore`:
```
backend/
```

