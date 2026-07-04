import { Suspense, lazy } from 'react';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { VoyagerBackgroundAdvanced } from '@/components/VoyagerBackgroundAdvanced';
import { Hero } from '@/components/sections/Hero';

// Lazy load non-critical sections for performance
const Origin = lazy(() =>
  import('@/components/sections/Origin').then((m) => ({ default: m.Origin }))
);
const Craft = lazy(() =>
  import('@/components/sections/Craft').then((m) => ({ default: m.Craft }))
);
const Work = lazy(() =>
  import('@/components/sections/Work').then((m) => ({ default: m.Work }))
);
const Vision = lazy(() =>
  import('@/components/sections/Vision').then((m) => ({ default: m.Vision }))
);
const Contact = lazy(() =>
  import('@/components/sections/Contact').then((m) => ({ default: m.Contact }))
);

/* ===== Section Loading Fallback ===== */
function SectionLoader() {
  return (
    <div
      style={{
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '40px',
          height: '40px',
          border: '3px solid var(--glass-border)',
          borderTopColor: 'var(--color-royal-purple)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

/* ===== Theme Toggle Button ===== */
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      style={{
        position: 'fixed',
        top: 'calc(16px + env(safe-area-inset-top, 0px))',
        right: 'calc(16px + env(safe-area-inset-right, 0px))',
        zIndex: 50,
        width: '44px',
        height: '44px',
        borderRadius: 'var(--radius-full)',
        border: '1px solid var(--glass-border)',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        color: 'var(--text-primary)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 200ms ease, box-shadow 200ms ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.boxShadow = 'var(--shadow-glow-purple)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {theme === 'dark' ? (
        // Sun icon
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        // Moon icon
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

/* ===== Navigation Dots ===== */
const sections = ['hero', 'origin', 'craft', 'work', 'vision', 'contact'] as const;
const sectionLabels = ['Home', 'Origin', 'Craft', 'Work', 'Vision', 'Contact'] as const;

function NavigationDots() {
  const handleClick = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      aria-label="Section navigation"
      style={{
        position: 'fixed',
        right: 'calc(16px + env(safe-area-inset-right, 0px))',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      {sections.map((section, index) => (
        <button
          key={section}
          onClick={() => handleClick(section)}
          aria-label={`Navigate to ${sectionLabels[index]}`}
          title={sectionLabels[index]}
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            border: '1px solid var(--text-muted)',
            background: 'transparent',
            cursor: 'pointer',
            padding: 0,
            transition: 'background 200ms ease, transform 200ms ease, border-color 200ms ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--color-royal-purple)';
            e.currentTarget.style.borderColor = 'var(--color-royal-purple)';
            e.currentTarget.style.transform = 'scale(1.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'var(--text-muted)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        />
      ))}
    </nav>
  );
}

/* ===== Main App ===== */
function AppContent() {
  return (
    <>
      <VoyagerBackgroundAdvanced />
      <ThemeToggle />
      <NavigationDots />
      <main>
        <Hero />
        <Suspense fallback={<SectionLoader />}>
          <Origin />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Craft />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Work />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Vision />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
