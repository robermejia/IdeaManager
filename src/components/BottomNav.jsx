import { Home, Folder, Plus, Settings } from 'lucide-react';
import { cn } from '../lib/utils';

export function BottomNav({ activeFolderId, onSelectFolder, onNewIdea, onSidebarToggle }) {
  const items = [
    { id: 'home', label: 'Inicio', icon: Home, action: () => onSelectFolder(null) },
    { id: 'new', label: 'Nueva', icon: Plus, action: onNewIdea, isCenter: true },
    { id: 'folders', label: 'Carpetas', icon: Folder, action: onSidebarToggle },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 lg:hidden bg-card/80 backdrop-blur-xl border-t border-border px-10 py-3 grid grid-cols-3 items-center z-40 pb-safe">
      <div className="flex justify-start">
        <button
          onClick={() => onSelectFolder(null)}
          className={cn(
            "flex flex-col items-center gap-1 transition-colors",
            !activeFolderId ? "text-primary" : "text-text-muted"
          )}
        >
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tight">Inicio</span>
        </button>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onNewIdea}
          className="w-14 h-14 bg-primary text-white rounded-2xl shadow-lg shadow-primary/30 flex items-center justify-center -translate-y-6 active:scale-95 transition-all border-4 border-bg-app hover:shadow-xl hover:shadow-primary/40"
        >
          <Plus className="w-8 h-8" />
        </button>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onSidebarToggle}
          className="flex flex-col items-center gap-1 text-text-muted hover:text-primary transition-colors"
        >
          <Folder className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tight">Carpetas</span>
        </button>
      </div>
    </nav>
  );
}
