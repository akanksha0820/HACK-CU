import React from 'react';

export default function About() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-10">
      <h1 className="text-4xl font-semibold">About Eco-Leaders</h1>
      <p className="text-lg text-[color:var(--muted)]">
        Eco-Leaders Volunteer Hub is built for Eco-Cycle to centralize recruitment, onboarding, and operations. The same
        platform can clone microsites and workspaces for any mission-aligned nonprofit.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { title: 'Volunteer-first', body: 'Frictionless discovery, signup, reminders, carpools, and training.' },
          { title: 'Coordinator-grade', body: 'Fill roles faster with dashboards, announcements, and attendance tools.' },
          { title: 'AI-assisted', body: 'Gemini for content + summaries; ElevenLabs for accessible voice delivery.' },
        ].map((card) => (
          <div key={card.title} className="glass rounded-2xl p-5">
            <h3 className="text-xl font-semibold">{card.title}</h3>
            <p className="mt-2 text-sm text-[color:var(--muted)]">{card.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
