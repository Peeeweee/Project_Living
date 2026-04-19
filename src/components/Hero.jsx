import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], ['0%', '40%']);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-charcoal">
      {/* Cinematic Background with Slow Zoom & Parallax */}
      <motion.div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2560")',
          y,
          scale: 1.1
        }}
      />
      
      {/* Editorial Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-transparent to-charcoal/95 z-[1]" />
      <div className="absolute inset-0 bg-black/30 mix-blend-multiply z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-[1]" />
      
      {/* Magazine Metadata Labels */}
      <div className="absolute top-32 left-8 md:left-12 z-20 hidden md:block">
        <motion.div style={{ opacity }} className="space-y-4">
          <p className="font-sans text-[10px] uppercase tracking-editorial text-amber font-bold">Vol. 2026 / Issue 01</p>
          <div className="h-[1px] w-12 bg-amber/50" />
        </motion.div>
      </div>

      <div className="absolute top-32 right-8 md:right-12 z-20 text-right hidden md:block">
        <motion.p style={{ opacity }} className="font-sans text-[10px] uppercase tracking-editorial text-cream font-bold opacity-70">Spring Edition</motion.p>
      </div>

      <motion.div 
        className="relative z-10 text-center max-w-5xl px-4 flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6 flex flex-col items-center">
          <span className="font-sans text-[11px] md:text-sm uppercase tracking-editorial text-amber font-bold mb-4 drop-shadow-md">
            Environmental Student Portfolio
          </span>
          <div className="w-16 h-[1px] bg-amber/50" />
        </motion.div>

        <motion.h1 
          className="font-serif text-cream leading-[0.9] mb-8 drop-shadow-2xl"
          style={{ 
            fontSize: 'clamp(80px, 15vw, 180px)',
            letterSpacing: '-0.04em'
          }}
          variants={itemVariants}
        >
          Living <br />
          <span className="text-amber italic ml-8 md:ml-24 leading-none">with</span> <br />
          <span className="ml-[10%]">Me</span>
        </motion.h1>

        <motion.div 
          className="flex flex-col items-center gap-6"
          variants={itemVariants}
        >
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-cream/30" />
            <p className="font-sans text-cream/70 text-[11px] md:text-xs uppercase tracking-editorial font-bold">
              People and Earth's Ecosystems
            </p>
            <div className="h-[1px] w-12 bg-cream/30" />
          </div>
          
          <p className="font-serif italic text-cream text-2xl md:text-4xl drop-shadow-md">
            By Kent Paulo Delgado
          </p>
        </motion.div>
      </motion.div>

      {/* Floating Scroll Indicator */}
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="font-sans text-[9px] uppercase tracking-[4px] text-cream opacity-50 font-bold">Scroll to Explore</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-amber to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
