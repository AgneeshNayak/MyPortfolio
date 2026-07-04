import { useState, useEffect, useRef, useCallback } from 'react';
import type { RefObject } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface UseCountUpOptions {
  end: number;
  duration?: number;
  suffix?: string;
  triggerRef: RefObject<HTMLElement | null>;
}

interface UseCountUpReturn {
  count: number;
  displayValue: string;
}

const DEFAULT_DURATION = 2000;

function easeOutExpo(t: number): number {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function useCountUp({
  end,
  duration = DEFAULT_DURATION,
  suffix = '',
  triggerRef,
}: UseCountUpOptions): UseCountUpReturn {
  const [count, setCount] = useState(0);
  const hasTriggeredRef = useRef(false);
  const rafIdRef = useRef<number>(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  const animate = useCallback((): void => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;

    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    const startTime = performance.now();

    const tick = (currentTime: number): void => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const currentValue = Math.round(easedProgress * end);

      setCount(currentValue);

      if (progress < 1) {
        rafIdRef.current = requestAnimationFrame(tick);
      }
    };

    rafIdRef.current = requestAnimationFrame(tick);
  }, [end, duration, prefersReducedMotion]);

  useEffect(() => {
    const element = triggerRef.current;

    if (!element) return;

    // If already triggered, do nothing
    if (hasTriggeredRef.current) return;

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasTriggeredRef.current) {
            animate();
            observer.disconnect();
            break;
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();

      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [triggerRef, animate]);

  const displayValue = `${count}${suffix}`;

  return { count, displayValue };
}
