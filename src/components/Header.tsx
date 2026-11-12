import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SunLogo } from './SunLogo';
import { CONTENT, Language } from '../content';

interface HeaderProps {
  currentLang: Language;
  onToggleLang: () => void;
  onBookClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onToggleLang,
  onBookClick,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = CONTENT[currentLang];
  const isRtl = currentLang === 'fa';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: '#why', label: t.nav.why },
    { href: '#model', label: t.nav.model },
    { href: '#audiences', label: t.nav.audiences },
    { href: '#programs', label: t.nav.programs },
    { href: '#quality', label: t.nav.quality },
    { href: '#team', label: t.nav.team },
    { href: '#faq', label: t.nav.faq },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
        mobileMenuOpen
          ? 'h-screen bg-[#FDFBF7] border-[#E8E2D4]'
          : scrolled
          ? 'bg-[#FDFBF7]/90 backdrop-blur-md border-[#E8E2D4] py-3 shadow-xs'
          : 'bg-[#FDFBF7]/75 backdrop-blur-sm border-transparent py-4'
      }`}
    >
      {/* Top Solar Scroll Progress Bar */}
      <div
        className="absolute bottom-0 inset-x-0 h-[2.5px] bg-transparent pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 md:gap-8">
          
          {/* Brand Wordmark & Seal */}
          <a
            href="#"
            className="flex items-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B45309] rounded-md group"
            aria-label={t.brandName}
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <SunLogo size={38} currentLang={currentLang} />
            </motion.div>
          </a>

          {/* Clean Typography Nav Links */}
          <nav
            className="hidden lg:flex items-center gap-7 text-[14px] font-medium text-[#2C3E55]"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="hover:text-[#B45309] transition-colors py-1 relative group whitespace-nowrap"
              >
                {link.label}
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-amber-600 to-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-200" />
              </a>
            ))}
          </nav>

          {/* Actions: Animated Language Switcher & Booking Button */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Animated Language Switcher Pill */}
            <button
              onClick={onToggleLang}
              type="button"
              className="relative flex items-center p-1 rounded-full border border-[#D2C9B6] bg-white/90 shadow-2xs hover:border-[#B45309] transition-colors cursor-pointer"
              title={currentLang === 'fa' ? 'Switch to English' : 'تغییر به زبان دری'}
            >
              <div className="flex items-center text-xs font-bold select-none relative z-10 px-1 gap-1">
                <span
                  className={`px-2.5 py-0.5 rounded-full transition-colors duration-200 ${
                    currentLang === 'fa' ? 'text-white' : 'text-[#5E7086]'
                  }`}
                >
                  دری
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full transition-colors duration-200 ${
                    currentLang === 'en' ? 'text-white' : 'text-[#5E7086]'
                  }`}
                >
                  EN
                </span>
              </div>
              {/* Motion background indicator for active language */}
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-[#0B1524] ${
                  currentLang === 'fa' ? (isRtl ? 'right-1' : 'left-1') : (isRtl ? 'left-1' : 'right-1')
                }`}
              />
            </button>

            {/* Dignified Institutional Booking Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBookClick}
              type="button"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B1524] hover:bg-[#162944] text-[#FFFBEB] font-semibold text-xs sm:text-sm border border-[#0B1524] shadow-xs hover:border-[#B45309] transition-all duration-200 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.nav.bookBtn}</span>
            </motion.button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="lg:hidden p-2 rounded-xl border border-[#E8E2D4] bg-white text-[#0B1524] hover:bg-[#F6F3EB] focus:outline-none cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden mt-6 pt-4 border-t border-[#E8E2D4] space-y-4"
            >
              <nav className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="px-3 py-2.5 rounded-lg hover:bg-[#F6F3EB] text-sm font-semibold text-[#0B1524] transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <div className="pt-4 border-t border-[#E8E2D4] flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onBookClick();
                  }}
                  type="button"
                  className="w-full py-3 rounded-xl bg-[#B45309] text-white text-center font-bold text-sm shadow-xs"
                >
                  {t.nav.bookBtn}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </header>
  );
};
