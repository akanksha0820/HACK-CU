import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Events from './pages/Events';
import Carpool from './pages/Carpool';
import Chat from './pages/Chat';
import Training from './pages/Training';
import Admin from './pages/Admin';

function App() {
  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/events', label: 'Events' },
    { to: '/carpool', label: 'Carpool' },
    { to: '/chat', label: 'Chat' },
    { to: '/training', label: 'Training' },
    { to: '/admin', label: 'Admin' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 left-10 h-64 w-64 rounded-full bg-[color:rgba(47,191,131,0.22)] blur-3xl animate-float" />
        <div
          className="absolute top-24 right-0 h-80 w-80 rounded-full bg-[color:rgba(227,176,74,0.2)] blur-3xl animate-float"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute bottom-24 left-1/3 h-72 w-72 rounded-full bg-[color:rgba(31,143,98,0.2)] blur-3xl animate-float"
          style={{ animationDelay: '4s' }}
        />
        <div className="absolute inset-0 bg-grid opacity-35" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="sticky top-0 z-40">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-[color:var(--gold)] text-slate-900 flex items-center justify-center font-semibold shadow-ember">
                EH
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--muted)]">Eco-Leaders Hub</p>
                <p className="text-lg font-semibold">Volunteer Operations</p>
              </div>
            </div>
            <nav className="hidden items-center gap-5 md:flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      'text-xs uppercase tracking-[0.32em] transition',
                      isActive ? 'text-gold' : 'text-[color:var(--muted)] hover:text-[color:var(--text)]',
                    ].join(' ')
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="hidden md:flex">
              <button className="rounded-full bg-[color:var(--green)] px-4 py-2 text-sm font-semibold text-slate-900 shadow-fern transition hover:bg-[color:var(--green-2)]">
                Join a Shift
              </button>
            </div>
            <nav className="flex flex-wrap gap-3 md:hidden">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      'rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.28em] transition',
                      isActive
                        ? 'border-[color:var(--gold)] text-gold'
                        : 'border-[color:var(--border)] text-[color:var(--muted)]',
                    ].join(' ')
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-6 pb-16 pt-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/carpool" element={<Carpool />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/training" element={<Training />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        <footer className="border-t border-[color:var(--border)]">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-[color:var(--muted)]">Impact Ready</p>
              <p className="text-lg">Coordinating volunteers across the Front Range.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="rounded-full border border-[color:var(--border)] px-4 py-2 text-sm font-semibold text-[color:var(--text)] transition hover:border-[color:var(--gold)]">
                Download Brief
              </button>
              <button className="rounded-full bg-[color:var(--gold)] px-4 py-2 text-sm font-semibold text-slate-900 shadow-ember transition hover:bg-[color:var(--gold-2)]">
                Launch Volunteer Drive
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
