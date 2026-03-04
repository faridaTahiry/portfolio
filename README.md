# Portfolio Website

A modern, responsive portfolio website built with React and Vite. This portfolio showcases projects, skills, and provides a way for visitors to get in touch.

## Features

- 🎨 Modern and clean design
- 📱 Fully responsive layout
- ⚡ Fast performance with Vite
- 🎯 Smooth scrolling navigation
- 💼 Project showcase with filtering
- 📧 Contact form
- 🌐 Social media links
- ♿ Accessible components

## Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Styling with custom properties

### Backend
- **Python Flask** - Web framework
- **Flask-Mail** - Email sending functionality
- **Flask-CORS** - Cross-origin resource sharing

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory:
   ```bash
   cd Portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173`

### Backend Setup (Contact Form)

The contact form requires a Python backend to send emails. See the [backend README](./backend/README.md) for detailed setup instructions.

**Quick Setup:**
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file (copy from `.env.example`) and configure your email settings

5. Run the backend server:
   ```bash
   python app.py
   ```

6. Update the frontend `.env` file with your backend URL (default: `http://localhost:5000/api/contact`)

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
Portfolio/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Customization

### Update Personal Information

1. **Hero Section** (`src/components/Hero.jsx`):
   - Update name, title, and description
   - Update social media links

2. **About Section** (`src/components/About.jsx`):
   - Update about text
   - Modify statistics

3. **Skills Section** (`src/components/Skills.jsx`):
   - Update skill categories and proficiency levels

4. **Projects Section** (`src/components/Projects.jsx`):
   - Replace placeholder projects with your actual projects
   - Update project images, descriptions, and links

5. **Contact Section** (`src/components/Contact.jsx`):
   - Update contact information (email, phone, location)
   - Connect contact form to a backend service (e.g., Formspree, EmailJS)

6. **Footer** (`src/components/Footer.jsx`):
   - Update social media links

### Styling

The project uses CSS custom properties for theming. You can modify colors in `src/index.css`:

```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  /* ... other variables */
}
```

## Deployment

### Deploy to Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to Netlify:
   - Drag and drop the `dist` folder to Netlify
   - Or connect your Git repository and set build command: `npm run build` and publish directory: `dist`

### Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

## Best Practices Followed

- ✅ Component-based architecture
- ✅ Semantic HTML
- ✅ Responsive design (mobile-first)
- ✅ Accessible components (ARIA labels, keyboard navigation)
- ✅ Clean and readable code
- ✅ CSS custom properties for theming
- ✅ Optimized performance
- ✅ SEO-friendly structure

## License

This project is open source and available under the MIT License.

## Contact

For questions or suggestions, feel free to reach out!

