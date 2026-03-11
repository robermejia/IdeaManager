import { useState } from 'react';
import { 
  X, User, Palette, Settings, Folder, Bell, 
  Shield, LogOut, Trash2, Camera, Moon, Sun,
  Check, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function SettingsModal({ isOpen, onClose, user, isDarkMode, onToggleDarkMode, onLogout, folders, onRenameFolder, onDeleteFolder, onNewFolder }) {
  const [activeTab, setActiveTab] = useState('perfil');

  const tabs = [
    { id: 'perfil', label: 'Perfil', icon: User },
    { id: 'apariencia', label: 'Apariencia', icon: Palette },
    { id: 'preferencias', label: 'Preferencias', icon: Settings },
    { id: 'carpetas', label: 'Carpetas', icon: Folder },
    { id: 'notificaciones', label: 'Notificaciones', icon: Bell },
    { id: 'cuenta', label: 'Cuenta', icon: Shield },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-0 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-5xl h-full md:h-[80vh] bg-card md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-border"
          >
            {/* Modal Header Mobile */}
            <div className="md:hidden flex items-center justify-between p-6 border-b border-border bg-card">
              <h2 className="text-xl font-bold text-text-main">Configuración</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-surface rounded-xl transition-colors text-text-muted"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Sidebar Navigation */}
            <div className="w-full md:w-72 bg-surface p-6 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-y-auto no-scrollbar border-b md:border-b-0 md:border-r border-border min-h-fit md:min-h-0">
              <div className="hidden md:block mb-8 px-4">
                <h2 className="text-2xl font-bold text-text-main">Ajustes</h2>
                <p className="text-sm text-text-muted font-medium">Gestiona tu experiencia</p>
              </div>

              <div className="flex md:flex-col gap-2 w-full">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap min-w-fit md:w-full",
                        activeTab === tab.id 
                          ? "bg-card text-primary shadow-sm border border-border" 
                          : "text-text-muted hover:text-text-main hover:bg-card/50"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  )
                })}
              </div>

              <div className="mt-auto hidden md:block px-4">
                <button 
                  onClick={onLogout}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition-all w-full"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Cerrar sesión</span>
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-6 md:p-12 bg-card">
              <div className="max-w-3xl mx-auto">
                {/* Profile Section inside Content for better mobile view */}
                <div className="flex flex-col md:flex-row items-center gap-6 mb-12 p-6 bg-surface/50 rounded-[2rem] border border-border/50">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center text-primary text-3xl font-black border-2 border-primary/20 overflow-hidden shadow-inner">
                      {user?.photoURL ? (
                        <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
                      ) : (
                        user?.displayName?.charAt(0) || 'U'
                      )}
                    </div>
                    <button className="absolute -bottom-2 -right-2 p-2.5 bg-card border border-border rounded-xl text-text-muted hover:text-primary transition-all shadow-md active:scale-90">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-center md:text-left">
                    <h1 className="text-2xl font-bold text-text-main tracking-tight leading-tight mb-1">{user?.displayName || 'Usuario'}</h1>
                    <p className="text-text-muted font-medium mb-4">{user?.email}</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                      <span className="px-3.5 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded-lg border border-primary/20">Pro Plan</span>
                      <span className="px-3.5 py-1 bg-surface text-text-muted text-[10px] font-bold uppercase tracking-wider rounded-lg border border-border">Verificado</span>
                    </div>
                  </div>
                </div>
                <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="h-full"
                    >
                      {activeTab === 'perfil' && (
                        <div className="space-y-8">
                          <div>
                            <h3 className="text-2xl font-bold text-text-main mb-6">Perfil de Usuario</h3>
                            <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-surface rounded-3xl border border-border">
                              <div className="relative group">
                                <div className="w-32 h-32 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary font-bold text-4xl uppercase overflow-hidden ring-4 ring-primary/5">
                                  {user?.photoURL ? (
                                    <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
                                  ) : (
                                    user?.displayName?.charAt(0) || 'U'
                                  )}
                                </div>
                                <button className="absolute -bottom-2 -right-2 p-2.5 bg-card border border-border rounded-xl shadow-lg text-primary hover:bg-surface transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100">
                                  <Camera className="w-5 h-5" />
                                </button>
                              </div>
                              <div className="flex-1 text-center md:text-left">
                                <h4 className="text-xl font-bold text-text-main mb-1">{user?.displayName || 'Nombre no configurado'}</h4>
                                <p className="text-text-muted font-medium mb-4">{user?.email}</p>
                                <button className="px-6 py-2.5 bg-card border border-border rounded-xl text-sm font-bold hover:bg-surface transition-all">
                                  Editar Nombre
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h4 className="font-bold text-text-main px-1">Seguridad</h4>
                            <div className="p-6 bg-surface rounded-3xl border border-border flex items-center justify-between">
                              <div>
                                <p className="font-bold text-text-main">Cambiar Contraseña</p>
                                <p className="text-sm text-text-muted font-medium">Actualiza tu acceso periódicamente</p>
                              </div>
                              <button className="px-4 py-2 bg-card border border-border rounded-xl text-sm font-bold hover:bg-surface transition-all">
                                Actualizar
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'apariencia' && (
                        <div className="space-y-8">
                          <h3 className="text-2xl font-bold text-text-main">Apariencia</h3>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <button 
                              onClick={() => !isDarkMode && onToggleDarkMode()}
                              className={`p-4 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 ${
                                isDarkMode ? "border-primary bg-primary/5" : "border-border bg-surface hover:bg-surface-hover"
                              }`}
                            >
                              <div className="w-full h-24 bg-slate-900 rounded-xl flex items-center justify-center">
                                <Moon className="w-8 h-8 text-primary" />
                              </div>
                              <span className="font-bold text-text-main">Modo Oscuro</span>
                              {isDarkMode && <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center"><Check className="w-4 h-4 text-white" /></div>}
                            </button>

                            <button 
                              onClick={() => isDarkMode && onToggleDarkMode()}
                              className={`p-4 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 ${
                                !isDarkMode ? "border-primary bg-primary/5" : "border-border bg-surface hover:bg-surface-hover"
                              }`}
                            >
                              <div className="w-full h-24 bg-white rounded-xl flex items-center justify-center border border-border">
                                <Sun className="w-8 h-8 text-primary" />
                              </div>
                              <span className="font-bold text-text-main">Modo Claro</span>
                              {!isDarkMode && <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center"><Check className="w-4 h-4 text-white" /></div>}
                            </button>
                          </div>

                          <div className="p-8 bg-surface rounded-[2rem] border border-border">
                            <h4 className="font-bold text-text-main mb-4">Paleta de Colores</h4>
                            <div className="flex gap-4">
                              <div className="w-12 h-12 rounded-2xl bg-[#075985] shadow-lg" />
                              <div className="w-12 h-12 rounded-2xl bg-[#0f172a] shadow-lg" />
                              <div className="w-12 h-12 rounded-2xl bg-[#334155] shadow-lg" />
                              <div className="w-12 h-12 rounded-2xl bg-[#f8fafc] shadow-lg border border-border" />
                            </div>
                            <p className="mt-6 text-sm text-text-muted font-medium italic">
                              "Nuestra paleta de colores está diseñada para transmitir profesionalismo y sobriedad."
                            </p>
                          </div>
                        </div>
                      )}

                      {activeTab === 'preferencias' && (
                        <div className="space-y-8">
                          <h3 className="text-2xl font-bold text-text-main">Preferencias de Ideas</h3>
                          
                          <div className="space-y-6">
                            <div className="space-y-3">
                              <label className="text-sm font-bold text-text-main px-1">Ordenar por</label>
                              <select className="w-full bg-surface border-border focus:ring-2 ring-primary/20 rounded-2xl p-4 text-text-main outline-none transition-all appearance-none font-medium">
                                <option>Fecha de creación (Más recientes)</option>
                                <option>Última edición</option>
                                <option>Prioridad</option>
                              </select>
                            </div>

                            <div className="flex items-center justify-between p-6 bg-surface rounded-3xl border border-border">
                              <div>
                                <p className="font-bold text-text-main">Ocultar Completadas</p>
                                <p className="text-sm text-text-muted font-medium">Ocultar ideas automáticamente al marcarlas</p>
                              </div>
                              <div className="w-14 h-8 bg-primary rounded-full relative p-1 cursor-pointer">
                                <div className="w-6 h-6 bg-white rounded-full translate-x-6 shadow-sm transition-transform" />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'carpetas' && (
                        <div className="space-y-8 flex flex-col h-full">
                          <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-bold text-text-main">Gestión de Carpetas</h3>
                            <button 
                              onClick={onNewFolder}
                              className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                            >
                              Nueva Carpeta
                            </button>
                          </div>
                          
                          <div className="space-y-3 flex-1 overflow-y-auto pr-2">
                            {folders.map(folder => (
                              <div key={folder.id} className="group p-4 bg-surface rounded-2xl border border-border flex items-center justify-between hover:bg-card hover:border-primary/30 transition-all">
                                <div className="flex items-center gap-3">
                                  <div className="bg-primary/10 p-2 rounded-xl text-primary">
                                    <Folder className="w-5 h-5" />
                                  </div>
                                  <span className="font-bold text-text-main">{folder.name}</span>
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button 
                                    onClick={() => onRenameFolder(folder)}
                                    className="p-2 text-text-muted hover:text-primary hover:bg-surface rounded-lg transition-all"
                                  >
                                    Editar
                                  </button>
                                  <button 
                                    onClick={() => onDeleteFolder(folder.id)}
                                    className="p-2 text-text-muted hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeTab === 'notificaciones' && (
                        <div className="space-y-8">
                          <h3 className="text-2xl font-bold text-text-main">Notificaciones</h3>
                          
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-6 bg-surface rounded-3xl border border-border">
                              <div>
                                <p className="font-bold text-text-main">Activar Notificaciones</p>
                                <p className="text-sm text-text-muted font-medium">Recibir alertas en el navegador</p>
                              </div>
                              <div className="w-14 h-8 bg-surface border border-border rounded-full relative p-1 cursor-pointer">
                                <div className="w-6 h-6 bg-text-muted/20 rounded-full transition-transform" />
                              </div>
                            </div>

                            <div className="flex items-center justify-between p-6 bg-surface rounded-3xl border border-border opacity-50">
                              <div>
                                <p className="font-bold text-text-main">Recordatorios de Pendientes</p>
                                <p className="text-sm text-text-muted font-medium">Avisar sobre ideas sin procesar</p>
                              </div>
                              <div className="w-14 h-8 bg-surface border border-border rounded-full relative p-1 cursor-not-allowed">
                                <div className="w-6 h-6 bg-text-muted/20 rounded-full transition-transform" />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'cuenta' && (
                        <div className="space-y-8">
                          <h3 className="text-2xl font-bold text-text-main">Cuenta</h3>
                          
                          <div className="space-y-6">
                            <div className="p-8 bg-red-500/5 rounded-[2.5rem] border border-red-500/10 space-y-6">
                              <h4 className="text-lg font-bold text-red-500 flex items-center gap-2">
                                <Shield className="w-5 h-5" /> Zona de Peligro
                              </h4>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button 
                                  onClick={onLogout}
                                  className="p-6 bg-card border border-border rounded-3xl flex flex-col gap-2 group hover:bg-red-500 transition-all text-left"
                                >
                                  <LogOut className="w-6 h-6 text-red-500 group-hover:text-white transition-colors" />
                                  <div>
                                    <p className="font-bold text-text-main group-hover:text-white transition-colors">Cerrar Sesión</p>
                                    <p className="text-sm text-text-muted group-hover:text-white/70 transition-colors">Salir de tu cuenta actual</p>
                                  </div>
                                </button>

                                <button className="p-6 bg-card border border-border rounded-3xl flex flex-col gap-2 group hover:bg-red-500 transition-all text-left">
                                  <Trash2 className="w-6 h-6 text-red-500 group-hover:text-white transition-colors" />
                                  <div>
                                    <p className="font-bold text-text-main group-hover:text-white transition-colors">Eliminar Cuenta</p>
                                    <p className="text-sm text-text-muted group-hover:text-white/70 transition-colors">Borrar permanentemente tus datos</p>
                                  </div>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
               </div>
            </div>

            {/* Close Button Desktop */}
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 p-3 hover:bg-surface rounded-2xl transition-all text-text-muted hidden md:flex"
            >
              <X className="w-6 h-6" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
