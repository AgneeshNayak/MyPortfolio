import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skillCategories } from '@/lib/portfolio-data';
import { techLogos } from '@/lib/techLogos';

const brandColors: Record<string, string> = {
  java: '#F89820',
  javascript: '#F7DF1E',
  c: '#00599C',
  cpp: '#00599C',
  sql: '#00758F',
  mongodb: '#47A248',
  nodejs: '#339933',
  expressjs: '#FFFFFF',
  reactjs: '#61DAFB',
  html5: '#E34F26',
  css3: '#1572B6',
  vscode: '#007ACC',
  github: '#FFFFFF',
  'frontend-dev': '#61DAFB',
  'fullstack-dev': '#7C3AED',
};

export function Craft() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      id="craft"
      className="section"
      aria-label="Skills and Technologies"
    >
      {/* Inject custom CSS styles for premium feel */}
      <style>{`
        .craft-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
          gap: var(--space-md);
          margin-top: var(--space-md);
        }

        .skill-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: var(--space-md);
          padding: var(--space-xl) var(--space-md);
          background: rgba(30, 27, 75, 0.5);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 251, 235, 0.08);
          border-radius: 20px;
          cursor: pointer;
          position: relative;
          transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1), 
                      box-shadow 400ms cubic-bezier(0.16, 1, 0.3, 1), 
                      border-color 400ms cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform, box-shadow, border-color;
          outline: none;
        }

        .skill-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05), transparent 70%);
          opacity: 0;
          transition: opacity 400ms ease;
          pointer-events: none;
        }

        .skill-card:hover::before {
          opacity: 1;
        }

        .skill-card .skill-icon-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
        }

        .skill-card .skill-icon {
          width: 52px;
          height: 52px;
          transition: transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .skill-card:hover .skill-icon {
          transform: scale(1.12) translateY(-4px) rotate(var(--hover-rotation, 8deg));
        }

        .skill-card .skill-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
          text-align: center;
          transition: color 300ms ease;
          line-height: 1.3;
          letter-spacing: 0.5px;
        }

        .skill-card:hover .skill-label {
          color: #FFFFFF;
        }

        .skill-card:hover {
          transform: scale(1.05) translateY(-10px) rotate(var(--hover-rotation, 1.5deg));
          border-color: var(--brand-color);
          box-shadow: 0 12px 30px var(--brand-glow), 0 0 15px rgba(255, 255, 255, 0.02);
        }

        .skill-card:focus-visible {
          border-color: var(--brand-color);
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.5);
        }
      `}</style>

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
            Chapter 03
          </span>
          <h2 style={{ marginTop: 'var(--space-sm)', letterSpacing: '4px' }}>
            <span className="gradient-text">The Craft</span>
          </h2>
          <p style={{ marginTop: 'var(--space-md)', maxWidth: '36rem', margin: 'var(--space-md) auto 0' }}>
            Technologies and tools I use to bring ideas to life.
          </p>
        </motion.div>

        {/* Skill Categories */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xl)' }}>
          {/* SVG Gradients Definition for Custom Area of Interest Icons */}
          <svg style={{ width: 0, height: 0, position: 'absolute' }} aria-hidden="true">
            <defs>
              <linearGradient id="gradient-frontend-dev" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00599C" />
                <stop offset="100%" stopColor="#61DAFB" />
              </linearGradient>
              <linearGradient id="gradient-fullstack-dev" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#00599C" />
              </linearGradient>
            </defs>
          </svg>

          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + catIdx * 0.1, ease: 'easeOut' }}
            >
              {/* Category label */}
              <h3
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-body)',
                  fontWeight: 600,
                  color: 'var(--color-royal-purple-light)',
                  textTransform: 'uppercase',
                  letterSpacing: '3px',
                  marginBottom: 'var(--space-lg)',
                  paddingBottom: 'var(--space-xs)',
                  borderBottom: '1px solid rgba(255, 251, 235, 0.1)',
                }}
              >
                {category.name}
              </h3>

              {/* Skills grid */}
              <div className="craft-grid">
                {category.skills.map((skill, skillIdx) => {
                  const logo = techLogos[skill.icon];
                  const brandColor = brandColors[skill.icon] || '#FFFFFF';
                  const hoverRotation = skillIdx % 2 === 0 ? '1.5deg' : '-1.5deg';
                  
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 25, scale: 0.95 }}
                      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.15 + catIdx * 0.08 + skillIdx * 0.04,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      className="skill-card"
                      role="img"
                      aria-label={skill.name}
                      style={{
                        '--brand-color': brandColor,
                        '--brand-glow': `${brandColor}35`,
                        '--hover-rotation': hoverRotation,
                      } as React.CSSProperties}
                    >
                      {/* Icon */}
                      <div className="skill-icon-container">
                        {logo ? (
                          <svg
                            className="skill-icon"
                            viewBox={logo.viewBox}
                            style={{
                              color: brandColor,
                            }}
                          >
                            <path 
                              d={logo.paths} 
                              fill={
                                skill.icon === 'frontend-dev' 
                                  ? 'url(#gradient-frontend-dev)' 
                                  : skill.icon === 'fullstack-dev' 
                                    ? 'url(#gradient-fullstack-dev)' 
                                    : 'currentColor'
                              } 
                            />
                          </svg>
                        ) : (
                          <div
                            style={{
                              width: '52px',
                              height: '52px',
                              borderRadius: 'var(--radius-md)',
                              background: 'var(--glass-bg)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '22px',
                              fontWeight: 700,
                              color: brandColor,
                            }}
                          >
                            {skill.name.charAt(0)}
                          </div>
                        )}
                      </div>

                      {/* Label */}
                      <span className="skill-label">
                        {skill.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

