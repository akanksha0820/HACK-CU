import React from 'react';

const volunteers = [
  { name: 'Ava Volunteer', status: 'Active', hours: 12, trainings: '3/3', segment: 'Highly active' },
  { name: 'Ben Volunteer', status: 'Inactive 30d', hours: 4, trainings: '2/3', segment: 'Needs nudge' },
  { name: 'Chloe Volunteer', status: 'New', hours: 0, trainings: '1/3', segment: 'New' },
];

export default function VolunteerManager() {
  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--muted)]">Volunteer Manager</p>
          <h2 className="text-3xl font-semibold">Segments & rosters</h2>
        </div>
        <div className="rounded-full border border-[color:var(--border)] px-4 py-2 text-xs text-[color:var(--muted)]">
          Segments: active · inactive · onboarding · advocacy
        </div>
      </header>

      <div className="glass rounded-2xl p-5">
        <div className="grid grid-cols-5 gap-3 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
          <span>Name</span>
          <span>Status</span>
          <span>Hours</span>
          <span>Training</span>
          <span>Segment</span>
        </div>
        <div className="mt-2 space-y-2">
          {volunteers.map((v) => (
            <div key={v.name} className="grid grid-cols-5 items-center gap-3 rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] px-3 py-2 text-sm">
              <span>{v.name}</span>
              <span className="text-[color:var(--muted)]">{v.status}</span>
              <span className="text-gold">{v.hours}h</span>
              <span className="text-[color:var(--muted)]">{v.trainings}</span>
              <span className="text-[color:var(--muted)]">{v.segment}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
