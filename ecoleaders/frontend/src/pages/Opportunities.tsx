import React, { useMemo, useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { sampleEvents } from '../sampleData';
import api from '../api';
import { useAuth } from '../context/AuthContext';

type Item = {
  id: string;
  title: string;
  date: string;
  location: string;
  roles?: string[];
  capacity: string;
  coordinator?: string;
  tags: string[];
  required: string[];
  category?: string;
};

export default function Opportunities() {
  const { user } = useAuth();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [signed, setSigned] = useState<Set<string>>(new Set());
  const [items, setItems] = useState<Item[]>([]);
  const [signupList, setSignupList] = useState<Record<string, { name: string; email?: string; at: string }[]> | null>(null);
  const [signupVisible, setSignupVisible] = useState<boolean>(true);

  const filterChips = useMemo(
    () => ['composting', 'education', 'cleanup', 'advocacy', 'private'],
    [],
  );

  useEffect(() => {
    const mapped: Item[] = sampleEvents.map((ev) => ({
      id: ev._id,
      title: ev.title,
      date: new Date(ev.date).toLocaleString(),
      location: ev.location,
      roles: ev.tags,
      capacity: 'open',
      coordinator: ev.coordinator,
      tags: ev.tags,
      required: ev.required || [],
      category: ev.category,
    }));
    setItems(mapped);
    fetchSignups();
  }, []);

  const fetchSignups = async () => {
    try {
      const res = await api.get('/demo/signups');
      setSignupList(res.data || {});
      setSignupVisible(true);
    } catch (_err) {
      setSignupVisible(false);
    }
  };

  const handleSignup = async (id: string) => {
    setMessage(null);
    setError(null);
    try {
      setMessage('Submission successful: you are signed up for this opportunity.');
      alert('Signup successful (demo).');
      setSigned(new Set(signed).add(id));
      try {
        await api.post('/demo/signups', {
          eventId: id,
          name: user?.name || 'Volunteer',
          email: user?.email,
        });
        fetchSignups();
      } catch (_e) {
        // ignore if shared list service unavailable
      }
    } catch (err: any) {
      const detail = err?.response?.data?.message;
      setError(detail || 'Signup failed (auth or server). If running demo/mock, this may be informational only.');
      setSigned(new Set(signed).add(id)); // optimistic for demo
    }
  };

  return (
    <div className="space-y-5">
      {message && <div className="rounded-xl border border-[color:var(--border)] bg-[color:rgba(47,191,131,0.12)] px-4 py-2 text-sm text-green">{message}</div>}
      {error && <div className="rounded-xl border border-[color:rgba(255,65,65,0.35)] bg-[color:rgba(255,65,65,0.08)] px-4 py-2 text-sm text-[color:rgba(255,200,200,0.9)]">{error}</div>}
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
          <div key={item.id} className="glass space-y-2 rounded-2xl p-5">
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
                disabled={signed.has(item.id)}
                className="rounded-full bg-[color:var(--green)] px-3 py-1 text-xs font-semibold text-slate-900 shadow-fern disabled:opacity-60"
              >
                {signed.has(item.id) ? 'Signed' : 'Sign up'}
              </button>
            </div>
            <p className="text-xs text-[color:var(--muted)]">
              Gemini: “This fits because you’ve completed compost training and live near Boulder.”
            </p>
          </div>
        ))}
      </div>

      {signupVisible && signupList && (
        <div className="glass rounded-2xl p-5">
          <h3 className="text-lg font-semibold">Live signups (shared demo)</h3>
          <p className="text-sm text-[color:var(--muted)]">If the service is offline, this block hides itself.</p>
          <div className="mt-3 space-y-3">
            {items.map((item) => {
              const list = signupList[item.id] || [];
              if (list.length === 0) return null;
              return (
                <div key={item.id} className="rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] p-4">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <div className="mt-2 space-y-1 text-xs text-[color:var(--muted)]">
                    {list.map((s, idx) => (
                      <div key={idx}>
                        {s.name} {s.email ? `(${s.email})` : ''} — {new Date(s.at).toLocaleString()}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            {Object.values(signupList).every((arr) => arr.length === 0) && (
              <p className="text-sm text-[color:var(--muted)]">No signups yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
