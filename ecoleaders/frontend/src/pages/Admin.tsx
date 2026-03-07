import React, { useState } from 'react';
import api from '../api';

export default function Admin() {
  const [siteForm, setSiteForm] = useState({ nonprofitName: '', mission: '' });
  const [generatedHtml, setGeneratedHtml] = useState('');
  const [audioText, setAudioText] = useState('');
  const [audioSrc, setAudioSrc] = useState('');

  const handleGenerateSite = async () => {
    try {
      const res = await api.post('/site/generate', siteForm);
      setGeneratedHtml(res.data.templateHtml);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error generating site');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([generatedHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${siteForm.nonprofitName.replace(/\s+/g, '_')}.html`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleGenerateAudio = async () => {
    if (!audioText) return;
    try {
      const res = await api.post('/ai/speech', { text: audioText });
      setAudioSrc(`data:audio/mpeg;base64,${res.data.audio}`);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error generating audio');
    }
  };

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--muted)]">Admin</p>
        <h2 className="text-3xl font-semibold">Operations console</h2>
        <p className="text-sm text-[color:var(--muted)]">
          Generate partner site kits and dispatch audio announcements to your crews.
        </p>
      </header>

      <section className="glass rounded-2xl p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h3 className="text-2xl font-semibold">Generate nonprofit website</h3>
            <p className="mt-2 text-sm text-[color:var(--muted)]">
              Provide a name and mission, then export the generated HTML kit.
            </p>
          </div>
          <span className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">
            AI generator
          </span>
        </div>
        <div className="mt-5 space-y-3">
          <input
            type="text"
            placeholder="Nonprofit name"
            className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] px-4 py-2 text-sm text-[color:var(--text)] focus:outline-none focus:ring-2 focus:ring-[color:var(--green)]"
            value={siteForm.nonprofitName}
            onChange={(e) => setSiteForm({ ...siteForm, nonprofitName: e.target.value })}
          />
          <textarea
            placeholder="Mission statement"
            className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] px-4 py-2 text-sm text-[color:var(--text)] focus:outline-none focus:ring-2 focus:ring-[color:var(--green)]"
            rows={3}
            value={siteForm.mission}
            onChange={(e) => setSiteForm({ ...siteForm, mission: e.target.value })}
          />
          <button
            onClick={handleGenerateSite}
            className="rounded-full bg-[color:var(--green)] px-4 py-2 text-sm font-semibold text-slate-900 shadow-fern transition hover:bg-[color:var(--green-2)]"
          >
            Generate site
          </button>
        </div>
        {generatedHtml && (
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold">Generated HTML</h4>
              <button
                onClick={handleDownload}
                className="rounded-full bg-[color:var(--gold)] px-4 py-2 text-xs font-semibold text-slate-900 shadow-ember transition hover:bg-[color:var(--gold-2)]"
              >
                Download kit
              </button>
            </div>
            <textarea
              className="mt-3 h-64 w-full rounded-xl border border-[color:var(--border)] bg-[color:rgba(7,10,12,0.6)] p-4 font-mono text-xs text-[color:var(--text)]"
              readOnly
              value={generatedHtml}
            />
          </div>
        )}
      </section>

      <section className="glass rounded-2xl p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h3 className="text-2xl font-semibold">Generate audio announcement</h3>
            <p className="mt-2 text-sm text-[color:var(--muted)]">
              Use short messages for live shift updates or safety reminders.
            </p>
          </div>
          <span className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">
            Voice studio
          </span>
        </div>
        <div className="mt-5 space-y-3">
          <textarea
            placeholder="Enter announcement text"
            className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] px-4 py-2 text-sm text-[color:var(--text)] focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)]"
            rows={3}
            value={audioText}
            onChange={(e) => setAudioText(e.target.value)}
          />
          <button
            onClick={handleGenerateAudio}
            className="rounded-full bg-[color:var(--gold)] px-4 py-2 text-sm font-semibold text-slate-900 shadow-ember transition hover:bg-[color:var(--gold-2)]"
          >
            Generate audio
          </button>
        </div>
        {audioSrc && (
          <div className="mt-4 rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] px-4 py-3">
            <audio controls src={audioSrc} className="w-full" />
          </div>
        )}
      </section>
    </div>
  );
}
