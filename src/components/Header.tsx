import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = CONTENT[currentLang];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: '#why', label: t.nav.why },
    { href: '#team', label: t.nav.team },
    { href: '#programs', label: t.nav.programs },
    { href: '#booking', label: t.nav.bookBtn },
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
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-200 border-b ${
        mobileMenuOpen
          ? 'h-screen bg-[#FDFBF7] border-[#E8E2D4]'
          : scrolled
          ? 'bg-[#FDFBF7]/95 backdrop-blur-md border-[#E8E2D4] py-3'
          : 'bg-[#FDFBF7]/90 backdrop-blur-sm border-transparent py-3.5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          {/* Brand Wordmark */}
          <a
            href="#"
            className="flex items-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B45309] rounded-md"
            aria-label={t.brandName}
          >
            <SunLogo size={34} showSubtitle={false} currentLang={currentLang} />
          </a>

          {/* Clean Single-Line Nav Links */}
          <nav
            className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#2C3E55]"
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
                className="hover:text-[#B45309] transition-colors py-1 whitespace-nowrap shrink-0"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions: Language Toggle + Primary Booking Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onToggleLang}
              type="button"
              className="px-3 py-1.5 rounded-lg border border-[#D2C9B6] bg-white hover:border-[#B45309] text-xs font-bold text-[#0B1524] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              title={currentLang === 'fa' ? 'Switch to English' : 'تغییر به زبان دری'}
            >
              {currentLang === 'fa' ? 'EN' : 'دری'}
            </button>

            <button
              onClick={onBookClick}
              type="button"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg bg-[#0B1524] hover:bg-[#162944] text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {t.nav.bookBtn}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="lg:hidden p-2 rounded-lg border border-[#E8E2D4] bg-white text-[#0B1524] hover:bg-[#F6F3EB] cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-6 pt-4 border-t border-[#E8E2D4] space-y-4">
            <nav className="flex flex-col space-y-2">
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

            <div className="pt-4 border-t border-[#E8E2D4]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookClick();
                }}
                type="button"
                className="w-full py-3 rounded-lg bg-[#B45309] text-white text-center font-bold text-sm"
              >
                {t.nav.bookBtn}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
