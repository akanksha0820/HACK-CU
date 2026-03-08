import React from 'react';

export default function Contact() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-10">
      <h1 className="text-4xl font-semibold">Contact / Apply</h1>
      <p className="text-lg text-[color:var(--muted)]">
        Apply to join Eco-Leaders or request a coordinator account. We’ll respond within one business day.
      </p>
      <form className="glass space-y-4 rounded-2xl p-6">
        <div>
          <label className="text-sm text-[color:var(--muted)]">Name</label>
          <input className="mt-1 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] px-4 py-2" />
        </div>
        <div>
          <label className="text-sm text-[color:var(--muted)]">Email</label>
          <input className="mt-1 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] px-4 py-2" />
        </div>
        <div>
          <label className="text-sm text-[color:var(--muted)]">Why do you want to volunteer?</label>
          <textarea className="mt-1 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] px-4 py-2" rows={3} />
        </div>
        <button className="rounded-full bg-[color:var(--green)] px-5 py-2 text-sm font-semibold text-slate-900 shadow-fern">
          Submit
        </button>
      </form>
    </div>
  );
}
