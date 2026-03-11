import { X, Plus, Tag as TagIcon, Folder, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function IdeaModal({ isOpen, onClose, folders, initialIdea, onSave }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [folderId, setFolderId] = useState('');
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (initialIdea) {
      setTitle(initialIdea.title);
      setDescription(initialIdea.description);
      setFolderId(initialIdea.folderId);
      setTags(initialIdea.tags);
    } else {
      setTitle('');
      setDescription('');
      setFolderId(folders[0]?.id || '');
      setTags([]);
    }
  }, [initialIdea, isOpen, folders]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    onSave({ title, description, folderId, tags });
    onClose();
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      if (!tags.includes(newTag.trim())) {
        setTags([...tags, newTag.trim()]);
      }
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-card rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-text-main">
                  {initialIdea ? 'Editar Idea' : 'Nueva Idea'}
                </h2>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-surface rounded-xl transition-colors text-text-muted"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-main">Título</label>
                  <input
                    autoFocus
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="¿En qué estás pensando?"
                    className="w-full bg-surface border-none focus:ring-2 ring-primary/20 rounded-2xl p-4 text-text-main outline-none transition-all placeholder:text-text-muted/40"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-main">Descripción</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Cuéntame más sobre esta idea..."
                    className="w-full bg-surface border-none focus:ring-2 ring-primary/20 rounded-2xl p-4 text-text-main outline-none transition-all resize-none placeholder:text-text-muted/40"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-text-main flex items-center gap-2">
                      <Folder className="w-4 h-4" /> Carpeta
                    </label>
                    <select
                      value={folderId}
                      onChange={(e) => setFolderId(e.target.value)}
                      className="w-full bg-surface border-none focus:ring-2 ring-primary/20 rounded-2xl p-4 text-text-main outline-none transition-all appearance-none"
                    >
                      {folders.map(f => (
                        <option key={f.id} value={f.id}>{f.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-text-main flex items-center gap-2">
                      <TagIcon className="w-4 h-4" /> Etiquetas
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={handleAddTag}
                        placeholder="Presiona Enter..."
                        className="w-full bg-surface border-none focus:ring-2 ring-primary/20 rounded-2xl p-4 text-text-main outline-none transition-all placeholder:text-text-muted/40 pr-10"
                      />
                      <Plus className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    </div>
                  </div>
                </div>

                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <span key={tag} className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-lg border border-primary/20">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="hover:text-red-500 transition-colors">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                <div className="pt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-4 rounded-2xl font-bold text-text-main hover:bg-surface transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-[2] bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primary/20"
                  >
                    {initialIdea ? 'Guardar Cambios' : 'Crear Idea'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
