import React from 'react';

export default function Training() {
  const resources = [
    {
      title: 'Intro to Composting',
      description: 'Quick orientation video for new volunteers.',
      link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      type: 'Video',
    },
    {
      title: 'EPA Recycling Guidelines',
      description: 'Reference guide for sorting and handling materials.',
      link: 'https://www.epa.gov/recycle',
      type: 'Guide',
    },
    {
      title: 'Natural Highs Partner Hub',
      description: 'Partner organization best practices and youth programs.',
      link: 'https://www.naturalhighs.org',
      type: 'Partner',
    },
  ];

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--muted)]">Training</p>
        <h2 className="text-3xl font-semibold">Training and resources</h2>
        <p className="text-sm text-[color:var(--muted)]">
          Onboard new crew members with clear guidance, field checklists, and safety notes.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-3">
        {resources.map((resource) => (
          <a
            key={resource.title}
            href={resource.link}
            target="_blank"
            rel="noreferrer"
            className="glass rounded-2xl border border-[color:var(--border)] p-6 transition hover:shadow-ember"
          >
            <span className="text-xs uppercase tracking-[0.32em] text-[color:var(--muted)]">{resource.type}</span>
            <h3 className="mt-3 text-2xl font-semibold">{resource.title}</h3>
            <p className="mt-2 text-sm text-[color:var(--muted)]">{resource.description}</p>
            <div className="mt-4 text-sm font-semibold text-gold">Open resource</div>
          </a>
        ))}
      </div>

      <section className="glass rounded-2xl p-6">
        <h3 className="text-2xl font-semibold">Field briefing checklist</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {['Safety overview', 'Meetup location', 'Tool inventory', 'Waste sorting rules'].map((item) => (
            <div key={item} className="rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] px-4 py-3 text-sm">
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
