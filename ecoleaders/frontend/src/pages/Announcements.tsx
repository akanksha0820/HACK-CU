import React from 'react';
import { Megaphone, Volume2 } from 'lucide-react';
import { useState } from 'react';
import api from '../api';

const items = [
  { title: 'Safety briefing tonight', body: '6pm on Zoom. Check your inbox for link.', priority: 'urgent', unread: true },
  { title: 'Orientation', body: 'Complete onboarding before your first shift.', priority: 'normal', unread: false },
  { title: 'Weather update', body: 'Light rain expected Saturday—bring jacket.', priority: 'high', unread: true },
];

export default function Announcements() {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const send = async () => {
    setMessage(null);
    setError(null);
    try {
      await api.post('/announcements', { title: 'New announcement', message: 'Quick update', audienceType: 'all' });
      setMessage('Submission successful: announcement queued.');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Saved locally (offline demo).');
    }
  };

  return (
    <div className="space-y-5">
      {message && <div className="rounded-xl border border-[color:var(--border)] bg-[color:rgba(47,191,131,0.12)] px-4 py-2 text-sm text-green">{message}</div>}
      {error && <div className="rounded-xl border border-[color:rgba(255,65,65,0.35)] bg-[color:rgba(255,65,65,0.08)] px-4 py-2 text-sm text-[color:rgba(255,200,200,0.9)]">{error}</div>}
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--muted)]">Announcements</p>
          <h2 className="text-3xl font-semibold">Stay in sync</h2>
        </div>
        <div className="rounded-full bg-[color:var(--gold)] px-4 py-2 text-xs font-semibold text-slate-900 shadow-ember">
          Voice enabled
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-[1fr_0.42fr]">
        <div className="space-y-3">
          {items.map((a) => (
            <div key={a.title} className="glass rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Megaphone size={16} className="text-gold" />
                  <p className="text-sm font-semibold">{a.title}</p>
                </div>
                <span
                  className={[
                    'rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.24em]',
                    a.priority === 'urgent'
                      ? 'bg-[color:rgba(255,65,65,0.12)] text-[color:rgba(255,200,200,0.9)]'
                      : 'border border-[color:var(--border)] text-[color:var(--muted)]',
                  ].join(' ')}
                >
                  {a.priority}
                </span>
              </div>
              <p className="mt-2 text-sm text-[color:var(--muted)]">{a.body}</p>
              <div className="mt-3 flex gap-2 text-xs">
                <button className="rounded-full bg-[color:var(--green)] px-3 py-1 text-slate-900">Got it</button>
                <button className="rounded-full border border-[color:var(--border)] px-3 py-1 text-[color:var(--text)]">Can drive</button>
                <button className="rounded-full border border-[color:var(--border)] px-3 py-1 text-[color:var(--text)]">Need help</button>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-[color:var(--muted)]">
                <Volume2 size={14} /> Play voice (ElevenLabs)
              </div>
            </div>
          ))}
        </div>
        <aside className="glass rounded-2xl p-5">
          <h3 className="text-lg font-semibold">Compose (staff view)</h3>
          <p className="text-xs text-[color:var(--muted)]">Target event attendees, channels, or all volunteers. Gemini will summarize for push.</p>
          <div className="mt-3 space-y-2 text-sm">
            <input className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] px-3 py-2" placeholder="Title" />
            <textarea className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] px-3 py-2" rows={3} placeholder="Message" />
            <div className="flex gap-2 text-xs">
              <button onClick={send} className="rounded-full bg-[color:var(--green)] px-3 py-1 text-slate-900">Send</button>
              <button className="rounded-full border border-[color:var(--border)] px-3 py-1 text-[color:var(--text)]">Generate audio</button>
              <button className="rounded-full border border-[color:var(--border)] px-3 py-1 text-[color:var(--text)]">Summarize</button>
              <button
                onClick={async () => {
                  setMessage(null); setError(null);
                  try {
                    await api.post('/notifications/register', {});
                    setMessage('Push notifications enabled (demo stub).');
                  } catch (err: any) {
                    setError('Push registration failed; check connectivity.');
                  }
                }}
                className="rounded-full border border-[color:var(--border)] px-3 py-1 text-[color:var(--text)]"
              >
                Enable push (demo)
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
