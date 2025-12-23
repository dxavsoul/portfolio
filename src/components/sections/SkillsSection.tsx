import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Database, Code, Cloud, Wrench, GitBranch, 
  BarChart3, Monitor, Server
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const skillCategories = [
    {
      icon: Database,
      title: 'Databases',
      skills: ['MSSQL', 'PostgreSQL', 'Firebase', 'MongoDB', 'MySQL', 'Oracle', 'CloudSQL', 'SQL Server', 'NoSQL'],
      color: 'primary',
    },
    {
      icon: Code,
      title: 'Programming',
      skills: ['Java', 'C#', 'TypeScript', 'JavaScript', 'Dart/Flutter', 'React', 'Spring Boot', 'Python', '.NET Core', 'Node.js', 'HTML/CSS'],
      color: 'accent',
    },
    {
      icon: Cloud,
      title: 'Cloud & APIs',
      skills: ['Azure', 'AWS', 'GCP', 'REST APIs', 'SOAP', 'Microservices', 'RabbitMQ', 'API Gateway', 'Serverless'],
      color: 'primary',
    },
    {
      icon: Server,
      title: 'Infrastructure',
      skills: ['Docker', 'Kubernetes', 'Terraform', 'Linux', 'Windows Server', 'Nginx', 'Load Balancing'],
      color: 'accent',
    },
    {
      icon: Wrench,
      title: 'Tools & DevOps',
      skills: ['GitHub CI/CD', 'Git', 'JIRA', 'Confluence', 'Postman', 'Jenkins', 'Azure DevOps', 'BitBucket'],
      color: 'primary',
    },
    {
      icon: GitBranch,
      title: 'Methodologies',
      skills: ['Agile/Scrum', 'SDLC', 'System Design', 'Technical Leadership', 'Code Review', 'TDD', 'Kanban'],
      color: 'accent',
    },
    {
      icon: BarChart3,
      title: 'Reporting & BI',
      skills: ['Power BI', 'SSRS', 'Pentaho', 'Odoo', 'Data Analytics', 'ETL', 'Data Warehousing'],
      color: 'primary',
    },
  ];
  
  const expertiseAreas = [
    'Continuous Process Improvement',
    'Software/Data Engineering', 
    'People Management',
    'Cloud Migration',
    'Technical Program Management',
    'Business Analysis',
    'Enterprise Architecture',
    'Digital Transformation',
    'System Integration',
    'API Development & Management',
    'DevOps & CI/CD Pipelines',
    'Stakeholder Management',
    'Cross-functional Collaboration',
    'Data Analytics & BI',
    'Database Administration',
    'Agile Project Delivery',
  ];
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state to visible to ensure content shows
      gsap.set('.skills-title', { opacity: 1, y: 0 });
      gsap.set('.skill-category', { opacity: 1, y: 0 });
      gsap.set('.expertise-pill', { opacity: 1, scale: 1 });
      
      gsap.from('.skills-title', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
      
      gsap.from('.skill-category', {
        y: 40,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
      
      gsap.from('.expertise-pill', {
        scale: 0.8,
        opacity: 0,
        duration: 0.4,
        stagger: 0.08,
        scrollTrigger: {
          trigger: '.expertise-container',
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />
      
      <div className="section-container relative z-10 lg:pr-[35%]">
        <h2 className="skills-title text-4xl md:text-5xl font-bold mb-16 text-foreground">
          Technical <span className="text-gradient">Arsenal</span>
        </h2>
        
        {/* Skill Categories Grid */}
        <div className="skills-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="skill-category glass-card border-gradient rounded-xl p-6 hover-lift group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${
                  category.color === 'primary' 
                    ? 'bg-primary/20 text-primary' 
                    : 'bg-accent/20 text-accent'
                }`}>
                  <category.icon size={24} />
                </div>
                <h3 className="text-xl font-bold">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIndex) => (
                  <span
                    key={sIndex}
                    className={`px-3 py-1 rounded-full text-sm font-medium border transition-all ${
                      category.color === 'primary'
                        ? 'border-primary/30 text-primary/80 hover:bg-primary/10'
                        : 'border-accent/30 text-accent/80 hover:bg-accent/10'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Expertise Areas */}
        <div className="expertise-container">
          <h3 className="text-2xl font-bold mb-6 text-center">
            Areas of <span className="text-primary">Expertise</span>
          </h3>
          
          <div className="flex flex-wrap justify-center gap-3">
            {expertiseAreas.map((area, index) => (
              <span
                key={index}
                className="expertise-pill px-6 py-3 rounded-full glass-card border border-primary/30 text-foreground font-medium hover:border-primary hover:bg-primary/10 transition-all cursor-default"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
        
        {/* Operating Systems */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 glass-card rounded-full px-6 py-3">
            <Monitor size={20} className="text-primary" />
            <span className="text-muted-foreground">
              <span className="text-foreground font-medium">OS:</span> Linux (Ubuntu, Debian, Kali), macOS, Windows
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
