import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Github, Linkedin, Globe, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'mxsarmiento@live.com', href: 'mailto:mxsarmiento@live.com' },
    { icon: Phone, label: 'Phone', value: '(917) 684-1338', href: 'tel:+19176841338' },
    { icon: MapPin, label: 'Location', value: 'Long Island City, NY', href: null },
  ];
  
  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/dxavsoul' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/mxsarmiento' },
    { icon: Globe, label: 'Website', href: 'https://mxsarmiento.brainsolutions.nyc' },
  ];
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-title', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
      
      gsap.from('.contact-card', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.contact-grid',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
      
      gsap.from('.contact-form', {
        x: 40,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.contact-form',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:mxsarmiento@live.com?subject=${subject}&body=${body}`;
    
    toast({
      title: "Opening email client...",
      description: "Your default email application will open with the message.",
    });
    
    setFormData({ name: '', email: '', message: '' });
  };
  
  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 via-transparent to-transparent" />
      
      <div className="section-container relative z-10 lg:pr-[35%]">
        <h2 className="contact-title text-4xl md:text-5xl font-bold mb-6 text-center">
          Let's <span className="text-gradient">Connect</span>
        </h2>
        
        <p className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          Ready to collaborate on your next big project? I'm always open to discussing 
          new opportunities and innovative ideas.
        </p>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="contact-grid space-y-6">
            {contactInfo.map((item, index) => (
              <a
                key={index}
                href={item.href || undefined}
                className={`contact-card flex items-center gap-4 glass-card border-gradient rounded-xl p-5 transition-all ${
                  item.href ? 'hover-lift cursor-pointer' : ''
                }`}
              >
                <div className="p-3 rounded-lg bg-primary/20 text-primary">
                  <item.icon size={24} />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{item.label}</div>
                  <div className="text-lg font-medium">{item.value}</div>
                </div>
              </a>
            ))}
            
            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-card p-4 rounded-xl glass-card border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all hover-lift"
                  title={link.label}
                >
                  <link.icon size={24} />
                </a>
              ))}
            </div>
          </div>
          
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="contact-form space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none"
                placeholder="Tell me about your project..."
              />
            </div>
            
            <button
              type="submit"
              className="w-full px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-lg hover-lift glow-primary transition-all flex items-center justify-center gap-2"
            >
              Send Message
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
