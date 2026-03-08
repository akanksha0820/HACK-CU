import React from 'react';

const badges = [
  { name: 'First Event', icon: '🌱', desc: 'Completed first volunteer shift' },
  { name: 'Training Complete', icon: '🎓', desc: 'Finished required onboarding' },
  { name: 'Community Helper', icon: '🤝', desc: '5 events attended' },
];

export default function Profile() {
  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--muted)]">Profile</p>
          <h2 className="text-3xl font-semibold">Your badges & settings</h2>
        </div>
        <div className="rounded-full border border-[color:var(--border)] px-4 py-2 text-xs text-[color:var(--muted)]">
          Solana-backed badge proofs
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-[0.65fr_0.35fr]">
        <div className="glass space-y-3 rounded-2xl p-5">
          <h3 className="text-lg font-semibold">Badges</h3>
          <div className="flex flex-wrap gap-3">
            {badges.map((b) => (
              <div key={b.name} className="flex items-center gap-3 rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] px-4 py-3">
                <span className="text-xl">{b.icon}</span>
                <div>
                  <p className="text-sm font-semibold">{b.name}</p>
                  <p className="text-xs text-[color:var(--muted)]">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass space-y-3 rounded-2xl p-5">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <label className="flex items-center justify-between text-sm">
            Email announcements
            <input type="checkbox" defaultChecked className="h-4 w-4" />
          </label>
          <label className="flex items-center justify-between text-sm">
            SMS ride matches
            <input type="checkbox" className="h-4 w-4" />
          </label>
          <label className="flex items-center justify-between text-sm">
            Push urgent alerts
            <input type="checkbox" defaultChecked className="h-4 w-4" />
          </label>
        </div>
      </div>
    </div>
  );
}
