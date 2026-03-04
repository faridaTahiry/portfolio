# Troubleshooting Contact Form Issues

## Common Issues and Solutions

### 1. "Cannot connect to server" Error

**Problem:** Frontend can't reach the backend.

**Solutions:**
- Make sure the backend is running: `python app.py`
- Check that the backend is running on port 5137
- Verify the frontend `.env` file has `VITE_API_URL=http://localhost:5137/api/contact`
- Check browser console for CORS errors
- Make sure both frontend and backend are running

### 2. "Email service not configured" Error

**Problem:** Email credentials are missing.

**Solutions:**
- Create a `.env` file in the `backend` directory
- Copy from `env.example` and fill in your email credentials:
  ```
  MAIL_USERNAME=your-email@gmail.com
  MAIL_PASSWORD=your-app-password
  RECIPIENT_EMAIL=farida.tahiry.13@gmail.com
  ```
- Make sure the `.env` file is in the `backend` directory (same location as `app.py`)

### 3. "Email authentication failed" Error

**Problem:** Gmail credentials are incorrect.

**Solutions:**
- **For Gmail:** You MUST use an App Password, not your regular password
  - Go to Google Account → Security → 2-Step Verification → App passwords
  - Generate a new app password for "Mail"
  - Use this 16-character password in `MAIL_PASSWORD`
- Make sure `MAIL_USERNAME` is your full Gmail address
- Verify 2-Factor Authentication is enabled on your Google account

### 4. "Cannot connect to email server" Error

**Problem:** SMTP connection issues.

**Solutions:**
- Check your internet connection
- Verify SMTP settings in `.env`:
  - Gmail: `MAIL_SERVER=smtp.gmail.com`, `MAIL_PORT=587`, `MAIL_USE_TLS=True`
- Check firewall settings
- Try different SMTP port (465 with SSL instead of 587 with TLS)

### 5. Testing the Backend

**Test if backend is running:**
```bash
curl http://localhost:5137/api/health
```

**Test the contact endpoint:**
```bash
curl -X POST http://localhost:5137/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
```

### 6. Check Backend Logs

When you run `python app.py`, you should see:
- "Attempting to send email from..." when a request is received
- "Email sent successfully!" if it works
- Error messages with details if it fails

### 7. Frontend Console Errors

Open browser DevTools (F12) and check:
- Network tab: See if the request is being sent
- Console tab: Check for JavaScript errors
- Look for CORS errors (will show in console)

### 8. Alternative: Use a Different Email Service

If Gmail doesn't work, try:
- **SendGrid** (free tier available)
- **Mailgun** (free tier available)
- **AWS SES** (very cheap)
- **Outlook/Hotmail** (different SMTP settings)

Update your `.env` with the appropriate SMTP settings for your email provider.

