import { Lightbulb, SearchX, Inbox } from 'lucide-react';
import { motion } from 'framer-motion';

export function EmptyState({ type, onAction }) {
  const configs = {
    ideas: {
      icon: Lightbulb,
      title: 'No hay ideas todavía',
      description: 'Captura tu primera gran idea y empieza a organizarte hoy mismo.',
      button: 'Nueva Idea',
      action: onAction
    },
    search: {
      icon: SearchX,
      title: 'No se encontraron resultados',
      description: 'Intenta con otros términos de búsqueda o filtros.',
      button: null,
      action: null
    },
    folders: {
      icon: Inbox,
      title: 'No hay carpetas activas',
      description: 'Parece que no hay carpetas seleccionadas o disponibles.',
      button: 'Crear Carpeta',
      action: onAction
    }
  };

  const config = configs[type] || configs.ideas;
  const Icon = config.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-12 text-center"
    >
      <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-6 border border-primary/20">
        <Icon className="w-10 h-10 text-primary" />
      </div>
      <h3 className="text-xl font-bold text-text-main mb-2">{config.title}</h3>
      <p className="text-text-muted max-w-sm mb-8 leading-relaxed">
        {config.description}
      </p>
      {config.button && (
        <button
          onClick={config.action}
          className="bg-primary hover:bg-primary-hover text-white font-bold px-8 py-3 rounded-2xl transition-all shadow-lg shadow-primary/20"
        >
          {config.button}
        </button>
      )}
    </motion.div>
  );
}
