'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {animate, createTimeline} from 'animejs';
import {useRouter} from 'next/navigation';

export default function RegisterPage() {
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {

    const intro = createTimeline({
      autoplay:true
    })

    intro.add('#content', {
      opacity: 1,
      translateX: [650, 0],
      duration: 400,
      delay:200,
      easing: 'easeInOutQuad'
    })
    
    intro.add('#back',{
      opacity: 1,
      translateY:[-205, -205],
      translateX: [690, 40],
      duration: 400,
      easing: 'easeInOutQuad'
    }, '-=400')

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSubmitting(true);
    setMessage('');
    setError('');

    const data = new FormData(form);
    const payload = {
      email: data.get('email'),
      user_name: data.get('user_name'),
      password: data.get('password'),
      role: 'user',
    };

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      const body = text ? JSON.parse(text) : {};
      if (!res.ok) {
        setError(body?.error || 'Registration failed');
        setMessage('');
      } else {
        setMessage(body?.message || 'User registration successful.');
        setError('');
        form?.reset?.();
      }
    } catch (err) {
      setError(err?.message || 'Network or server error');
      setMessage('');
    } finally {
      setSubmitting(false);
    }

  };
  async function handleBack() {
      if (disabled) return;
      setDisabled(true);
  
      // Optional: call your sign-out endpoint to clear server session
      try {
        await fetch('/signin', { method: 'POST' });
      } catch (err) {
        // continue anyway
      }
  
      // Animate button up and fade out
  
      const tl = createTimeline({
        autoplay: true
      });

      
      tl.add('#back',{
        opacity: 0,
        duration: 400,
        easing: 'easeInOutQuad'
      });

      tl.add('#content',{
        opacity: 0,
        duration: 400,
        easing: 'easeInOutQuad'
      }, '-=400');

  
  
      // Wait for timeline to finish, then navigate
      setTimeout(() => {
        router.push('/mainpage');
      }, 500); // total animation duration
  }


  async function handleSignIn() {
    if (disabled) return;
    setDisabled(true);

    // Optional: call your sign-out endpoint to clear server session
    try {
      await fetch('/signin', { method: 'POST' });
    } catch (err) {
      // continue anyway
    }

    // Animate button up and fade out

    const signinanim = createTimeline({
      autoplay: true
    });

      
    signinanim.add('#content', {
      opacity: 0,
      translateX: [0, 650],
      duration: 400,
      easing: 'easeInOutQuad'
    })
    
    signinanim.add('#back',{
      opacity: 0,
      translateY:[-205, -205],
      translateX: [40, 690],
      duration: 400,
      easing: 'easeInOutQuad'
    }, '-=400')



    // Wait for timeline to finish, then navigate
    setTimeout(() => {
      router.push('/signin');
    }, 400); // total animation duration
  }

  return (
    <main className="min-h-screen bg-yellow-50 text-red-800 flex items-center justify-center px-6">
      <button 
      id='back' 
      onClick={handleBack}
      disabled={disabled}
      aria-busy={disabled}
      className="opacity-0 translate-y-[-220px] translate-x-[40px] z-50 relative">
        <img 
          src="/index/139-1391483_png-file-svg-back-button-icon-png-transparent-removebg-preview.png" 
          alt="Home" 
          className="w-10 h-10 "
        />
      </button>
      <div id='content' className="w-full max-w-md space-y-6 opacity-0">
        <div className="space-y-2 text-center">
          <div className="text-xs uppercase tracking-[0.2em] text-red-500 font-semibold">Register</div>
          <h1 className="text-3xl font-bold tracking-tight text-red-700">Create User Account</h1>
          <p className="text-red-600 text-sm">Keep Wise, Stay Safe</p>
        </div>

        <form
          className="space-y-4 bg-white border border-red-200 rounded-2xl p-5 shadow-xl"
          onSubmit={handleSubmit}
        >
          <div className="space-y-2">
            <label className="block text-sm text-red-800">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-red-200 bg-white px-3 py-2 text-red-900 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none "
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-red-800">Username</label>
            <input
              name="user_name"
              type="text"
              required
              minLength={3}
              className="w-full rounded-lg border border-red-200 bg-white px-3 py-2 text-red-900 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none "
              placeholder="choose a username"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-red-800">Password</label>
            <input
              name="password"
              type="password"
              required
              minLength={6}
              className="w-full rounded-lg border border-red-200 bg-white px-3 py-2 text-red-900 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none "
              placeholder="••••••"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-500 disabled:opacity-70 "
          >
            {submitting ? 'Registering...' : 'Register'}
          </button>

          {message && <div className="text-sm text-emerald-600">{message}</div>}
          {error && <div className="text-sm text-red-600">{error}</div>}

          <div className="text-center text-sm flex items-center justify-center gap-3 text-red-700">
            <button 
            id='signinbutton' 
            onClick={handleSignIn}
            disabled={disabled}
            aria-busy={disabled}
            className="underline hover:text-red-900 font-semibold">
              Login
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
