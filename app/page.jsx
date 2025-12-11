'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-6">
      <div className="max-w-xl w-full space-y-4 text-center">
        <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Workspace Ready</div>
        <h1 className="text-3xl font-bold tracking-tight">灾害模拟系统主页已空出</h1>
        <p className="text-slate-300">
          原来的 Kaiju 展示已搬到 <code>/kaiju</code> 下。这里可以直接开始搭建新的灾害模拟系统。
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-sm">
          <Link
            href="/kaiju"
            className="px-4 py-2 rounded-xl bg-red-500/80 border border-red-200/70 text-white font-semibold shadow hover:bg-red-500"
          >
            查看 Kaiju 主页
          </Link>
          <Link
            href="/kaiju/dashboard"
            className="px-4 py-2 rounded-xl border border-white/30 text-white/90 hover:border-white/60 hover:text-white"
          >
            Kaiju Dashboard
          </Link>
          <Link
            href="/kaiju/countermeasures"
            className="px-4 py-2 rounded-xl border border-white/30 text-white/90 hover:border-white/60 hover:text-white"
          >
            Kaiju Countermeasures
          </Link>
          <Link
            href="/kaiju/synopsis"
            className="px-4 py-2 rounded-xl border border-white/30 text-white/90 hover:border-white/60 hover:text-white"
          >
            Kaiju Synopsis
          </Link>
        </div>
      </div>
    </main>
  );
}

