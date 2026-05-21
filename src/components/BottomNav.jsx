import { Home, Folder, Plus, Settings, Trash2 } from 'lucide-react';
import { cn } from '../lib/utils';

export function BottomNav({ activeFolderId, onSelectFolder, onNewIdea, onSidebarToggle, onSettingsOpen, onTrashOpen, trashCount }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 lg:hidden bg-card/80 backdrop-blur-xl border-t border-border px-4 py-3 grid grid-cols-5 items-center z-40 pb-safe">
      <div className="flex justify-center">
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
          onClick={onSidebarToggle}
          className="flex flex-col items-center gap-1 text-text-muted hover:text-primary transition-colors"
        >
          <Folder className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tight">Carpetas</span>
        </button>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onNewIdea}
          className="w-12 h-12 bg-primary text-white rounded-2xl shadow-lg shadow-primary/30 flex items-center justify-center -translate-y-4 active:scale-95 transition-all border-4 border-bg-app hover:shadow-xl hover:shadow-primary/40"
        >
          <Plus className="w-7 h-7" />
        </button>
      </div>

      <div className="flex justify-center relative">
        <button
          onClick={onTrashOpen}
          className="flex flex-col items-center gap-1 text-text-muted hover:text-red-500 transition-colors relative"
        >
          <Trash2 className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tight">Papelera</span>
          {trashCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {trashCount > 9 ? '9+' : trashCount}
            </span>
          )}
        </button>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onSettingsOpen}
          className="flex flex-col items-center gap-1 text-text-muted hover:text-primary transition-colors"
        >
          <Settings className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tight">Ajustes</span>
        </button>
      </div>
    </nav>
  );
}
