import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register, loading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(name, email, password);
    navigate('/dashboard');
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-6">
      <div className="glass rounded-3xl p-8 shadow-ember">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--muted)]">Create account</p>
        <h1 className="mt-2 text-3xl font-semibold">Join Eco-Leaders</h1>
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="text-sm text-[color:var(--muted)]">Name</label>
            <input
              required
              className="mt-1 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] px-4 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            {loading ? 'Creating...' : 'Create account'}
          </button>
        </form>
        <p className="mt-4 text-sm text-[color:var(--muted)]">
          Already have an account?{' '}
          <NavLink to="/login" className="text-gold">
            Sign in
          </NavLink>
        </p>
      </div>
    </div>
  );
}
