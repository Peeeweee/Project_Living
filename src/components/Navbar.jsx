import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useActiveSection } from '../hooks/useActiveSection';
import { Download, Upload, Database } from 'lucide-react';

const Navbar = ({ editMode, setEditMode, onExport, onImport }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection(['hero', 'impact', 'activities', 'gallery']);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Preface' },
    { id: 'impact', label: 'Metrics' },
    { id: 'activities', label: 'Activities' },
    { id: 'gallery', label: 'Archive' }
  ];

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[150] transition-all duration-700 ${
        isScrolled 
          ? 'bg-cream/90 backdrop-blur-xl py-4 shadow-[0_10px_40px_rgba(0,0,0,0.05)] border-b border-amber/5' 
          : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-[1800px] mx-auto px-8 md:px-12 flex justify-between items-center">
        {/* Logo / Title */}
        <div className="flex items-center gap-8">
          <button 
            onClick={() => scrollTo('hero')}
            className={`font-serif text-2xl font-bold tracking-tighter transition-colors duration-500 ${isScrolled ? 'text-green-dark' : 'text-cream'}`}
          >
            Living with Me
          </button>
          
          <div className={`hidden lg:flex items-center gap-4 border-l border-amber/20 pl-8 transition-opacity duration-700 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}>
            <span className="font-sans text-[10px] uppercase tracking-editorial font-bold text-amber">Spring 2026</span>
            <span className="text-amber opacity-30">/</span>
            <span className="font-sans text-[10px] uppercase tracking-editorial font-bold text-green-dark/40">Issue No. 01</span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`font-sans text-[10px] uppercase tracking-editorial font-bold transition-all duration-500 relative group py-2
                ${isScrolled ? 'text-green-dark/60' : 'text-cream/70'}
                ${activeSection === link.id ? '!text-amber opacity-100' : 'hover:opacity-100'}`}
            >
              {link.label}
              <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-amber transition-transform duration-500 origin-right
                ${activeSection === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-hover:origin-left'}`} 
              />
            </button>
          ))}
          
          <div className={`ml-4 h-5 w-[1px] bg-amber/20 hidden lg:block transition-all duration-700 ${isScrolled ? 'opacity-100' : 'opacity-0'}`} />
          
          {/* Edit Mode Toggle Integration */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber/10 shadow-sm ml-2 group hover:border-amber/30 transition-all">
            <span className={`font-sans text-[9px] uppercase tracking-editorial font-bold transition-colors ${isScrolled ? 'text-green-dark' : 'text-cream'}`}>Edit</span>
            <button 
              onClick={() => setEditMode(!editMode)}
              className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-300 ${editMode ? 'bg-amber' : 'bg-muted/30'}`}
            >
              <motion.div 
                animate={{ x: editMode ? 16 : 0 }}
                className="w-3 h-3 bg-white rounded-full shadow-md"
              />
            </button>
          </div>

          {/* Data Archive Controls */}
          <div className="flex items-center gap-2 ml-2">
            <button 
              onClick={onExport}
              className={`p-1.5 rounded-full hover:bg-amber/10 transition-colors group relative ${isScrolled ? 'text-green-dark' : 'text-cream'}`}
              title="Download Archive"
            >
              <Download size={14} className="opacity-40 group-hover:opacity-100" />
            </button>
            <label 
              className={`p-1.5 rounded-full hover:bg-amber/10 transition-colors cursor-pointer group relative ${isScrolled ? 'text-green-dark' : 'text-cream'}`}
              title="Restore Sync"
            >
              <Upload size={14} className="opacity-40 group-hover:opacity-100" />
              <input type="file" className="hidden" accept=".json" onChange={onImport} />
            </label>
          </div>
        </div>

        {/* Mobile Hamburger Icons */}
        <button 
          className="md:hidden relative z-50 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="space-y-1.5 overflow-hidden">
            <motion.div 
              animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 7 : 0 }}
              className={`w-6 h-[1.5px] transition-colors ${isScrolled || isMobileMenuOpen ? 'bg-green-dark' : 'bg-cream'}`} 
            />
            <motion.div 
              animate={{ opacity: isMobileMenuOpen ? 0 : 1, x: isMobileMenuOpen ? 20 : 0 }}
              className={`w-6 h-[1.5px] transition-colors ${isScrolled ? 'bg-green-dark' : 'bg-cream'}`} 
            />
            <motion.div 
              animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -7 : 0 }}
              className={`w-6 h-[1.5px] transition-colors ${isScrolled || isMobileMenuOpen ? 'bg-green-dark' : 'bg-cream'}`} 
            />
          </div>
        </button>
      </div>

      {/* Mobile Slide-down Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-cream z-[40] flex flex-col items-center justify-center space-y-12"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => scrollTo(link.id)}
                className="font-serif text-5xl text-green-dark hover:text-amber transition-colors italic"
              >
                {link.label}
              </motion.button>
            ))}
            
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.5 }}
              className="pt-12 border-t border-amber/20 w-64 flex flex-col items-center gap-6"
            >
              <span className="font-sans text-xs uppercase tracking-[4px] font-black text-amber">Admin Controls</span>
              <div className="flex items-center justify-between w-full bg-cream-dark p-6 rounded-sm shadow-sm">
                <span className="font-sans text-[11px] uppercase tracking-widest font-black text-green-dark">Edit Mode</span>
                <button 
                  onClick={() => setEditMode(!editMode)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${editMode ? 'bg-amber' : 'bg-muted/40'}`}
                >
                  <motion.div 
                    animate={{ x: editMode ? 24 : 0 }}
                    className="w-4 h-4 bg-white rounded-full shadow-md"
                  />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
