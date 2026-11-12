import React, { useEffect, useState } from 'react';
import { MessageCircle, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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
      {/* Floating WhatsApp Button with Motion Pulse */}
      <aside
        className="fixed bottom-20 md:bottom-6 z-40 ltr:right-6 rtl:left-6"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        aria-label={isRtl ? 'پشتیبانی مستقیم در واتساپ' : 'Direct WhatsApp Support'}
      >
        <motion.a
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          href={`https://wa.me/${CONFIG.whatsapp}?text=${defaultWhatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-13 h-13 rounded-full bg-[#14532D] hover:bg-[#166534] text-white shadow-lg hover:shadow-xl transition-all focus:outline-none"
          title={isRtl ? 'گفتگوی مستقیم با دفتر مرکز شمس' : 'Direct chat with Shams Center Admissions'}
        >
          <MessageCircle className="w-6 h-6" />

          {/* Tooltip on hover */}
          <span className="hidden sm:group-hover:block absolute top-1/2 -translate-y-1/2 ltr:right-full rtl:left-full mx-3 px-3 py-1.5 rounded-lg bg-[#0D1929] text-white text-xs font-semibold whitespace-nowrap shadow-md">
            {isRtl ? 'واتساپ مرکز شمس' : 'Shams Center WhatsApp'}
          </span>
        </motion.a>
      </aside>

      {/* Mobile Sticky Bottom Bar (Auto-hides when booking section is visible) */}
      <AnimatePresence>
        {!bookingInView && (
          <motion.aside
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0D1929] text-white border-t border-[#182C44] px-4 py-2.5 shadow-xl flex items-center justify-between gap-3"
            style={{ paddingBottom: 'max(10px, env(safe-area-inset-bottom))' }}
            aria-label={isRtl ? 'دکمه دسترسی سریع ثبت وقت' : 'Quick booking shortcut'}
          >
            <div className="text-start">
              <span className="text-xs font-bold text-white block">
                {t.mobileBar.ctaText}
              </span>
              <span className="text-[10px] text-gray-400">
                {isRtl ? 'مشوره و ارزیابی رایگان' : 'Free initial assessment'}
              </span>
            </div>

            <button
              onClick={onBookClick}
              type="button"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#B45309] text-white font-bold text-xs shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-300" />
              <span>{t.mobileBar.btn}</span>
            </button>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};
