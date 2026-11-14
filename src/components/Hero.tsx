import React from 'react';
import { toPersianDigits } from '../lib/date';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CONTENT, Language } from '../content';

interface HeroProps {
  currentLang: Language;
  onBookClick: () => void;
  onModelClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  onBookClick,
  onModelClick,
}) => {
  const t = CONTENT[currentLang];
  const isRtl = currentLang === 'fa';

  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 border-b border-[#E8E2D4]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Main Editorial Column */}
          <div className="lg:col-span-7 space-y-6 text-start">
            <p className="text-xs sm:text-sm font-semibold text-[#B45309]">
              {t.hero.tagline}
              <span className="mx-2 text-[#A8B4C0]" aria-hidden="true">·</span>
              <span className="text-[#5E7086] font-normal">{t.hero.location}</span>
            </p>

            <h1
              className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#0B1524] leading-[1.3] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              {t.hero.h1Part1}
              <span className="text-[#B45309] font-heading font-normal">
                {t.hero.h1Part2}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#2C3E55] leading-[1.85] max-w-xl font-normal">
              {t.hero.sub}
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                onClick={onBookClick}
                type="button"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#B45309] hover:bg-[#92400E] text-white font-bold text-sm sm:text-base transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>{t.hero.ctaPrimary}</span>
                {isRtl ? (
                  <ArrowLeft className="w-4 h-4 shrink-0" />
                ) : (
                  <ArrowRight className="w-4 h-4 shrink-0" />
                )}
              </button>

              <button
                onClick={onModelClick}
                type="button"
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-white hover:bg-[#F6F3EB] text-[#0B1524] font-semibold text-sm sm:text-base border border-[#D2C9B6] transition-colors cursor-pointer whitespace-nowrap"
              >
                {t.hero.ctaSecondary}
              </button>
            </div>

            <div className="pt-5 border-t border-[#E8E2D4] flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-[#5E7086]">
              {t.hero.assurances.map((item, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && (
                    <span className="text-[#D2C9B6]" aria-hidden="true">·</span>
                  )}
                  <span className="font-medium">{item}</span>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Calm 4-Stage Process Summary Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E8E2D4] text-start">
              <div className="pb-4 mb-4 border-b border-[#E8E2D4]">
                <h2 className="font-display font-bold text-base text-[#0B1524]">
                  {t.model.title}
                </h2>
                <p className="text-xs text-[#5E7086] mt-1">
                  {t.model.subtitle}
                </p>
              </div>

              <ol className="divide-y divide-[#F0EBE1]">
                {t.model.steps.map((step, idx) => (
                  <li key={step.num} className="py-3.5 first:pt-0 last:pb-0 flex items-start gap-3.5">
                    <span className="text-xs font-bold text-[#B45309] tabular-nums pt-0.5 shrink-0">
                      {isRtl ? `۰${toPersianDigits(idx + 1)}` : `0${idx + 1}`}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm text-[#0B1524]">
                        {step.name}
                      </h3>
                      <p className="text-xs text-[#5E7086] mt-0.5 leading-relaxed">
                        {step.summary}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
