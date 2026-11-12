import React, { useState } from 'react';
import { Calendar, Building, Users, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { jalali, toPersianDigits } from '../../lib/date';
import { CONTENT, Language } from '../../content';

export interface BookingFormData {
  service: string;
  audience: string;
  school: string;
  city: string;
  participants: number;
  mode: 'online' | 'inperson';
  dateISO: string;
  time: string;
  name: string;
  phone: string;
  hasWhatsapp: boolean;
  note: string;
  consent: boolean;
}

interface SummaryProps {
  formData: BookingFormData;
  currentLang: Language;
}

export const Summary: React.FC<SummaryProps> = ({ formData, currentLang }) => {
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const t = CONTENT[currentLang];
  const isRtl = currentLang === 'fa';

  const dateLabel = formData.dateISO ? jalali(formData.dateISO, currentLang) : null;

  return (
    <aside className="bg-[#F5F3EC]/80 rounded-2xl p-6 border border-[#D5CEBE] text-start shadow-2xs">
      {/* Mobile Toggle */}
      <div className="lg:hidden flex items-center justify-between">
        <span className="font-bold text-sm text-[#0D1929]">
          {t.booking.summary.title}
        </span>
        <button
          onClick={() => setMobileExpanded(!mobileExpanded)}
          type="button"
          className="text-xs text-[#B45309] font-semibold flex items-center gap-1 cursor-pointer"
        >
          <span>{mobileExpanded ? t.booking.closeSummary : t.booking.viewSummary}</span>
          {mobileExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:flex items-center justify-between pb-3 mb-4 border-b border-[#E6E2D6]">
        <h4 className="font-bold text-sm text-[#0D1929]">
          {t.booking.summary.title}
        </h4>
        <span className="text-[10px] font-mono text-[#B45309] bg-amber-100/60 px-2 py-0.5 rounded">
          {t.booking.draftTitle}
        </span>
      </div>

      {/* Content */}
      <div className={`space-y-3.5 pt-2 lg:pt-0 ${mobileExpanded ? 'block' : 'hidden lg:block'}`}>
        
        {/* Service */}
        <div className="text-xs">
          <span className="text-[11px] text-[#7E8E9E] block mb-0.5">
            {t.booking.summary.service}
          </span>
          <span className="font-bold text-[#0D1929]">
            {formData.service || t.booking.unspecified}
          </span>
        </div>

        {/* School & Audience */}
        <div className="text-xs pt-2 border-t border-[#E6E2D6]">
          <span className="text-[11px] text-[#7E8E9E] block mb-0.5">
            {t.booking.summary.school}
          </span>
          <span className="font-semibold text-[#0D1929] block">
            {formData.school ? `${formData.school} (${formData.city})` : t.booking.noSchoolName}
          </span>
          {formData.audience && (
            <span className="text-[11px] text-[#B45309] font-medium block mt-0.5">
              {t.booking.audiencePrefix}{formData.audience}
            </span>
          )}
        </div>

        {/* Attendees */}
        <div className="text-xs pt-2 border-t border-[#E6E2D6]">
          <span className="text-[11px] text-[#7E8E9E] block mb-0.5">
            {t.booking.summary.participants}
          </span>
          <span className="font-semibold text-[#0D1929]">
            {isRtl ? toPersianDigits(formData.participants) : formData.participants} {t.booking.summary.person}
          </span>
        </div>

        {/* Date & Time */}
        <div className="text-xs pt-2 border-t border-[#E6E2D6]">
          <span className="text-[11px] text-[#7E8E9E] block mb-0.5">
            {t.booking.summary.date}
          </span>
          <div className="flex items-center gap-1.5 font-semibold text-[#0D1929]">
            <Calendar className="w-3.5 h-3.5 text-[#B45309]" />
            <span>{dateLabel || t.booking.unspecified}</span>
          </div>

          {formData.time && (
            <div className="mt-1 flex items-center gap-1.5 text-xs font-mono text-[#0D1929]">
              <span className="text-[11px] text-[#7E8E9E] font-sans">
                {t.booking.summary.time}
              </span>
              <span className="font-bold text-[#B45309]">
                {isRtl ? toPersianDigits(formData.time) : formData.time}
              </span>
            </div>
          )}
        </div>

        {/* Mode */}
        <div className="text-xs pt-2 border-t border-[#E6E2D6]">
          <span className="text-[11px] text-[#7E8E9E] block mb-0.5">
            {t.booking.summary.mode}
          </span>
          <span className="font-semibold text-[#0D1929]">
            {formData.mode === 'online'
              ? t.booking.step3.modeOnline
              : t.booking.step3.modeInPerson}
          </span>
        </div>

      </div>
    </aside>
  );
};
