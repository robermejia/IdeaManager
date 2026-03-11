import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react';
import { useEffect } from 'react';

export function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-primary" />
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className="fixed bottom-8 right-8 z-[100] flex items-center gap-3 bg-card px-6 py-4 rounded-2xl shadow-2xl border border-border min-w-[300px]"
    >
      {icons[type]}
      <p className="text-sm font-bold text-text-main flex-1">{message}</p>
      <button onClick={onClose} className="p-1 hover:bg-surface rounded-lg transition-colors text-text-muted">
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
