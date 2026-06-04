import { motion } from 'framer-motion';
import { Lightbulb, Zap, FolderOpen, Shield, ArrowRight, Star, Sun, Moon } from 'lucide-react';
import authIllustration from '../assets/auth_illustration.png';

const features = [
  {
    icon: Zap,
    title: 'Captura instantánea',
    description: 'Guarda tus ideas en segundos antes de que se escapen. Sin fricciones, sin complicaciones.',
  },
  {
    icon: FolderOpen,
    title: 'Organización inteligente',
    description: 'Agrupa tus ideas en carpetas personalizadas y encuéntralas siempre cuando las necesites.',
  },
  {
    icon: Shield,
    title: 'Seguro en la nube',
    description: 'Tus ideas están protegidas y sincronizadas en tiempo real desde cualquier dispositivo.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export function LandingPage({ onNavigateLogin, onNavigateRegister, isDarkMode, onToggleDarkMode }) {
  return (
    <div className="h-screen w-full overflow-y-auto bg-bg-app text-text-main overflow-x-hidden transition-colors duration-300">

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-app/80 backdrop-blur-md border-b border-border py-4">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-4 sm:px-6 md:px-16 lg:px-24">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-xl">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-text-main hidden sm:inline">IdeaManager</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-3">
            <button 
              onClick={onToggleDarkMode}
              className="p-2 text-text-muted hover:bg-card hover:text-text-main rounded-xl transition-all border border-transparent hover:border-border"
              aria-label="Cambiar tema"
            >
              {isDarkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
            <button
              onClick={onNavigateLogin}
              className="px-2 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-text-muted hover:text-text-main transition-colors whitespace-nowrap"
            >
              Iniciar sesión
            </button>
            <button
              onClick={onNavigateRegister}
              className="px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-primary text-white hover:bg-primary-hover transition-all shadow-lg shadow-primary/20 whitespace-nowrap"
            >
              Empezar gratis
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative flex flex-col lg:flex-row items-center justify-center gap-10 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto pt-12 lg:pt-0" style={{ minHeight: 'calc(100vh - 72px)', marginTop: '72px' }}>
        {/* Decorative blobs */}
        <div className="absolute top-20 left-0 w-96 h-96 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/6 rounded-full blur-3xl pointer-events-none" />

        {/* Text */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full lg:flex-1 relative z-10"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-primary/20">
            <Star className="w-3 h-3 fill-primary" />
            Tu gestor de ideas personal
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-6"
          >
            Organiza tus{' '}
            <span className="text-primary relative">
              pensamientos
              <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 200 6" fill="none">
                <path d="M0 5 Q100 0 200 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.4"/>
              </svg>
            </span>{' '}
            <br className="hidden md:block" />
            con inteligencia.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg text-text-muted font-medium max-w-xl mb-10 leading-relaxed"
          >
            La plataforma profesional para gestionar tus ideas más brillantes de forma elegante y productiva. Captura, organiza y nunca pierdas una gran idea.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onNavigateRegister}
              className="group flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-xl shadow-primary/25 text-base"
            >
              Empezar gratis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onNavigateLogin}
              className="flex items-center justify-center gap-2 bg-card border border-border hover:border-primary/30 text-text-main font-bold px-8 py-4 rounded-2xl transition-all text-base"
            >
              Ya tengo cuenta
            </button>
          </motion.div>
        </motion.div>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.3 }}
          className="w-full lg:flex-1 flex justify-center items-center relative z-10 max-w-lg lg:max-w-none"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-2xl scale-110" />
            <img
              src={authIllustration}
              alt="Ilustración de gestión de ideas"
              className="relative w-full max-w-sm md:max-w-md lg:max-w-lg drop-shadow-2xl"
            />
          </div>
        </motion.div>
      </section>

      {/* ── Features ── */}
      <section className="px-6 md:px-16 lg:px-24 py-20 max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div variants={itemVariants} className="text-center mb-14">
            <p className="text-primary font-bold text-xs uppercase tracking-widest mb-3">Por qué IdeaManager</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-main">Todo lo que necesitas para no perder ninguna idea</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, description }) => (
              <motion.div
                key={title}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-card border border-border rounded-2xl p-8 flex flex-col gap-4 shadow-sm hover:shadow-md hover:border-primary/20 transition-all"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-text-main">{title}</h3>
                <p className="text-text-muted font-medium leading-relaxed text-sm">{description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── CTA final ── */}
      <section className="px-6 md:px-16 lg:px-24 py-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-card border border-border rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-primary/8 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6 mx-auto">
              <Lightbulb className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-main mb-4">
              ¿Listo para empezar?
            </h2>
            <p className="text-text-muted font-medium text-lg mb-8 max-w-md mx-auto">
              Únete y empieza a organizar tus ideas brillantes hoy mismo. Es gratis.
            </p>
            <button
              onClick={onNavigateRegister}
              className="group inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold px-10 py-4 rounded-2xl transition-all shadow-xl shadow-primary/25 text-base"
            >
              Crear cuenta gratis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border px-6 md:px-16 py-8 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-text-muted text-sm font-medium">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-1.5 rounded-lg">
              <Lightbulb className="w-4 h-4 text-primary" />
            </div>
            <span>IdeaManager © {new Date().getFullYear()} — Organiza tus pensamientos con inteligencia.</span>
          </div>
          <span className="hidden sm:inline">•</span>
          <span>Desarrollado por Roberto Agustín Mejía Collazos</span>
        </div>
      </footer>
    </div>
  );
}
