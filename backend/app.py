from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mail import Mail, Message
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Mail configuration
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER', 'smtp.gmail.com')
app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT', 587))
app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS', 'True').lower() == 'true'
app.config['MAIL_USE_SSL'] = os.getenv('MAIL_USE_SSL', 'False').lower() == 'true'
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_USERNAME')

mail = Mail(app)

@app.route('/api/contact', methods=['POST'])
def send_contact_email():
    try:
        # Check if email is configured
        if not app.config['MAIL_USERNAME'] or not app.config['MAIL_PASSWORD']:
            print("Warning: Email credentials not configured")
            return jsonify({
                'success': False,
                'error': 'Email service not configured. Please check backend .env file.'
            }), 500
        
        data = request.get_json()
        
        if not data:
            return jsonify({
                'success': False,
                'error': 'No data received'
            }), 400
        
        # Validate required fields
        required_fields = ['name', 'email', 'message']
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    'success': False,
                    'error': f'{field} is required'
                }), 400
        
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')
        
        print(f"Attempting to send email from {name} ({email})")
        
        # Create email message
        msg = Message(
            subject=f'Portfolio Contact Form - Message from {name}',
            recipients=[os.getenv('RECIPIENT_EMAIL', 'farida.tahiry.13@gmail.com')],
            reply_to=email
        )
        
        # Email body
        msg.body = f"""
You have received a new message from your portfolio contact form.

Name: {name}
Email: {email}

Message:
{message}

---
This message was sent from your portfolio website.
        """
        
        # Send email
        mail.send(msg)
        print("Email sent successfully!")
        
        return jsonify({
            'success': True,
            'message': 'Email sent successfully!'
        }), 200
        
    except Exception as e:
        error_msg = str(e)
        print(f"Error sending email: {error_msg}")
        print(f"Error type: {type(e).__name__}")
        
        # Provide more specific error messages
        if 'authentication failed' in error_msg.lower() or 'invalid credentials' in error_msg.lower():
            error_message = 'Email authentication failed. Please check your email credentials in .env file.'
        elif 'connection' in error_msg.lower() or 'timeout' in error_msg.lower():
            error_message = 'Cannot connect to email server. Please check your internet connection and SMTP settings.'
        else:
            error_message = f'Failed to send email: {error_msg}'
        
        return jsonify({
            'success': False,
            'error': error_message
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'message': 'Contact form API is running'
    }), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5137)

