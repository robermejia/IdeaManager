import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

export function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-bg-app flex items-center justify-center p-4 md:p-8 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md bg-card rounded-3xl shadow-2xl border border-border overflow-hidden"
      >
        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-primary/60 via-primary to-primary/60" />

        <div className="p-8 md:p-10">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-2.5">
              <div className="bg-primary p-2.5 rounded-xl shadow-lg shadow-primary/20">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-text-main">IdeaManager</span>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-text-main mb-1.5">{title}</h1>
            <p className="text-text-muted text-sm font-medium">{subtitle}</p>
          </div>

          {children}
        </div>
      </motion.div>
    </div>
  );
}
