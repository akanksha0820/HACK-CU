import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Home() {
  const stats = [
    { label: 'Active volunteers', value: '642' },
    { label: 'Upcoming activations', value: '18' },
    { label: 'Hours scheduled', value: '1.9k' },
  ];

  const pillars = [
    {
      title: 'Rapid Response',
      body: 'Mobilize green teams within minutes with clear role assignments and route planning.',
    },
    {
      title: 'Community Signal',
      body: 'Keep volunteers aligned with real-time chat rooms and quick audio briefings.',
    },
    {
      title: 'Impact Proof',
      body: 'Track attendance, hours, and outcomes in one operational dashboard.',
    },
  ];

  const initiatives = [
    { name: 'River Clean Sweep', date: 'Sat 9:00 AM', lead: 'North Boulder Crew' },
    { name: 'Bike Lane Blitz', date: 'Sat 1:30 PM', lead: 'Downtown Riders' },
    { name: 'Trail Stewardship', date: 'Sun 8:00 AM', lead: 'Foothills Chapter' },
  ];

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--panel)] p-8 shadow-ember md:p-12">
        <div className="absolute right-[-30%] top-[-10%] h-64 w-64 rounded-full bg-[color:rgba(227,176,74,0.12)] blur-3xl" />
        <div className="absolute bottom-[-30%] left-[-10%] h-64 w-64 rounded-full bg-[color:rgba(47,191,131,0.12)] blur-3xl" />
        <div className="relative z-10 grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6 animate-fade-up">
            <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--muted)]">Volunteer command center</p>
            <h1 className="text-4xl leading-tight md:text-6xl">
              Dark grey focus, green momentum, gold-level impact.
            </h1>
            <p className="text-lg text-[color:var(--muted)]">
              Eco-Leaders Hub is the operational spine for volunteer teams across the Front Range. Coordinate
              events, align carpools, and keep every action measurable.
            </p>
            <div className="flex flex-wrap gap-3">
              <NavLink
                to="/events"
                className="rounded-full bg-[color:var(--green)] px-5 py-3 text-sm font-semibold text-slate-900 shadow-fern transition hover:bg-[color:var(--green-2)]"
              >
                Explore events
              </NavLink>
              <NavLink
                to="/training"
                className="rounded-full border border-[color:var(--border)] px-5 py-3 text-sm font-semibold text-[color:var(--text)] transition hover:border-[color:var(--gold)]"
              >
                Start onboarding
              </NavLink>
            </div>
            <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--panel-2)] px-4 py-4">
                  <p className="text-2xl font-semibold text-gold">{stat.value}</p>
                  <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="glass rounded-2xl p-5 animate-fade-up">
              <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--muted)]">Tonight's focus</p>
              <h3 className="mt-3 text-2xl font-semibold">Creekline restoration brief</h3>
              <p className="mt-2 text-sm text-[color:var(--muted)]">
                Crew leads receive live checklists, safety notes, and volunteer attendance in one view.
              </p>
              <div className="mt-4 flex items-center justify-between rounded-xl border border-[color:var(--border)] bg-[color:rgba(21,26,32,0.8)] px-4 py-3">
                <div>
                  <p className="text-sm font-semibold">Shift window</p>
                  <p className="text-xs text-[color:var(--muted)]">6:00 PM - 8:30 PM</p>
                </div>
                <span className="rounded-full bg-[color:var(--gold)] px-3 py-1 text-xs font-semibold text-slate-900">
                  26 seats left
                </span>
              </div>
            </div>
            <div className="glass rounded-2xl p-5 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--muted)]">Signals</p>
              <div className="mt-3 space-y-3">
                <div className="flex items-start justify-between rounded-xl border border-[color:var(--border)] px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold">Carpool demand spike</p>
                    <p className="text-xs text-[color:var(--muted)]">6 new riders in the last hour</p>
                  </div>
                  <span className="text-green text-xs font-semibold">+14%</span>
                </div>
                <div className="flex items-start justify-between rounded-xl border border-[color:var(--border)] px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold">Chat rooms active</p>
                    <p className="text-xs text-[color:var(--muted)]">General, Events, Training</p>
                  </div>
                  <span className="text-gold text-xs font-semibold">Live</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {pillars.map((pillar, index) => (
          <div
            key={pillar.title}
            className="glass rounded-2xl p-6 animate-fade-up"
            style={{ animationDelay: `${0.1 * index}s` }}
          >
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--muted)]">Pillar {index + 1}</p>
            <h3 className="mt-3 text-2xl font-semibold">{pillar.title}</h3>
            <p className="mt-2 text-sm text-[color:var(--muted)]">{pillar.body}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--muted)]">Upcoming initiatives</p>
              <h3 className="mt-2 text-2xl font-semibold">Weekend activation slate</h3>
            </div>
            <NavLink to="/events" className="text-sm font-semibold text-gold">
              View all
            </NavLink>
          </div>
          <div className="mt-4 space-y-3">
            {initiatives.map((initiative) => (
              <div key={initiative.name} className="flex items-center justify-between rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] px-4 py-3">
                <div>
                  <p className="text-sm font-semibold">{initiative.name}</p>
                  <p className="text-xs text-[color:var(--muted)]">{initiative.lead}</p>
                </div>
                <span className="text-xs font-semibold text-[color:var(--muted)]">{initiative.date}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="glass rounded-2xl p-6">
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--muted)]">Command snapshot</p>
          <h3 className="mt-2 text-2xl font-semibold">Volunteer readiness score</h3>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[color:var(--muted)]">Training completion</span>
              <span className="text-sm font-semibold text-green">82%</span>
            </div>
            <div className="h-2 rounded-full bg-[color:rgba(47,191,131,0.2)]">
              <div className="h-2 w-[82%] rounded-full bg-[color:var(--green)]" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[color:var(--muted)]">Carpool coverage</span>
              <span className="text-sm font-semibold text-gold">67%</span>
            </div>
            <div className="h-2 rounded-full bg-[color:rgba(227,176,74,0.2)]">
              <div className="h-2 w-[67%] rounded-full bg-[color:var(--gold)]" />
            </div>
            <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] px-4 py-3">
              <p className="text-sm font-semibold">Next action</p>
              <p className="text-xs text-[color:var(--muted)]">Push the 6:00 PM safety briefing to all crew leads.</p>
            </div>
            <NavLink
              to="/chat"
              className="inline-flex w-full items-center justify-center rounded-full bg-[color:var(--gold)] px-4 py-2 text-sm font-semibold text-slate-900 shadow-ember transition hover:bg-[color:var(--gold-2)]"
            >
              Open command chat
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
}
