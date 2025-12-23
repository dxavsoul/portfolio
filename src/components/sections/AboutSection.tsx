import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Users, Globe, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-title', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
      
      gsap.from('.about-text', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });
      
      gsap.from('.stat-card', {
        y: 60,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  const stats = [
    { icon: Award, value: '20+', label: 'Years Experience', color: 'primary' },
    { icon: Users, value: '50+', label: 'Team Members Led', color: 'accent' },
    { icon: Globe, value: '4', label: 'Countries Worked', color: 'primary' },
    { icon: Zap, value: '80%', label: 'TCO Savings Achieved', color: 'accent' },
  ];
  
  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />
      
      <div className="section-container relative z-10 lg:pr-[35%]">
        <h2 className="about-title text-4xl md:text-5xl font-bold mb-8">
          About <span className="text-gradient">Me</span>
        </h2>
        
        <div className="max-w-3xl space-y-6 mb-16">
          <p className="about-text text-lg text-muted-foreground leading-relaxed">
            I'm a seasoned <span className="text-primary font-medium">Senior Software Architect</span> with 
            over two decades of experience in systems design, development, and technical leadership. 
            Currently based in New York, I specialize in building scalable solutions and leading 
            cross-functional teams across global projects.
          </p>
          
          <p className="about-text text-lg text-muted-foreground leading-relaxed">
            My expertise spans from <span className="text-accent font-medium">cloud architecture</span> (Azure, AWS, GCP) 
            to <span className="text-accent font-medium">full-stack development</span> with modern technologies like 
            React, Flutter, Spring Boot, and .NET. I'm passionate about leveraging cutting-edge technologies 
            including AI and machine learning to create innovative solutions.
          </p>
          
          <p className="about-text text-lg text-muted-foreground leading-relaxed">
            As a self-starter and problem-solver, I'm driven by the challenge of creating value for clients 
            while adhering to the highest standards of ethics and compliance. I've successfully led migrations, 
            implemented pricing mechanisms that increased revenue by 55%, and achieved significant cost savings 
            across multiple organizations.
          </p>
        </div>
        
        <div ref={cardsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`stat-card glass-card border-gradient rounded-xl p-6 text-center hover-lift`}
            >
              <stat.icon 
                className={`w-8 h-8 mx-auto mb-3 ${
                  stat.color === 'primary' ? 'text-primary' : 'text-accent'
                }`} 
              />
              <div className={`text-3xl md:text-4xl font-bold mb-1 ${
                stat.color === 'primary' ? 'text-primary' : 'text-accent'
              }`}>
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
