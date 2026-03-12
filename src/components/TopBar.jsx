import { useState } from 'react';
import { Search, Bell, Settings, Filter, CheckCircle2, Clock, Inbox, Moon, Sun, LogOut, X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function TopBar({ searchQuery, onSearchChange, filter, onFilterChange, isDarkMode, onToggleDarkMode, onLogout, onSettingsOpen, user }) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const filters = [
    { id: 'all', label: 'Todas', icon: Inbox },
    { id: 'pending', label: 'Pendientes', icon: Clock },
    { id: 'completed', label: 'Completadas', icon: CheckCircle2 },
  ];

  return (
    <header className="h-16 bg-card border-b border-border px-4 md:px-8 flex items-center justify-between sticky top-0 z-30 w-full transition-colors duration-300">
      {/* Search */}
      <div className={cn(
        "flex-1 flex items-center gap-2 transition-all duration-300",
        isSearchExpanded ? "absolute inset-0 bg-card px-4 z-40" : "max-w-xl"
      )}>
        <button 
          onClick={() => setIsSearchExpanded(true)}
          className={cn(
            "p-2 text-text-muted hover:bg-surface rounded-lg lg:hidden",
            isSearchExpanded && "hidden"
          )}
        >
          <Search className="w-5 h-5" />
        </button>

        <div className={cn(
          "relative group w-full",
          !isSearchExpanded && "hidden lg:block"
        )}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-primary transition-colors" />
          <input
            autoFocus={isSearchExpanded}
            type="text"
            placeholder="Buscar ideas..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-surface border border-transparent focus:border-primary/20 focus:bg-card rounded-xl py-2 pl-10 pr-4 text-sm outline-none transition-all placeholder:text-text-muted/60"
          />
          {isSearchExpanded && (
            <button 
              onClick={() => setIsSearchExpanded(false)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Actions & Filters */}
      {!isSearchExpanded && (
        <div className="flex items-center gap-2 md:gap-6 ml-4">
          <div className="hidden sm:flex items-center bg-surface p-1 rounded-xl border border-border">
            {filters.map((f) => {
              const Icon = f.icon;
              return (
                <button
                  key={f.id}
                  onClick={() => onFilterChange(f.id)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                     filter === f.id 
                      ? "bg-card text-primary shadow-sm border border-border" 
                      : "text-text-muted hover:text-text-main"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden lg:inline">{f.label}</span>
                </button>
              )
            })}
          </div>

          {/* Simple filter for mobile */}
          <button className="sm:hidden p-2 text-text-muted hover:bg-surface rounded-lg transition-all">
            <Filter className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-1">
            <button 
              onClick={onToggleDarkMode}
              className="p-2 text-text-muted hover:bg-surface rounded-lg transition-all"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button className="p-2 text-text-muted hover:bg-surface rounded-lg transition-all relative hidden md:block">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-card"></span>
            </button>
            
            <div className="h-8 w-[1px] bg-border mx-1 md:mx-2"></div>
            
            <button 
              onClick={onLogout}
              className="flex items-center gap-2 p-1 pl-1 hover:bg-red-500/10 rounded-xl transition-all border border-transparent hover:border-red-500/20 group"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xs uppercase overflow-hidden group-hover:bg-red-500 group-hover:text-white transition-colors">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
                ) : (
                  user?.displayName?.charAt(0) || 'U'
                )}
              </div>
              <div className="flex flex-col items-start pr-2 hidden xl:flex">
                <span className="text-sm font-bold text-text-main leading-none mb-1">{user?.displayName?.split(' ')[0] || 'Usuario'}</span>
                <span className="text-[10px] font-bold text-text-muted flex items-center gap-1 group-hover:text-red-500">
                  <LogOut className="w-2.5 h-2.5" /> Salir
                </span>
              </div>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
