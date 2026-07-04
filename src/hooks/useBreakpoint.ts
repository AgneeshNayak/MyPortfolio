import { useState, useEffect, useRef, useCallback } from 'react';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface BreakpointState {
  breakpoint: Breakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

interface BreakpointEntry {
  name: Breakpoint;
  query: string;
}

const BREAKPOINT_ENTRIES: BreakpointEntry[] = [
  { name: '2xl', query: '(min-width: 1440px)' },
  { name: 'xl', query: '(min-width: 1280px) and (max-width: 1439px)' },
  { name: 'lg', query: '(min-width: 1024px) and (max-width: 1279px)' },
  { name: 'md', query: '(min-width: 768px) and (max-width: 1023px)' },
  { name: 'sm', query: '(min-width: 640px) and (max-width: 767px)' },
  { name: 'xs', query: '(max-width: 639px)' },
];

const DEBOUNCE_MS = 100;

function resolveBreakpoint(): Breakpoint {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return 'lg'; // Sensible SSR default
  }

  for (const entry of BREAKPOINT_ENTRIES) {
    if (window.matchMedia(entry.query).matches) {
      return entry.name;
    }
  }

  return 'xs';
}

function deriveState(breakpoint: Breakpoint): BreakpointState {
  return {
    breakpoint,
    isMobile: breakpoint === 'xs' || breakpoint === 'sm',
    isTablet: breakpoint === 'md',
    isDesktop: breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === '2xl',
  };
}

export function useBreakpoint(): BreakpointState {
  const [state, setState] = useState<BreakpointState>(() => deriveState(resolveBreakpoint()));
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const update = useCallback((): void => {
    if (debounceTimerRef.current !== null) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      const bp = resolveBreakpoint();
      setState(deriveState(bp));
    }, DEBOUNCE_MS);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    const mediaQueryLists: MediaQueryList[] = BREAKPOINT_ENTRIES.map((entry) =>
      window.matchMedia(entry.query),
    );

    const handleChange = (): void => {
      update();
    };

    for (const mql of mediaQueryLists) {
      mql.addEventListener('change', handleChange);
    }

    // Sync initial state after mount
    update();

    return () => {
      for (const mql of mediaQueryLists) {
        mql.removeEventListener('change', handleChange);
      }

      if (debounceTimerRef.current !== null) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [update]);

  return state;
}
