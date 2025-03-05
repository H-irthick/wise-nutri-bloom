
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMobile } from '@/hooks/use-mobile';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useMobile();

  // Toggle the mobile menu
  const toggleMenu = () => setIsOpen(!isOpen);

  // Close the menu when the window is resized to desktop
  useEffect(() => {
    if (!isMobile && isOpen) {
      setIsOpen(false);
    }
  }, [isMobile, isOpen]);

  // Change navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation links
  const navLinks = [
    { text: 'Home', href: '/' },
    { text: 'Calculator', href: '#calculator' },
    { text: 'Dietary Options', href: '#dietary-preferences' },
    { text: 'Nutritional Analysis', href: '#nutritional-analysis' },
    { text: 'BMI Calculator', href: '#bmi-calculator' },
    { text: 'Meal Planner', href: '#meal-planner' },
    { text: 'Recommendations', href: '#recommendations' },
    { text: 'About', href: '#about' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-nutriwise-800">
              Nutri<span className="text-nutriwise-600">Wise</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-nutriwise-600 hover:bg-nutriwise-50 rounded-md transition-colors"
              >
                {link.text}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="md:hidden"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white border-b"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-nutriwise-600 hover:bg-nutriwise-50 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.text}
                  </a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
