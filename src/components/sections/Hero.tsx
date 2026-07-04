import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { personalInfo, socialLinks } from '@/lib/portfolio-data';
import { socialIcons } from '@/lib/socialIcons';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Trigger any initial animations
    const el = sectionRef.current;
    if (el) {
      el.classList.add('hero-visible');
    }
  }, []);

  const handleCtaClick = () => {
    const originSection = document.getElementById('origin');
    if (originSection) {
      originSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        paddingTop: 'calc(var(--space-3xl) + env(safe-area-inset-top, 0px))',
      }}
      aria-label="Hero section"
    >
      <div className="container-narrow" style={{ maxWidth: '56rem' }}>
        {/* Profile Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            marginBottom: 'var(--space-lg)',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '250px',
              height: '250px',
              borderRadius: '50%',
              padding: '4px',
              background: 'linear-gradient(135deg, var(--color-royal-purple), var(--color-gold))',
              boxShadow: 'var(--shadow-glow-purple)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 300ms ease, box-shadow 300ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 0 25px rgba(124, 58, 237, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'var(--shadow-glow-purple)';
            }}
          >
            <img
              src="/images/profile.jpg"
              alt={personalInfo.name}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--bg-primary)',
              }}
            />
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            marginTop: 'var(--space-lg)',
            marginBottom: 'var(--space-md)',
            fontWeight: 800,
            lineHeight: 1.1,
          }}
        >
          <span className="gradient-text">{personalInfo.name}</span>
        </motion.h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)',
            color: 'var(--color-royal-purple-light)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: 'var(--space-lg)',
          }}
        >
          {personalInfo.title}
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
            color: 'var(--text-secondary)',
            maxWidth: '40rem',
            margin: '0 auto var(--space-2xl)',
            lineHeight: 1.7,
          }}
        >
          &ldquo;{personalInfo.tagline}&rdquo;
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <button
            onClick={handleCtaClick}
            className="btn-primary"
            style={{
              padding: 'var(--space-md) var(--space-xl)',
              fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
            }}
            aria-label="Scroll to explore the story"
          >
            Enter the story
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </button>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          style={{
            marginTop: 'var(--space-2xl)',
            display: 'flex',
            justifyContent: 'center',
            gap: 'var(--space-lg)',
            flexWrap: 'wrap',
          }}
        >
          {socialLinks.map((link) => {
            const icon = socialIcons[link.icon];
            if (!icon) return null;
            return (
              <a
                key={link.id}
                href={link.url}
                target={link.url.startsWith('mailto:') || link.url.startsWith('tel:') ? undefined : '_blank'}
                rel={link.url.startsWith('http') || link.url === '#' ? 'noopener noreferrer' : undefined}
                aria-label={`${link.platform}${link.isPlaceholder ? ' (link coming soon)' : ''}`}
                title={link.platform}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--glass-border)',
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  color: 'var(--text-secondary)',
                  transition: 'transform 200ms ease, color 200ms ease, box-shadow 200ms ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.2)';
                  e.currentTarget.style.color = icon.color;
                  e.currentTarget.style.boxShadow = `0 0 15px ${icon.color}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox={icon.viewBox}
                  fill="currentColor"
                >
                  <path d={icon.path} />
                </svg>
              </a>
            );
          })}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        style={{
          position: 'absolute',
          bottom: 'calc(32px + env(safe-area-inset-bottom, 0px))',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <div
          style={{
            width: '24px',
            height: '40px',
            borderRadius: '12px',
            border: '2px solid var(--text-muted)',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '8px',
          }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '4px',
              height: '8px',
              borderRadius: '2px',
              backgroundColor: 'var(--color-gold)',
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
