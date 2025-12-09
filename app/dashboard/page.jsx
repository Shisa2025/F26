'use client';

import { useMemo, useState } from 'react';
import { dashboardOperations, kaijuList } from '../data/kaiju';

function severityChip(level) {
  if (level >= 5) return { label: 'Critical', className: 'border-red-400 text-red-300' };
  if (level >= 3) return { label: 'Elevated', className: 'border-amber-300 text-amber-200' };
  return { label: 'Monitored', className: 'border-emerald-300 text-emerald-200' };
}

export default function DashboardPage() {
  const [selectedId, setSelectedId] = useState(kaijuList[0]?.id ?? null);
  const selected = kaijuList.find((k) => k.id === selectedId) ?? kaijuList[0];

  const stats = useMemo(
    () => ({
      incidents: kaijuList.length,
      critical: kaijuList.filter((k) => k.threatLevel >= 5).length,
      elevated: kaijuList.filter((k) => k.threatLevel >= 3 && k.threatLevel < 5).length,
    }),
    [],
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0b15] via-[#0c0c12] to-[#0b0b15] text-slate-100 flex flex-col overflow-x-hidden">
      <header className="border-b border-white/10 px-4 sm:px-6 py-4 bg-black/40 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-[0.24em] text-red-200 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              Kaiju Dashboard
            </div>
            <div className="text-xl font-bold">Live Threat Monitor</div>
            <div className="text-sm text-slate-300">Lean view with multi-kaiju tracking</div>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <span>Critical: {stats.critical}</span>
            <span>Elevated: {stats.elevated}</span>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 grid grid-cols-1 md:grid-cols-[320px_1fr] gap-4">
        <section className="bg-white/5 border border-white/10 rounded-2xl p-4 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-xs uppercase tracking-[0.16em] text-slate-300">Active Kaiju</div>
            <div className="text-[0.75rem] px-3 py-1 rounded-full bg-red-500/15 border border-red-400/40 text-red-100">
              {kaijuList.length} threats
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="rounded-xl border border-white/10 bg-slate-900/70 p-3">
              <div className="text-[0.68rem] uppercase tracking-[0.08em] text-slate-400">Incidents</div>
              <div className="text-xl font-semibold">{stats.incidents}</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/70 p-3">
              <div className="text-[0.68rem] uppercase tracking-[0.08em] text-slate-400">Critical</div>
              <div className="text-xl font-semibold">{stats.critical}</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/70 p-3">
              <div className="text-[0.68rem] uppercase tracking-[0.08em] text-slate-400">Elevated</div>
              <div className="text-xl font-semibold">{stats.elevated}</div>
            </div>
          </div>
          <div className="flex flex-col gap-2 max-h-[calc(100vh-220px)] overflow-y-auto">
            {kaijuList.map((k) => {
              const chip = severityChip(k.threatLevel);
              const isActive = selected?.id === k.id;
              return (
                <button
                  key={k.id}
                  type="button"
                  onClick={() => setSelectedId(k.id)}
                  className={`flex justify-between items-center rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 transition hover:-translate-y-0.5 hover:border-red-400/50 hover:bg-red-500/10 text-sm ${
                    isActive ? 'border-red-500/70 bg-red-500/15 shadow-[0_0_16px_rgba(239,68,68,0.35)]' : ''
                  }`}
                >
                  <div className="text-left">
                    <div className="text-base font-semibold tracking-tight">{k.name}</div>
                    <div className="text-xs text-slate-400">{`${k.location} | Lv.${k.threatLevel} | ${k.lastSeen}`}</div>
                  </div>
                  <div className={`text-[0.7rem] px-3 py-1 rounded-full border ${chip.className}`}>{chip.label}</div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-[0.16em] text-slate-300">Selected Kaiju</div>
              <div className="text-[0.75rem] px-3 py-1 rounded-full bg-slate-800 border border-white/10 text-slate-200">
                {selected ? `Tracking: ${selected.name}` : 'No target selected'}
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-4">
              <div className="space-y-2">
                <div className="text-2xl font-extrabold tracking-tight">{selected?.name ?? 'None'}</div>
                <div className="text-sm text-slate-300">{selected?.codename ?? 'Choose a kaiju from the list.'}</div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-[0.68rem] uppercase tracking-[0.08em] text-slate-400">Threat</div>
                    <div>{selected ? `Level ${selected.threatLevel}` : '-'}</div>
                  </div>
                  <div>
                    <div className="text-[0.68rem] uppercase tracking-[0.08em] text-slate-400">Last Seen</div>
                    <div>{selected?.lastSeen ?? '-'}</div>
                  </div>
                  <div>
                    <div className="text-[0.68rem] uppercase tracking-[0.08em] text-slate-400">Location</div>
                    <div>{selected?.location ?? '-'}</div>
                  </div>
                  <div>
                    <div className="text-[0.68rem] uppercase tracking-[0.08em] text-slate-400">Type</div>
                    <div>{selected?.type ?? '-'}</div>
                  </div>
                </div>
                <div>
                  <div className="text-[0.68rem] uppercase tracking-[0.08em] text-slate-400">Capabilities</div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selected?.tags?.map((tag) => (
                      <div key={tag} className="text-[0.72rem] px-3 py-1 rounded-full border border-white/15 bg-white/5">
                        {tag}
                      </div>
                    )) || <span className="text-slate-400 text-sm">-</span>}
                  </div>
                </div>
                <div>
                  <div className="text-[0.68rem] uppercase tracking-[0.08em] text-slate-400">Notes</div>
                  <div className="text-sm text-slate-300">{selected?.notes ?? '-'}</div>
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-900/70 p-4 text-sm space-y-2">
                <div className="text-[0.68rem] uppercase tracking-[0.08em] text-slate-400">Ops Snapshot</div>
                <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                  {dashboardOperations.map((op) => (
                    <div
                      key={op.title}
                      className="rounded-xl border border-white/10 bg-slate-900/80 p-3 space-y-1"
                    >
                      <div className="flex justify-between items-baseline gap-3">
                        <div className="font-semibold">{op.title}</div>
                        <div className="text-xs text-slate-400">
                          {op.time} | {op.level}
                        </div>
                      </div>
                      <div>{op.description}</div>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {op.tags.map((t) => (
                          <div
                            key={t}
                            className="text-[0.68rem] px-2 py-1 rounded-full border border-white/10 text-slate-300"
                          >
                            {t}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="text-[0.75rem] text-slate-400 border-t border-white/10 px-4 py-3 text-right bg-[#090914]">
        © 2025 Kaiju Dashboard | Demo
      </footer>
    </div>
  );
}
