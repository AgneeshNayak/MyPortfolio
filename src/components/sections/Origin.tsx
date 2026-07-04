import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { education, stats } from '@/lib/portfolio-data';
import { useCountUp } from '@/hooks/useCountUp';

function StatCounter({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { displayValue } = useCountUp({ end, suffix, triggerRef: ref, duration: 2000 });

  return (
    <div
      ref={ref}
      style={{
        textAlign: 'center',
        padding: 'var(--space-lg)',
      }}
    >
      <div
        className="gradient-text"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 800,
          lineHeight: 1,
        }}
      >
        {displayValue}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-caption)',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          color: 'var(--text-muted)',
          marginTop: 'var(--space-sm)',
        }}
      >
        {label}
      </div>
    </div>
  );
}

export function Origin() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      id="origin"
      className="section"
      aria-label="Origin — Education and Journey"
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
            Chapter 02
          </span>
          <h2 style={{ marginTop: 'var(--space-sm)' }}>
            <span className="gradient-text">Origin Story</span>
          </h2>
          <p style={{ marginTop: 'var(--space-md)', maxWidth: '42rem', margin: 'var(--space-md) auto 0', lineHeight: 1.6, fontSize: 'var(--text-body)' }}>
            I am a Computer Science Engineering student at Canara engineering college and aspiring Software Engineer with a passion for building scalable, user-focused web applications. Driven by curiosity and inspired by innovation, I enjoy creating solutions that combine creativity with purpose. Every challenge is an opportunity to learn, grow, and make a meaningful impact.
          </p>
        </motion.div>

        {/* Timeline */}
        <div
          style={{
            position: 'relative',
            maxWidth: '40rem',
            margin: '0 auto',
            paddingLeft: 'clamp(32px, 5vw, 48px)',
          }}
        >
          {/* Timeline line */}
          <div
            style={{
              position: 'absolute',
              left: '15px',
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'linear-gradient(180deg, var(--color-royal-purple), var(--color-gold), transparent)',
            }}
          />

          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
              style={{
                position: 'relative',
                marginBottom: 'var(--space-2xl)',
                paddingLeft: 'var(--space-lg)',
              }}
            >
              {/* Timeline dot */}
              <div
                style={{
                  position: 'absolute',
                  left: '-25px',
                  top: '6px',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: index === 0
                    ? 'linear-gradient(135deg, var(--color-royal-purple), var(--color-gold))'
                    : 'var(--color-deep-navy-light)',
                  border: '3px solid var(--bg-primary)',
                  boxShadow: index === 0
                    ? '0 0 12px rgba(124, 58, 237, 0.5)'
                    : 'none',
                  zIndex: 2,
                }}
              />

              {/* Period badge */}
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--color-gold)',
                  letterSpacing: '1px',
                  display: 'block',
                  marginBottom: 'var(--space-xs)',
                }}
              >
                {edu.period}
              </span>

              {/* Card */}
              <div
                className="glass"
                style={{
                  padding: 'var(--space-lg)',
                  transition: 'transform 300ms ease, box-shadow 300ms ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <h3 style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', marginBottom: 'var(--space-xs)' }}>
                  {edu.degree}
                </h3>
                <p style={{ fontSize: 'var(--text-small)', color: 'var(--text-secondary)', marginBottom: 'var(--space-xs)' }}>
                  {edu.institution}
                </p>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '12px',
                    color: 'var(--text-muted)',
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {edu.location}
                </span>
                {edu.endYear === null && (
                  <span
                    style={{
                      display: 'inline-block',
                      marginLeft: 'var(--space-sm)',
                      padding: '2px 8px',
                      fontSize: '10px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      color: 'var(--color-gold)',
                      border: '1px solid var(--color-gold)',
                      borderRadius: 'var(--radius-full)',
                    }}
                  >
                    Current
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats counters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="glass"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 'var(--space-md)',
            marginTop: 'var(--space-3xl)',
            padding: 'var(--space-lg)',
            maxWidth: '40rem',
            margin: 'var(--space-3xl) auto 0',
          }}
        >
          {stats.map((stat) => (
            <StatCounter
              key={stat.label}
              end={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
