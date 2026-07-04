import { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import type { ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const STORAGE_KEY = 'agneesh-portfolio-theme';
const DEFAULT_THEME: Theme = 'dark';
const TRANSITION_CLASS = 'theme-transitioning';
const TRANSITION_DURATION = 300;

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return DEFAULT_THEME;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') {
      return stored;
    }
  } catch {
    // localStorage may be unavailable (private browsing, storage quota, etc.)
  }

  return DEFAULT_THEME;
}

function applyThemeToDocument(theme: Theme): void {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', theme);
}

function persistTheme(theme: Theme): void {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Silently fail if localStorage is unavailable
  }
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(getStoredTheme);
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Apply theme on mount and whenever it changes
  useEffect(() => {
    applyThemeToDocument(theme);
    persistTheme(theme);
  }, [theme]);

  // Clean up transition timeout on unmount
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current !== null) {
        clearTimeout(transitionTimeoutRef.current);
        document.documentElement.classList.remove(TRANSITION_CLASS);
      }
    };
  }, []);

  const toggleTheme = useCallback((): void => {
    const root = document.documentElement;

    // Clear any existing transition timeout
    if (transitionTimeoutRef.current !== null) {
      clearTimeout(transitionTimeoutRef.current);
    }

    // Add transitioning class for smooth CSS transitions
    root.classList.add(TRANSITION_CLASS);

    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

    // Remove transitioning class after the transition completes
    transitionTimeoutRef.current = setTimeout(() => {
      root.classList.remove(TRANSITION_CLASS);
      transitionTimeoutRef.current = null;
    }, TRANSITION_DURATION);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme],
  );

  return <ThemeContext value={value}>{children}</ThemeContext>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
