import React from 'react';
import { User, Phone } from 'lucide-react';
import { CONTENT, Language } from '../../content';

interface StepContactProps {
  name: string;
  phone: string;
  hasWhatsapp: boolean;
  note: string;
  consent: boolean;
  onChange: (fields: Partial<{
    name: string;
    phone: string;
    hasWhatsapp: boolean;
    note: string;
    consent: boolean;
  }>) => void;
  errors: Record<string, string>;
  currentLang: Language;
}

export const StepContact: React.FC<StepContactProps> = ({
  name,
  phone,
  hasWhatsapp,
  note,
  consent,
  onChange,
  errors,
  currentLang,
}) => {
  const t = CONTENT[currentLang];
  const isRtl = currentLang === 'fa';

  return (
    <div className="space-y-6 text-start">
      <div>
        <h3 className="font-bold text-xl text-[#0D1929]">
          {t.booking.step4.title}
        </h3>
        <p className="text-xs sm:text-sm text-[#596B82] mt-1">
          {t.booking.step4.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-[#0D1929]">
            {t.booking.step4.nameLabel} <span className="text-[#B45309]">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => onChange({ name: e.target.value })}
              placeholder={t.booking.step4.namePlaceholder}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#B45309] focus:border-[#B45309] transition-all ${
                errors.name ? 'border-red-300 ring-1 ring-red-300' : 'border-[#D5CEBE]'
              }`}
            />
            <User className={`w-4 h-4 text-[#7E8E9E] absolute top-1/2 -translate-y-1/2 pointer-events-none ${
              isRtl ? 'left-3' : 'right-3'
            }`} />
          </div>
          {errors.name && (
            <p className="text-xs text-red-600 font-medium">{errors.name}</p>
          )}
        </div>

        {/* Afghan Phone Number */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-[#0D1929]">
            {t.booking.step4.phoneLabel} <span className="text-[#B45309]">*</span>
          </label>
          <div className="relative">
            <input
              type="tel"
              dir="ltr"
              value={phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              placeholder="0784996270"
              className={`w-full px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm bg-white font-mono focus:outline-none focus:ring-1 focus:ring-[#B45309] focus:border-[#B45309] transition-all text-left ${
                errors.phone ? 'border-red-300 ring-1 ring-red-300' : 'border-[#D5CEBE]'
              }`}
            />
            <Phone className="w-4 h-4 text-[#7E8E9E] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          <p className="text-[11px] text-[#7E8E9E]">
            {t.booking.step4.phoneHint}
          </p>
          {errors.phone && (
            <p className="text-xs text-red-600 font-medium">{errors.phone}</p>
          )}
        </div>

      </div>

      {/* WhatsApp Checkbox */}
      <div className="flex items-center gap-2 pt-1">
        <input
          id="hasWhatsappCheckbox"
          type="checkbox"
          checked={hasWhatsapp}
          onChange={(e) => onChange({ hasWhatsapp: e.target.checked })}
          className="w-4 h-4 rounded text-[#B45309] focus:ring-[#B45309] border-[#D5CEBE] cursor-pointer"
        />
        <label
          htmlFor="hasWhatsappCheckbox"
          className="text-xs text-[#3A4B60] select-none cursor-pointer font-medium"
        >
          {t.booking.step4.hasWhatsappLabel}
        </label>
      </div>

      {/* Additional Notes */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-[#0D1929]">
          {t.booking.step4.noteLabel}
        </label>
        <textarea
          rows={3}
          value={note}
          onChange={(e) => onChange({ note: e.target.value })}
          placeholder={t.booking.step4.notePlaceholder}
          className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5CEBE] text-xs sm:text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#B45309] focus:border-[#B45309] transition-all"
        />
      </div>

      {/* Consent Checkbox */}
      <div className="space-y-1 pt-2">
        <div className="flex items-start gap-2.5">
          <input
            id="consentCheckbox"
            type="checkbox"
            checked={consent}
            onChange={(e) => onChange({ consent: e.target.checked })}
            className="w-4 h-4 rounded text-[#B45309] focus:ring-[#B45309] border-[#D5CEBE] mt-0.5 cursor-pointer"
          />
          <label
            htmlFor="consentCheckbox"
            className="text-xs text-[#3A4B60] select-none cursor-pointer leading-relaxed"
          >
            {t.booking.step4.consentLabel}
          </label>
        </div>
        {errors.consent && (
          <p className="text-xs text-red-600 font-medium">{errors.consent}</p>
        )}
      </div>

    </div>
  );
};
