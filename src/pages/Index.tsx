import { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import HumanGuide from '@/components/HumanGuide';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState('hero');
  
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    setScrollProgress(progress);
    
    // Determine current section
    const sections = ['hero', 'about', 'experience', 'skills', 'projects', 'contact'];
    for (const section of sections.reverse()) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2) {
          setCurrentSection(section);
          break;
        }
      }
    }
  }, []);
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
  
  return (
    <>
      <Helmet>
        <title>Milton Xavier Sarmiento Cornejo | Senior Software Architect</title>
        <meta 
          name="description" 
          content="20+ years of experience in systems design and development. Expert in cloud architecture, full-stack development, and technical leadership." 
        />
        <meta name="keywords" content="Software Architect, Full Stack Developer, React, Flutter, Cloud Architecture, New York" />
        <meta property="og:title" content="Milton Xavier Sarmiento | Senior Software Architect" />
        <meta property="og:description" content="20+ years of experience crafting scalable systems and leading global teams." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://mxsarmiento.brainsolutions.nyc" />
      </Helmet>
      
      <div className="relative min-h-screen bg-background">
        {/* 3D Human Guide - Fixed on right side */}
        <HumanGuide scrollProgress={scrollProgress} currentSection={currentSection} />
        
        {/* Navigation */}
        <Navigation currentSection={currentSection} />
        
        {/* Main Content */}
        <main>
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
