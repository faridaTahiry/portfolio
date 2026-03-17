import { useState } from 'react'
import './Projects.css'

const Projects = () => {
  const [filter, setFilter] = useState('all')

  const projects = [
    {
      id: 1,
      title: 'Calendar Coach',
      description:
        'LLM-powered time management assistant. Connects to your Google Calendar (read-only), reads your upcoming events, and gives personalized advice to improve focus, reduce overcommitment, and protect deep work.',
      technologies: ['React', 'Vite', 'Google Calendar API', 'OpenAI', 'Netlify Functions'],
      category: 'frontend',
      liveUrl: '/projects/calendar-llm/',
      githubUrl: '#',
    },
    {
      id: 2,
      title: 'Cloud-Native HRIS Microservices Platform',
      description:
        'Led architectural migration from legacy VM-based batch processor to cloud-native, event-driven microservices on Kubernetes. Designed Server-Worker architecture for horizontal scaling and implemented resilient file ingestion pipelines with distributed tracing.',
      technologies: ['.NET 8', 'Kubernetes', 'NServiceBus', 'PostgreSQL', 'OpenTelemetry', 'Entity Framework Core'],
      category: 'backend',
      liveUrl: '/projects/demo/',
      githubUrl: '#',
    },
    {
      id: 3,
      title: 'Email Processing Pipeline Optimization',
      description:
        'Modernized email processing system by replacing deprecated OpenPop library with MailKit, reducing processing time from 7 hours to under 10 minutes (99% performance improvement), enabling near real-time processing.',
      technologies: ['C#', '.NET 8', 'MailKit', 'Performance Tuning'],
      category: 'backend',
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      id: 4,
      title: 'HRIS Integration Microservice',
      description:
        'Led development of microservice integrating with Merge API to retrieve client-specific HRIS data from third-party systems. Designed CI/CD pipelines, structured logging, and deployed to Azure Kubernetes Service (AKS).',
      technologies: ['.NET 8', 'ASP.NET Core', 'Azure Kubernetes Service', 'CI/CD', 'OpenTelemetry', 'REST APIs'],
      category: 'backend',
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      id: 5,
      title: 'NServiceBus Messaging Abstraction Library',
      description:
        'Authored internal NuGet package abstracting NServiceBus to standardize messaging across company microservices, improving code reusability and maintainability.',
      technologies: ['C#', '.NET 8', 'NServiceBus', 'NuGet', 'Microservices'],
      category: 'backend',
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      id: 6,
      title: 'Analytics & BI Pipelines',
      description:
        'Built data pipelines gathering information from third-party tools (Stripe, Ordway, Salesforce, Hubspot) and performed business intelligence analyses. Produced financial reports using Python pandas, Tableau, and PostgreSQL.',
      technologies: ['Python', 'PostgreSQL', 'DBT', 'Tableau', 'AWS', 'REST APIs'],
      category: 'backend',
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      id: 7,
      title: 'Time Series Anomaly Detection Research',
      description:
        'Generated time series models using unsupervised learning with LSTM and Matrix Profile for anomaly detection and health monitoring. Contributed to peer-reviewed publication as co-second author.',
      technologies: ['Python', 'TensorFlow', 'LSTM', 'Machine Learning', 'Time Series Analysis'],
      category: 'research',
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      id: 8,
      title: 'Facial Biometric System Research',
      description:
        'Investigated impact of makeup on facial biometric systems using convolutional neural networks and autoencoders. Developed image processing pipeline using OpenCV to convert video segments into training datasets.',
      technologies: ['Python', 'TensorFlow', 'CNN', 'OpenCV', 'Computer Vision'],
      category: 'research',
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      id: 9,
      title: 'Legacy .NET Modernization Initiative',
      description:
        'Contributed to organization-wide modernization initiative upgrading legacy applications from .NET Framework 4.8 to .NET 8, improving performance, compatibility, and long-term support.',
      technologies: ['.NET 8', '.NET Framework 4.8', 'Legacy Modernization', 'Migration'],
      category: 'backend',
      liveUrl: '#',
      githubUrl: '#',
    },
  ]

  const categories = ['all', 'frontend', 'backend', 'research']

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter((project) => project.category === filter)

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        <div className="projects-filter">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <div className="project-placeholder">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M9 21V9" />
                  </svg>
                </div>
                <div className="project-overlay">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    aria-label="View live project"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    aria-label="View source code"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

