import { Suspense, lazy } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { VoyagerBackgroundAdvanced } from '@/components/VoyagerBackgroundAdvanced';
import { Hero } from '@/components/sections/Hero';
import { Navbar } from '@/components/Navbar';

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



/* ===== Navigation Dots ===== */
const sections = ['hero', 'origin', 'craft', 'work', 'vision', 'contact'] as const;
const sectionLabels = ['Home', 'Origin', 'Craft', 'Work', 'Certifications', 'Contact'] as const;

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
      <Navbar />
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
