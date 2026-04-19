const Footer = () => {
  return (
    <footer className="bg-green-dark text-cream py-16 border-t-2 border-amber">
      <div className="editorial-container text-center space-y-6">
        <div className="space-y-1">
          <p className="font-serif text-2xl tracking-wide">Kent Paulo Delgado</p>
          <p className="font-sans text-[10px] uppercase tracking-[4px] text-amber opacity-90">People and Earth's Ecosystems 2026</p>
        </div>
        
        <div className="text-[11px] font-sans opacity-50 space-y-1 uppercase tracking-widest pt-4">
          <p>University of Southeastern Philippines</p>
          <p>Academic Year: 2025 - 2026</p>
        </div>

        <div className="pt-8">
          <p className="font-serif italic text-lg text-cream/80 max-w-md mx-auto leading-relaxed">
            "The Earth does not belong to us. We belong to the Earth."
          </p>
        </div>

        <div className="pt-12 text-[10px] opacity-30 font-sans tracking-widest uppercase">
          © 2026 LIVING WITH ME • ALL RIGHTS RESERVED
        </div>
      </div>
    </footer>
  );
};

export default Footer;
