import React from 'react';
import { MessageSquareText, Calendar, Building2, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { CONTENT, Language } from '../../content';

interface StepServiceProps {
  currentValue: string;
  onSelect: (service: string) => void;
  error?: string;
  currentLang: Language;
}

export const StepService: React.FC<StepServiceProps> = ({
  currentValue,
  onSelect,
  error,
  currentLang,
}) => {
  const t = CONTENT[currentLang];

  const iconForService = (idx: number) => {
    if (idx === 0) return <MessageSquareText className="w-5 h-5 text-[#B45309]" />;
    if (idx === 1) return <Calendar className="w-5 h-5 text-[#B45309]" />;
    return <Building2 className="w-5 h-5 text-[#B45309]" />;
  };

  return (
    <div className="space-y-6 text-start">
      <div>
        <h3 className="font-bold text-xl text-[#0D1929]">
          {t.booking.step1.title}
        </h3>
        <p className="text-xs sm:text-sm text-[#596B82] mt-1">
          {t.booking.step1.subtitle}
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
          {error}
        </div>
      )}

      <div className="space-y-3.5">
        {t.booking.step1.services.map((srv, idx) => {
          const isSelected = currentValue === srv.id;
          return (
            <motion.div
              key={srv.id}
              whileHover={{ y: -2 }}
              onClick={() => onSelect(srv.id)}
              className={`cursor-pointer rounded-2xl p-5 border transition-all duration-200 flex items-start justify-between gap-4 ${
                isSelected
                  ? 'bg-white border-[#B45309] shadow-md ring-1 ring-[#B45309]/30'
                  : 'bg-[#FDFCF7] border-[#E6E2D6] hover:bg-white hover:border-[#D5CEBE]'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-amber-100/70 text-[#B45309]' : 'bg-[#F5F3EC]'
                  }`}
                >
                  {iconForService(idx)}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-base text-[#0D1929]">
                      {srv.title}
                    </h4>
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded ${
                        isSelected
                          ? 'bg-[#B45309] text-white'
                          : 'bg-[#F5F3EC] text-[#596B82]'
                      }`}
                    >
                      {srv.badge}
                    </span>
                  </div>

                  <p className="text-xs text-[#596B82] leading-relaxed">
                    {srv.desc}
                  </p>
                </div>
              </div>

              <div className="shrink-0 self-center">
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'border-[#B45309] bg-[#B45309] text-white'
                      : 'border-[#D5CEBE] bg-white'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
