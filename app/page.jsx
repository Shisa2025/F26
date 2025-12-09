import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 gap-6">
      <div className="text-center space-y-3 max-w-xl">
        <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Kaiju Response Hub</div>
        <div className="text-3xl font-bold">Choose a console</div>
        <p className="text-slate-300">
          Dashboard shows live incidents and telemetry. Countermeasures summarizes per-kaiju actions and operational directives.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
        <Link
          href="/dashboard"
          className="block p-5 rounded-2xl border border-red-500/40 bg-red-500/10 hover:bg-red-500/15 transition shadow-xl"
        >
          <div className="text-sm uppercase tracking-[0.14em] text-red-200 mb-1">Live Dashboard</div>
          <div className="text-xl font-semibold">Kaiju Crisis Console</div>
          <p className="text-sm text-red-100/80 mt-2">Monitor incidents, locations, radiation, and field ops feed.</p>
        </Link>
        <Link
          href="/countermeasures"
          className="block p-5 rounded-2xl border border-amber-400/40 bg-amber-500/10 hover:bg-amber-500/15 transition shadow-xl"
        >
          <div className="text-sm uppercase tracking-[0.14em] text-amber-200 mb-1">Playbook</div>
          <div className="text-xl font-semibold">Countermeasure Briefing</div>
          <p className="text-sm text-amber-100/80 mt-2">Per-kaiju actions and operational directives at a glance.</p>
        </Link>
        <Link
          href="/synopsis"
          className="block p-5 rounded-2xl border border-emerald-400/40 bg-emerald-500/10 hover:bg-emerald-500/15 transition shadow-xl"
        >
          <div className="text-sm uppercase tracking-[0.14em] text-emerald-200 mb-1">Synopsis</div>
          <div className="text-xl font-semibold">Mission Overview + BGM</div>
          <p className="text-sm text-emerald-100/80 mt-2">Read the condensed briefing and launch the background score.</p>
        </Link>
      </div>
    </div>
  );
}
