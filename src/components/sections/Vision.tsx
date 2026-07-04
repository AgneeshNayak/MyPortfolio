import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { achievements } from '@/lib/portfolio-data';

/* Achievement badge icons (inline SVGs for each type) */
function AchievementIcon({ index }: { index: number }) {
  const icons = [
    // Trophy (hackathon)
    <svg key="trophy" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>,
    // Code brackets (hackathon)
    <svg key="code" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m18 16 4-4-4-4" />
      <path d="m6 8-4 4 4 4" />
      <path d="m14.5 4-5 16" />
    </svg>,
    // Lightbulb (innovation)
    <svg key="lightbulb" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>,
  ];
  return <>{icons[index % icons.length]}</>;
}

export function Vision() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      id="vision"
      className="section"
      aria-label="Achievements and Hackathons"
    >
      <div className="container-narrow">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}
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
            Chapter 05
          </span>
          <h2 style={{ marginTop: 'var(--space-sm)' }}>
            <span className="gradient-text">The Vision</span>
          </h2>
          <p style={{ marginTop: 'var(--space-md)', maxWidth: '36rem', margin: 'var(--space-md) auto 0' }}>
            Competing, collaborating, and pushing boundaries beyond the classroom.
          </p>
        </motion.div>

        {/* Achievement Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
            gap: 'var(--space-xl)',
            maxWidth: '64rem',
            margin: '0 auto',
          }}
        >
          {achievements.map((achievement, index) => (
            <motion.article
              key={achievement.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              className="glass-strong"
              style={{
                padding: 'var(--space-xl)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-md)',
                cursor: 'default',
                transition: 'transform 300ms ease, box-shadow 300ms ease',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(252, 211, 77, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              // Touch: toggle lift
              onTouchStart={(e) => {
                const el = e.currentTarget;
                if (el.style.transform === 'translateY(-8px)') {
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = 'none';
                } else {
                  el.style.transform = 'translateY(-8px)';
                  el.style.boxShadow = '0 20px 40px rgba(252, 211, 77, 0.15)';
                }
              }}
            >
              {/* Decorative gradient corner */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '100px',
                  height: '100px',
                  background: `radial-gradient(circle at top right, rgba(124, 58, 237, 0.15), transparent 70%)`,
                  pointerEvents: 'none',
                }}
              />

              {/* Header: Icon + Year */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: 'var(--radius-lg)',
                    background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(252, 211, 77, 0.2))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-gold)',
                  }}
                >
                  <AchievementIcon index={index} />
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: 'var(--color-gold)',
                    letterSpacing: '1px',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid rgba(252, 211, 77, 0.3)',
                  }}
                >
                  {achievement.year}
                </span>
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  lineHeight: 1.3,
                }}
              >
                {achievement.title}
              </h3>

              {/* Organizer */}
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--color-royal-purple-light)',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                }}
              >
                {achievement.organizer}
              </p>

              {/* Description */}
              <p
                style={{
                  fontSize: 'var(--text-small)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  flex: 1,
                }}
              >
                {achievement.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
