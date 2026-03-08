import React, { useState } from 'react';
import { Megaphone, Volume2 } from 'lucide-react';
import { sampleAnnouncements } from '../sampleData';
import { requestNotifyPermission, showLocalNotification } from '../utils/notify';

export default function Announcements() {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState(sampleAnnouncements);

  const send = () => {
    setMessage('Submission successful: announcement queued (demo).');
    setError(null);
    setItems((prev) => [{ title: 'New announcement', body: 'Quick update', priority: 'normal', unread: true }, ...prev]);
  };

  return (
    <div className="space-y-5">
      {message && (
        <div className="rounded-xl border border-[color:var(--border)] bg-[color:rgba(47,191,131,0.12)] px-4 py-2 text-sm text-green">
          {message}
        </div>
      )}
      {error && (
        <div className="rounded-xl border border-[color:rgba(255,65,65,0.35)] bg-[color:rgba(255,65,65,0.08)] px-4 py-2 text-sm text-[color:rgba(255,200,200,0.9)]">
          {error}
        </div>
      )}
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--muted)]">Announcements</p>
          <h2 className="text-3xl font-semibold">Stay in sync</h2>
        </div>
        <div className="rounded-full bg-[color:var(--gold)] px-4 py-2 text-xs font-semibold text-slate-900 shadow-ember">
          Voice enabled
        </div>
      </header>

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
            <div className="mt-3 flex gap-2">
              <button
                onClick={async () => {
                  try {
                    await requestNotifyPermission();
                    showLocalNotification('Eco-Leaders', `${a.title} — ${a.body}`);
                    alert('Push notification sent (browser-local demo).');
                  } catch (err: any) {
                    alert(err?.message || 'Notifications not available.');
                  }
                }}
                className="rounded-full bg-[color:var(--green)] px-3 py-1 text-xs font-semibold text-slate-900 shadow-fern"
              >
                Send push
              </button>
              <button
                onClick={send}
                className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs text-[color:var(--text)]"
              >
                Queue another
              </button>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-[color:var(--muted)]">
              <Volume2 size={14} /> Play voice (demo)
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
