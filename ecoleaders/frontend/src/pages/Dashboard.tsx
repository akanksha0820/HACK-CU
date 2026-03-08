import React from 'react';
import { Calendar, Megaphone, Car, BookOpen, Star, MessageSquare } from 'lucide-react';

const sample = {
  user: { name: 'Ava', status: 'Active volunteer', streak: 5, badges: 3 },
  upcomingEvent: {
    title: 'Saturday Creek Cleanup',
    date: 'Tomorrow 9:00 AM',
    location: 'Boulder Creek Bridge',
  },
  announcement: { title: 'Safety briefing tonight', priority: 'urgent' },
  recommended: [
    { title: 'Community Compost Workshop', time: 'Sat 2:00 PM', tags: ['composting', 'education'] },
    { title: 'Zero Waste Advocacy Night', time: 'Sun 6:00 PM', tags: ['advocacy'] },
  ],
  chat: [
    { channel: '#general', snippet: 'Need gloves? we have extras', unread: 3 },
    { channel: '#carpool-coordination', snippet: 'I can drive 2 seats from CU', unread: 1 },
  ],
  carpools: [
    { event: 'Creek Cleanup', seats: '2/4 filled', departure: 'CU Lot 214 8:15 AM' },
    { event: 'Compost Workshop', seats: '1/3 filled', departure: 'North Boulder 1:10 PM' },
  ],
  training: { progress: 0.6, next: 'Event Safety Basics' },
  stats: { events: 7, hours: 18, badges: 3, streak: 5 },
  badges: ['First Event', 'Training Complete', 'Community Helper'],
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="glass rounded-2xl p-5">
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--muted)]">Welcome</p>
          <h2 className="text-2xl font-semibold">Hi {sample.user.name}!</h2>
          <p className="text-sm text-[color:var(--muted)]">{sample.user.status}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-[color:rgba(47,191,131,0.12)] px-3 py-1 text-green">Streak {sample.user.streak}</span>
            <span className="rounded-full bg-[color:rgba(227,176,74,0.12)] px-3 py-1 text-gold">{sample.user.badges} badges</span>
          </div>
        </div>
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--muted)]">Upcoming event</p>
            <Calendar size={16} className="text-gold" />
          </div>
          <h3 className="mt-2 text-xl font-semibold">{sample.upcomingEvent.title}</h3>
          <p className="text-sm text-[color:var(--muted)]">{sample.upcomingEvent.date}</p>
          <p className="text-xs text-[color:var(--muted)]">{sample.upcomingEvent.location}</p>
          <a href="/calendar" className="mt-3 inline-flex rounded-full bg-[color:var(--green)] px-4 py-2 text-xs font-semibold text-slate-900 shadow-fern">
            Go to calendar
          </a>
        </div>
        <div className="glass rounded-2xl border border-[color:rgba(255,65,65,0.35)] p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--muted)]">Urgent</p>
            <Megaphone size={16} className="text-gold" />
          </div>
          <h3 className="mt-2 text-xl font-semibold">{sample.announcement.title}</h3>
          <p className="text-sm text-[color:var(--muted)]">Safety briefing notice</p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => alert('Playing safety briefing audio (demo).')}
              className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs text-[color:var(--text)]"
            >
              Play audio
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="glass space-y-3 rounded-2xl p-5 md:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Recommended opportunities</h3>
            <span className="text-xs text-[color:var(--muted)]">AI-personalized</span>
          </div>
          {sample.recommended.map((rec) => (
            <div key={rec.title} className="flex flex-wrap items-center justify-between rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] px-4 py-3">
              <div>
                <p className="text-sm font-semibold">{rec.title}</p>
                <p className="text-xs text-[color:var(--muted)]">{rec.time}</p>
              </div>
              <div className="flex flex-wrap gap-2 text-[11px] text-[color:var(--muted)]">
                {rec.tags.map((t) => (
                  <span key={t} className="rounded-full border border-[color:var(--border)] px-2 py-1">
                    {t}
                  </span>
                ))}
              </div>
              <a href="/calendar" className="rounded-full bg-[color:var(--green)] px-3 py-1 text-xs font-semibold text-slate-900">
                Sign up (calendar)
              </a>
            </div>
          ))}
        </div>
        <div className="glass space-y-3 rounded-2xl p-5">
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-gold" />
            <h3 className="text-lg font-semibold">Training progress</h3>
          </div>
          <div className="h-2 rounded-full bg-[color:rgba(47,191,131,0.2)]">
            <div className="h-2 w-[60%] rounded-full bg-[color:var(--green)]" />
          </div>
          <p className="text-xs text-[color:var(--muted)]">Next: {sample.training.next}</p>
          <button
            onClick={() => alert('Resuming training module (demo).')}
            className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs text-[color:var(--text)]"
          >
            Continue
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="glass space-y-3 rounded-2xl p-5">
          <div className="flex items-center gap-2">
            <MessageSquare size={16} className="text-gold" />
            <h3 className="text-lg font-semibold">Chat activity</h3>
          </div>
          <a
            href="/chat"
            className="block rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] px-4 py-3 text-sm font-semibold text-gold text-center"
          >
            Go to chatrooms
          </a>
        </div>
        <div className="glass space-y-3 rounded-2xl p-5">
          <div className="flex items-center gap-2">
            <Car size={16} className="text-gold" />
            <h3 className="text-lg font-semibold">Carpools near you</h3>
          </div>
          <a
            href="/carpools"
            className="block rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] px-4 py-3 text-sm font-semibold text-gold text-center"
          >
            Go to carpools
          </a>
        </div>
        <div className="glass space-y-3 rounded-2xl p-5">
          <div className="flex items-center gap-2">
            <Star size={16} className="text-gold" />
            <h3 className="text-lg font-semibold">Impact stats</h3>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <Stat label="Events" value={sample.stats.events} />
            <Stat label="Hours" value={sample.stats.hours} />
            <Stat label="Badges" value={sample.stats.badges} />
            <Stat label="Streak" value={`${sample.stats.streak} days`} />
          </div>
          <div className="flex flex-wrap gap-2 text-[11px]">
            {sample.badges.map((b) => (
              <span key={b} className="rounded-full border border-[color:var(--border)] px-2 py-1">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] px-3 py-3 text-center">
      <p className="text-xl font-semibold text-gold">{value}</p>
      <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--muted)]">{label}</p>
    </div>
  );
}
