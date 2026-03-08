import React from 'react';

export default function EventManager() {
  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--muted)]">Event Manager</p>
          <h2 className="text-3xl font-semibold">Create & manage events</h2>
        </div>
        <button className="rounded-full bg-[color:var(--green)] px-4 py-2 text-sm font-semibold text-slate-900 shadow-fern">
          + New event
        </button>
      </header>

      <div className="glass rounded-2xl p-5">
        <h3 className="text-lg font-semibold">Quick create</h3>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <input className="rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] px-3 py-2 text-sm" placeholder="Title" />
          <input className="rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] px-3 py-2 text-sm" placeholder="Location" />
          <input type="datetime-local" className="rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] px-3 py-2 text-sm" />
          <input type="number" className="rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] px-3 py-2 text-sm" placeholder="Capacity" />
          <input className="rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] px-3 py-2 text-sm" placeholder="Tags (comma separated)" />
          <label className="flex items-center gap-2 text-sm text-[color:var(--muted)]">
            <input type="checkbox" defaultChecked className="h-4 w-4" /> Auto-create chatroom + announcement
          </label>
        </div>
        <div className="mt-3 flex gap-2 text-xs">
          <button className="rounded-full bg-[color:var(--green)] px-4 py-2 text-slate-900">Save</button>
          <button className="rounded-full border border-[color:var(--border)] px-4 py-2 text-[color:var(--text)]">Generate description (Gemini)</button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {['Community Compost Workshop', 'Saturday Creek Cleanup'].map((title) => (
          <div key={title} className="glass rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-xs text-[color:var(--muted)]">Roster · Waitlist · Attendance</p>
              </div>
              <div className="flex gap-2">
                <button className="rounded-full border border-[color:var(--border)] px-3 py-1 text-[11px] text-[color:var(--text)]">Check-in</button>
                <button className="rounded-full border border-[color:var(--border)] px-3 py-1 text-[11px] text-[color:var(--text)]">Reminder</button>
              </div>
            </div>
            <div className="mt-2 text-xs text-[color:var(--muted)]">Required training: Safety. Visibility: Public.</div>
          </div>
        ))}
      </div>
    </div>
  );
}
