import React from 'react';
import { SunLogo } from './SunLogo';
import { CONFIG } from '../config';
import { CONTENT, Language } from '../content';
import { Lock } from 'lucide-react';

interface FooterProps {
  currentLang: Language;
  onOpenAdmin: () => void;
  onBookClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onOpenAdmin,
  onBookClick,
}) => {
  const t = CONTENT[currentLang];
  const isRtl = currentLang === 'fa';

  const quickLinks = [
    { href: '#why', label: t.nav.why },
    { href: '#team', label: t.nav.team },
    { href: '#programs', label: t.nav.programs },
    { href: '#faq', label: t.nav.faq },
  ];

  return (
    <footer className="bg-[#060B14] border-t border-[#162944] text-white pt-14 pb-24 md:pb-14 text-start relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-10 border-b border-white/10">
          {/* Brand & Mission */}
          <div className="lg:col-span-5 space-y-4">
            <SunLogo size={38} dark currentLang={currentLang} />
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm">
              {t.footer.about}
            </p>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              {t.footer.compliance}
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-sm text-white">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-amber-400 transition-colors inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={onBookClick}
                  type="button"
                  className="font-bold text-amber-400 hover:underline cursor-pointer"
                >
                  {t.nav.bookBtn}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-bold text-sm text-white">
              {t.footer.contactTitle}
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-gray-300">
              <div>
                <span className="text-gray-400">{isRtl ? 'تلفن مستقیم: ' : 'Phone: '}</span>
                <a href={`tel:${CONFIG.phone}`} className="font-mono font-bold text-white hover:text-amber-400">
                  {CONFIG.phone}
                </a>
              </div>
              <div>
                <span className="text-gray-400">{isRtl ? 'واتساپ پذیرش: ' : 'WhatsApp: '}</span>
                <a
                  href={`https://wa.me/${CONFIG.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono font-bold text-emerald-300 hover:underline"
                >
                  +{CONFIG.whatsapp}
                </a>
              </div>
              <div className="text-gray-300">
                {isRtl ? `مرکز فعالیت: ${CONFIG.address}` : `Headquarters: ${CONFIG.address}`}
              </div>
              <div className="text-gray-400 text-xs">
                {isRtl ? CONFIG.hours : 'Saturday to Thursday, 8:00 AM – 4:00 PM (Fridays closed)'}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>{t.footer.allRights}</p>

          <button
            onClick={onOpenAdmin}
            type="button"
            className="inline-flex items-center gap-1.5 text-gray-500 hover:text-amber-400 transition-colors cursor-pointer"
            title={isRtl ? 'ورود به پنل اداری جهت مشاهده درخواست‌های ثبت‌شده' : 'Access Admin Portal to view bookings'}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{t.footer.adminLink}</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
