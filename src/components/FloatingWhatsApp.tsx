import React, { useEffect, useState } from 'react';
import { MessageCircle, Calendar } from 'lucide-react';
import { CONFIG } from '../config';
import { CONTENT, Language } from '../content';

interface FloatingControlsProps {
  currentLang: Language;
  onBookClick: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingControlsProps> = ({
  currentLang,
  onBookClick,
}) => {
  const [bookingInView, setBookingInView] = useState(false);
  const t = CONTENT[currentLang];
  const isRtl = currentLang === 'fa';

  useEffect(() => {
    const bookingEl = document.getElementById('booking');
    if (!bookingEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setBookingInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(bookingEl);
    return () => observer.disconnect();
  }, []);

  const defaultWhatsappMessage = encodeURIComponent(
    isRtl
      ? 'سلام و احترام، از طریق وب‌سایت مرکز شمس پیام می‌دهم و علاقه‌مند به دریافت معلومات در مورد سمینارها و مشوره تعلیمی هستم.'
      : 'Hello, I am contacting you through the Shams Center website regarding teacher workshops and consultation.'
  );

  return (
    <>
      <aside
        className="hidden md:block fixed bottom-6 z-40 ltr:right-6 rtl:left-6"
        aria-label={isRtl ? 'پشتیبانی مستقیم در واتساپ' : 'Direct WhatsApp Support'}
      >
        <a
          href={`https://wa.me/${CONFIG.whatsapp}?text=${defaultWhatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-[#14532D] hover:bg-[#166534] text-white shadow-md transition-colors"
          title={isRtl ? 'گفتگوی مستقیم با دفتر مرکز شمس' : 'Direct chat with Shams Center'}
        >
          <MessageCircle className="w-5 h-5" />
        </a>
      </aside>

      {!bookingInView && (
        <aside
          className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0D1929] text-white border-t border-[#182C44] px-4 py-2.5 flex items-center justify-between gap-3"
          style={{ paddingBottom: 'max(10px, env(safe-area-inset-bottom))' }}
          aria-label={isRtl ? 'دکمه دسترسی سریع ثبت وقت' : 'Quick booking shortcut'}
        >
          <span className="text-xs font-bold text-white truncate">
            {t.mobileBar.ctaText}
          </span>

          <button
            onClick={onBookClick}
            type="button"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#B45309] text-white font-bold text-xs shrink-0 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{t.mobileBar.btn}</span>
          </button>
        </aside>
      )}
    </>
  );
};
