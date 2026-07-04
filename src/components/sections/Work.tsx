import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { projects } from '@/lib/portfolio-data';
import { useBreakpoint } from '@/hooks/useBreakpoint';

export function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const { isDesktop } = useBreakpoint();
  const [activeCard, setActiveCard] = useState<number | null>(null);

  // Horizontal scroll with mouse wheel on desktop
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !isDesktop) return;

    const handleWheel = (e: WheelEvent) => {
      // Only capture if container has horizontal scroll room
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (maxScroll <= 0) return;

      const atStart = container.scrollLeft <= 0;
      const atEnd = container.scrollLeft >= maxScroll - 1;

      // Let natural scroll through if at boundaries
      if ((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd)) return;

      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [isDesktop]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="section"
      aria-label="Featured Projects"
      style={{ overflow: 'hidden' }}
    >
      <div className="container-narrow">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-caption)',
              textTransform: 'uppercase',
              letterSpacing: '4px',
              color: 'var(--color-gold)',
            }}
          >
            Chapter 04
          </span>
          <h2 style={{ marginTop: 'var(--space-sm)' }}>
            <span className="gradient-text">The Work</span>
          </h2>
          <p style={{ marginTop: 'var(--space-md)', maxWidth: '36rem', margin: 'var(--space-md) auto 0' }}>
            Real projects built from the ground up — no templates, no shortcuts.
          </p>
        </motion.div>
      </div>

      {/* Projects container */}
      <div
        ref={scrollContainerRef}
        style={{
          display: 'flex',
          flexDirection: isDesktop ? 'row' : 'column',
          gap: 'var(--space-xl)',
          padding: isDesktop
            ? 'var(--space-lg) var(--space-2xl)'
            : 'var(--space-lg) var(--space-md)',
          overflowX: isDesktop ? 'auto' : 'visible',
          overflowY: 'visible',
          scrollSnapType: isDesktop ? 'x mandatory' : 'none',
          scrollBehavior: 'smooth',
          maxWidth: '100vw',
          ...(isDesktop && {
            scrollbarWidth: 'none' as const,
            msOverflowStyle: 'none' as const,
          }),
        }}
      >
        {projects.map((project, index) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
            className="glass-strong"
            onClick={() => setActiveCard(activeCard === index ? null : index)}
            style={{
              flex: isDesktop ? '0 0 min(400px, 80vw)' : '1',
              scrollSnapAlign: isDesktop ? 'start' : undefined,
              padding: 'var(--space-xl)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-md)',
              cursor: 'pointer',
              transition: 'transform 300ms ease, box-shadow 300ms ease',
              transform: activeCard === index ? 'translateY(-8px)' : 'none',
              boxShadow: activeCard === index ? 'var(--shadow-xl)' : 'none',
            }}
            onMouseEnter={(e) => {
              if (isDesktop) {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(124, 58, 237, 0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (isDesktop) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            {/* Year badge */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--color-gold)',
                  letterSpacing: '1px',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--color-gold)',
                  opacity: 0.8,
                }}
              >
                {project.year}
              </span>
              <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                {/* TODO: Replace with real GitHub URL when available */}
                <a
                  href={project.githubUrl ?? '#'}
                  data-repo={project.id}
                  onClick={(e) => {
                    if (!project.githubUrl) e.preventDefault();
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} source code${!project.githubUrl ? ' (coming soon)' : ''}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--glass-border)',
                    color: project.githubUrl ? 'var(--text-secondary)' : 'var(--text-muted)',
                    transition: 'color 200ms ease, border-color 200ms ease',
                    opacity: project.githubUrl ? 1 : 0.5,
                    cursor: project.githubUrl ? 'pointer' : 'not-allowed',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Project title */}
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
                fontWeight: 700,
                color: 'var(--text-primary)',
                lineHeight: 1.3,
              }}
            >
              {project.title}
            </h3>

            {/* Tech stack line */}
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--color-royal-purple-light)',
                letterSpacing: '0.5px',
              }}
            >
              {project.techStack}
            </p>

            {/* Description bullets */}
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-sm)',
                flex: 1,
              }}
            >
              {project.description.map((desc, dIdx) => (
                <li
                  key={dIdx}
                  style={{
                    fontSize: 'var(--text-small)',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    paddingLeft: 'var(--space-md)',
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '8px',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--color-royal-purple-light)',
                    }}
                  />
                  {desc}
                </li>
              ))}
            </ul>

            {/* Tech tags */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-xs)',
                marginTop: 'auto',
                paddingTop: 'var(--space-md)',
                borderTop: '1px solid var(--glass-border)',
              }}
            >
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(124, 58, 237, 0.15)',
                    color: 'var(--color-royal-purple-light)',
                    letterSpacing: '0.3px',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>

      {/* Scroll hint for desktop */}
      {isDesktop && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          style={{
            textAlign: 'center',
            marginTop: 'var(--space-lg)',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--text-muted)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-sm)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          Scroll to explore
        </motion.div>
      )}
    </section>
  );
}
