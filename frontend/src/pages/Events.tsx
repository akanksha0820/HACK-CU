import React, { useEffect, useState } from 'react';
import api from '../api';

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
  attendees: { _id: string; name: string }[];
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get<Event[]>('/events');
        setEvents(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleSignup = async (eventId: string) => {
    try {
      await api.post(`/events/${eventId}/signup`);
      alert('Signed up successfully');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error signing up');
    }
  };

  if (loading) {
    return (
      <div className="glass rounded-2xl p-6 animate-pulse">
        <div className="h-4 w-32 rounded-full bg-[color:rgba(227,176,74,0.2)]" />
        <div className="mt-4 h-6 w-2/3 rounded-full bg-[color:rgba(255,255,255,0.08)]" />
        <div className="mt-3 h-4 w-1/2 rounded-full bg-[color:rgba(255,255,255,0.06)]" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="glass rounded-2xl p-6">
        <h2 className="text-2xl font-semibold">Events feed unavailable</h2>
        <p className="mt-2 text-sm text-[color:var(--muted)]">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--muted)]">Field activations</p>
          <h2 className="text-3xl font-semibold">Upcoming events</h2>
          <p className="mt-2 text-sm text-[color:var(--muted)]">
            Reserve your spot, coordinate travel, and keep your crew aligned.
          </p>
        </div>
        <div className="glass rounded-full px-4 py-2 text-xs uppercase tracking-[0.32em] text-[color:var(--muted)]">
          Live schedule
        </div>
      </header>

      <div className="grid gap-5">
        {events.map((event) => (
          <div
            key={event._id}
            className="glass rounded-2xl border border-[color:var(--border)] p-6 transition hover:shadow-fern"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-2xl font-semibold">{event.title}</h3>
                <p className="text-sm text-[color:var(--muted)]">{new Date(event.date).toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">
                  {event.attendees.length}/{event.capacity} filled
                </span>
                <button
                  onClick={() => handleSignup(event._id)}
                  className="rounded-full bg-[color:var(--green)] px-4 py-2 text-sm font-semibold text-slate-900 shadow-fern transition hover:bg-[color:var(--green-2)]"
                >
                  Sign up
                </button>
              </div>
            </div>
            <p className="mt-4 text-sm text-[color:var(--text)]">{event.description}</p>
            <div className="mt-4 flex flex-wrap gap-3 text-xs text-[color:var(--muted)]">
              <span className="rounded-full border border-[color:var(--border)] px-3 py-1">Location: {event.location}</span>
              <span className="rounded-full border border-[color:var(--border)] px-3 py-1">Shift ready</span>
            </div>
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <div className="glass rounded-2xl p-8 text-center">
          <p className="text-sm text-[color:var(--muted)]">No events available.</p>
        </div>
      )}
    </div>
  );
}
