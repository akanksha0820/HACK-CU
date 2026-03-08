import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const signupData = [
  { label: 'Week -4', value: 42 },
  { label: 'Week -3', value: 58 },
  { label: 'Week -2', value: 63 },
  { label: 'Week -1', value: 71 },
  { label: 'This Week', value: 79 },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--muted)]">Reports</p>
          <h2 className="text-3xl font-semibold">Analytics snapshots</h2>
        </div>
        <div className="rounded-full border border-[color:var(--border)] px-4 py-2 text-xs text-[color:var(--muted)]">
          Powered by /api/analytics
        </div>
      </div>
      <div className="glass rounded-2xl p-5">
        <h3 className="text-lg font-semibold">Volunteer signups over time</h3>
        <div className="mt-3 h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={signupData}>
              <XAxis dataKey="label" stroke="#9aa3ad" />
              <YAxis stroke="#9aa3ad" />
              <Tooltip />
              <Bar dataKey="value" fill="#e3b04a" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="glass rounded-2xl p-5">
        <h3 className="text-lg font-semibold">Engagement funnel (mock)</h3>
        <div className="mt-3 grid grid-cols-4 gap-3 text-center text-sm text-[color:var(--muted)]">
          <Stage label="Announce opens" value="92" />
          <Stage label="Acknowledged" value="71" />
          <Stage label="Signed up" value="38" />
          <Stage label="Attended" value="31" />
        </div>
      </div>
    </div>
  );
}

function Stage({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] px-3 py-4">
      <p className="text-xl font-semibold text-gold">{value}</p>
      <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--muted)]">{label}</p>
    </div>
  );
}
