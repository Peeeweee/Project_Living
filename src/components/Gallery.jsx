import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

const Gallery = ({ activities }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Flatten all photos from all activities into a single gallery array
  const allPhotos = useMemo(() => {
    return activities.flatMap(activity => 
      activity.photos
        .filter(photo => photo.src && photo.src.trim() !== '')
        .map((photo, idx) => ({
          ...photo,
          activityTitle: activity.title,
          activityNumber: activity.number,
          id: `${activity.id}-${idx}` // Better stable key avoiding long src strings
        }))
    );
  }, [activities]);

  return (
    <section className="bg-cream py-24 relative z-10">
      <motion.div 
        className="editorial-container"
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-16 text-center">
          <span className="uppercase tracking-[5px] text-amber text-[10px] font-bold mb-4 block">Visual Archive</span>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal">Nature's Documentation</h2>
        </div>

        {/* Masonry Layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {allPhotos.map((image) => (
            <motion.div 
              key={image.id}
              className="relative overflow-hidden group cursor-pointer break-inside-avoid shadow-lg bg-charcoal/5"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedImage(image)}
            >
              <img 
                src={image.src} 
                alt={image.caption}
                className="w-full h-auto object-cover grayscale brightness-90 transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105"
                style={{ objectPosition: image.position || 'center' }}
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <span className="text-amber font-sans text-[9px] tracking-[4px] uppercase font-bold mb-1">Chapter {image.activityNumber}</span>
                <p className="text-white font-serif italic text-lg opacity-90">{image.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Lightbox - Fixed & Enhanced Logic */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 md:p-12 overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-charcoal/95 backdrop-blur-md cursor-zoom-out"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            />
            
            <button 
              className="absolute top-8 right-8 text-cream/50 hover:text-white transition-colors z-[410] p-2"
              onClick={() => setSelectedImage(null)}
              aria-label="Close Lightbox"
            >
              <X size={40} />
            </button>
            
            <motion.div 
              className="relative w-full max-w-5xl h-full flex flex-col items-center justify-center p-4 md:p-0 pointer-events-none"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="relative group pointer-events-auto">
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.caption}
                  className="max-w-full max-h-[75vh] object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)] border-4 border-white/10"
                />
              </div>
              
              <div className="mt-8 text-center max-w-2xl pointer-events-auto">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <div className="h-[1px] w-8 bg-amber/30" />
                  <span className="text-amber font-sans text-[10px] uppercase tracking-[5px] font-bold">Chapter {selectedImage.activityNumber}</span>
                  <div className="h-[1px] w-8 bg-amber/30" />
                </div>
                <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-cream italic mb-2">
                  {selectedImage.caption}
                </h3>
                <p className="text-cream/40 font-sans text-[11px] uppercase tracking-widest font-bold">
                  {selectedImage.activityTitle}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
