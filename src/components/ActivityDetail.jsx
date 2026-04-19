import { motion } from 'framer-motion';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';

const ActivityDetail = ({ activity, editMode, onEdit, onDelete }) => {
  const { description, photos, date, location, organization, certificate, reflection } = activity;
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditConfirm, setShowEditConfirm] = useState(false);

  return (
    <motion.div 
      className="editorial-container py-24 relative"
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Edit Controls */}
      {editMode && (
        <div className="absolute top-8 right-8 md:right-12 z-20 flex gap-3">
          <button 
            onClick={() => setShowEditConfirm(true)}
            className="p-3 bg-amber/10 border border-amber/20 text-amber hover:bg-amber hover:text-white transition-all rounded-full flex items-center justify-center shadow-sm"
            title="Edit Activity"
          >
            <Pencil size={18} />
          </button>
          <button 
            onClick={() => setShowDeleteConfirm(true)}
            className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all rounded-full flex items-center justify-center shadow-sm"
            title="Delete Activity"
          >
            <Trash2 size={18} />
          </button>
        </div>
      )}

      {/* Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-16 items-start mb-24">
        
        {/* Left: Photos */}
        <div className="space-y-12">
          {photos.filter(p => p.src && p.src.trim() !== '').map((photo, idx) => (
            <motion.div 
              key={idx} 
              className="group"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
            >
              <div className="overflow-hidden mb-4 aspect-[4/3] md:aspect-video bg-muted/20">
                <img 
                  src={photo.src} 
                  alt={photo.caption} 
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                  style={{ 
                    objectPosition: photo.position || 'center center',
                    transform: photo.zoom === 'zoom' ? 'scale(1.05)' : 'scale(1)'
                  }}
                />
              </div>
              <p className="font-sans text-sm text-muted italic border-l-2 border-muted/30 pl-4 py-1">
                {photo.caption}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Right: Info & Metadata */}
        <div className="lg:sticky lg:top-12 space-y-12">
          <div className="space-y-6">
            <p className="font-sans text-lg text-charcoal/80 leading-relaxed first-letter:text-5xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:text-green-dark">
              {description}
            </p>
            
            <div className="pt-8 border-t border-muted/20 space-y-4">
              <div className="flex flex-col">
                <span className="uppercase tracking-widest text-xs text-amber font-bold mb-1">Date</span>
                <span className="font-sans text-sm text-charcoal">{date}</span>
              </div>
              <div className="flex flex-col">
                <span className="uppercase tracking-widest text-xs text-amber font-bold mb-1">Location</span>
                <span className="font-sans text-sm text-charcoal">{location}</span>
              </div>
              <div className="flex flex-col">
                <span className="uppercase tracking-widest text-xs text-amber font-bold mb-1">Organization</span>
                <span className="font-sans text-sm text-charcoal">{organization}</span>
              </div>
            </div>
          </div>

          {/* Certificate Display */}
          <div className="border-2 border-dashed border-amber/40 bg-amber/5 p-8 text-center rounded-sm overflow-hidden group relative">
            {certificate.image ? (
              <div className="absolute inset-0 z-0">
                <img 
                  src={certificate.image} 
                  alt="Official Certificate" 
                  className="w-full h-full object-cover opacity-20 grayscale blur-[1px] group-hover:opacity-40 transition-opacity"
                />
              </div>
            ) : null}
            
            <div className="relative z-10">
              <span className="block uppercase tracking-editorial text-[10px] text-amber mb-4">Official Validation</span>
              <h4 className="font-serif text-xl text-green-dark mb-2">Certificate of Participation</h4>
              <p className="text-[10px] font-sans text-muted uppercase font-bold">Issued by {certificate.org} • {certificate.date}</p>
              
              {certificate.image && (
                <button 
                  onClick={() => window.open(certificate.image, '_blank')}
                  className="mt-4 px-4 py-2 bg-amber/10 border border-amber/20 text-amber text-[9px] uppercase font-bold tracking-widest hover:bg-amber hover:text-white transition-all rounded-sm"
                >
                  View Full Document
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pull Quote */}
      <motion.div 
        className="w-full bg-cream border-l-8 border-amber p-12 md:p-16 lg:p-20 shadow-sm"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <blockquote className="font-serif text-3xl md:text-4xl lg:text-5xl italic text-green-dark leading-tight">
          "{reflection}"
        </blockquote>
      </motion.div>

      {/* Logic Modals */}
      <ConfirmationModal 
        isOpen={showEditConfirm}
        onClose={() => setShowEditConfirm(false)}
        onConfirm={() => onEdit(activity)}
        title="Enter Editing Mode?"
        message="You are about to modify this activity's documentation. Any unsaved changes will be lost if you exit the editor without saving."
        confirmText="Edit Now"
        type="warning"
      />

      <ConfirmationModal 
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={() => onDelete(activity.id)}
        title="Permanently Delete?"
        message="This will remove this activity chapter from your portfolio and documentation archive. This action cannot be undone."
        confirmText="Delete Permanent"
        type="danger"
      />
    </motion.div>
  );
};

export default ActivityDetail;
