// ─────────────────────────────────────────────────────────────
// GSAP Initialization — ScrollTrigger setup & animation helpers
// ─────────────────────────────────────────────────────────────

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin once at module load
gsap.registerPlugin(ScrollTrigger);

// ── Types ───────────────────────────────────────────────────

/** Properties passed to gsap.to() for the animation itself. */
export interface AnimationProps {
  [key: string]: string | number | boolean | object | undefined;
  duration?: number;
  ease?: string;
  delay?: number;
}

/** Configuration for the ScrollTrigger instance. */
export interface ScrollTriggerConfig {
  trigger?: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean | string | Element;
  pinSpacing?: boolean | string;
  markers?: boolean;
  toggleActions?: string;
  once?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
  onUpdate?: (self: ScrollTrigger) => void;
}

// ── Reduced Motion Detection ────────────────────────────────

/**
 * Check if the user prefers reduced motion.
 * Returns `true` when the OS / browser is set to reduce-motion.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ── Scroll Animation Helper ────────────────────────────────

/**
 * Create a GSAP ScrollTrigger animation with automatic
 * `prefers-reduced-motion` support.
 *
 * When reduced motion is active the element is instantly set to
 * its final state (duration: 0) so content is never hidden, but
 * no distracting animation plays.
 *
 * @param element  - Target element(s) — CSS selector, Element, or Element[]
 * @param animationProps - GSAP tween properties (to values)
 * @param triggerProps   - ScrollTrigger configuration
 * @returns The created GSAP Tween (useful for cleanup in useEffect)
 *
 * @example
 * ```ts
 * createScrollAnimation(
 *   '.hero-title',
 *   { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
 *   { trigger: '.hero', start: 'top 80%' },
 * );
 * ```
 */
export function createScrollAnimation(
  element: gsap.TweenTarget,
  animationProps: AnimationProps,
  triggerProps: ScrollTriggerConfig,
): gsap.core.Tween {
  if (prefersReducedMotion()) {
    // Jump to the end state immediately — no animation.
    return gsap.to(element, {
      ...animationProps,
      duration: 0,
      scrollTrigger: {
        ...triggerProps,
        // Disable scrub so the instant set works correctly
        scrub: false,
      },
    });
  }

  return gsap.to(element, {
    ...animationProps,
    scrollTrigger: triggerProps,
  });
}

// ── Re-exports ──────────────────────────────────────────────

export { gsap, ScrollTrigger };
