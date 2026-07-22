import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <a href="#hero" className="text-2xl font-bold text-gradient">
              MXSC
            </a>
            <p className="text-sm text-muted-foreground mt-2">
              Senior Software Architect
            </p>
          </div>
          
          <div className="flex items-center gap-6" role="list">
            <a
              href="https://github.com/dxavsoul"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Visit GitHub profile"
              role="listitem"
            >
              <Github size={20} aria-hidden="true" />
            </a>
            <a
              href="https://linkedin.com/in/mxsarmiento"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Visit LinkedIn profile"
              role="listitem"
            >
              <Linkedin size={20} aria-hidden="true" />
            </a>
            <a
              href="mailto:mxsarmiento@live.com"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Send email"
              role="listitem"
            >
              <Mail size={20} aria-hidden="true" />
            </a>
          </div>
          
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>© {currentYear} Milton Xavier Sarmiento. Built with</span>
            <Heart size={14} className="text-accent fill-accent" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
