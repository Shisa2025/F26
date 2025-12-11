'use client';

import { useEffect, useMemo, useState } from 'react';
import { countermeasureBriefings, countermeasureOperations, kaijuList } from '../data/kaiju';

const severityOf = (k) => {
  if (k.threatLevel >= 5) return 'critical';
  if (k.threatLevel >= 3) return 'elevated';
  return 'monitored';
};

const chipClass = (sev) => {
  if (sev === 'critical') return { label: 'Critical', className: 'border-red-400 text-red-200' };
  if (sev === 'elevated') return { label: 'Elevated', className: 'border-amber-300 text-amber-200' };
  return { label: 'Monitored', className: 'border-emerald-300 text-emerald-200' };
};

export default function CountermeasuresPage() {
  const [severityFilter, setSeverityFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedIds, setExpandedIds] = useState(new Set());
  const [region, setRegion] = useState('all');
  const [showToast, setShowToast] = useState(false);

  const filteredKaiju = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return countermeasureBriefings.filter((k) => {
      if (severityFilter !== 'all' && severityOf(k) !== severityFilter) return false;
      if (!term) return true;
      const haystack = `${k.name} ${k.location} ${k.type} ${(k.capabilities ?? []).join(' ')}`.toLowerCase();
      return haystack.includes(term);
    });
  }, [severityFilter, searchTerm]);

  const filteredOps = useMemo(
    () => (region === 'all' ? countermeasureOperations : countermeasureOperations.filter((op) => op.region === region)),
    [region],
  );

  useEffect(() => {
    if (!showToast) return undefined;
    const t = setTimeout(() => setShowToast(false), 1800);
    return () => clearTimeout(t);
  }, [showToast]);

  const toggleExpand = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const copyAdvice = async (advice) => {
    if (!navigator.clipboard) return;
    await navigator.clipboard.writeText(advice.join('\n'));
    setShowToast(true);
  };

  const copyVisible = async () => {
    if (!navigator.clipboard) return;
    const text = filteredKaiju.map((k) => `${k.name}:\n- ${(k.advice ?? []).join('\n- ')}`).join('\n\n');
    await navigator.clipboard.writeText(text);
    setShowToast(true);
  };

  const expandAll = () => {
    setExpandedIds(new Set(countermeasureBriefings.map((k) => k.id)));
  };

  const collapseAll = () => setExpandedIds(new Set());

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 flex flex-col">
      <header className="border-b border-amber-400/40 bg-amber-500/10 shadow-xl px-4 sm:px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-amber-200">Response Playbook</div>
            <div className="text-xl font-bold">Kaiju Countermeasure Briefing</div>
            <div className="text-sm text-amber-100/80">Condensed actions derived from live ops feed</div>
          </div>
          <div className="text-sm text-amber-100/80">Active kaiju: {kaijuList.length}</div>
        </div>
      </header>

      <main className="flex-1 p-4 grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-4">
        <section className="bg-white/5 border border-white/10 rounded-2xl p-4 shadow-2xl space-y-3">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="text-xs uppercase tracking-[0.16em] text-slate-300">Per-Kaiju Actions</div>
              <div className="text-sm text-slate-400">{`${filteredKaiju.length} shown / ${countermeasureBriefings.length} total`}</div>
            </div>
            <div className="flex items-center gap-2 flex-wrap justify-end">
              <button
                type="button"
                onClick={expandAll}
                className="text-[0.75rem] px-3 py-1 rounded-full border border-white/15 bg-white/5 hover:bg-white/10"
              >
                Expand all
              </button>
              <button
                type="button"
                onClick={collapseAll}
                className="text-[0.75rem] px-3 py-1 rounded-full border border-white/15 bg-white/5 hover:bg-white/10"
              >
                Collapse all
              </button>
              <div className="text-[0.75rem] px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-100">
                {filteredKaiju.length} targets
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 items-center text-sm">
            <input
              id="search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search name, location, capability..."
              className="flex-1 min-w-[220px] bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-100"
            />
            <div className="flex gap-2 text-[0.75rem]">
              {['all', 'critical', 'elevated', 'monitored'].map((sev) => {
                const label = sev === 'all' ? 'All' : sev.charAt(0).toUpperCase() + sev.slice(1);
                const active = severityFilter === sev;
                const base =
                  sev === 'critical'
                    ? 'border-red-400/50 text-red-100'
                    : sev === 'elevated'
                      ? 'border-amber-300/60 text-amber-100'
                      : sev === 'monitored'
                        ? 'border-emerald-300/60 text-emerald-100'
                        : 'border-white/15 text-slate-200';
                return (
                  <button
                    key={sev}
                    type="button"
                    className={`px-3 py-1 rounded-full border bg-white/10 hover:bg-white/15 ${base} ${active ? 'ring ring-amber-300' : ''}`}
                    onClick={() => setSeverityFilter(sev)}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={copyVisible}
              className="text-[0.75rem] px-3 py-2 rounded-lg border border-white/15 bg-white/10 hover:bg-white/20"
            >
              Copy visible actions
            </button>
          </div>

          <div className="space-y-3 text-sm">
            {filteredKaiju.map((k) => {
              const sev = severityOf(k);
              const chip = chipClass(sev);
              const isExpanded = expandedIds.has(k.id);
              return (
                <div key={k.id} className="rounded-xl border border-white/10 bg-slate-900/70 p-3 shadow-inner space-y-3">
                  <div className="flex justify-between items-start gap-3 flex-wrap">
                    <div className="space-y-1">
                      <div className="text-lg font-bold">{k.name}</div>
                      <div className="text-xs text-slate-400">
                        {k.type} | {k.location}
                      </div>
                    </div>
                    <div className="flex gap-2 items-center flex-wrap">
                      <div className={`text-[0.7rem] px-3 py-1 rounded-full border ${chip.className}`}>{chip.label}</div>
                      <button
                        type="button"
                        onClick={() => toggleExpand(k.id)}
                        className="text-[0.72rem] px-3 py-1 rounded-full border border-white/10 bg-white/5 hover:bg-white/10"
                      >
                        {isExpanded ? 'Hide actions' : 'Show actions'}
                      </button>
                      <button
                        type="button"
                        onClick={() => copyAdvice(k.advice ?? [])}
                        className="text-[0.72rem] px-3 py-1 rounded-full border border-white/10 bg-white/5 hover:bg-white/10"
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {(k.capabilities ?? []).map((cap) => (
                      <div key={cap} className="text-[0.7rem] px-2 py-1 rounded-full border border-white/10 text-slate-200">
                        {cap}
                      </div>
                    ))}
                  </div>

                  {isExpanded && (
                    <ul className="list-disc pl-5 space-y-1 text-slate-200">
                      {(k.advice ?? []).map((a) => (
                        <li key={a}>{a}</li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-white/5 border border-white/10 rounded-2xl p-4 shadow-2xl space-y-3">
          <div className="flex items-baseline justify-between gap-2 flex-wrap">
            <div>
              <div className="text-xs uppercase tracking-[0.16em] text-slate-300">Operational Directives</div>
              <div className="text-sm text-slate-400">Live feed snapshot</div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span>Region:</span>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-100"
              >
                <option value="all">All</option>
                <option value="kanto">Kanto</option>
                <option value="pacific">Pacific Offshore</option>
                <option value="underground">Underground</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto text-sm">
            {filteredOps.length === 0 && <div className="text-slate-400">No operations for this region.</div>}
            {filteredOps.map((op) => (
              <div key={op.title} className="rounded-xl border border-white/10 bg-slate-900/80 p-3 shadow-inner space-y-1">
                <div className="flex justify-between items-baseline gap-3">
                  <div className="font-semibold">{op.title}</div>
                  <div className="text-xs text-slate-400">
                    {op.time} | {op.level}
                  </div>
                </div>
                <div>{op.description}</div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {op.tags.map((t) => (
                    <div key={t} className="text-[0.68rem] px-2 py-1 rounded-full border border-white/10 text-slate-300">
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <div
        className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg bg-emerald-500 text-slate-950 text-sm shadow-xl transition ${
          showToast ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        Copied to clipboard
      </div>

      <footer className="text-[0.78rem] text-slate-400 border-t border-white/10 px-4 py-3 text-right bg-slate-950/80">
        Ac 2025 National Kaiju Response Agency (Demo) | Countermeasure sheet
      </footer>
    </div>
  );
}

