import React, { useState } from 'react';
import api from '../api';

export default function AITools() {
  const [intake, setIntake] = useState<Record<string, string>>({
    name: 'River Keepers',
    mission: 'Protect local waterways and empower volunteers.',
    audience: 'Volunteers, donors, community partners',
    programs: 'Cleanups, Education, Advocacy',
    city: 'Boulder, CO',
    tone: 'Hopeful and action-oriented',
  });
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const res = await api.post('/site/generate', {
        nonprofitName: intake.name,
        mission: intake.mission,
      });
      setHtml(res.data.templateHtml || '<h1>Gemini response placeholder</h1>');
    } catch (err) {
      setHtml('<p>Gemini generation requires API key</p>');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--muted)]">AI Tools</p>
          <h2 className="text-3xl font-semibold">Nonprofit Site Generator</h2>
          <p className="text-sm text-[color:var(--muted)]">Gemini crafts structured content; ElevenLabs can narrate the hero.</p>
        </div>
        <div className="rounded-full border border-[color:var(--border)] px-4 py-2 text-xs text-[color:var(--muted)]">
          Live API-ready
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-[0.6fr_0.4fr]">
        <div className="glass space-y-3 rounded-2xl p-5">
          <h3 className="text-lg font-semibold">Intake</h3>
          {Object.entries(intake).map(([key, val]) => (
            <div key={key}>
              <label className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">{key}</label>
              <input
                className="mt-1 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] px-3 py-2 text-sm"
                value={val}
                onChange={(e) => setIntake({ ...intake, [key]: e.target.value })}
              />
            </div>
          ))}
          <button
            onClick={generate}
            disabled={loading}
            className="rounded-full bg-[color:var(--green)] px-4 py-2 text-sm font-semibold text-slate-900 shadow-fern disabled:opacity-60"
          >
            {loading ? 'Generating…' : 'Generate with Gemini'}
          </button>
        </div>
        <div className="glass rounded-2xl p-5">
          <h3 className="text-lg font-semibold">Preview</h3>
          <div className="mt-3 h-72 overflow-auto rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] p-3 text-xs">
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </div>
          <button className="mt-3 rounded-full border border-[color:var(--border)] px-4 py-2 text-xs text-[color:var(--text)]">
            Download HTML
          </button>
        </div>
      </div>
    </div>
  );
}
