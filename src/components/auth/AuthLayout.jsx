import { motion } from 'framer-motion';
import authIllustration from '../../assets/auth_illustration.png';
import { Lightbulb } from 'lucide-react';

export function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-bg-app flex items-center justify-center p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-6xl w-full bg-card rounded-[2.5rem] shadow-2xl border border-border overflow-hidden flex flex-col md:flex-row h-full min-h-[700px]">
        {/* Illustration Side */}
        <div className="hidden md:flex flex-1 bg-surface p-12 flex-col justify-between items-start relative overflow-hidden">
          <div className="flex items-center gap-3 relative z-10">
            <div className="bg-primary p-2.5 rounded-2xl">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-text-main">
              IdeaManager
            </span>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full relative z-10"
          >
            <img 
              src={authIllustration} 
              alt="Auth Illustration" 
              className="w-full h-auto drop-shadow-2xl"
            />
          </motion.div>

          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold text-text-main mb-4 leading-tight">
              Organiza tus pensamientos <br /> 
              <span className="text-primary">con inteligencia.</span>
            </h2>
            <p className="text-text-muted font-medium max-w-sm">
              La plataforma profesional para gestionar tus ideas más brillantes de forma elegante y productiva.
            </p>
          </div>

          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl" />
        </div>

        {/* Form Side */}
        <div className="flex-1 p-8 md:p-16 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-text-main mb-3">{title}</h1>
              <p className="text-text-muted font-medium">{subtitle}</p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
