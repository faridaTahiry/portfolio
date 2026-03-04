import './Skills.css'

const Skills = () => {
  const skillCategories = [
    {
      title: 'Languages',
      skills: [
        { name: 'C#', level: 95 },
        { name: 'Python', level: 90 },
        { name: 'JavaScript', level: 90 },
        { name: 'T-SQL', level: 85 },
        { name: 'PostgreSQL', level: 85 },
        { name: 'Java', level: 75 },
        { name: 'C', level: 70 },
      ],
    },
    {
      title: 'Frameworks & Technologies',
      skills: [
        { name: '.NET 8', level: 95 },
        { name: 'ASP.NET Core', level: 95 },
        { name: 'React', level: 85 },
        { name: 'TensorFlow', level: 80 },
        { name: 'MassTransit', level: 85 },
        { name: 'NServiceBus', level: 85 },
        { name: 'Entity Framework Core', level: 90 },
      ],
    },
    {
      title: 'Cloud & Infrastructure',
      skills: [
        { name: 'Azure Kubernetes Service', level: 90 },
        { name: 'Docker', level: 90 },
        { name: 'Kubernetes', level: 90 },
        { name: 'Azure DevOps', level: 90 },
        { name: 'CI/CD Pipelines', level: 90 },
        { name: 'Azure App Insights', level: 85 },
      ],
    },
    {
      title: 'Observability & Tools',
      skills: [
        { name: 'OpenTelemetry', level: 90 },
        { name: 'Grafana', level: 85 },
        { name: 'ElasticSearch', level: 80 },
        { name: 'Kibana', level: 80 },
        { name: 'Git', level: 95 },
        { name: 'REST APIs', level: 95 },
        { name: 'Unit Testing', level: 90 },
      ],
    },
  ]

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <div className="skills-content">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category">
              <h3 className="category-title">{category.title}</h3>
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div
                        className="skill-progress"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills

