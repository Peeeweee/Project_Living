import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirm", type = "danger" }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-cream w-full max-w-md overflow-hidden shadow-2xl border-t-4 border-amber p-8 md:p-10 rounded-sm"
          >
            <div className="flex flex-col items-center text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${type === 'danger' ? 'bg-red-500/10 text-red-500' : 'bg-amber/10 text-amber'}`}>
                <AlertTriangle size={32} />
              </div>

              <h3 className="font-serif text-2xl text-charcoal mb-4">{title}</h3>
              <p className="font-sans text-sm text-muted leading-relaxed mb-10">
                {message}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <button 
                  onClick={onClose}
                  className="flex-1 py-3 border-2 border-charcoal/10 text-charcoal/60 font-sans font-bold uppercase tracking-widest text-[10px] hover:bg-charcoal/5 transition-colors rounded-sm"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className={`flex-1 py-3 text-cream font-sans font-bold uppercase tracking-widest text-[10px] transition-all rounded-sm shadow-lg ${type === 'danger' ? 'bg-red-600 hover:bg-red-700 shadow-red-600/20' : 'bg-green-dark hover:bg-amber shadow-green-dark/20'}`}
                >
                  {confirmText}
                </button>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-muted hover:text-charcoal transition-colors"
            >
              <X size={20} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;
