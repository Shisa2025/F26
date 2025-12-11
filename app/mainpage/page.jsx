'use client';

import Link from 'next/link';
import {animate, createTimeline} from 'animejs';
import { useEffect } from 'react';
import {useRouter} from 'next/navigation';
import {useState} from 'react';


export default function Home() {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const tl = createTimeline({
      autoplay: true
    })


    tl.add('#content',{
      opacity: 1,
      duration: 800,
      easing: 'easeInOutQuad',
      delay: 400
    })
 
  }, []);

  async function handleRegister() {
    if (disabled) return;
    setDisabled(true);

    // Optional: call your sign-out endpoint to clear server session
    try {
      await fetch('/signin', { method: 'POST' });
    } catch (err) {
      // continue anyway
    }
    const register = createTimeline({
      autoplay: true

    });
    register.add('#content',{
      opacity: 0,
      duration: 400,
      easing: 'easeInOutQuad'
    });

    setTimeout(() =>{
      router.push('/register');
    }, 500);
    }

  async function handleInfo() {
    if (disabled) return;
    setDisabled(true);

    // Optional: call your sign-out endpoint to clear server session
    try {
      await fetch('/info', { method: 'POST' });
    } catch (err) {
      // continue anyway
    }
    const info = createTimeline({
      autoplay: true

    });
    info.add('#top',{
      opacity: 0,
      translateY: '-=200',
      duration: 600,
      easing: 'easeInOutQuad'
    });
    info.add('#biggy',{
      opacity: 0,
      translateY: '-=200',
      duration: 600,
      easing: 'easeInOutQuad'
    }, '-=500');
    info.add('#bottom',{
      opacity: 0,
      translateY: '-=200',
      duration: 600,
      easing: 'easeInOutQuad'
    }, '-=500');
    info.add('#registerbutton',{
      opacity: 0,
      translateY: '-=200',
      duration: 600,
      easing: 'easeInOutQuad'
    }, '-=500');
    info.add('#infobutton',{
      opacity: 0,
      translateY: '-=200',
      duration: 600,
      easing: 'easeInOutQuad'
    }, '-=500');
    setTimeout(() =>{
      router.push('/info');
    }, 1500);
    }
  

  return (
    
    <main id='page' className="min-h-screen bg-yellow-50 text-red-700 flex items-center justify-center px-6">
      <div id='content' className="max-w-md w-full space-y-6 text-center opacity-0">
        <div id='top' className="text-xs uppercase tracking-[0.2em] text-red-500 font-semibold">Disaster Simulation</div>
        <h1 id='biggy' className="text-8xl font-bold tracking-tight">Welcome</h1>
        <p id='bottom' className="text-red-500 font-semibold">Choose an action to continue.</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            id="registerbutton"
            onClick={handleRegister}
            disabled={disabled}
            aria-busy={disabled}
            className="px-5 py-3 rounded-xl border border-red-700 bg-sky-200 text-slate-900 font-semibold shadow hover:bg-white"
          >
            Get started
          </button>
          <button
            id="infobutton"
            onClick={handleInfo}
            disabled={disabled}
            aria-busy={disabled}
            className="px-5 py-3 rounded-xl bg-sky-200 border border-red-700 text-slate-900 font-semibold hover:bg-white"
          >
            More info
          </button>
        </div>
      </div>
    </main>
  );
}