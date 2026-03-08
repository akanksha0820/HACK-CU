import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[color:var(--bg)] text-[color:var(--text)]">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-6 py-12 md:py-16">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--green)] font-semibold text-slate-900 shadow-fern">
              EH
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--muted)]">Eco-Leaders</p>
              <p className="text-lg font-semibold">Volunteer Hub</p>
            </div>
          </div>
          <div className="hidden gap-4 md:flex">
            <NavLink to="/login" className="text-sm text-[color:var(--muted)] hover:text-gold">
              Login
            </NavLink>
            <NavLink
              to="/contact"
              className="rounded-full bg-[color:var(--gold)] px-4 py-2 text-sm font-semibold text-slate-900 shadow-ember"
            >
              Apply to Volunteer
            </NavLink>
          </div>
        </header>

        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--muted)]">Eco-Leaders Volunteer Hub</p>
            <h1 className="text-4xl leading-tight md:text-6xl">
              Centralize volunteer ops for Eco-Cycle—and clone it for every nonprofit that needs it.
            </h1>
            <p className="text-lg text-[color:var(--muted)]">
              Recruit, onboard, coordinate rides, broadcast announcements, and generate new nonprofit microsites in one place.
            </p>
            <div className="flex flex-wrap gap-3">
              <NavLink
                to="/dashboard"
                className="rounded-full bg-[color:var(--green)] px-5 py-3 text-sm font-semibold text-slate-900 shadow-fern transition hover:bg-[color:var(--green-2)]"
              >
                Enter Volunteer App
              </NavLink>
              <NavLink
                to="/admin/ai"
                className="rounded-full border border-[color:var(--border)] px-5 py-3 text-sm font-semibold text-[color:var(--text)] transition hover:border-[color:var(--gold)]"
              >
                Try AI Site Generator
              </NavLink>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { label: 'Active volunteers', value: '10', hint: 'seeded for demo' },
                { label: 'Events live', value: '2', hint: 'cleanup + compost workshop' },
                { label: 'Voice announcements', value: 'on', hint: 'ElevenLabs ready' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--panel)] px-4 py-4">
                  <p className="text-2xl font-semibold text-gold">{stat.value}</p>
                  <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">{stat.label}</p>
                  <p className="text-[11px] text-[color:var(--muted)]">{stat.hint}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="glass space-y-4 rounded-3xl p-6 shadow-ember">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--muted)]">Demo journey</p>
              <span className="rounded-full border border-[color:var(--border)] px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-gold">
                6 steps
              </span>
            </div>
            <ol className="space-y-3 text-sm">
              {[
                'Login as volunteer (ava@eco.com / password123)',
                'View dashboard widgets + announcements',
                'Join an event and request a carpool',
                'Switch to coordinator, create event + broadcast voice',
                'Check attendance + KPIs',
                'Open AI site generator and publish a microsite',
              ].map((step, idx) => (
                <li key={step} className="flex items-start gap-3 rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] px-3 py-2">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--green)] text-xs font-semibold text-slate-900">
                    {idx + 1}
                  </span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
