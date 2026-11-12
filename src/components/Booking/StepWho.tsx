import React from 'react';
import { CONFIG } from '../../config';
import { CONTENT, Language } from '../../content';
import { toPersianDigits } from '../../lib/date';
import { School, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

interface StepWhoProps {
  audience: string;
  school: string;
  city: string;
  participants: number;
  onChange: (fields: Partial<{ audience: string; school: string; city: string; participants: number }>) => void;
  errors: Record<string, string>;
  currentLang: Language;
}

export const StepWho: React.FC<StepWhoProps> = ({
  audience,
  school,
  city,
  participants,
  onChange,
  errors,
  currentLang,
}) => {
  const t = CONTENT[currentLang];
  const isRtl = currentLang === 'fa';

  const audienceOptions = t.audiences.items.map((item) => item.title);

  const provinceOptions = isRtl
    ? CONFIG.provinces
    : [
        'Kabul (Active Operations)',
        'Herat (Expansion Phase)',
        'Balkh / Mazar-i-Sharif (Expansion Phase)',
        'Nangarhar / Jalalabad (Expansion Phase)',
        'Kandahar (Expansion Phase)',
        'Other Provinces (By Special Request)',
      ];

  return (
    <div className="space-y-6 text-start">
      <div>
        <h3 className="font-bold text-xl text-[#0D1929]">
          {t.booking.step2.title}
        </h3>
        <p className="text-xs sm:text-sm text-[#596B82] mt-1">
          {t.booking.step2.subtitle}
        </p>
      </div>

      {/* Audience Category Selector */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-[#0D1929]">
          {t.booking.step2.audienceLabel} <span className="text-[#B45309]">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {audienceOptions.map((opt) => {
            const isSelected = audience === opt;
            return (
              <motion.button
                key={opt}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => onChange({ audience: opt })}
                className={`p-3 rounded-xl border text-start text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0D1929] border-[#0D1929] text-white shadow-xs'
                    : 'bg-[#FDFCF7] border-[#E6E2D6] hover:border-[#D5CEBE] text-[#3A4B60]'
                }`}
              >
                {opt}
              </motion.button>
            );
          })}
        </div>
        {errors.audience && (
          <p className="text-xs text-red-600 mt-1">{errors.audience}</p>
        )}
      </div>

      {/* School Name & City */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* School Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-[#0D1929]">
            {t.booking.step2.schoolLabel} <span className="text-[#B45309]">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={school}
              onChange={(e) => onChange({ school: e.target.value })}
              placeholder={t.booking.step2.schoolPlaceholder}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#B45309] focus:border-[#B45309] transition-all ${
                errors.school ? 'border-red-300 ring-1 ring-red-300' : 'border-[#D5CEBE]'
              }`}
            />
            <School className={`w-4 h-4 text-[#7E8E9E] absolute top-1/2 -translate-y-1/2 pointer-events-none ${
              isRtl ? 'left-3' : 'right-3'
            }`} />
          </div>
          {errors.school && (
            <p className="text-xs text-red-600">{errors.school}</p>
          )}
        </div>

        {/* City / Province */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-[#0D1929]">
            {t.booking.step2.cityLabel} <span className="text-[#B45309]">*</span>
          </label>
          <div className="relative">
            <select
              value={city}
              onChange={(e) => onChange({ city: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5CEBE] text-xs sm:text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#B45309] focus:border-[#B45309] transition-all appearance-none cursor-pointer"
            >
              {provinceOptions.map((prov) => (
                <option key={prov} value={prov}>
                  {prov}
                </option>
              ))}
            </select>
            <MapPin className={`w-4 h-4 text-[#7E8E9E] absolute top-1/2 -translate-y-1/2 pointer-events-none ${
              isRtl ? 'left-3' : 'right-3'
            }`} />
          </div>
        </div>

      </div>

      {/* Participants Counter */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-[#0D1929]">
          {t.booking.step2.participantsLabel}
        </label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onChange({ participants: Math.max(1, participants - 5) })}
            className="w-9 h-9 rounded-lg bg-white border border-[#D5CEBE] text-[#0D1929] font-bold text-base flex items-center justify-center hover:bg-[#F5F3EC] active:scale-95 transition-all cursor-pointer"
          >
            -
          </button>
          <div className="px-5 py-1.5 rounded-lg bg-white border border-[#D5CEBE] font-mono text-base font-bold text-[#0D1929] min-w-[70px] text-center">
            {isRtl ? toPersianDigits(participants) : participants}
          </div>
          <button
            type="button"
            onClick={() => onChange({ participants: Math.min(100, participants + 5) })}
            className="w-9 h-9 rounded-lg bg-white border border-[#D5CEBE] text-[#0D1929] font-bold text-base flex items-center justify-center hover:bg-[#F5F3EC] active:scale-95 transition-all cursor-pointer"
          >
            +
          </button>
          <span className="text-xs text-[#596B82] font-medium">
            {t.booking.participantsSuffix}
          </span>
        </div>
      </div>

    </div>
  );
};
