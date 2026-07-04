import { useState, useEffect, useRef, useCallback } from 'react';
import { getSceneIndex, getSceneTransitionProgress } from '@/lib/colorInterpolation';

interface ScrollProgressState {
  scrollProgress: number;
  scrollY: number;
  sceneIndex: number;
  sceneProgress: number;
  isScrolling: boolean;
}

const SCROLL_IDLE_TIMEOUT = 150;

export function useScrollProgress(): ScrollProgressState {
  const [state, setState] = useState<ScrollProgressState>({
    scrollProgress: 0,
    scrollY: 0,
    sceneIndex: 0,
    sceneProgress: 0,
    isScrolling: false,
  });

  const rafIdRef = useRef<number>(0);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isScrollingRef = useRef(false);

  const calculateProgress = useCallback((): void => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;
    const sceneIndex = getSceneIndex(scrollProgress);
    const sceneProgress = getSceneTransitionProgress(scrollProgress);

    setState({
      scrollProgress,
      scrollY,
      sceneIndex,
      sceneProgress,
      isScrolling: isScrollingRef.current,
    });
  }, []);

  useEffect(() => {
    const handleScroll = (): void => {
      isScrollingRef.current = true;

      if (scrollTimeoutRef.current !== null) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
        // Trigger one final update to set isScrolling to false
        calculateProgress();
      }, SCROLL_IDLE_TIMEOUT);

      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }

      rafIdRef.current = requestAnimationFrame(calculateProgress);
    };

    // Calculate initial state
    calculateProgress();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);

      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }

      if (scrollTimeoutRef.current !== null) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [calculateProgress]);

  return state;
}
