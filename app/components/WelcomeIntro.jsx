'use client';

import { useEffect, useState } from 'react';

// "Welcome" cycling through a handful of languages before the hero reveals
// — Bengali first (home language), a spread of others, English last so it
// reads as the natural handoff into the (English) site underneath.
const WORDS = [
  { text: 'স্বাগতম', lang: 'bn' },
  { text: 'Bienvenido', lang: 'es' },
  { text: 'Bienvenue', lang: 'fr' },
  { text: 'Willkommen', lang: 'de' },
  { text: 'Benvenuto', lang: 'it' },
  { text: 'ようこそ', lang: 'ja' },
  { text: '환영합니다', lang: 'ko' },
  { text: 'Welcome', lang: 'en' },
];

const STEP_MS = 280;
const LAST_HOLD_MS = 450;
const EXIT_MS = 500;

export default function WelcomeIntro() {
  const [index, setIndex] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    // Rapid text cycling can be uncomfortable for vestibular disorders —
    // skip straight to the hero rather than trying to tone the motion down.
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setGone(true);
      return undefined;
    }

    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';

    const id = setInterval(() => {
      setIndex((prev) => {
        const next = prev + 1;
        if (next >= WORDS.length) {
          clearInterval(id);
          setTimeout(() => setExiting(true), LAST_HOLD_MS);
          return prev;
        }
        return next;
      });
    }, STEP_MS);

    return () => {
      clearInterval(id);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    if (!exiting) return undefined;
    const t = setTimeout(() => {
      document.documentElement.style.overflow = '';
      setGone(true);
    }, EXIT_MS);
    return () => clearTimeout(t);
  }, [exiting]);

  if (gone) return null;

  return (
    <div
      className={`welcome-intro${exiting ? ' welcome-intro-exit' : ''}`}
      role="status"
      aria-label="Loading"
    >
      <span key={index} lang={WORDS[index].lang} className="welcome-intro-word font-display">
        {WORDS[index].text}
      </span>
      <div className="welcome-intro-track" aria-hidden="true">
        <div
          className="welcome-intro-bar"
          style={{ width: `${((index + 1) / WORDS.length) * 100}%`, transitionDuration: `${STEP_MS}ms` }}
        />
      </div>
    </div>
  );
}
