import { useCallback, useRef } from 'react';
import type { RefObject, MouseEvent as ReactMouseEvent } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const MAX_DISPLACEMENT = 10;
const RESET_TRANSITION = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
const MOVE_TRANSITION = 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

interface MagneticCursorReturn {
  onMouseMove: (event: ReactMouseEvent<HTMLElement>) => void;
  onMouseLeave: () => void;
}

function isTouchOnlyDevice(): boolean {
  if (typeof window === 'undefined') return true;
  return 'ontouchstart' in window && !window.matchMedia('(pointer: fine)').matches;
}

export function useMagneticCursor(ref: RefObject<HTMLElement | null>): MagneticCursorReturn {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isDisabledRef = useRef<boolean | null>(null);

  // Lazily compute touch-only check once
  const isDisabled = useCallback((): boolean => {
    if (isDisabledRef.current === null) {
      isDisabledRef.current = isTouchOnlyDevice();
    }
    return prefersReducedMotion || isDisabledRef.current;
  }, [prefersReducedMotion]);

  const onMouseMove = useCallback(
    (event: ReactMouseEvent<HTMLElement>): void => {
      if (isDisabled() || !ref.current) return;

      const element = ref.current;
      const rect = element.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;

      // Normalize displacement relative to element dimensions, clamped to max
      const normalizedX = (deltaX / (rect.width / 2)) * MAX_DISPLACEMENT;
      const normalizedY = (deltaY / (rect.height / 2)) * MAX_DISPLACEMENT;

      const clampedX = Math.max(-MAX_DISPLACEMENT, Math.min(MAX_DISPLACEMENT, normalizedX));
      const clampedY = Math.max(-MAX_DISPLACEMENT, Math.min(MAX_DISPLACEMENT, normalizedY));

      element.style.transition = MOVE_TRANSITION;
      element.style.transform = `translate(${clampedX}px, ${clampedY}px)`;
    },
    [isDisabled, ref],
  );

  const onMouseLeave = useCallback((): void => {
    if (isDisabled() || !ref.current) return;

    const element = ref.current;
    element.style.transition = RESET_TRANSITION;
    element.style.transform = 'translate(0px, 0px)';
  }, [isDisabled, ref]);

  return { onMouseMove, onMouseLeave };
}
