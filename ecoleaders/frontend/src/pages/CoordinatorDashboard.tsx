import React from 'react';
import { BarChart3, Users, Megaphone, Car, BookOpen } from 'lucide-react';

export default function CoordinatorDashboard() {
  const kpis = [
    { label: 'Active volunteers this week', value: 79 },
    { label: 'Event signup conversion', value: '68%' },
    { label: 'Attendance rate', value: '82%' },
    { label: 'Training completion', value: '76%' },
  ];
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--muted)]">Coordinator</p>
          <h2 className="text-3xl font-semibold">Operations pulse</h2>
        </div>
        <div className="rounded-full border border-[color:var(--border)] px-4 py-2 text-xs text-[color:var(--muted)]">
          Live sockets on
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="glass rounded-2xl p-4">
            <p className="text-2xl font-semibold text-gold">{kpi.value}</p>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--muted)]">{kpi.label}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Panel title="At-risk events" icon={<Users size={16} className="text-gold" />}>
          <ListItem title="Creek Cleanup" body="Needs 8 more volunteers" />
          <ListItem title="Advocacy Night" body="Low RSVP; push announcement" />
        </Panel>
        <Panel title="Announcement engagement" icon={<Megaphone size={16} className="text-gold" />}>
          <ListItem title="Safety briefing" body="92 opens · 71 acks · 18 voice plays" />
          <ListItem title="Weather update" body="78 opens · 60 acks" />
        </Panel>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Panel title="Carpool gaps" icon={<Car size={16} className="text-gold" />}>
          <ListItem title="Creek Cleanup" body="3 riders unassigned · 1 driver" />
        </Panel>
        <Panel title="Unread questions" icon={<Users size={16} className="text-gold" />}>
          <ListItem title="#general" body="2 unanswered messages" />
          <ListItem title="#new-volunteers" body="Welcome note pending" />
        </Panel>
        <Panel title="Training completion" icon={<BookOpen size={16} className="text-gold" />}>
          <ListItem title="Safety Basics" body="76% done · nudge remaining" />
        </Panel>
      </div>
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center gap-2 text-sm text-[color:var(--muted)]">
          <BarChart3 size={16} /> Analytics feed (see Reports)
        </div>
        <p className="mt-2 text-sm text-[color:var(--muted)]">
          High-level KPIs and conversion funnels; driven by backend /api/analytics endpoint with recharts visual.
        </p>
      </div>
    </div>
  );
}

function Panel({ title, icon, children }: any) {
  return (
    <div className="glass rounded-2xl p-5 space-y-3">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function ListItem({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] px-4 py-3">
      <p className="text-sm font-semibold">{title}</p>
      <p className="text-xs text-[color:var(--muted)]">{body}</p>
    </div>
  );
}
