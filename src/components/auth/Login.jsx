import { useState } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export function Login({ onLogin, onGoogleLogin, onNavigateRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-[12px] font-bold text-text-main ml-1 uppercase tracking-wider">Correo Electrónico</label>
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-primary transition-colors" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nombre@ejemplo.com"
            className="w-full bg-surface border border-transparent focus:border-primary/20 focus:bg-card focus:ring-4 ring-primary/5 rounded-xl py-3 pl-11 pr-4 text-[12px] text-text-main outline-none transition-all placeholder:text-text-muted/40"
            required
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between px-1">
          <label className="text-[12px] font-bold text-text-main uppercase tracking-wider">Contraseña</label>
          <button type="button" className="text-[12px] font-bold text-primary hover:text-primary-hover transition-colors">
            ¿Olvidaste tu contraseña?
          </button>
        </div>
        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-primary transition-colors" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-surface border border-transparent focus:border-primary/20 focus:bg-card focus:ring-4 ring-primary/5 rounded-xl py-3 pl-11 pr-4 text-[12px] text-text-main outline-none transition-all placeholder:text-text-muted/40"
            required
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="flex-1 bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group text-[12px]"
        >
          <span>Iniciar Sesión</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={onGoogleLogin}
          type="button"
          className="flex-1 bg-surface border border-border hover:bg-surface-hover text-text-main font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-[12px]"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
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
      </div>

      <p className="text-center text-[12px] text-text-muted font-medium mt-6">
        ¿No tienes una cuenta?{' '}
        <button
          onClick={onNavigateRegister}
          type="button"
          className="text-primary font-bold hover:underline underline-offset-4"
        >
          Crear cuenta
        </button>
      </p>
    </form>
  );
}
