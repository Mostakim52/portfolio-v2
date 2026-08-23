'use client';

import { useEffect, useRef } from 'react';

export default function HeroName({ name, text, tag: Tag = 'h1' }) {
  const wrapRef = useRef(null);
  const revealRef = useRef(null);
  const baseRefs = useRef([]);
  const revealRefs = useRef([]);

  const displayName = text || name;
  const words = displayName.split(' ');

  const buildLayer = (refs) => {
    let i = 0;
    return words.map((word, wi) => (
      <span key={`w${wi}`}>
        <span className={`hero-name-word word-${wi}`}>
          {[...word].map((ch) => {
            const idx = i++;
            return (
              <span
                key={idx}
                ref={(el) => (refs.current[idx] = el)}
                className="hero-name-letter"
              >
                {ch}
              </span>
            );
          })}
        </span>
        {wi < words.length - 1 ? ' ' : null}
      </span>
    ));
  };

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (reduce || !fine) return; // static fallback on touch / reduced-motion

    const base = baseRefs.current.filter(Boolean);
    const rev = revealRefs.current.filter(Boolean);
    const n = base.length;
    const cur = base.map(() => ({ x: 0, y: 0 }));
    let mx = -999;
    let my = -999;
    let raf = 0;

    const onMove = (e) => {
      const r = wrapRef.current.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
      if (revealRef.current) {
        revealRef.current.style.setProperty('--mx', `${mx}px`);
        revealRef.current.style.setProperty('--my', `${my}px`);
      }
    };
    const onLeave = () => {
      mx = -999;
      my = -999;
      if (revealRef.current) {
        revealRef.current.style.setProperty('--mx', '-999px');
        revealRef.current.style.setProperty('--my', '-999px');
      }
    };

    const loop = () => {
      const wrapRect = wrapRef.current.getBoundingClientRect();
      for (let i = 0; i < n; i++) {
        const r = base[i].getBoundingClientRect();
        const cx = r.left + r.width / 2 - wrapRect.left;
        const cy = r.top + r.height / 2 - wrapRect.top;
        const dx = mx - cx;
        const dy = my - cy;
        const dist = Math.hypot(dx, dy);
        const radius = 190;
        const pull = Math.max(0, 1 - dist / radius);
        const tx = dx * 0.22 * pull;
        const ty = dy * 0.22 * pull;
        cur[i].x += (tx - cur[i].x) * 0.15;
        cur[i].y += (ty - cur[i].y) * 0.15;
        const t = `translate(${cur[i].x.toFixed(2)}px, ${cur[i].y.toFixed(2)}px)`;
        base[i].style.transform = t;
        if (rev[i]) rev[i].style.transform = t;
      }
      raf = requestAnimationFrame(loop);
    };

    const el = wrapRef.current;
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [displayName]);

  return (
    <Tag ref={wrapRef} className="hero-name" aria-label={displayName}>
      <span className="hero-name-base" aria-hidden="true">
        {buildLayer(baseRefs)}
      </span>
      <span ref={revealRef} className="hero-name-reveal" aria-hidden="true">
        {buildLayer(revealRefs)}
      </span>
    </Tag>
  );
}
