import React from 'react';
import { Calendar, MapPin, Link as LinkIcon } from 'lucide-react';

const events = [
  {
    title: 'Community Compost Workshop',
    date: 'Sat 2:00 PM',
    description: 'Teach neighbors how to compost and reduce waste.',
    location: 'Boulder Civic Area',
    attendees: 12,
    chat: '#composting',
    carpool: '2 offers',
  },
  {
    title: 'Saturday Creek Cleanup',
    date: 'Sun 9:00 AM',
    description: 'Remove trash along the creek; gloves provided.',
    location: 'Boulder Creek Bridge',
    attendees: 35,
    chat: '#event-logistics',
    carpool: '3 offers',
  },
];

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
          {events.map((ev) => (
            <div key={ev.title} className="glass rounded-2xl p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">{ev.date}</p>
                  <h3 className="text-xl font-semibold">{ev.title}</h3>
                  <p className="text-sm text-[color:var(--muted)]">{ev.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-[color:var(--muted)]">
                    <span className="inline-flex items-center gap-1 rounded-full border border-[color:var(--border)] px-2 py-1">
                      <MapPin size={12} /> {ev.location}
                    </span>
                    <span className="rounded-full border border-[color:var(--border)] px-2 py-1">{ev.attendees} signups</span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-[color:var(--border)] px-2 py-1">
                      <LinkIcon size={12} /> Chat {ev.chat}
                    </span>
                    <span className="rounded-full border border-[color:var(--border)] px-2 py-1">Carpools: {ev.carpool}</span>
                  </div>
                </div>
                <button className="rounded-full bg-[color:var(--green)] px-3 py-1 text-xs font-semibold text-slate-900">
                  Notify me
                </button>
              </div>
              <div className="mt-3 text-xs text-[color:var(--muted)]">
                Gemini prep: “Bring gloves and closed-toe shoes. Weather looks clear.” (stub)
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
