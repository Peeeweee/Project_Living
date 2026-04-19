import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useCounter } from '../hooks/useCounter';

const StatCard = ({ target, label, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const count = useCounter(target, 2000, isInView);

  return (
    <motion.div 
      className="relative flex flex-col items-center text-center group py-16 px-4"
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Decorative vertical line */}
      {index > 0 && (
        <div className="absolute left-[-50%] top-1/4 bottom-1/4 w-[1px] bg-amber/10 hidden lg:block" />
      )}

      <div className="relative mb-6">
        <span className="font-serif text-8xl md:text-9xl text-amber leading-none block drop-shadow-2xl">
          {count}
        </span>
        <motion.div 
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-amber"
          initial={{ width: 0 }}
          animate={isInView ? { width: 32 } : {}}
          transition={{ delay: 1, duration: 1 }}
        />
      </div>
      
      <p className="font-sans text-[10px] md:text-xs uppercase tracking-[6px] text-cream/60 font-medium max-w-[150px] leading-relaxed group-hover:text-amber transition-colors duration-500">
        {label}
      </p>
    </motion.div>
  );
};

const ImpactSection = ({ activities }) => {
  // Calculate dynamic totals from activities
  const stats = [
    { target: activities.length, label: "Activities Completed" },
    { target: activities.reduce((sum, a) => sum + (a.hoursOfService || 0), 0), label: "Hours of Service" },
    { target: activities.reduce((sum, a) => sum + (a.volunteersEngaged || 0), 0), label: "Volunteers Engaged" },
    { target: activities.reduce((sum, a) => sum + (a.livesTouched || 0), 0), label: "Lives Touched" }
  ];

  return (
    <section className="bg-green-dark py-40 md:py-64 relative overflow-hidden flex items-center justify-center">
      {/* Immersive Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <h2 className="absolute -top-10 -left-10 font-serif text-[25vw] text-cream font-bold leading-none select-none">
          GLOBAL
        </h2>
        <h2 className="absolute -bottom-20 -right-20 font-serif text-[25vw] text-cream font-bold leading-none select-none">
          METRICS
        </h2>
      </div>

      <div className="editorial-container relative z-10 w-full">
        <div className="mb-24 flex flex-col items-center">
          <span className="text-amber font-sans text-[10px] uppercase tracking-editorial font-bold mb-4">Statistical Documentation</span>
          <div className="h-[1px] w-24 bg-amber/30" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 lg:gap-0">
          {stats.map((stat, idx) => (
            <StatCard key={idx} {...stat} index={idx} />
          ))}
        </div>
        
        <div className="mt-32 flex flex-col items-center space-y-8">
          <div className="h-[1px] w-32 bg-amber/10" />
          <p className="font-serif italic text-cream/40 text-lg md:text-2xl text-center max-w-2xl leading-relaxed">
            "Measuring our collective footprint in the preservation of the Earth's delicate biological balance."
          </p>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
