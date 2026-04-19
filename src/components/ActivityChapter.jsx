import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const ActivityChapter = ({ number, title, image, position = 'center center', zoom = 'zoom' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = zoom === 'wide' ? 1.0 : 1.25;

  return (
    <section ref={ref} className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center bg-charcoal">
      {/* Cinematic Parallax Background */}
      <motion.div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${image})`,
          y,
          scale,
          objectPosition: position
        }}
      >
        {/* Rich Triple-layer Overlay for maximum legibility */}
        <div className="absolute inset-0 bg-green-dark/75 mix-blend-multiply" />
        <div className="absolute inset-0 bg-charcoal/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-transparent to-charcoal/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      </motion.div>

      {/* Massive Vertical Numbering (Sidebar-style) */}
      <div className="absolute left-8 md:left-20 top-0 bottom-0 z-10 flex flex-col justify-center pointer-events-none">
        <motion.span 
          className="font-serif text-[25vw] leading-none text-amber opacity-20 select-none pb-20"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 0.2 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {number}
        </motion.span>
      </div>

      {/* Centered Editorial Content */}
      <motion.div 
        className="relative z-20 text-center px-6 max-w-5xl"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="mb-6 flex flex-col items-center gap-4">
          <span className="font-sans text-xs uppercase tracking-editorial text-amber font-black drop-shadow-md">Documentary Series</span>
          <div className="w-12 h-[2px] bg-amber" />
        </div>
        
        <h2 className="font-serif text-6xl md:text-8xl lg:text-[10rem] text-cream leading-[0.85] tracking-tight drop-shadow-[0_10px_50px_rgba(0,0,0,0.8)]">
          {title}
        </h2>

        {/* Chapter Label Meta */}
        <div className="mt-12 flex items-center justify-center gap-6">
          <span className="font-sans text-xs uppercase tracking-[8px] text-cream font-black drop-shadow-md">Chapter</span>
          <span className="h-[2px] w-8 bg-amber" />
          <span className="font-serif italic text-amber text-3xl font-bold drop-shadow-lg">{number}</span>
        </div>
      </motion.div>

      {/* Scroll Hint Element */}
      <div className="absolute bottom-12 right-12 z-20 hidden md:block">
        <div className="flex flex-col items-end gap-2 text-right">
          <span className="font-sans text-[8px] uppercase tracking-widest text-cream/40 font-bold">Read Documentation</span>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent to-amber/40" />
        </div>
      </div>
    </section>
  );
};

export default ActivityChapter;
