'use client';

import { useEffect, useRef, useState } from 'react';
import { synopsisAudio, synopsisSlides as defaultSlides } from '../data/kaiju';

const DURATION = 12000;

export default function SynopsisPage() {
  const [slides, setSlides] = useState(defaultSlides);
  const [idx, setIdx] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [started, setStarted] = useState(true);
  const [ended, setEnded] = useState(false);
  const [audioStatus, setAudioStatus] = useState('BGM: Autoplay enabled (click page if muted)');
  const [showAudioPrompt, setShowAudioPrompt] = useState(false);
  const audioRef = useRef(null);
  const timerRef = useRef();
  const typingRef = useRef();

  const clearTimers = () => {
    clearTimeout(timerRef.current);
    clearInterval(typingRef.current);
  };

  const advanceOrReveal = () => {
    if (!started) {
      setStarted(true);
      return;
    }
    if (typingRef.current) {
      clearInterval(typingRef.current);
      typingRef.current = undefined;
      const current = slides[idx] ?? slides[0];
      setDisplayText(current.line);
      timerRef.current = setTimeout(() => {
        if (idx < slides.length - 1) {
          setIdx((prev) => Math.min(prev + 1, slides.length - 1));
        } else {
          setEnded(true);
        }
      }, DURATION);
      return;
    }
    if (ended) {
      setEnded(false);
      setIdx(0);
      setStarted(true);
      return;
    }
    if (idx < slides.length - 1) {
      setIdx((prev) => Math.min(prev + 1, slides.length - 1));
    } else {
      setEnded(true);
    }
  };

  // typing effect
  useEffect(() => {
    if (!started) return undefined;
    const current = slides[idx] ?? slides[0];
    clearTimers();
    const text = current.line || '';
    setDisplayText(text.slice(0, 1));

    let pos = 1;
    typingRef.current = setInterval(() => {
      setDisplayText(text.slice(0, pos + 1));
      pos += 1;
      if (pos >= text.length) {
        clearInterval(typingRef.current);
        typingRef.current = undefined;
        timerRef.current = setTimeout(() => {
          if (idx < slides.length - 1) {
            setIdx((prev) => Math.min(prev + 1, slides.length - 1));
          } else {
            setEnded(true);
          }
        }, DURATION);
      }
    }, 80);

    return clearTimers;
  }, [idx, slides, started]);

  // optional external description file
  useEffect(() => {
    const loadSlides = async () => {
      try {
        const res = await fetch('/kaiju/synopsis/description.txt');
        const isText = res.headers.get('content-type')?.includes('text/plain');
        if (!res.ok || !isText) return;
        const text = await res.text();
        const lines = text
          .split(/\r?\n/)
          .map((l) => l.trim())
          .filter(Boolean);
        if (lines.length === 0 || /^<!doctype/i.test(lines[0])) return;
        const next = Array.from({ length: Math.min(lines.length, 6) }, (_, i) => ({
          src: `/kaiju/synopsis/picture/img${i + 1}.png`,
          line: lines[i],
        }));
        setSlides(next);
        setIdx(0);
        setEnded(false);
      } catch (err) {
        // silent fallback
      }
    };
    loadSlides();
  }, []);

  // autoplay audio
  useEffect(() => {
    const attemptAutoplay = async () => {
      if (!audioRef.current) return;
      try {
        await audioRef.current.play();
        setAudioStatus('BGM: Playing (loop)');
      } catch (err) {
        setAudioStatus('BGM: Click anywhere to start audio');
        setShowAudioPrompt(true);
      }
    };
    attemptAutoplay();
  }, []);

  const currentSlide = slides[idx] ?? slides[0];

  return (
    <div className="min-h-screen bg-black text-slate-100">
      <div
        id="stage"
        className="relative min-h-screen w-full overflow-hidden cursor-pointer select-none"
        onClick={() => {
          advanceOrReveal();
          if (audioRef.current) {
            audioRef.current.muted = false;
            audioRef.current
              .play()
              .then(() => {
                setAudioStatus('BGM: Playing (loop)');
                setShowAudioPrompt(false);
              })
              .catch(() => {
                setAudioStatus('BGM: Click anywhere to start audio');
                setShowAudioPrompt(true);
              });
          }
        }}
      >
        <audio ref={audioRef} src={synopsisAudio} preload="auto" loop playsInline />

        <img
          key={currentSlide?.src}
          src={currentSlide?.src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover brightness-90 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <div className="space-y-4 max-w-4xl">
            <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-xl animate-fade-in">
              {displayText}
            </div>
            {!ended && <div className="text-sm text-slate-200/70">Click or wait - 12 seconds per slide</div>}
          </div>
        </div>

        {ended && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4 bg-black/70 backdrop-blur-sm">
            <div className="text-3xl sm:text-4xl font-extrabold">Briefing complete</div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setEnded(false);
                  setIdx(0);
                  setStarted(true);
                  audioRef.current?.play().catch(() => {});
                }}
                className="px-5 py-3 rounded-full bg-emerald-500 text-slate-950 font-semibold shadow-lg hover:-translate-y-0.5 transition"
              >
                See again
              </button>
              <a
                href="/kaiju"
                onClick={(e) => e.stopPropagation()}
                className="px-5 py-3 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 transition"
              >
                Go back
              </a>
            </div>
          </div>
        )}

        {showAudioPrompt && !ended && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4 bg-black/70 backdrop-blur-sm">
            <div className="text-3xl sm:text-4xl font-extrabold">Click to enable audio</div>
            <div className="text-sm text-slate-200/80">Audio autoplay was blocked; any click will start playback.</div>
          </div>
        )}

        <div className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur">
          {audioStatus}
        </div>
      </div>
    </div>
  );
}
