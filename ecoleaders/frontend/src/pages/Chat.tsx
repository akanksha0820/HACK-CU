import React, { useEffect, useState } from 'react';
import { sampleChatMessages } from '../sampleData';

interface ChatMessage {
  channel: string;
  content: string;
  sender: string;
  createdAt: string;
}

export default function Chat() {
  const [channel, setChannel] = useState<string>('general');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [aiReply, setAiReply] = useState<string>('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const channels = [
    'general',
    'composting',
    'environmental-education',
    'event-logistics',
    'advocacy',
    'carpool-coordination',
    'new-volunteers',
  ];

  useEffect(() => {
    setMessages(sampleChatMessages.filter((m) => m.channel === channel));
  }, [channel]);

  const sendMessage = () => {
    if (!messageInput.trim()) return;
    const local: ChatMessage = {
      channel,
      content: messageInput,
      sender: 'You',
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, local]);
    setMessageInput('');
  };

  const askGemini = async () => {
    setAiLoading(true);
    setAiError(null);
    setAiReply('');
    const pushAiMessage = (text: string) =>
      setMessages((prev) => [...prev, { channel, content: text, sender: 'Gemini', createdAt: new Date().toISOString() }]);
    const history = messages
      .slice(-8)
      .map((m) => `${m.sender}: ${m.content}`)
      .join('\n');

    const prompt = `You are the Eco-Leaders volunteer chat assistant. Summarize the last few messages in #${channel}, highlight action items, and answer “what did I miss?” in 2-3 bullet points.\n\nRecent chat:\n${history}`;

    try {
      const key = import.meta.env.VITE_GEMINI_API_KEY;
      if (key) {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${key}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
          },
        );
        const data = await res.json();
        const text =
          data?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join('\n') ||
          'AI summary unavailable—showing demo.';
        setAiReply(text);
        pushAiMessage(text);
      } else {
        const demo = 'Demo Gemini summary: • Gloves available • 2 seats from CU at 8:15am • Bring rain jacket for creek cleanup.';
        setAiReply(demo);
        pushAiMessage(demo);
      }
    } catch (err: any) {
      setAiError('AI request failed (check GEMINI key or network). Showing demo instead.');
      const demo = 'Demo Gemini summary: • Gloves available • 2 seats from CU at 8:15am • Bring rain jacket for creek cleanup.';
      setAiReply(demo);
      pushAiMessage(demo);
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    // Seed some visible content if nothing yet
    if (messages.length === 0) {
      setMessages(sampleChatMessages.filter((m) => m.channel === channel));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel]);

  return (
    <div className="grid h-full gap-6 lg:grid-cols-[0.35fr_0.65fr]">
      <aside className="glass rounded-2xl p-5">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--muted)]">Channels</p>
        <div className="mt-4 space-y-2">
          {channels.map((name) => (
            <button
              key={name}
              onClick={() => setChannel(name)}
              className={[
                'w-full rounded-xl border px-4 py-2 text-left text-sm transition',
                channel === name
                  ? 'border-[color:var(--gold)] bg-[color:rgba(227,176,74,0.1)] text-gold'
                  : 'border-[color:var(--border)] text-[color:var(--text)] hover:border-[color:var(--gold)]',
              ].join(' ')}
            >
              #{name}
            </button>
          ))}
        </div>
        <div className="mt-6 rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] px-4 py-3 text-xs text-[color:var(--muted)]">
          All announcements post to this space. Keep your crews in sync.
        </div>
      </aside>

      <section className="flex h-full flex-col gap-4">
        <header className="glass rounded-2xl p-5">
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--muted)]">Live chat</p>
          <h2 className="mt-2 text-2xl font-semibold">#{channel}</h2>
          <p className="mt-1 text-sm text-[color:var(--muted)]">Coordinate shifts and share quick updates.</p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <button
              onClick={askGemini}
              disabled={aiLoading}
              className="rounded-full bg-[color:var(--gold)] px-3 py-1 font-semibold text-slate-900 shadow-ember disabled:opacity-60"
            >
              {aiLoading ? 'Gemini thinking…' : 'Ask Gemini for recap'}
            </button>
            {aiError && <span className="text-[color:rgba(255,200,200,0.9)]">{aiError}</span>}
          </div>
        </header>

        <div className="glass flex-1 rounded-2xl p-5">
          <div className="h-full space-y-3 overflow-y-auto pr-2">
            {messages.map((msg, idx) => (
              <div key={idx} className="rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] px-4 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{msg.sender}</span>
                  <span className="text-xs text-[color:var(--muted)]">
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </span>
                </div>
                <p className="mt-2 text-sm text-[color:var(--text)]">{msg.content}</p>
              </div>
            ))}
            {messages.length === 0 && (
              <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] px-4 py-3 text-sm text-[color:var(--muted)]">
                No messages yet. Start the briefing.
              </div>
            )}
            {aiReply && (
              <div className="rounded-xl border border-[color:var(--gold)] bg-[color:rgba(227,176,74,0.08)] px-4 py-3 text-sm text-[color:var(--text)]">
                <p className="text-xs uppercase tracking-[0.24em] text-gold">Gemini recap</p>
                <p className="mt-1 whitespace-pre-wrap">{aiReply}</p>
              </div>
            )}
          </div>
        </div>

        <div className="glass rounded-2xl p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <input
              type="text"
              className="flex-1 rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] px-4 py-2 text-sm text-[color:var(--text)] focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)]"
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <button
              onClick={sendMessage}
              className="rounded-full bg-[color:var(--gold)] px-5 py-2 text-sm font-semibold text-slate-900 shadow-ember transition hover:bg-[color:var(--gold-2)]"
            >
              Send update
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
