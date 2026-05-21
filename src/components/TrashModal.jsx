import { X, Trash2, RotateCcw, AlertTriangle, PackageOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) { return twMerge(clsx(inputs)); }

export function TrashModal({ isOpen, onClose, trashedIdeas, folders, onRestore, onPermanentDelete, onEmptyTrash }) {
  const [confirmEmpty, setConfirmEmpty] = useState(false);

  const getFolderName = (folderId) =>
    folders.find(f => f.id === folderId)?.name || 'Sin carpeta';

  const formatDate = (iso) => {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('es-ES', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  };

  const handleEmptyTrash = async () => {
    if (!confirmEmpty) { setConfirmEmpty(true); return; }
    await onEmptyTrash();
    setConfirmEmpty(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { onClose(); setConfirmEmpty(false); }}
            className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl bg-card rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-border flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-red-500/10 p-2.5 rounded-xl">
                  <Trash2 className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-text-main">Papelera</h2>
                  <p className="text-xs text-text-muted font-medium mt-0.5">
                    {trashedIdeas.length} {trashedIdeas.length === 1 ? 'idea eliminada' : 'ideas eliminadas'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {trashedIdeas.length > 0 && (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleEmptyTrash}
                    className={cn(
                      "text-xs font-bold px-4 py-2 rounded-xl transition-all",
                      confirmEmpty
                        ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
                        : "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                    )}
                  >
                    {confirmEmpty ? '⚠️ Confirmar vaciar' : 'Vaciar papelera'}
                  </motion.button>
                )}
                <button
                  onClick={() => { onClose(); setConfirmEmpty(false); }}
                  className="p-2 hover:bg-surface rounded-xl transition-colors text-text-muted"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {trashedIdeas.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-16 gap-4"
                >
                  <div className="bg-surface rounded-3xl p-6">
                    <PackageOpen className="w-12 h-12 text-text-muted/40" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-text-main">La papelera está vacía</p>
                    <p className="text-sm text-text-muted mt-1">Las ideas eliminadas aparecerán aquí</p>
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-2">
                  <AnimatePresence mode="popLayout">
                    {trashedIdeas.map((idea) => (
                      <motion.div
                        key={idea.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, scale: 0.95 }}
                        className="group flex items-center gap-3 p-4 bg-surface rounded-2xl border border-border hover:border-primary/20 transition-all"
                      >
                        {/* Icono */}
                        <div className="text-2xl flex-shrink-0 w-10 h-10 bg-card rounded-xl flex items-center justify-center">
                          {idea.icon || '💡'}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm text-text-main line-clamp-1 line-through opacity-70">
                            {idea.title}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[11px] text-text-muted">
                              📁 {getFolderName(idea.folderId)}
                            </span>
                            {idea.deletedAt && (
                              <>
                                <span className="text-text-muted/40">•</span>
                                <span className="text-[11px] text-text-muted">
                                  Eliminada el {formatDate(idea.deletedAt)}
                                </span>
                              </>
                            )}
                          </div>
                          {idea.tags?.length > 0 && (
                            <div className="flex gap-1 mt-1 flex-wrap">
                              {idea.tags.slice(0, 3).map(tag => (
                                <span key={tag} className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full font-bold">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Acciones */}
                        <div className="flex items-center gap-1.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onRestore(idea.id)}
                            title="Restaurar idea"
                            className="p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-all"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onPermanentDelete(idea.id)}
                            title="Eliminar permanentemente"
                            className="p-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer info */}
            {trashedIdeas.length > 0 && (
              <div className="px-6 py-3 border-t border-border flex-shrink-0 bg-surface/50">
                <p className="text-xs text-text-muted text-center flex items-center justify-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  Las ideas eliminadas permanentemente no se pueden recuperar
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
