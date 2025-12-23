import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Smartphone, Cloud, Car, ShoppingBag } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  description: string;
  technologies: string[];
  icon: any;
  highlights: string[];
  color: 'primary' | 'accent';
}

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const projects: Project[] = [
    {
      title: 'Taxi Base Management System',
      description: 'Comprehensive platform for taxi bases working with NYC DOH, managing Medicaid trips and driver operations.',
      technologies: ['Java', 'Spring Boot', 'Flutter', 'Firebase', 'PostgreSQL', 'Azure'],
      icon: Car,
      highlights: [
        'WhatsApp API with Llama 3.2 LM for NLP',
        'Real-time driver tracking',
        'Automated trip dispatching',
        'Docker/Kubernetes deployment',
      ],
      color: 'primary',
    },
    {
      title: 'E-Commerce Platform',
      description: 'Cross-platform e-commerce solution with optimized mobile experience and efficient resource management.',
      technologies: ['Flutter', 'GetX', 'Flutter Bloc', 'REST APIs'],
      icon: ShoppingBag,
      highlights: [
        'Responsive web and mobile design',
        'Optimized resource loading',
        'State management with GetX',
        'Admin dashboard integration',
      ],
      color: 'accent',
    },
    {
      title: 'Healthcare Integration APIs',
      description: 'API ecosystem for healthcare systems integration, connecting with Medanswering and Modivcare.',
      technologies: ['C#', 'ASP.NET', 'REST APIs', 'Azure'],
      icon: Cloud,
      highlights: [
        'Increased revenue by 55%',
        'HIPAA compliant architecture',
        'Real-time data synchronization',
        'Multi-vendor integration',
      ],
      color: 'primary',
    },
    {
      title: 'Delivery Cloud Solution',
      description: 'Cloud-based delivery application deployed across Latin America with secure banking integrations.',
      technologies: ['React', 'AngularJS', 'Azure', 'AWS', '.NET'],
      icon: Smartphone,
      highlights: [
        'Multi-region deployment',
        'Secure bank transactions',
        'Container orchestration',
        'CI/CD with GitHub Actions',
      ],
      color: 'accent',
    },
  ];
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.projects-title', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
      
      gsap.from('.project-card', {
        y: 60,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
    >
      <div className="section-container lg:pr-[35%]">
        <h2 className="projects-title text-4xl md:text-5xl font-bold mb-6">
          Featured <span className="text-gradient">Projects</span>
        </h2>
        
        <p className="text-lg text-muted-foreground mb-16 max-w-2xl">
          A selection of impactful projects that showcase my expertise in building 
          scalable, innovative solutions across various industries.
        </p>
        
        <div className="projects-grid grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card glass-card border-gradient rounded-xl p-6 md:p-8 hover-lift group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${
                  project.color === 'primary' 
                    ? 'bg-primary/20 text-primary' 
                    : 'bg-accent/20 text-accent'
                }`}>
                  <project.icon size={28} />
                </div>
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              
              <p className="text-muted-foreground mb-4">
                {project.description}
              </p>
              
              <ul className="space-y-2 mb-6">
                {project.highlights.map((highlight, hIndex) => (
                  <li key={hIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      project.color === 'primary' ? 'bg-primary' : 'bg-accent'
                    }`} />
                    {highlight}
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, tIndex) => (
                  <span
                    key={tIndex}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-secondary/50 text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://github.com/dxavsoul"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary/50 text-primary font-medium hover:bg-primary/10 transition-all"
          >
            <Github size={20} />
            View More on GitHub
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
