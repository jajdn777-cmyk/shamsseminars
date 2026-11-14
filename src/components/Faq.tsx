import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { CONTENT, Language } from '../content';

interface FaqProps {
  currentLang: Language;
}

export const Faq: React.FC<FaqProps> = ({ currentLang }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const t = CONTENT[currentLang];

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-[#F6F3EB]/50 border-b border-[#E8E2D4]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-start">
        <div className="mb-10">
          <h2 className="font-display font-black text-2xl sm:text-3xl text-[#0B1524] leading-tight">
            {t.faq.title}
          </h2>
          <p className="text-[#5E7086] text-sm sm:text-base mt-2">
            {t.faq.subtitle}
          </p>
        </div>

        <div className="divide-y divide-[#E8E2D4] border border-[#E8E2D4] bg-white rounded-2xl overflow-hidden">
          {t.faq.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index}>
                <button
                  type="button"
                  onClick={() => handleToggle(index)}
                  className="w-full p-5 sm:p-6 text-start flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FDFBF7] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm sm:text-base text-[#0B1524] leading-snug">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#5E7086] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#B45309]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-2 text-xs sm:text-sm text-[#2C3E55] leading-[1.9] bg-[#FDFBF7] border-t border-[#F0EBE1]">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
