import React, { useState } from 'react';
import { Booking, formatBookingCode } from '../../lib/booking';
import { jalali, toPersianDigits } from '../../lib/date';
import { downloadICS, whatsappLink } from '../../lib/send';
import { CONTENT, Language } from '../../content';
import { Check, Calendar, MessageCircle, RefreshCw, Copy, CheckCheck } from 'lucide-react';

interface SuccessProps {
  booking: Booking;
  onReset: () => void;
  currentLang: Language;
}

export const Success: React.FC<SuccessProps> = ({
  booking,
  onReset,
  currentLang,
}) => {
  const [copied, setCopied] = useState(false);
  const t = CONTENT[currentLang];

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(booking.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const formattedCode = formatBookingCode(booking.code);

  return (
    <div className="text-center py-6 sm:py-8 space-y-6">
      
      {/* Formal Confirmation Seal */}
      <div className="w-16 h-16 rounded-full bg-[#0D1929] border-2 border-[#B45309] text-[#F59E0B] mx-auto flex items-center justify-center shadow-xs">
        <Check className="w-8 h-8 stroke-[2.5]" />
      </div>

      <div className="space-y-1.5">
        <h3 className="font-display font-black text-2xl sm:text-3xl text-[#0D1929]">
          {t.booking.success.title}
        </h3>
        <p className="text-xs sm:text-sm text-[#596B82] max-w-lg mx-auto leading-relaxed">
          {t.booking.success.notice}
        </p>
      </div>

      {/* Booking Code Banner */}
      <div className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-[#F5F3EC] border border-[#D5CEBE]">
        <span className="text-xs text-[#596B82] font-medium">
          {t.booking.success.codeLabel}
        </span>
        <span className="font-mono text-xl sm:text-2xl font-black text-[#B45309] tracking-wider">
          {formattedCode}
        </span>
        <button
          onClick={handleCopyCode}
          type="button"
          className="p-1 rounded hover:bg-white text-[#596B82] hover:text-[#0D1929] transition-colors"
          title="کپی کردن کد پیگیری"
        >
          {copied ? <CheckCheck className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Recap Receipt */}
      <div className="max-w-md mx-auto bg-[#FDFCF7] rounded-xl p-5 border border-[#E6E2D6] text-right space-y-2 text-xs sm:text-sm">
        <div className="flex justify-between py-1 border-b border-[#E6E2D6]">
          <span className="text-[#7E8E9E]">خدمت درخواستی:</span>
          <span className="font-bold text-[#0D1929]">{booking.service}</span>
        </div>
        <div className="flex justify-between py-1 border-b border-[#E6E2D6]">
          <span className="text-[#7E8E9E]">مکتب و ولایت:</span>
          <span className="font-bold text-[#0D1929]">{booking.school} ({booking.city})</span>
        </div>
        <div className="flex justify-between py-1 border-b border-[#E6E2D6]">
          <span className="text-[#7E8E9E]">تاریخ و ساعت:</span>
          <span className="font-bold text-[#B45309]">
            {jalali(booking.dateISO, currentLang)} · ساعت {toPersianDigits(booking.time)}
          </span>
        </div>
        <div className="flex justify-between py-1 border-b border-[#E6E2D6]">
          <span className="text-[#7E8E9E]">شخص رابط:</span>
          <span className="font-bold text-[#0D1929]">{booking.name}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-[#7E8E9E]">شماره تماس:</span>
          <span className="font-mono font-bold text-[#0D1929] dir-ltr text-left">
            {booking.phone}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <a
          href={whatsappLink(booking)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#14532D] hover:bg-[#166534] text-white font-bold text-xs sm:text-sm shadow-xs transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{t.booking.success.openWhatsapp}</span>
        </a>

        <button
          onClick={() => downloadICS(booking)}
          type="button"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white hover:bg-[#F5F3EC] text-[#0D1929] border border-[#D5CEBE] font-bold text-xs sm:text-sm transition-colors cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-[#B45309]" />
          <span>{t.booking.success.downloadCalendar}</span>
        </button>

        <button
          onClick={onReset}
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-transparent hover:bg-[#F5F3EC] text-[#596B82] hover:text-[#0D1929] text-xs transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{t.booking.success.newBooking}</span>
        </button>
      </div>

    </div>
  );
};
