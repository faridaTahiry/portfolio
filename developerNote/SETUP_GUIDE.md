# Email Configuration Setup Guide

## Step-by-Step Instructions

### 1. Create Your `.env` File

Copy `env.example` to `.env` in the `backend` directory:
```bash
cd backend
cp env.example .env
```

### 2. Fill in the Required Values

#### For Gmail (Recommended):

**MAIL_SERVER**
```
smtp.gmail.com
```
- This is already correct for Gmail, no changes needed

**MAIL_PORT**
```
587
```
- Port 587 is for TLS (recommended)
- Alternative: Use `465` with `MAIL_USE_SSL=True` if 587 doesn't work

**MAIL_USE_TLS**
```
True
```
- Keep as `True` for Gmail with port 587

**MAIL_USE_SSL**
```
False
```
- Keep as `False` when using TLS
- Only set to `True` if using port 465

**MAIL_USERNAME**
```
farida.tahiry.13@gmail.com
```
- Your full Gmail address
- This is the email account that will send the emails

**MAIL_PASSWORD** ⚠️ **IMPORTANT**
```
xxxx xxxx xxxx xxxx
```
- **NOT your regular Gmail password**
- You need a Gmail App Password (16 characters, may have spaces)
- See instructions below to generate one

**RECIPIENT_EMAIL**
```
farida.tahiry.13@gmail.com
```
- Where you want to receive contact form messages
- Can be the same as MAIL_USERNAME or different

---

## How to Get Gmail App Password

### Step 1: Enable 2-Step Verification
1. Go to [Google Account](https://myaccount.google.com/)
2. Click **Security** in the left sidebar
3. Under "Signing in to Google", find **2-Step Verification**
4. Click it and follow the prompts to enable it
   - You'll need your phone number

### Step 2: Generate App Password
1. Still in **Security** settings
2. Under "Signing in to Google", find **App passwords**
   - If you don't see it, make sure 2-Step Verification is enabled
3. Click **App passwords**
4. You may need to sign in again
5. Select:
   - **App**: Mail
   - **Device**: Other (Custom name) → Type "Portfolio Backend"
6. Click **Generate**
7. You'll get a 16-character password like: `abcd efgh ijkl mnop`
8. **Copy this password** (you won't see it again!)
9. Paste it in your `.env` file as `MAIL_PASSWORD`
   - You can include or remove spaces, both work

---

## Example `.env` File

After setup, your `backend/.env` should look like:

```env
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USE_SSL=False
MAIL_USERNAME=farida.tahiry.13@gmail.com
MAIL_PASSWORD=abcd efgh ijkl mnop
RECIPIENT_EMAIL=farida.tahiry.13@gmail.com
```

---

## Alternative Email Providers

### Outlook/Hotmail
```env
MAIL_SERVER=smtp-mail.outlook.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USE_SSL=False
MAIL_USERNAME=your-email@outlook.com
MAIL_PASSWORD=your-password
```

### Yahoo Mail
```env
MAIL_SERVER=smtp.mail.yahoo.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USE_SSL=False
MAIL_USERNAME=your-email@yahoo.com
MAIL_PASSWORD=your-app-password
```

### Custom SMTP Server
Check with your email provider for their SMTP settings.

---

## Testing Your Configuration

1. Make sure your `.env` file is in the `backend` directory
2. Start the backend:
   ```bash
   python app.py
   ```
3. Try sending a test message from your portfolio
4. Check the backend terminal for any error messages
5. Check your email inbox (and spam folder) for the message

---

## Security Notes

- ⚠️ **Never commit your `.env` file to git** (it's already in `.gitignore`)
- ⚠️ **Never share your App Password** publicly
- ✅ The `.env` file stays on your local machine or secure server
- ✅ For production, use environment variables on your hosting platform

---

## Troubleshooting

**"Email authentication failed"**
- Make sure you're using an App Password, not your regular password
- Verify 2-Step Verification is enabled
- Check that the App Password was copied correctly (no extra spaces)

**"Cannot connect to email server"**
- Check your internet connection
- Verify SMTP server and port are correct
- Try port 465 with SSL instead of 587 with TLS

**"Email service not configured"**
- Make sure `.env` file exists in `backend` directory
- Check that all required fields are filled in
- Restart the backend after creating/updating `.env`

