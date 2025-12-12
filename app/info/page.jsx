'use client';

import Link from 'next/link';
import { animate, createTimeline, } from 'animejs';


export default function InfoPage() {
  return (
    <main className="min-h-screen bg-yellow-50 text-slate-100 px-6 py-10">
      <div id='all' className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 id='heading' className="text-7xl font-bold tracking-tight text-red-700 py-2 opacity-1">About us</h1>
            <p class="text-lg text-red-500 mt-8 ml-4 max-w-3xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lacinia tortor eu tellus blandit iaculis. In ultrices velit id mauris condimentum viverra. Vivamus a ligula ac justo bibendum venenatis. Mauris ut nulla ligula. Nulla nec vehicula augue. Nulla dui quam, mollis maximus rutrum in, tempor vel lacus. Proin id mauris nunc. Pellentesque et sagittis lacus. Curabitur vestibulum felis eget lacus porttitor, non consectetur nisi imperdiet. Cras at lacinia orci. Nullam sed vestibulum est. Fusce varius quam sagittis, tempus sem eget, bibendum urna. Suspendisse rutrum, neque quis hendrerit lobortis, sem nunc varius est, at accumsan urna eros et leo. Aenean libero.</p>
          </div>
        </div>
      </div>
    </main>


  );
}
