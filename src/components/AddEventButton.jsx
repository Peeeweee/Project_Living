import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const AddEventButton = ({ openModal }) => {
  return (
    <motion.button
      onClick={openModal}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.04, borderColor: 'var(--amber)' }}
      whileTap={{ scale: 0.96 }}
      className="fixed bottom-28 right-8 z-[100] flex items-center gap-2 bg-green-dark text-cream px-6 py-3 rounded-full shadow-xl border-2 border-transparent transition-colors"
    >
      <Plus size={20} />
      <span className="font-sans font-bold uppercase tracking-widest text-xs">Add Activity</span>
    </motion.button>
  );
};

export default AddEventButton;
