import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Printer, Download, Image as ImageIcon, FileText } from 'lucide-react';
import { saveAsImage, saveAsPDF } from '../utils/exportPortfolio';

const ExportButton = ({ activities }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (type) => {
    if (type === 'print') {
      window.print();
      return;
    }

    setIsExporting(true);
    setIsOpen(false);

    // Give the DOM a moment to render the hidden content
    setTimeout(async () => {
      const exportEl = document.getElementById('export-doc');
      if (exportEl) {
        if (type === 'pdf') {
          await saveAsPDF(exportEl, 'Environmental_Portfolio.pdf');
        } else if (type === 'image') {
          await saveAsImage(exportEl, 'Environmental_Portfolio.png');
        }
      }
      setIsExporting(false);
    }, 100);
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-[100]">
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="absolute bottom-20 right-0 bg-white shadow-2xl rounded-xl p-4 w-56 border border-amber/20 overflow-hidden"
            >
              <button 
                onClick={() => handleExport('pdf')}
                className="w-full flex items-center gap-3 p-3 hover:bg-amber/10 rounded-lg transition-colors text-charcoal text-sm font-sans"
              >
                <FileText size={18} className="text-amber" />
                Save as PDF
              </button>
              <button 
                onClick={() => handleExport('image')}
                className="w-full flex items-center gap-3 p-3 hover:bg-amber/10 rounded-lg transition-colors text-charcoal text-sm font-sans"
              >
                <ImageIcon size={18} className="text-amber" />
                Save as Image (PNG)
              </button>
              <button 
                onClick={() => handleExport('print')}
                className="w-full flex items-center gap-3 p-3 hover:bg-amber/10 rounded-lg transition-colors text-charcoal text-sm font-sans"
              >
                <Printer size={18} className="text-amber" />
                Print Portfolio
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors ${isExporting ? 'bg-muted' : 'bg-amber'} text-white`}
        >
          {isExporting ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Printer size={24} />
          )}
        </motion.button>
      </div>

      {/* Hidden Export Template Document */}
      {(isExporting || isOpen) && createPortal(
        <div id="export-doc" className="absolute left-[-9999px] top-0 flex flex-col gap-10 bg-gray-100 p-10">
          
          {/* PAGE 1: Cover and Index */}
          <div className="export-page w-[794px] h-[1123px] bg-cream text-charcoal p-16 font-sans flex flex-col relative overflow-hidden border border-gray-200">
            <div className="flex-1 flex flex-col justify-center items-center text-center">
              <span className="uppercase tracking-[10px] text-amber text-sm font-bold mb-6">Spring 2026 // Issue No. 01</span>
              <h1 className="text-7xl font-serif font-bold tracking-tight text-green-dark mb-8">Living with Me</h1>
              <p className="font-serif italic text-2xl text-charcoal/80 mb-16 max-w-lg">A documentary portfolio on human interaction with local ecosystems and environmental stewardship.</p>
              
              <div className="w-16 h-[2px] bg-amber mb-16" />
              
              <div className="text-left bg-white/50 backdrop-blur-sm p-8 border border-charcoal/10 rounded-sm">
                <p className="text-xs text-muted font-bold uppercase mb-4">University of Southeastern Philippines</p>
                <p className="font-bold text-lg uppercase text-green-dark mb-1">Student: Kent Paulo Delgado</p>
                <p className="text-sm text-charcoal/70 mb-1">Subject: People and Earth's Ecosystems</p>
                <p className="text-sm text-charcoal/70 mb-4">Date Documented: {new Date().toLocaleDateString()}</p>
                
                <h3 className="font-serif italic text-lg text-charcoal mt-8 mb-4">Documentation Index:</h3>
                <ul className="space-y-2">
                  {activities.map(a => (
                    <li key={a.id} className="flex justify-between border-b border-charcoal/10 pb-2">
                      <span className="font-bold text-sm">{a.number}. {a.title}</span>
                      <span className="text-xs text-amber font-bold">{a.date}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-4 bg-green-dark" />
          </div>

          {/* PAGE 1.5: Global Statistical Documentation */}
          <div className="export-page w-[794px] h-[1123px] bg-green-dark text-cream font-sans flex flex-col justify-center items-center relative overflow-hidden border border-gray-200 p-16">
            {/* Watermarks */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex flex-col justify-between overflow-hidden">
              <h2 className="font-serif text-[280px] text-cream font-bold leading-none select-none -mx-10 mt-[-40px]">GLOBAL</h2>
              <h2 className="font-serif text-[280px] text-cream font-bold leading-none select-none text-right -mx-10 mb-[-40px]">METRICS</h2>
            </div>
            
            <div className="z-10 text-center w-full">
              <span className="uppercase tracking-[10px] text-amber text-[10px] font-bold mb-32 block">Statistical Documentation</span>
              
              <div className="grid grid-cols-4 gap-6 w-full px-8">
                {[
                  { value: activities.length, label: "Activities Completed" },
                  { value: activities.reduce((sum, a) => sum + (Number(a.hoursOfService) || 0), 0), label: "Hours of Service" },
                  { value: activities.reduce((sum, a) => sum + (Number(a.volunteersEngaged) || 0), 0), label: "Volunteers Engaged" },
                  { value: activities.reduce((sum, a) => sum + (Number(a.livesTouched) || 0), 0), label: "Lives Touched" }
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <span className="font-serif text-6xl text-amber leading-none mb-4">{stat.value}</span>
                    <div className="w-8 h-[2px] bg-amber mb-6" />
                    <span className="font-sans text-[8px] uppercase tracking-[4px] text-cream/70 font-medium max-w-[120px] mx-auto leading-relaxed">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
              
              <p className="mt-40 font-serif italic text-xl text-cream/60 max-w-md mx-auto">
                "Measuring our collective footprint in the preservation of the Earth's delicate biological balance."
              </p>
            </div>
          </div>

          {/* PAGES 2+: One Page per Activity */}
          {activities.map((activity) => (
            <div key={activity.id} className="export-page w-[794px] min-h-[1123px] pb-16 bg-charcoal text-cream font-sans flex flex-col relative overflow-hidden border border-gray-200">
              
              {/* Cinematic Header Layer */}
              <div className="w-full relative max-h-[600px] flex bg-black overflow-hidden">
                {activity.photos[0] && activity.photos[0].src && (
                  <img src={activity.photos[0].src} alt="Hero" className="w-full h-auto object-contain opacity-60" style={{ objectPosition: activity.photos[0].position || 'center' }} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-transparent flex flex-col justify-end p-12">
                  <span className="text-amber text-[10px] tracking-[6px] uppercase font-bold mb-4">Chapter {activity.number}</span>
                  <h2 className="text-5xl font-serif text-white">{activity.title}</h2>
                  <div className="flex items-center gap-4 mt-6">
                    <span className="px-3 py-1 bg-amber/20 text-amber text-[10px] font-bold tracking-widest">{activity.date}</span>
                    <span className="text-white/60 text-xs tracking-widest uppercase">{activity.location}</span>
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div className="flex-1 p-12 space-y-8">
                <p className="text-lg leading-relaxed text-cream/90 font-serif italic border-l-2 border-amber pl-6">
                  {activity.description}
                </p>

                {/* Secondary Photos */}
                <div className="grid grid-cols-2 gap-6 mt-8">
                  {activity.photos.slice(1, 3).map((photo, i) => (
                    photo.src ? (
                      <div key={i} className="aspect-video bg-white/5 overflow-hidden">
                        <img src={photo.src} alt="" className="w-full h-full object-cover grayscale opacity-80" />
                      </div>
                    ) : null
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-8 pt-8 mt-auto border-t border-white/10">
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-amber mb-3">Official Validation</h4>
                    {activity.certificate?.image ? (
                      <img src={activity.certificate.image} className="h-16 w-auto opacity-70 mb-2 grayscale" alt="Certificate" />
                    ) : null}
                    <p className="text-xs text-white/80"><span className="text-white/40">Org:</span> {activity.certificate?.org || 'N/A'}</p>
                    <p className="text-xs text-white/80"><span className="text-white/40">Date:</span> {activity.certificate?.date || activity.date}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-amber mb-3">Personal Reflection</h4>
                    <p className="text-sm leading-relaxed text-cream/70">"{activity.reflection}"</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>,
        document.body
      )}
    </>
  );
};

export default ExportButton;
