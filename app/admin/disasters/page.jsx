'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const STATUS_OPTIONS = ['unverified', 'verified', 'fake'];

const formatDate = (value) => {
  if (!value) return '';
  try {
    return new Date(value).toLocaleString('en-US', {
      timeZone: 'UTC',
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  } catch {
    return value;
  }
};

export default function AdminDisastersPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const [typeFilter, setTypeFilter] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [types, setTypes] = useState([]);

  const normalizeDate = (value, endOfDay = false) => {
    if (!value) return '';
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return '';
    if (endOfDay) {
      parsed.setUTCHours(23, 59, 59, 999);
    } else {
      parsed.setUTCHours(0, 0, 0, 0);
    }
    return parsed.toISOString();
  };

  const loadTypes = async () => {
    try {
      const res = await fetch('/api/admin/disaster-type', { method: 'GET' });
      const text = await res.text();
      const body = text ? JSON.parse(text) : {};
      if (res.ok) setTypes(body?.disaster_types || []);
    } catch {
      // silent
    }
  };

  const loadDisasters = async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (typeFilter) params.set('typeId', typeFilter);
      const fromIso = normalizeDate(fromDate, false);
      const toIso = normalizeDate(toDate, true);
      if (fromIso) params.set('from', fromIso);
      if (toIso) params.set('to', toIso);
      const res = await fetch(`/api/admin/disasters?${params.toString()}`, { method: 'GET' });
      const text = await res.text();
      const body = text ? JSON.parse(text) : {};
      if (!res.ok) {
        setError(body?.error || 'Failed to load disasters');
      } else {
        setItems(body?.disasters || []);
      }
    } catch (err) {
      setError(err?.message || 'Network or server error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTypes();
    loadDisasters();
  }, []);

  const setStatus = async (id, status) => {
    setUpdatingId(id);
    setMessage('');
    setError('');
    try {
      const res = await fetch('/api/admin/disasters', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      const text = await res.text();
      const body = text ? JSON.parse(text) : {};
      if (!res.ok) {
        setError(body?.error || 'Update failed');
      } else {
        setMessage(body?.message || 'Status updated.');
        loadDisasters();
      }
    } catch (err) {
      setError(err?.message || 'Network or server error');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-6 py-10 flex justify-center">
      <div className="w-full max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Admin</div>
            <h1 className="text-3xl font-bold tracking-tight">Disaster management</h1>
            <p className="text-slate-300 text-sm">Review disasters and update their status.</p>
          </div>
          <Link href="/admin/dashboard" className="text-sm text-slate-200 underline">
            Back to dashboard
          </Link>
        </div>

        {message && <div className="text-sm text-emerald-300">{message}</div>}
        {error && <div className="text-sm text-red-300">{error}</div>}

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3 text-sm">
          <div className="font-semibold">Filters</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-1">
              <div className="text-xs uppercase tracking-[0.12em] text-slate-400">Type</div>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-slate-100"
              >
                <option value="">All</option>
                {types.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <div className="text-xs uppercase tracking-[0.12em] text-slate-400">From (YYYY-MM-DD)</div>
              <input
                type="text"
                inputMode="numeric"
                pattern="\d{4}-\d{2}-\d{2}"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-slate-100"
                placeholder="YYYY-MM-DD"
              />
            </div>
            <div className="space-y-1">
              <div className="text-xs uppercase tracking-[0.12em] text-slate-400">To (YYYY-MM-DD)</div>
              <input
                type="text"
                inputMode="numeric"
                pattern="\d{4}-\d{2}-\d{2}"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-slate-100"
                placeholder="YYYY-MM-DD"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={loadDisasters}
              className="px-4 py-2 rounded-lg border border-white/20 text-slate-100 hover:border-white/40"
            >
              Apply filters
            </button>
            <button
              type="button"
              onClick={() => {
                setTypeFilter('');
                setFromDate('');
                setToDate('');
                loadDisasters();
              }}
              className="px-4 py-2 rounded-lg border border-white/20 text-slate-100 hover:border-white/40"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">Disasters</div>
            {loading && <div className="text-xs text-slate-400">Loading...</div>}
          </div>
          {!loading && items.length === 0 && <div className="text-sm text-slate-400">No disasters found.</div>}
          {!loading && items.length > 0 && (
            <div className="space-y-2 text-sm">
              {items.map((d) => (
                <div
                  key={d.id}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                >
                  <div>
                    <div className="font-semibold">{d.title}</div>
                    <div className="text-slate-400">
                      Type: {d.disaster_type_name ?? d.disaster_type_id} · Severity: {d.severity} · Status: {d.status}
                    </div>
                    {d.location && <div className="text-slate-500 text-xs">Location: {d.location}</div>}
                    {d.occurred_at && <div className="text-slate-500 text-xs">Occurred: {formatDate(d.occurred_at)}</div>}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {STATUS_OPTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        disabled={updatingId === d.id || d.status === s}
                        onClick={() => setStatus(d.id, s)}
                        className={`px-3 py-2 rounded-lg border text-sm disabled:opacity-60 ${
                          s === 'verified'
                            ? 'border-emerald-300/60 text-emerald-200'
                            : s === 'fake'
                              ? 'border-red-300/60 text-red-200'
                              : 'border-amber-300/60 text-amber-200'
                        }`}
                      >
                        {updatingId === d.id ? 'Updating...' : `Set ${s}`}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
