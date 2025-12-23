import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial opacity to ensure content is always visible
      gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], { 
        opacity: 1 
      });
      
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      tl.fromTo(titleRef.current, 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2 }
      )
      .fromTo(subtitleRef.current, 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      )
      .fromTo(ctaRef.current?.children ? Array.from(ctaRef.current.children) : [], 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 },
        '-=0.3'
      );
      
    }, containerRef);
    
    return () => ctx.revert();
  }, []);
  
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <section
      id="hero"
      ref={containerRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 lg:mr-[33%]">
        <div className="mb-3 inline-block">
          <span className="px-4 py-2 rounded-full border border-primary/30 text-primary text-sm font-medium glass-card">
            Senior Software Architect
          </span>
        </div>
        
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
        >
          <span className="text-foreground">Hi, I'm </span>
          <span className="text-gradient">Milton</span>
          <br />
          <span className="text-foreground">Xavier Sarmiento</span>
        </h1>
        
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
        >
          20+ years crafting scalable systems, leading teams, and transforming complex challenges into elegant solutions.
        </p>
        
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a
            href="#contact"
            className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-lg hover-lift glow-primary transition-all"
          >
            Let's Connect
          </a>
          <a
            href="#projects"
            className="px-8 py-4 rounded-lg border border-primary/50 text-primary font-semibold text-lg hover:bg-primary/10 transition-all"
          >
            View Projects
          </a>
        </div>
        
        {/* Social Links */}
        <div className="flex items-center justify-center gap-6">
          <a
            href="https://github.com/dxavsoul"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
          >
            <Github size={24} />
          </a>
          <a
            href="https://linkedin.com/in/mxsarmiento"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="mailto:mxsarmiento@live.com"
            className="p-3 rounded-lg border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
          >
            <Mail size={24} />
          </a>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-bounce"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
};

export default HeroSection;
