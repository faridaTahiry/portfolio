import './About.css'

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p className="about-description">
              I'm a Senior Software Engineer at HR Acuity with a passion for building
              scalable, cloud-native microservices and modernizing legacy systems. I hold
              a Bachelor of Science in Computer Science from Wellesley College, where I
              also conducted research in machine learning and computer vision.
            </p>
            <p className="about-description">
              Currently, I'm leading the architectural migration of legacy VM-based systems
              to a cloud-native, event-driven microservices platform deployed on Kubernetes.
              I specialize in designing resilient distributed systems, implementing observability
              solutions, and optimizing performance-critical applications.
            </p>
            <p className="about-description">
              My expertise spans .NET 8, microservice architecture, Azure cloud services,
              and modern DevOps practices. I'm passionate about building systems that are
              not only functional but also maintainable, observable, and scalable.
            </p>
            <div className="about-stats">
              <div className="stat-item">
                <h3 className="stat-number">3+</h3>
                <p className="stat-label">Years Experience</p>
              </div>
              <div className="stat-item">
                <h3 className="stat-number">2×</h3>
                <p className="stat-label">Award Recipient</p>
              </div>
              <div className="stat-item">
                <h3 className="stat-number">99%</h3>
                <p className="stat-label">Performance Improvement</p>
              </div>
            </div>
          </div>
          <div className="about-image">
            <div className="image-placeholder">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="400"
                height="400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 9h6v6H9z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

