# Portfolio Contact Form Backend

Python Flask backend for handling contact form submissions and sending emails.

## Setup

1. **Create a virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Update the following variables:
     - `MAIL_USERNAME`: Your email address (e.g., Gmail)
     - `MAIL_PASSWORD`: Your email app password (not your regular password)
     - `RECIPIENT_EMAIL`: Email address where you want to receive contact form messages

## Gmail Setup

If using Gmail, you'll need to:

1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this app password in `MAIL_PASSWORD`

## Running the Server

```bash
python app.py
```

The server will run on `http://localhost:5000`

## API Endpoints

### POST `/api/contact`
Send a contact form email.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'm interested in working with you."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully!"
}
```

### GET `/api/health`
Health check endpoint.

## Production Deployment

For production, consider:
- Using a production WSGI server like Gunicorn
- Setting up proper environment variables
- Using a service like SendGrid or AWS SES for email
- Adding rate limiting
- Implementing proper error logging

### Example with Gunicorn:
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

