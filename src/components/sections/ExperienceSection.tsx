import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Calendar, MapPin, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
  color: 'primary' | 'accent';
}

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  const experiences: Experience[] = [
    {
      title: 'Senior Software Architect / Developer',
      company: 'Brain Solutions LLC',
      location: 'New York, NY',
      period: '11/2024 – Present',
      highlights: [
        'Built taxi base app with Java/Spring Boot backend and Flutter mobile app',
        'Implemented WhatsApp API with Llama 3.2 LM for natural language processing',
        'Deployed using Docker, Azure, and AWS cloud services',
        'Created React-based admin interface with real-time Firebase sync',
      ],
      color: 'primary',
    },
    {
      title: 'Flutter Developer Consultant',
      company: 'YLift',
      location: 'New York, NY',
      period: '02/2025 – 03/2025',
      highlights: [
        'Revamped mobile application design improving user experience',
        'Optimized resource loading with GetX state management',
        'Integrated new functionalities using Flutter Bloc',
      ],
      color: 'accent',
    },
    {
      title: 'Senior Software Developer',
      company: 'Smart Cab Technologies',
      location: 'New York, NY',
      period: '11/2016 – 10/2024',
      highlights: [
        'Developed taxi base platform for DOH of NYC with Medicaid integration',
        'Automated invoice processing achieving 25% cost savings',
        'Built delivery app using React, AngularJS, and MS Azure/AWS',
        'Led debugging efforts and maintained project health',
      ],
      color: 'primary',
    },
    {
      title: 'CTO',
      company: 'Safe Ride Dispatch LLC',
      location: 'Westchester, NY',
      period: '02/2017 – 10/2024',
      highlights: [
        'Promoted from dispatcher to CTO',
        'Migrated legacy system to ASP.NET MVC achieving 80% TCO savings',
        'Developed APIs for healthcare integration, increasing revenue 55%',
        'Managed real-time driver tracking with Firebase',
      ],
      color: 'accent',
    },
    {
      title: 'Senior Developer',
      company: 'Virtual Info S.A',
      location: 'Cuenca, Ecuador',
      period: '02/2011 – 01/2017',
      highlights: [
        'Led development for Ford, Hyundai, and Volkswagen systems',
        'Created web services for integrated business operations',
        'Built Google Cloud Print-like system using Signal-R',
        'Conducted weekly OOP and architecture training sessions',
      ],
      color: 'primary',
    },
  ];
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.exp-title', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
      
      gsap.from('.timeline-item', {
        x: -60,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
      
      // Animate timeline line
      gsap.from('.timeline-line', {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
    >
      <div className="section-container lg:pr-[35%]">
        <h2 className="exp-title text-4xl md:text-5xl font-bold mb-16">
          Professional <span className="text-gradient">Journey</span>
        </h2>
        
        <div ref={timelineRef} className="relative">
          {/* Timeline Line */}
          <div className="timeline-line absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/30" />
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="timeline-item relative pl-12 md:pl-20">
                {/* Timeline Dot */}
                <div 
                  className={`absolute left-2 md:left-6 top-6 w-4 h-4 rounded-full border-2 ${
                    exp.color === 'primary' 
                      ? 'border-primary bg-primary/20' 
                      : 'border-accent bg-accent/20'
                  } pulse-glow`} 
                />
                
                <div className="glass-card border-gradient rounded-xl p-6 md:p-8 hover-lift group">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {exp.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Building2 size={14} className="text-primary" />
                          {exp.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} className="text-accent" />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                    <div className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                      exp.color === 'primary' 
                        ? 'bg-primary/20 text-primary' 
                        : 'bg-accent/20 text-accent'
                    }`}>
                      <Calendar size={14} className="inline mr-1" />
                      {exp.period}
                    </div>
                  </div>
                  
                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, hIndex) => (
                      <li 
                        key={hIndex}
                        className="flex items-start gap-2 text-muted-foreground"
                      >
                        <ArrowUpRight size={16} className="mt-1 text-primary flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
