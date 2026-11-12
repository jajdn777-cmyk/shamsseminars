import React, { useMemo } from 'react';
import { CONFIG } from '../../config';
import { CONTENT, Language } from '../../content';
import {
  nextBookableDays,
  makeSlots,
  toDateISO,
  jalaliShort,
  toPersianDigits,
} from '../../lib/date';
import { isTaken } from '../../lib/booking';
import { Video, Building } from 'lucide-react';
import { motion } from 'motion/react';

interface StepDateProps {
  dateISO: string;
  time: string;
  mode: 'online' | 'inperson';
  onChange: (fields: Partial<{ dateISO: string; time: string; mode: 'online' | 'inperson' }>) => void;
  errors: Record<string, string>;
  currentLang: Language;
}

export const StepDate: React.FC<StepDateProps> = ({
  dateISO,
  time,
  mode,
  onChange,
  errors,
  currentLang,
}) => {
  const t = CONTENT[currentLang];
  const isRtl = currentLang === 'fa';

  const availableDays = useMemo(() => {
    return nextBookableDays(21);
  }, []);

  const allSlots = useMemo(() => {
    return makeSlots(CONFIG.slot.start, CONFIG.slot.end, CONFIG.slot.stepMin);
  }, []);

  return (
    <div className="space-y-6 text-start">
      <div>
        <h3 className="font-bold text-xl text-[#0D1929]">
          {t.booking.step3.title}
        </h3>
        <p className="text-xs sm:text-sm text-[#596B82] mt-1">
          {t.booking.step3.subtitle}
        </p>
      </div>

      {/* Online / In-Person Mode Selector */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-[#0D1929]">
          {t.booking.step3.modeLabel}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => onChange({ mode: 'inperson' })}
            className={`p-3.5 rounded-xl border flex items-center justify-center gap-2.5 text-xs font-bold transition-all cursor-pointer ${
              mode === 'inperson'
                ? 'bg-[#0D1929] border-[#0D1929] text-white shadow-xs'
                : 'bg-white border-[#D5CEBE] hover:border-[#0D1929] text-[#3A4B60]'
            }`}
          >
            <Building className="w-4 h-4 text-amber-400" />
            <span>{t.booking.step3.modeInPerson}</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => onChange({ mode: 'online' })}
            className={`p-3.5 rounded-xl border flex items-center justify-center gap-2.5 text-xs font-bold transition-all cursor-pointer ${
              mode === 'online'
                ? 'bg-[#0D1929] border-[#0D1929] text-white shadow-xs'
                : 'bg-white border-[#D5CEBE] hover:border-[#0D1929] text-[#3A4B60]'
            }`}
          >
            <Video className="w-4 h-4 text-amber-400" />
            <span>{t.booking.step3.modeOnline}</span>
          </motion.button>
        </div>
      </div>

      {/* Solar Hijri Date Selection Horizontal Strip */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-[#0D1929]">
            {t.booking.step3.selectDay} <span className="text-[#B45309]">*</span>
          </label>
          <span className="text-[11px] text-[#7E8E9E]">
            {t.booking.selectDayHint}
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scroll-smooth">
          {availableDays.map((d) => {
            const iso = toDateISO(d);
            const isSelected = dateISO === iso;
            const short = jalaliShort(d, currentLang);

            return (
              <motion.button
                key={iso}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => onChange({ dateISO: iso, time: '' })}
                className={`shrink-0 w-24 py-3 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0D1929] text-white border-[#0D1929] shadow-sm font-bold'
                    : 'bg-white border-[#D5CEBE] hover:border-[#B45309] text-[#0D1929]'
                }`}
              >
                <div
                  className={`text-[11px] mb-0.5 ${
                    isSelected ? 'text-gray-300' : 'text-[#7E8E9E]'
                  }`}
                >
                  {short.weekday}
                </div>
                <div
                  className={`font-mono text-xl font-bold leading-tight my-0.5 ${
                    isSelected ? 'text-amber-400' : 'text-[#0D1929]'
                  }`}
                >
                  {isRtl ? toPersianDigits(short.day) : short.day}
                </div>
                <div
                  className={`text-[10px] font-medium ${
                    isSelected ? 'text-gray-300' : 'text-[#596B82]'
                  }`}
                >
                  {short.month}
                </div>
              </motion.button>
            );
          })}
        </div>
        {errors.dateISO && (
          <p className="text-xs text-red-600">{errors.dateISO}</p>
        )}
      </div>

      {/* Available Time Slots Grid */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-[#0D1929]">
          {t.booking.step3.selectSlot} <span className="text-[#B45309]">*</span>
        </label>

        {!dateISO ? (
          <div className="p-4 rounded-xl bg-[#F5F3EC] text-xs text-[#596B82] text-center border border-[#E6E2D6]">
            {t.booking.selectDayPrompt}
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
            {allSlots.map((slot) => {
              const booked = isTaken(dateISO, slot);
              const isSelected = time === slot;

              return (
                <button
                  key={slot}
                  type="button"
                  disabled={booked}
                  onClick={() => onChange({ time: slot })}
                  className={`py-2 px-1 text-center font-mono text-xs rounded-lg border transition-all ${
                    booked
                      ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through opacity-60'
                      : isSelected
                      ? 'bg-[#B45309] border-[#B45309] text-white font-bold shadow-xs'
                      : 'bg-white border-[#D5CEBE] text-[#0D1929] hover:border-[#B45309] cursor-pointer'
                  }`}
                >
                  {isRtl ? toPersianDigits(slot) : slot}
                </button>
              );
            })}
          </div>
        )}
        {errors.time && (
          <p className="text-xs text-red-600">{errors.time}</p>
        )}
      </div>

    </div>
  );
};
