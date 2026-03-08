import React, { useMemo } from 'react';
import { Sparkles } from 'lucide-react';
import api from '../api';

const items = [
  {
    id: 'evt1',
    title: 'Community Compost Workshop',
    date: 'Sat, 2:00 PM',
    location: 'Boulder Civic Area',
    roles: ['Educator', 'Greeter'],
    capacity: '12/20',
    coordinator: 'Casey',
    tags: ['composting', 'education'],
    required: [],
  },
  {
    id: 'evt2',
    title: 'Saturday Creek Cleanup',
    date: 'Sun, 9:00 AM',
    location: 'Boulder Creek',
    roles: ['Crew lead', 'Safety'],
    capacity: '35/80',
    coordinator: 'Jordan',
    tags: ['cleanup', 'safety'],
    required: ['Event Safety Basics'],
  },
];

export default function Opportunities() {
  const filterChips = useMemo(
    () => ['composting', 'education', 'cleanup', 'advocacy', 'private'],
    [],
  );

  const handleSignup = async (id: string) => {
    try {
      await api.post(`/events/${id}/signup`);
      alert('Signed up!');
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Signup recorded (mock if offline)');
    }
  };

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--muted)]">Opportunities</p>
          <h2 className="text-3xl font-semibold">Find your next action</h2>
          <p className="text-sm text-[color:var(--muted)]">Filters, AI recommendations, and urgency tags keep you focused.</p>
        </div>
        <div className="rounded-full border border-[color:var(--border)] px-4 py-2 text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
          Recommended for you
        </div>
      </header>

      <div className="flex flex-wrap gap-2">
        {filterChips.map((chip) => (
          <button key={chip} className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs text-[color:var(--muted)] hover:border-[color:var(--gold)] hover:text-gold">
            {chip}
          </button>
        ))}
        <button className="flex items-center gap-2 rounded-full bg-[color:var(--green)] px-3 py-1 text-xs font-semibold text-slate-900 shadow-fern">
          <Sparkles size={14} /> Gemini tags
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.title} className="glass space-y-2 rounded-2xl p-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-sm text-[color:var(--muted)]">{item.date} · {item.location}</p>
                <p className="text-xs text-[color:var(--muted)]">Coordinator: {item.coordinator}</p>
              </div>
              <span className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs text-[color:var(--muted)]">{item.capacity} filled</span>
            </div>
            <div className="flex flex-wrap gap-2 text-[11px] text-[color:var(--muted)]">
              {item.tags.map((t) => (
                <span key={t} className="rounded-full border border-[color:var(--border)] px-2 py-1">{t}</span>
              ))}
              {item.required.length > 0 && (
                <span className="rounded-full border border-[color:rgba(255,65,65,0.35)] px-2 py-1 text-[color:rgba(255,180,180,0.9)]">
                  Requires {item.required.join(', ')}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleSignup(item.id)}
                className="rounded-full bg-[color:var(--green)] px-3 py-1 text-xs font-semibold text-slate-900 shadow-fern"
              >
                Sign up
              </button>
              <button className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs text-[color:var(--text)]">Save</button>
              <button className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs text-[color:var(--text)]">View prep list</button>
            </div>
            <p className="text-xs text-[color:var(--muted)]">
              Gemini: “This fits because you’ve completed compost training and live near Boulder.”
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
