import { useState } from 'react';
import { 
  Plus, 
  Folder, 
  Lightbulb, 
  User, 
  Settings, 
  Palette, 
  Inbox, 
  LogOut, 
  ChevronRight, 
  ChevronLeft 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function Sidebar({ folders, activeFolderId, onSelectFolder, onNewIdea, onAddFolder, onSettingsOpen, onDropIdea }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={cn(
      "h-screen bg-card border-r border-border transition-all duration-300 flex flex-col",
      isCollapsed ? "w-20" : "w-64"
    )}>
      {/* Brand */}
      <div className="p-6 flex items-center gap-3">
        <div className="bg-primary p-2 rounded-xl">
          <Lightbulb className="w-6 h-6 text-white" />
        </div>
        {!isCollapsed && (
          <span className="font-bold text-xl tracking-tight text-text-main">
            IdeaManager
          </span>
        )}
      </div>

      {/* New Idea Button */}
      <div className="px-4 mb-6">
        <button
          onClick={onNewIdea}
          className={cn(
            "w-full bg-primary hover:bg-primary-hover text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20",
            isCollapsed ? "p-3" : "px-4"
          )}
        >
          <Plus className="w-5 h-5" />
          {!isCollapsed && <span>Nueva Idea</span>}
        </button>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto px-2 space-y-1">
        <div className="px-4 py-2 opacity-40 text-xs font-bold uppercase tracking-wider">
          {!isCollapsed ? 'Carpetas' : <Inbox className="w-4 h-4 mx-auto" />}
        </div>
        {folders.map((folder) => (
          <button
            key={folder.id}
            onClick={() => onSelectFolder(folder.id)}
            onDragOver={(e) => {
              e.preventDefault();
              e.currentTarget.classList.add('bg-indigo-50');
            }}
            onDragLeave={(e) => {
              e.currentTarget.classList.remove('bg-indigo-50');
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.currentTarget.classList.remove('bg-indigo-50');
              const ideaId = e.dataTransfer.getData('ideaId');
              if (ideaId) onDropIdea(ideaId, folder.id);
            }}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all group",
              activeFolderId === folder.id
                ? "bg-surface text-primary"
                : "text-text-muted hover:bg-surface hover:text-text-main"
            )}
          >
            <Folder className={cn(
              "w-5 h-5",
              activeFolderId === folder.id ? "text-primary" : "text-text-muted group-hover:text-text-main"
            )} />
            {!isCollapsed && <span className="font-medium text-sm">{folder.name}</span>}
          </button>
        ))}

        <button
          onClick={onAddFolder}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-text-muted hover:bg-surface hover:text-text-main transition-all group mt-4 dashed border border-dashed border-border hover:border-primary",
            isCollapsed && "border-none"
          )}
        >
          <Plus className="w-5 h-5" />
          {!isCollapsed && <span className="text-sm font-medium">Nueva carpeta</span>}
        </button>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-border">
        <div className="space-y-1 mb-6">
          <button
            onClick={onSettingsOpen}
            className="flex items-center gap-3 w-full px-4 py-3 text-text-muted hover:text-text-main hover:bg-surface rounded-2xl transition-all font-bold text-sm"
          >
            <Settings className="w-5 h-5" />
            {!isCollapsed && <span>Configuración</span>}
          </button>
          <button className="flex items-center gap-3 w-full px-4 py-3 text-text-muted hover:text-text-main hover:bg-surface rounded-2xl transition-all font-bold text-sm">
            <User className="w-5 h-5" />
            {!isCollapsed && <span>Ayuda</span>}
          </button>
        </div>
      </div>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 bg-card border border-border p-1 rounded-full shadow-sm hover:bg-surface transition-all lg:flex hidden"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>
  );
}
