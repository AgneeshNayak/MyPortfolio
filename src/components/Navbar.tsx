import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const GithubIcon = ({ size = 16, className }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const navItems = [
  { label: 'About', href: '#origin' },
  { label: 'Skills', href: '#craft' },
  { label: 'Projects', href: '#work' },
  { label: 'Certifications', href: '#vision' },
  { label: 'GitHub', href: 'https://github.com/AgneeshNayak', external: true },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const { theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Handle scroll events for navbar shrinking and glass background strengthening
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Section tracker for active navigation highlights
      const scrollPosition = window.scrollY + 250;
      const sections = ['hero', 'origin', 'craft', 'work', 'vision', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isExternal?: boolean) => {
    if (isExternal) return;
    e.preventDefault();
    setMobileMenuOpen(false);
    const id = href.substring(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isDark = theme === 'dark';

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[1300px] flex items-center justify-between px-6 md:px-8 rounded-full border transition-all duration-300"
        style={{
          height: scrolled ? '64px' : '72px',
          background: isDark ? 'rgba(15, 23, 42, 0.65)' : 'rgba(255, 255, 255, 0.65)',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(30, 27, 75, 0.08)',
          boxShadow: scrolled 
            ? '0 20px 40px -15px rgba(0,0,0,0.3), 0 0 20px rgba(124, 58, 237, 0.1)' 
            : '0 10px 30px -15px rgba(0,0,0,0.1)',
          backdropFilter: scrolled ? 'blur(24px)' : 'blur(20px)',
          WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'blur(20px)',
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center gap-2 group select-none cursor-pointer ml-12 md:ml-24"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="font-sans font-extrabold tracking-tight text-white transition-all duration-300 text-lg md:text-xl"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.15))',
            }}
          >
            Agneesh A Nayak
          </motion.div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => {
            const isExternal = item.external;
            const isActive = !isExternal && (
              (item.href === '#origin' && activeSection === 'origin') ||
              (item.href === '#craft' && activeSection === 'craft') ||
              (item.href === '#work' && activeSection === 'work') ||
              (item.href === '#vision' && activeSection === 'vision') ||
              (item.href === '#contact' && activeSection === 'contact')
            );

            return (
              <a
                key={item.label}
                href={item.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                onClick={(e) => handleNavClick(e, item.href, isExternal)}
                className="relative text-sm font-semibold transition-colors duration-300 py-2 hover:text-[#06B6D4]"
                style={{
                  color: isActive 
                    ? (isDark ? '#F8FAFC' : '#1E1B4B') 
                    : (isDark ? '#CBD5E1' : '#475569'),
                }}
              >
                <motion.span
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-1"
                >
                  {item.label}
                  {isExternal && <GithubIcon size={12} className="opacity-60" />}
                </motion.span>

                {isActive && (
                  <motion.span
                    layoutId="navbar-active-underline"
                    className="absolute bottom-0 left-0 right-0 h-[4px] rounded-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

         {/* Actions Button Group */}
        <div className="flex items-center gap-3">
          {/* Resume Button */}
          <motion.a
            href="/resume.pdf"
            download="Agneesh_Nayak_Resume.pdf"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="hidden sm:flex items-center gap-3 px-8 py-3.5 rounded-full text-base font-bold group select-none transition-all duration-300"
            style={{
              color: '#1E1B4B',
              background: '#FFFFFF',
              boxShadow: '0 4px 15px rgba(255, 255, 255, 0.1)',
              marginRight: '48px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#1E1B4B';
              e.currentTarget.style.boxShadow = '0 0 25px rgba(255, 255, 255, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#1E1B4B';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 255, 255, 0.1)';
            }}
          >
            <Download size={15} className="group-hover:translate-y-[1px] transition-transform duration-300" />
            <span>Resume</span>
          </motion.a>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setMobileMenuOpen(true)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="flex md:hidden w-10 h-10 rounded-full border items-center justify-center transition-all duration-300 cursor-pointer"
            style={{
              background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(30, 27, 75, 0.08)',
              color: isDark ? '#FFFFFF' : '#1E1B4B',
            }}
            aria-label="Open navigation menu"
          >
            <Menu size={18} />
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Fullscreen Animated Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-100 flex justify-end md:hidden">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Menu Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative w-[280px] max-w-[85vw] h-full flex flex-col justify-between p-6 shadow-2xl border-l"
              style={{
                background: isDark ? '#050816' : '#FFFFFF',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(30, 27, 75, 0.08)',
              }}
            >
              {/* Top Drawer Controls */}
              <div className="flex items-center justify-between pb-6 border-b" style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(30, 27, 75, 0.08)' }}>
                <span className="font-sans font-extrabold tracking-tight text-lg bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">Menu</span>
                <motion.button
                  onClick={() => setMobileMenuOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-full flex items-center justify-center border"
                  style={{
                    background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(30, 27, 75, 0.08)',
                    color: isDark ? '#FFFFFF' : '#1E1B4B',
                  }}
                  aria-label="Close navigation menu"
                >
                  <X size={18} />
                </motion.button>
              </div>

              {/* Navigation Links (Staggered Animation) */}
              <nav className="flex flex-col gap-6 py-8 flex-1 justify-center">
                {navItems.map((item, idx) => {
                  const isExternal = item.external;
                  const isActive = !isExternal && (
                    (item.href === '#origin' && activeSection === 'origin') ||
                    (item.href === '#craft' && activeSection === 'craft') ||
                    (item.href === '#work' && activeSection === 'work') ||
                    (item.href === '#vision' && activeSection === 'vision') ||
                    (item.href === '#contact' && activeSection === 'contact')
                  );

                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 }}
                    >
                      <a
                        href={item.href}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        onClick={(e) => handleNavClick(e, item.href, isExternal)}
                        className="flex items-center gap-2 text-lg font-semibold py-1 transition-colors duration-300"
                        style={{
                          color: isActive 
                            ? '#06B6D4' 
                            : (isDark ? '#CBD5E1' : '#475569'),
                        }}
                      >
                        <span>{item.label}</span>
                        {isExternal && <GithubIcon size={16} className="opacity-60" />}
                      </a>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Bottom Resume Download Option */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-6 border-t flex flex-col gap-4"
                style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(30, 27, 75, 0.08)' }}
              >
                <motion.a
                  href="/resume.pdf"
                  download="Agneesh_Nayak_Resume.pdf"
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2.5 w-full py-4 rounded-full text-white text-base font-bold select-none shadow-lg transition-all duration-300"
                  style={{
                    color: '#1E1B4B',
                    background: '#FFFFFF',
                    boxShadow: '0 4px 15px rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <Download size={16} />
                  <span>Download Resume</span>
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
