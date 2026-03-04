# Fix: Can't Paste Token in Terminal

## The Problem
When Git asks for your password, the terminal might not accept paste (especially on macOS). This is a security feature.

## Solutions

### Method 1: Use Token in URL (Easiest - No Paste Needed)

Instead of pasting when prompted, embed the token directly in the URL:

**Option A: Set as Variable (Recommended)**
```bash
# Set your token as a variable
export GITHUB_TOKEN="ghp_your_token_here"

# Use the variable in the URL
git remote set-url origin https://faridaTahiry:${GITHUB_TOKEN}@github.com/faridaTahiry/portfolio.git

# Then push (won't ask for password)
git push -u origin main

# Clear the variable after (optional, for security)
unset GITHUB_TOKEN
```

**Option B: Direct in URL**
```bash
# Replace YOUR_TOKEN with your actual token (starts with ghp_)
git remote set-url origin https://faridaTahiry:YOUR_TOKEN@github.com/faridaTahiry/portfolio.git

# Then push (won't ask for password)
git push -u origin main
```

**Example with variable:**
```bash
export GITHUB_TOKEN="ghp_abc123xyz456def789"
git remote set-url origin https://faridaTahiry:${GITHUB_TOKEN}@github.com/faridaTahiry/portfolio.git
git push -u origin main
unset GITHUB_TOKEN
```

---

### Method 2: Right-Click to Paste (macOS Terminal)

In macOS Terminal, **right-click** in the password field instead of Cmd+V:

1. When Git asks for password
2. **Right-click** in the terminal window
3. Select **"Paste"** from the context menu

---

### Method 3: Use Terminal Menu to Paste

1. When Git asks for password
2. Go to **Edit** → **Paste** in Terminal menu bar
3. Or use: **Cmd+Shift+V** (sometimes works when Cmd+V doesn't)

---

### Method 4: Type Token Manually (If Short Enough)

If your token is short, you can type it manually. But tokens are usually long, so this isn't practical.

---

### Method 5: Use SSH Instead (Best Long-Term Solution)

SSH doesn't require pasting tokens:

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "farida.tahiry.13@gmail.com"
# Press Enter 3 times

# Add to ssh-agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Copy public key
cat ~/.ssh/id_ed25519.pub
# Copy the output

# Add to GitHub:
# 1. Go to https://github.com/settings/keys
# 2. Click "New SSH key"
# 3. Paste your public key
# 4. Save

# Change remote to SSH
git remote set-url origin git@github.com:faridaTahiry/portfolio.git

# Test
ssh -T git@github.com

# Push (no password needed!)
git push -u origin main
```

---

### Method 6: Use GitHub CLI (No Paste Needed)

```bash
# Install GitHub CLI
brew install gh

# Login (opens browser - no paste needed!)
gh auth login

# Follow prompts:
# - GitHub.com
# - HTTPS
# - Login via web browser

# Then push normally
git push -u origin main
```

---

## Recommended: Method 1 (Token in URL with Variable)

This is the quickest fix right now:

```bash
# 1. Get your token from GitHub (starts with ghp_)
# 2. Set it as a variable:
export GITHUB_TOKEN="ghp_your_token_here"

# 3. Use the variable in the URL:
git remote set-url origin https://faridaTahiry:${GITHUB_TOKEN}@github.com/faridaTahiry/portfolio.git

# 4. Push (no password prompt!)
git push -u origin main

# 5. Clear the variable (optional, for security)
unset GITHUB_TOKEN
```

**Benefits of using a variable:**
- Token not visible in command history
- Easier to reuse
- Can clear it after use

**Note:** The token will still be stored in your git config (visible with `git config --get remote.origin.url`), but that's okay for personal projects. For better security, use SSH (Method 5) or GitHub CLI (Method 6).

