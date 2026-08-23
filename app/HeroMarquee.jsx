'use client';

import { useEffect, useRef } from 'react';

const RADIUS = 190;
const PULL = 0.22;
const LERP = 0.15;

export default function HeroMarquee({ text = 'MOSTAKIM', className = '', repeat = 4, duration = '60s' }) {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (reduce || !fine) return;

    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const base = track.querySelectorAll('.hero-marquee-base .hero-marquee-letter');
    const n = base.length;
    if (!n) return;

    const cur = Array.from({ length: n }, () => ({ x: 0, y: 0 }));
    let mx = -999;
    let my = -999;
    let raf = 0;

    const onMove = (e) => {
      const r = wrap.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
      wrap.style.setProperty('--mx', `${mx}px`);
      wrap.style.setProperty('--my', `${my}px`);
    };
    const onLeave = () => {
      mx = -999;
      my = -999;
      wrap.style.setProperty('--mx', '-999px');
      wrap.style.setProperty('--my', '-999px');
    };

    const loop = () => {
      const wrapRect = wrap.getBoundingClientRect();
      for (let i = 0; i < n; i++) {
        const r = base[i].getBoundingClientRect();
        const cx = r.left + r.width / 2 - wrapRect.left;
        const cy = r.top + r.height / 2 - wrapRect.top;
        const dx = mx - cx;
        const dy = my - cy;
        const dist = Math.hypot(dx, dy);
        const pull = Math.max(0, 1 - dist / RADIUS);
        const tx = dx * PULL * pull;
        const ty = dy * PULL * pull;
        cur[i].x += (tx - cur[i].x) * LERP;
        cur[i].y += (ty - cur[i].y) * LERP;
        const t = `translate(${cur[i].x.toFixed(2)}px, ${cur[i].y.toFixed(2)}px)`;
        base[i].style.transform = t;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, [text]);

  const buildGroup = (id) => (
    <span className="hero-marquee-group" key={id}>
      <span className="hero-marquee-base" aria-hidden="true">
        {[...text].map((ch, i) => (
          <span key={`${id}-b-${i}`} className="hero-marquee-letter">
            {ch}
          </span>
        ))}
        <span className="hero-marquee-letter">&nbsp;</span>
      </span>
    </span>
  );

  const groupIndexes = Array.from({ length: repeat }, (_, i) => i);

  return (
    <div
      ref={wrapRef}
      className={`hero-marquee ${className}`}
      aria-hidden="true"
      style={{ '--marquee-duration': duration }}
    >
      {/* Reveal layer: static wrapper with mask, animated track inside */}
      <div className="hero-marquee-reveal-layer">
        <div className="hero-marquee-track">
          {groupIndexes.map((i) => buildGroup(`r${i}`))}
        </div>
      </div>
      {/* Base layer: always visible, scrolling */}
      <div ref={trackRef} className="hero-marquee-base-layer">
        <div className="hero-marquee-track">
          {groupIndexes.map((i) => buildGroup(`b${i}`))}
        </div>
      </div>
    </div>
  );
}
