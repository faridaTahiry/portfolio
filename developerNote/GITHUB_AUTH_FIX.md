# GitHub Authentication Fix Guide

## Method 1: Use SSH Instead of HTTPS (Recommended)

SSH keys are more secure and don't require entering credentials each time.

### Step 1: Check if you have an SSH key
```bash
ls -al ~/.ssh
```

### Step 2: Generate SSH key (if you don't have one)
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```
- Press Enter to accept default file location
- Press Enter twice for no passphrase (or set one if you prefer)

### Step 3: Add SSH key to ssh-agent
```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

### Step 4: Copy your public key
```bash
cat ~/.ssh/id_ed25519.pub
```
Copy the entire output (starts with `ssh-ed25519`)

### Step 5: Add SSH key to GitHub
1. Go to https://github.com/settings/keys
2. Click **"New SSH key"**
3. Title: `My MacBook` (or any name)
4. Key: Paste your public key
5. Click **"Add SSH key"**

### Step 6: Change remote URL to SSH
```bash
git remote set-url origin git@github.com:YOUR_USERNAME/portfolio.git
```

### Step 7: Test connection
```bash
ssh -T git@github.com
```
You should see: "Hi YOUR_USERNAME! You've successfully authenticated..."

### Step 8: Push
```bash
git push -u origin main
```

---

## Method 2: Use Token in URL (Quick Fix)

Embed the token directly in the URL (less secure but works):

```bash
# Replace YOUR_USERNAME and YOUR_TOKEN
git remote set-url origin https://YOUR_USERNAME:YOUR_TOKEN@github.com/YOUR_USERNAME/portfolio.git

# Then push
git push -u origin main
```

**Example:**
```bash
git remote set-url origin https://faridatahiry:ghp_xxxxxxxxxxxx@github.com/faridatahiry/portfolio.git
```

---

## Method 3: Clear Cached Credentials

Sometimes old credentials are cached:

### macOS Keychain
```bash
# Remove GitHub credentials from keychain
git credential-osxkeychain erase
host=github.com
protocol=https
[Press Enter twice]

# Or use Keychain Access app:
# 1. Open "Keychain Access" app
# 2. Search for "github.com"
# 3. Delete any GitHub entries
```

### Clear Git credential cache
```bash
git config --global --unset credential.helper
git config --global credential.helper osxkeychain
```

---

## Method 4: Use GitHub CLI (Easiest)

If you have GitHub CLI installed:

```bash
# Install GitHub CLI (if not installed)
brew install gh

# Authenticate
gh auth login

# Follow the prompts:
# - Choose GitHub.com
# - Choose HTTPS
# - Authenticate via web browser (easiest)

# Then push normally
git push -u origin main
```

---

## Method 5: Verify Token Permissions

Make sure your Personal Access Token has the right permissions:

1. Go to https://github.com/settings/tokens
2. Find your token
3. Make sure it has:
   - ✅ **repo** (Full control of private repositories)
   - ✅ **workflow** (if using GitHub Actions)

---

## Method 6: Create New Token with Correct Permissions

1. Go to https://github.com/settings/tokens/new
2. Name: `Portfolio Project`
3. Expiration: Choose your preference
4. **Select scopes:**
   - ✅ **repo** (Full control of private repositories)
   - ✅ **workflow** (Update GitHub Action workflows)
5. Click **"Generate token"**
6. Copy the token (starts with `ghp_`)

Then use it when prompted for password.

---

## Troubleshooting Steps

### Check your remote URL
```bash
git remote -v
```
Should show: `https://github.com/YOUR_USERNAME/portfolio.git`

### Test authentication
```bash
# For HTTPS
git ls-remote https://github.com/YOUR_USERNAME/portfolio.git

# For SSH
ssh -T git@github.com
```

### Check Git configuration
```bash
git config --list | grep credential
git config --list | grep user
```

### Reset everything and start fresh
```bash
# Remove remote
git remote remove origin

# Clear credentials
git credential-osxkeychain erase <<EOF
host=github.com
protocol=https
EOF

# Add remote again
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Try pushing
git push -u origin main
```

---

## Still Not Working?

1. **Double-check your GitHub username** - it's case-sensitive
2. **Make sure the repository exists** on GitHub
3. **Verify you have write access** to the repository
4. **Try creating a new token** with all repo permissions
5. **Use SSH method** (Method 1) - it's the most reliable

