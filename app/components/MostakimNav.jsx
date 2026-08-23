'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { scrollToSection } from '../lib/scrollTo';

const LETTERS = [
  { char: 'M', word: 'Maker', sectionId: 'maker' },
  { char: 'O', word: 'Odyssey', sectionId: 'journey' },
  { char: 'S', word: 'Skills & Expertise', sectionId: 'skills' },
  { char: 'T', word: 'Talks', sectionId: 'talks' },
  { char: 'A', word: 'Applications', sectionId: 'applications' },
  { char: 'K', word: 'Kit & Hardware', sectionId: 'kit-hardware' },
  { char: 'I', word: 'Information', sectionId: 'information' },
  { char: 'M', word: 'Mail Me', sectionId: 'mail-me' },
];

const RADIUS = 46;
const LIFT = 9;
const SCALE = 0.16;
const LERP = 0.22;

export default function MostakimNav() {
  const [hovered, setHovered] = useState(null);
  const [focused, setFocused] = useState(null);
  const [pressedIdx, setPressedIdx] = useState(null);
  const [active, setActive] = useState(null);
  const [traveling, setTraveling] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dotX, setDotX] = useState(0);

  const capsuleRef = useRef(null);
  const glyphRefs = useRef([]);
  const activeRef = useRef(null);
  const travelTimer = useRef(null);

  // ---- magnetic dock effect (mirrors the hero marquee's pointer-pull) ----
  const mouseX = useRef(-9999);
  const cur = useRef(LETTERS.map(() => ({ y: 0, s: 1 })));
  const raf = useRef(0);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const measureDot = useCallback((idx) => {
    const el = glyphRefs.current[idx];
    if (!el || !capsuleRef.current) return;
    setDotX(el.offsetLeft + el.offsetWidth / 2);
  }, []);

  const expandedIdx = hovered !== null ? hovered : focused !== null ? focused : active;

  useEffect(() => {
    if (expandedIdx != null) measureDot(expandedIdx);
  }, [expandedIdx, scrolled, measureDot]);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (reduce || !fine) return undefined;

    const loop = () => {
      const capsule = capsuleRef.current;
      if (capsule) {
        const rect = capsule.getBoundingClientRect();
        glyphRefs.current.forEach((el, i) => {
          if (!el) return;
          const r = el.getBoundingClientRect();
          const cx = r.left + r.width / 2 - rect.left;
          const dist = Math.abs(mouseX.current - cx);
          const pull = Math.max(0, 1 - dist / RADIUS);
          const targetY = -LIFT * pull;
          const targetS = 1 + SCALE * pull;
          const c = cur.current[i];
          c.y += (targetY - c.y) * LERP;
          c.s += (targetS - c.s) * LERP;
          const pressExtra = pressedIdx === i ? 0.9 : 1;
          el.parentElement.style.transform = `translateY(${c.y.toFixed(2)}px) scale(${(c.s * pressExtra).toFixed(3)})`;
        });
      }
      raf.current = requestAnimationFrame(loop);
    };

    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, [pressedIdx]);

  const onCapsulePointerMove = useCallback((e) => {
    const capsule = capsuleRef.current;
    if (!capsule) return;
    const rect = capsule.getBoundingClientRect();
    mouseX.current = e.clientX - rect.left;
  }, []);

  const onCapsulePointerLeave = useCallback(() => {
    mouseX.current = -9999;
  }, []);

  // `active` now tracks the current *section* (via the scroll-spy effect
  // below), not a togglable "capsule open" state — there's no longer a
  // "closed" state to dismiss with an outside click or Escape (that would
  // fire on literally any click on the page and incorrectly un-highlight
  // whatever section you're actually looking at), so this just navigates
  // and updates the highlight immediately for snappy feedback; the
  // scroll-spy effect independently confirms/corrects it once the scroll
  // settles.
  const activate = useCallback(
    (i) => {
      if (LETTERS[i].sectionId) {
        scrollToSection(LETTERS[i].sectionId);
      }
      if (activeRef.current !== i && activeRef.current !== null) {
        setTraveling(true);
        clearTimeout(travelTimer.current);
        travelTimer.current = setTimeout(() => setTraveling(false), 160);
      }
      measureDot(i);
      setActive(i);
    },
    [measureDot]
  );

  // Only clears the pressed-down squash visual — `onClick` (below) is the
  // sole trigger for `activate()`. Both handlers used to call `activate`,
  // firing it twice per click; depending on exact event timing, the second
  // call could see `active` already set from the first and immediately
  // toggle it back off, so a click intermittently reverted itself a moment
  // later.
  const handleUp = useCallback((i) => {
    setPressedIdx((p) => (p === i ? null : p));
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled((prev) => {
          const next = window.scrollY > 50;
          return prev === next ? prev : next;
        });
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Keeps the highlighted letter in sync with whichever section is actually
  // on screen from normal scrolling, not just clicks — mirrors the same
  // probe-point technique page.js uses to swap the header's light/dark
  // theme (a point just inside the sticky header's own height, checked
  // against each section's live rect). Sets `active` directly rather than
  // going through `activate()`, which also triggers a scroll — reusing it
  // here would make every scroll retrigger a(nother) scroll. The hero
  // (#top) deliberately isn't in LETTERS, so `findIndex` naturally resolves
  // to -1 there and nothing lights up.
  useEffect(() => {
    let raf = 0;

    const updateFromScroll = () => {
      raf = 0;
      const header = document.querySelector('.site-header');
      if (!header) return;
      const probeY = header.getBoundingClientRect().height / 2;
      const sections = document.querySelectorAll('section[id]');
      let currentId = null;
      for (const section of sections) {
        const r = section.getBoundingClientRect();
        if (r.top <= probeY && r.bottom > probeY) {
          currentId = section.id;
          break;
        }
      }
      // "maker" is a marker div nested inside <section id="about">, not a
      // section of its own (see scrollToSection's own closest('section')
      // resolution for the same case), so `about` has to be matched
      // against it specially here too.
      const idx = currentId
        ? LETTERS.findIndex(
            (l) => l.sectionId === currentId || (currentId === 'about' && l.sectionId === 'maker')
          )
        : -1;
      setActive((prev) => {
        const next = idx === -1 ? null : idx;
        return prev === next ? prev : next;
      });
    };

    const scheduleUpdate = () => {
      if (raf) return;
      raf = requestAnimationFrame(updateFromScroll);
    };

    scheduleUpdate();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  useEffect(() => () => clearTimeout(travelTimer.current), []);

  return (
    <div
      className={`mostakim-capsule${scrolled ? ' is-scrolled' : ''}${
        focused !== null ? ' is-focused' : ''
      }`}
      ref={capsuleRef}
      onPointerMove={onCapsulePointerMove}
      onPointerLeave={onCapsulePointerLeave}
      role="group"
      aria-label="MOSTAKIM brand navigation"
    >
      {LETTERS.map((l, i) => {
        const isHighlighted = hovered === i || focused === i || active === i;
        // The tooltip is deliberately hover-only here, not `active` or
        // `focused` — once you click a letter it stays "active" (the glyph
        // stays lit, the dot parks there) to mark the current section, but
        // the tooltip bubble itself should behave like a normal tooltip and
        // disappear the moment the pointer leaves, not linger until
        // something else steals focus. A mouse click also natively focuses
        // the button, so including `focused` here would keep it stuck open
        // the same way `active` did — keyboard users still get the tooltip
        // via the CSS `:focus-visible` rule below, which (per spec) only
        // matches keyboard-driven focus, not a mouse click's.
        const isTipVisible = hovered === i;

        const cls = [
          'mk-letter',
          isHighlighted ? 'is-hover' : '',
          isTipVisible ? 'is-tip' : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <span className="mk-letter-lift" key={`${l.char}-${i}`}>
            <button
              type="button"
              className={cls}
              aria-label={l.word}
              aria-pressed={active === i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
              onFocus={() => setFocused(i)}
              onBlur={() => setFocused(null)}
              onPointerDown={() => setPressedIdx(i)}
              onPointerUp={() => handleUp(i)}
              onPointerCancel={() => setPressedIdx(null)}
              onClick={() => activate(i)}
            >
              <span className="mk-glyph" ref={(el) => (glyphRefs.current[i] = el)}>
                {l.char}
              </span>
              <span className="mk-tooltip" aria-hidden="true">
                {l.word}
              </span>
            </button>
          </span>
        );
      })}

      <span className="mk-dot-track" aria-hidden="true">
        <span
          className={`mk-dot${expandedIdx !== null ? ' is-visible' : ''}${
            traveling ? ' is-traveling' : ''
          }`}
          style={{ left: dotX }}
        />
      </span>
    </div>
  );
}
