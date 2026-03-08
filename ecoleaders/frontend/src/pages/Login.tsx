import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setError(null);
    try {
      await login(email, password);
      setStatus('Sign-in successful (demo users).');
      const redirectTo = (location.state as any)?.from || '/dashboard';
      navigate(redirectTo);
    } catch (err: any) {
      setError(err?.message || 'Login failed.');
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-6">
      <div className="glass rounded-3xl p-8 shadow-ember">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--muted)]">Sign in</p>
        <h1 className="mt-2 text-3xl font-semibold">Welcome back</h1>
        {status && (
          <div className="mt-3 rounded-xl border border-[color:var(--border)] bg-[color:rgba(47,191,131,0.1)] px-3 py-2 text-sm text-green">
            {status}
          </div>
        )}
        {error && (
          <div className="mt-3 rounded-xl border border-[color:rgba(255,65,65,0.35)] bg-[color:rgba(255,65,65,0.08)] px-3 py-2 text-sm text-[color:rgba(255,200,200,0.9)]">
            {error}
          </div>
        )}
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="text-sm text-[color:var(--muted)]">Email</label>
            <input
              required
              type="email"
              className="mt-1 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] px-4 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm text-[color:var(--muted)]">Password</label>
            <input
              required
              type="password"
              className="mt-1 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] px-4 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[color:var(--green)] px-4 py-2 text-sm font-semibold text-slate-900 shadow-fern disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
