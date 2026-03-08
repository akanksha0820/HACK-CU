import React from 'react';
import { Calendar, MapPin, Link as LinkIcon, Shield } from 'lucide-react';
import { sampleEvents } from '../sampleData';

export default function CalendarPage() {
  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--muted)]">Calendar</p>
          <h2 className="text-3xl font-semibold">Your schedule</h2>
        </div>
        <div className="rounded-full border border-[color:var(--border)] px-4 py-2 text-xs text-[color:var(--muted)]">
          Monthly · Weekly · My shifts
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-[1.05fr_0.95fr]">
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 text-sm text-[color:var(--muted)]">
            <Calendar size={16} /> Demo monthly view (static mock)
          </div>
          <div className="mt-4 grid grid-cols-7 gap-2 text-center text-xs text-[color:var(--muted)]">
            {Array.from({ length: 28 }).map((_, idx) => (
              <div key={idx} className="aspect-square rounded-lg border border-[color:var(--border)] bg-[color:var(--panel-2)]">
                <div className="p-2 text-[11px]">{idx + 1}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {renderSection('Upcoming volunteer events', sampleEvents.filter((e) => e.category === 'volunteer'))}
          {renderSection('Advocacy opportunities', sampleEvents.filter((e) => e.category === 'advocacy'))}
          {renderSection('Private / invite-only', sampleEvents.filter((e) => e.category === 'private'))}
        </div>
      </div>
    </div>
  );
}

function renderSection(title: string, list: any[]) {
  if (list.length === 0) return null;
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-[color:var(--muted)]">{title}</h4>
      {list.map((ev) => (
        <div key={ev._id} className="glass rounded-2xl p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
                {new Date(ev.date).toLocaleString()}
              </p>
              <h3 className="text-xl font-semibold">{ev.title}</h3>
              <p className="text-sm text-[color:var(--muted)]">{ev.description}</p>
              <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-[color:var(--muted)]">
                <span className="inline-flex items-center gap-1 rounded-full border border-[color:var(--border)] px-2 py-1">
                  <MapPin size={12} /> {ev.location}
                </span>
                <span className="rounded-full border border-[color:var(--border)] px-2 py-1">
                  {(ev.attendees?.length || 0)} signups
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-[color:var(--border)] px-2 py-1">
                  <LinkIcon size={12} /> Chat #{ev.tags?.[0] || 'general'}
                </span>
                <span className="rounded-full border border-[color:var(--border)] px-2 py-1">Category: {ev.category}</span>
                {ev.category === 'private' && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-[color:rgba(255,65,65,0.35)] px-2 py-1 text-[color:rgba(255,200,200,0.9)]">
                    <Shield size={12} /> Invite-only
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button
                onClick={() => alert('Signup successful (demo).')}
                className="rounded-full bg-[color:var(--green)] px-3 py-1 text-xs font-semibold text-slate-900"
              >
                Sign up
              </button>
              <button
                onClick={() => alert('You will be notified about schedule updates (demo).')}
                className="rounded-full border border-[color:var(--border)] px-3 py-1 text-[11px] text-[color:var(--text)]"
              >
                Notify me
              </button>
            </div>
          </div>
          <div className="mt-3 text-xs text-[color:var(--muted)]">
            Gemini prep (stub): “Bring gloves and closed-toe shoes. Weather looks clear.”
          </div>
        </div>
      ))}
    </div>
  );
}
