import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo, socialLinks } from '@/lib/portfolio-data';
import { socialIcons } from '@/lib/socialIcons';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

function validateForm(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = 'Name is required';
  if (!form.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email';
  }
  if (!form.message.trim()) {
    errors.message = 'Message is required';
  } else if (form.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }
  return errors;
}

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (field: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const newErrors = validateForm({ ...formData, [field]: value });
      setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
    }
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validateForm(formData);
    setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    setTouched({ name: true, email: true, message: true });

    if (Object.keys(validationErrors).length === 0) {
      setSubmitStatus('submitting');
      try {
        const response = await fetch('https://formspree.io/f/xnjklkzv', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
          }),
        });

        if (response.ok) {
          setSubmitStatus('success');
          setFormData({ name: '', email: '', message: '' });
          setTouched({});
          setTimeout(() => setSubmitStatus('idle'), 5000);
        } else {
          setSubmitStatus('error');
        }
      } catch {
        setSubmitStatus('error');
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section"
      aria-label="Contact"
    >
      <div className="container-narrow" style={{ maxWidth: '56rem' }}>
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
            Chapter 06
          </span>
          <h2 style={{ marginTop: 'var(--space-sm)' }}>
            <span className="gradient-text">Let&apos;s Connect</span>
          </h2>
          <p style={{ marginTop: 'var(--space-md)', maxWidth: '30rem', margin: 'var(--space-md) auto 0' }}>
            Ready to collaborate, discuss opportunities, or just say hello?
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
            gap: 'var(--space-2xl)',
            alignItems: 'start',
          }}
        >
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass" style={{ padding: 'var(--space-xl)' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-h3)',
                  marginBottom: 'var(--space-lg)',
                  color: 'var(--text-primary)',
                }}
              >
                Get in Touch
              </h3>

              {/* Contact details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <a
                  href={`mailto:${personalInfo.email}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-md)',
                    color: 'var(--text-secondary)',
                    transition: 'color 200ms ease',
                    fontSize: 'var(--text-small)',
                    wordBreak: 'break-all',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-gold)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  {personalInfo.email}
                </a>

                <a
                  href={`tel:${personalInfo.phone}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-md)',
                    color: 'var(--text-secondary)',
                    transition: 'color 200ms ease',
                    fontSize: 'var(--text-small)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-gold)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  {personalInfo.phone}
                </a>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-md)',
                    color: 'var(--text-secondary)',
                    fontSize: 'var(--text-small)',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {personalInfo.location}
                </div>
              </div>

              {/* Social links */}
              <div
                style={{
                  display: 'flex',
                  gap: 'var(--space-md)',
                  marginTop: 'var(--space-xl)',
                  paddingTop: 'var(--space-lg)',
                  borderTop: '1px solid var(--glass-border)',
                  flexWrap: 'wrap',
                }}
              >
                {socialLinks
                  .filter((l) => !l.url.startsWith('mailto:') && !l.url.startsWith('tel:'))
                  .map((link) => {
                    const icon = socialIcons[link.icon];
                    if (!icon) return null;
                    return (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${link.platform}${link.isPlaceholder ? ' (link coming soon)' : ''}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--space-sm)',
                          padding: 'var(--space-sm) var(--space-md)',
                          borderRadius: 'var(--radius-full)',
                          border: '1px solid var(--glass-border)',
                          color: 'var(--text-secondary)',
                          fontSize: '13px',
                          transition: 'all 200ms ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = icon.color;
                          e.currentTarget.style.borderColor = icon.color;
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'var(--text-secondary)';
                          e.currentTarget.style.borderColor = 'var(--glass-border)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <svg width="16" height="16" viewBox={icon.viewBox} fill="currentColor">
                          <path d={icon.path} />
                        </svg>
                        {link.platform}
                      </a>
                    );
                  })}
              </div>

              {/* Resume download */}
              <a
                href="/resume.pdf"
                download
                className="btn-secondary"
                style={{
                  marginTop: 'var(--space-lg)',
                  width: '100%',
                  justifyContent: 'center',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
                Download Resume
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="glass"
              style={{
                padding: 'var(--space-xl)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-lg)',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-h3)',
                  color: 'var(--text-primary)',
                }}
              >
                Send a Message
              </h3>

              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    color: 'var(--text-muted)',
                    marginBottom: 'var(--space-xs)',
                  }}
                >
                  Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  placeholder="Your name"
                  style={{
                    width: '100%',
                    padding: 'var(--space-sm) var(--space-md)',
                    background: 'rgba(255,255,255,0.05)',
                    border: `1px solid ${errors.name && touched.name ? '#ef4444' : 'var(--glass-border)'}`,
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-small)',
                    outline: 'none',
                    transition: 'border-color 200ms ease',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-royal-purple)'; }}
                />
                {errors.name && touched.name && (
                  <p id="name-error" role="alert" style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    color: 'var(--text-muted)',
                    marginBottom: 'var(--space-xs)',
                  }}
                >
                  Email *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  placeholder="your@email.com"
                  style={{
                    width: '100%',
                    padding: 'var(--space-sm) var(--space-md)',
                    background: 'rgba(255,255,255,0.05)',
                    border: `1px solid ${errors.email && touched.email ? '#ef4444' : 'var(--glass-border)'}`,
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-small)',
                    outline: 'none',
                    transition: 'border-color 200ms ease',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-royal-purple)'; }}
                />
                {errors.email && touched.email && (
                  <p id="email-error" role="alert" style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    color: 'var(--text-muted)',
                    marginBottom: 'var(--space-xs)',
                  }}
                >
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  onBlur={() => handleBlur('message')}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  placeholder="Tell me about your project or opportunity..."
                  rows={5}
                  style={{
                    width: '100%',
                    padding: 'var(--space-sm) var(--space-md)',
                    background: 'rgba(255,255,255,0.05)',
                    border: `1px solid ${errors.message && touched.message ? '#ef4444' : 'var(--glass-border)'}`,
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-small)',
                    outline: 'none',
                    resize: 'vertical',
                    minHeight: '100px',
                    transition: 'border-color 200ms ease',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-royal-purple)'; }}
                />
                {errors.message && touched.message && (
                  <p id="message-error" role="alert" style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitStatus === 'submitting'}
                className="btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: 'var(--space-md)',
                  opacity: submitStatus === 'submitting' ? 0.7 : 1,
                  cursor: submitStatus === 'submitting' ? 'not-allowed' : 'pointer',
                }}
              >
                {submitStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" x2="11" y1="2" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>

              {/* Status messages */}
              {submitStatus === 'success' && (
                <div
                  role="status"
                  style={{
                    padding: 'var(--space-md)',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(34, 197, 94, 0.1)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    color: '#22c55e',
                    fontSize: 'var(--text-small)',
                    textAlign: 'center',
                  }}
                >
                  ✓ Message sent successfully! I&apos;ll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div
                  role="alert"
                  style={{
                    padding: 'var(--space-md)',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#ef4444',
                    fontSize: 'var(--text-small)',
                    textAlign: 'center',
                  }}
                >
                  ✗ Something went wrong. Please try again or email directly.
                </div>
              )}
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            textAlign: 'center',
            marginTop: 'var(--space-3xl)',
            paddingTop: 'var(--space-xl)',
            borderTop: '1px solid var(--glass-border)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--text-muted)',
              letterSpacing: '1px',
            }}
          >
            © {new Date().getFullYear()} {personalInfo.name}. Built with ♥ from {personalInfo.location}.
          </p>
        </motion.footer>
      </div>
    </section>
  );
}
