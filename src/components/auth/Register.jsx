import { useState } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

export function Register({ onRegister, onGoogleLogin, onNavigateLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    onRegister({ name, email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-bold text-text-main ml-1">Nombre Completo</label>
        <div className="relative group">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Juan Diego"
            className="w-full bg-surface border border-transparent focus:border-primary/20 focus:bg-card focus:ring-4 ring-primary/5 rounded-2xl py-4 pl-12 pr-4 text-text-main outline-none transition-all placeholder:text-text-muted/40"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-text-main ml-1">Correo Electrónico</label>
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nombre@ejemplo.com"
            className="w-full bg-surface border border-transparent focus:border-primary/20 focus:bg-card focus:ring-4 ring-primary/5 rounded-2xl py-4 pl-12 pr-4 text-text-main outline-none transition-all placeholder:text-text-muted/40"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-bold text-text-main ml-1">Contraseña</label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-surface border border-transparent focus:border-primary/20 focus:bg-card focus:ring-4 ring-primary/5 rounded-2xl py-4 pl-12 pr-4 text-text-main outline-none transition-all placeholder:text-text-muted/40"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-text-main ml-1">Confirmar</label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-surface border border-transparent focus:border-primary/20 focus:bg-card focus:ring-4 ring-primary/5 rounded-2xl py-4 pl-12 pr-4 text-text-main outline-none transition-all placeholder:text-text-muted/40"
              required
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group mt-2"
      >
        <span>Crear Cuenta</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-4 text-text-muted font-bold tracking-widest">O registrarse con</span>
        </div>
      </div>

      <button
        onClick={onGoogleLogin}
        type="button"
        className="w-full bg-surface border border-border hover:bg-surface-hover text-text-main font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        <span>Google</span>
      </button>

      <p className="text-center text-text-muted font-medium mt-8">
        ¿Ya tienes una cuenta?{' '}
        <button
          onClick={onNavigateLogin}
          type="button"
          className="text-primary font-bold hover:underline underline-offset-4"
        >
          Inicia sesión
        </button>
      </p>
    </form>
  );
}
