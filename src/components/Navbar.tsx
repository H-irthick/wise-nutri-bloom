
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        isScrolled 
          ? "bg-background/80 backdrop-blur-base border-b border-border/50 py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 transition-all-200 hover:opacity-80"
          >
            <div className="rounded-full bg-nutriwise-600 p-1.5">
              <div className="w-5 h-5 rounded-full bg-white" />
            </div>
            <span className="font-medium text-xl tracking-tight">NutriWise</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-foreground/80 hover:text-foreground transition-all-200">
              Home
            </Link>
            <Link to="#calculator" className="text-foreground/80 hover:text-foreground transition-all-200">
              Calculator
            </Link>
            <Link to="#foods" className="text-foreground/80 hover:text-foreground transition-all-200">
              Foods
            </Link>
            <Link to="#about" className="text-foreground/80 hover:text-foreground transition-all-200">
              About
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button size="sm" className="bg-nutriwise-600 hover:bg-nutriwise-700 text-white">
              Get Started
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-base pt-16 px-4 animate-fade-in">
          <nav className="flex flex-col gap-4 py-8">
            <Link 
              to="/" 
              className="text-lg py-2 border-b border-border/50 text-foreground/90 hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="#calculator" 
              className="text-lg py-2 border-b border-border/50 text-foreground/90 hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Calculator
            </Link>
            <Link 
              to="#foods" 
              className="text-lg py-2 border-b border-border/50 text-foreground/90 hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Foods
            </Link>
            <Link 
              to="#about" 
              className="text-lg py-2 border-b border-border/50 text-foreground/90 hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <div className="flex flex-col gap-3 mt-4">
              <Button variant="outline" className="w-full">
                Sign In
              </Button>
              <Button className="w-full bg-nutriwise-600 hover:bg-nutriwise-700 text-white">
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
