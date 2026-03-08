import React, { useEffect, useState } from 'react';
import { sampleEvents, sampleCarpools, sampleRideRequests } from '../sampleData';

interface Event {
  _id: string;
  title: string;
}

interface Carpool {
  _id: string;
  driver: { _id: string; name: string };
  seatsAvailable: number;
  riders: { _id: string; name: string }[];
  meetingPoint: string;
  departureTime: string;
  pickupZone?: string;
}

export default function Carpool() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [carpools, setCarpools] = useState<Carpool[]>([]);
  const [form, setForm] = useState({ seatsAvailable: 3, meetingPoint: '', departureTime: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setEvents(sampleEvents);
  }, []);

  useEffect(() => {
    if (!selectedEventId && events.length > 0) {
      loadCarpools(events[0]._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events]);

  const loadCarpools = async (eventId: string) => {
    setSelectedEventId(eventId);
    setMessage(null);
    setError(null);
    setCarpools(sampleCarpools);
  };

  const handleCreate = async () => {
    setMessage(null);
    setError(null);
    setMessage('Submission successful: carpool created.');
    setForm({ seatsAvailable: 3, meetingPoint: '', departureTime: '' });
    setCarpools((prev) => [
      ...prev,
      {
        _id: Math.random().toString(),
        driver: { _id: 'self', name: 'You' },
        seatsAvailable: form.seatsAvailable,
        riders: [],
        meetingPoint: form.meetingPoint,
        departureTime: form.departureTime || new Date().toISOString(),
      },
    ]);
  };

  const handleJoin = async (carpoolId: string) => {
    setMessage(null);
    setError(null);
    setMessage('Submission successful: joined carpool.');
    setCarpools((prev) =>
      prev.map((c) => (c._id === carpoolId ? { ...c, riders: [...c.riders, { _id: 'self', name: 'You' }] } : c)),
    );
  };

  return (
    <div className="space-y-6">
      {message && <div className="rounded-xl border border-[color:var(--border)] bg-[color:rgba(47,191,131,0.12)] px-4 py-2 text-sm text-green">{message}</div>}
      {error && <div className="rounded-xl border border-[color:rgba(255,65,65,0.35)] bg-[color:rgba(255,65,65,0.08)] px-4 py-2 text-sm text-[color:rgba(255,200,200,0.9)]">{error}</div>}
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--muted)]">Mobility</p>
          <h2 className="text-3xl font-semibold">Carpool coordination</h2>
          <p className="mt-2 text-sm text-[color:var(--muted)]">
            Assign drivers, fill seats, and keep arrival times synced to each event window.
          </p>
        </div>
      </header>

      <div className="glass rounded-2xl p-5">
        <label htmlFor="eventSelect" className="text-xs uppercase tracking-[0.32em] text-[color:var(--muted)]">
          Select event
        </label>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <select
            id="eventSelect"
            className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] px-4 py-2 text-sm text-[color:var(--text)] focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)] md:w-auto"
            onChange={(e) => loadCarpools(e.target.value)}
            value={selectedEventId}
          >
            <option value="">Choose an event</option>
            {events.map((ev) => (
              <option key={ev._id} value={ev._id}>
                {ev.title}
              </option>
            ))}
          </select>
          {selectedEventId && (
            <span className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">
              {carpools.length} carpools live
            </span>
          )}
        </div>
      </div>

      {!selectedEventId && (
        <div className="glass rounded-2xl p-8 text-center">
          <p className="text-sm text-[color:var(--muted)]">Select an event to view carpools.</p>
        </div>
      )}

      {selectedEventId && (
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Available carpools</h3>
            {carpools.map((cp) => (
              <div key={cp._id} className="glass rounded-2xl p-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-[color:var(--muted)]">Driver</p>
                    <p className="text-lg font-semibold">{cp.driver.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[color:var(--muted)]">Seats</p>
                    <p className="text-lg font-semibold text-gold">
                      {cp.riders.length}/{cp.seatsAvailable}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-3 text-xs text-[color:var(--muted)]">
                  <span className="rounded-full border border-[color:var(--border)] px-3 py-1">
                    Meeting: {cp.meetingPoint}
                  </span>
                  <span className="rounded-full border border-[color:var(--border)] px-3 py-1">
                    Departure: {new Date(cp.departureTime).toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => handleJoin(cp._id)}
                  className="mt-4 rounded-full bg-[color:var(--gold)] px-4 py-2 text-sm font-semibold text-slate-900 shadow-ember transition hover:bg-[color:var(--gold-2)]"
                >
                  Join carpool
                </button>
              </div>
            ))}
            {carpools.length === 0 && (
              <div className="glass rounded-2xl p-6 text-sm text-[color:var(--muted)]">
                No carpools created yet.
              </div>
            )}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold">Ride requests</h4>
              {sampleRideRequests
                .filter((r) => !selectedEventId || r.event.toLowerCase().includes(''))
                .map((r) => (
                  <div key={r._id} className="rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] px-4 py-3 text-sm">
                    <p className="font-semibold">{r.event}</p>
                    <p className="text-xs text-[color:var(--muted)]">
                      {r.neighborhood} • {r.window} • Return: {r.returnNeeded ? 'Yes' : 'No'}
                    </p>
                    <p className="text-xs text-[color:var(--muted)]">Notes: {r.notes}</p>
                  </div>
                ))}
            </div>
          </section>

          <section className="glass rounded-2xl p-6">
            <h3 className="text-xl font-semibold">Create a carpool</h3>
            <p className="mt-1 text-sm text-[color:var(--muted)]">Offer seats and define your meetup plan.</p>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
                  Seats available
                </label>
                <input
                  type="number"
                  className="mt-2 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] px-4 py-2 text-sm text-[color:var(--text)] focus:outline-none focus:ring-2 focus:ring-[color:var(--green)]"
                  value={form.seatsAvailable}
                  onChange={(e) => setForm({ ...form, seatsAvailable: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
                  Meeting point
                </label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] px-4 py-2 text-sm text-[color:var(--text)] focus:outline-none focus:ring-2 focus:ring-[color:var(--green)]"
                  value={form.meetingPoint}
                  onChange={(e) => setForm({ ...form, meetingPoint: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
                  Departure time
                </label>
                <input
                  type="datetime-local"
                  className="mt-2 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] px-4 py-2 text-sm text-[color:var(--text)] focus:outline-none focus:ring-2 focus:ring-[color:var(--green)]"
                  value={form.departureTime}
                  onChange={(e) => setForm({ ...form, departureTime: e.target.value })}
                />
              </div>
              <button
                onClick={handleCreate}
                disabled={loading}
                className="w-full rounded-full bg-[color:var(--green)] px-4 py-2 text-sm font-semibold text-slate-900 shadow-fern transition hover:bg-[color:var(--green-2)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Creating...' : 'Create carpool'}
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
