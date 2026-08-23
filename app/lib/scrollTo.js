// Deliberately native smooth scroll, not a hand-rolled rAF/easing loop: the
// site also runs `scroll-snap-type: y mandatory` (globals.css), and a
// custom animation driving `scrollTo(..., { behavior: 'instant' })` every
// frame fights the browser's own snap engine for scrollY — that dueling
// was the actual cause of both a jerky/sudden landing and scrolling
// upward intermittently failing to commit. Letting the native engine (via
// `scroll-behavior: smooth` on <html>) own the whole animation means
// there's only ever one thing moving scrollY, in either direction.
export function smoothScrollTo(targetY) {
  window.scrollTo({ top: Math.max(targetY, 0), left: 0, behavior: 'smooth' });
}

export function scrollToSection(id) {
  const el = document.getElementById(id.replace('#', ''));
  if (!el) return;
  // Most nav targets are the <section> itself, but "maker" is a zero-height
  // marker div nested just inside <section id="about"> (below its own
  // padding-top) — resolve to the enclosing <section> either way so we
  // always land on the section's true top, not header-height short of it.
  // Each full-screen section is a 100vh box with its own top padding
  // reserved for the header (see .full-section), so scrolling to its true
  // top makes it fill the entire viewport — its background paints behind
  // the sticky translucent header instead of stopping in a hard seam right
  // below it.
  const target = el.closest('section') || el;
  const targetY = target.getBoundingClientRect().top + window.scrollY;
  smoothScrollTo(targetY);
}
