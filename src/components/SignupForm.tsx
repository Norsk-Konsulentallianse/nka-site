// src/components/SignupForm.tsx
"use client";

import { useState } from "react";

type State = { ok: boolean; error?: string };

export default function SignupForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<State | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    try {
      const res = await fetch("/api/innmelding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, company, email, consent }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      setResult({ ok: !!json.ok, error: json.error });
    } catch {
    setResult({ ok: false, error: "network_error" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Navn *</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none"
          placeholder="Ola Nordmann"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Selskap *</label>
        <input
          type="text"
          required
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none"
          placeholder="Firmanavn AS"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">E-post *</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none"
          placeholder="ola@example.no"
        />
      </div>
      <label className="flex items-start gap-3 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-gray-300"
          required
        />
        <span>
          Jeg samtykker til at Norsk Konsulentallianse lagrer og behandler opplysningene for å administrere medlemskap.
        </span>
      </label>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-gray-900 px-8 py-3 text-sm font-semibold text-white uppercase tracking-wider hover:bg-gray-800 disabled:opacity-60 transition-colors"
        >
          {submitting ? "Sender…" : "Meld deg inn"}
        </button>
        {result && (
          <span className={`text-sm ${result.ok ? "text-green-700" : "text-red-700"}`}>
            {result.ok ? "Takk! Vi har mottatt innmeldingen." : `Feil: ${result.error ?? "ukjent"}`}
          </span>
        )}
      </div>

      <p className="text-xs text-gray-500">
        Felt merket med * er påkrevd. Du kan når som helst be om innsyn eller sletting.
      </p>
    </form>
  );
}
