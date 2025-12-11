'use client';

import Link from 'next/link';
import { animate, createTimeline, stagger } from 'animejs';


export default function AdminDashboard() {




  return (
    <main className="min-h-screen bg-yellow-50 text-slate-100 px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.15em] text-red-900 font-medium">Admin Dashboard</div>
            <h1 className="text-7xl font-bold tracking-tight text-red-700 py-2">Control Panel</h1>
            <p className="text-red-900 text-m py-2 font-medium">Manage users and review disaster records.</p>
          </div>
          <Link
            href="/signin?role=admin"
            className="px-4 py-2 rounded-xl border border-white/20 bg-red-700 text-sm hover:border-white/40 font-medium"
          >
            Sign out / switch
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <Link
            href="/admin/users"
            className="rounded-2xl border border-white/10 bg-red-700 p-5 hover:border-white/30 transition space-y-2"
          >
            <div className="text-sm uppercase tracking-[0.1em] text-white/80">Manage</div>
            <div className="text-xl font-semibold">User management</div>
            <p className="text-sm text-white/80 font-medium">Review users and update pending accounts.</p>
          </Link>

          <Link
            href="/admin/disaster-type"
            className="rounded-2xl border border-white/10 bg-red-700 p-5 hover:border-white/30 transition space-y-2"
          >
            <div className="text-sm uppercase tracking-[0.1em] text-white/80">Manage</div>
            <div className="text-xl font-semibold">Create disaster types</div>
            <p className="text-sm text-white/80 font-medium">Create and maintain disaster types.</p>
          </Link>

          <Link
            href="/admin/disasters"
            className="rounded-2xl border border-white/10 bg-red-700 p-5 hover:border-white/30 transition space-y-2"
          >
            <div className="text-sm uppercase tracking-[0.1em] text-white/80">Manage</div>
            <div className="text-xl font-semibold">Disaster management</div>
            <p className="text-sm text-white/80 font-medium">Review disasters and update status.</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
