import React from 'react';
import { CONTENT, Language } from '../content';

interface WhyProps {
  currentLang: Language;
}

export const Why: React.FC<WhyProps> = ({ currentLang }) => {
  const t = CONTENT[currentLang];
  const isRtl = currentLang === 'fa';

  const comparisonData = isRtl
    ? [
        { aspect: 'الگوی تدریس', before: 'محور معلم و حفظ طوطی‌وار', after: 'یادگیری فعال و مسئله‌محور' },
        { aspect: 'نظارت سرمعلم', before: 'تفتیش فرمایشی و اداری', after: 'مربیگری بالینی و بازخورد علمی' },
        { aspect: 'سنجش یادگیری', before: 'امتحانات سنتی حافظه‌سنج', after: 'ارزیابی تکوینی و سنجش تفکر' },
        { aspect: 'بازده مکتب', before: 'نتایج ناهماهنگ', after: 'ارتقای مستند کیفیت تدریس' },
      ]
    : [
        { aspect: 'Pedagogy', before: 'Rote memorization', after: 'Active, inquiry-based learning' },
        { aspect: 'Supervision', before: 'Routine inspection', after: 'Clinical coaching & feedback' },
        { aspect: 'Assessment', before: 'Memory-only exams', after: 'Continuous formative rubrics' },
        { aspect: 'Outcomes', before: 'Inconsistent attainment', after: 'Documented teaching growth' },
      ];

  return (
    <section id="why" className="py-16 md:py-24 bg-[#F6F3EB]/50 border-b border-[#E8E2D4]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-start">
        <div className="max-w-2xl mb-12">
          <h2 className="font-display font-black text-2xl sm:text-3xl text-[#0B1524] leading-tight">
            {t.why.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: Clean Mission Quote & Core Context */}
          <div className="lg:col-span-5 space-y-5">
            <blockquote className="font-heading text-xl sm:text-2xl text-[#0B1524] leading-[1.9] font-bold">
              {t.why.quote}
            </blockquote>
            <p className="text-sm sm:text-base text-[#2C3E55] leading-[1.9]">
              {t.why.body1}
            </p>
            <p className="text-sm sm:text-base text-[#5E7086] leading-[1.9]">
              {t.why.body2}
            </p>
          </div>

          {/* Right: Clean Before vs After Comparison */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E8E2D4] p-6 sm:p-7">
            <h3 className="font-bold text-base text-[#0B1524] pb-4 mb-4 border-b border-[#E8E2D4]">
              {isRtl ? 'تحول ملموس پیش و پس از اجرای نظام شمس' : 'Practical Shift: Before & After Shams'}
            </h3>

            <div className="divide-y divide-[#F0EBE1]">
              {comparisonData.map((row, idx) => (
                <div
                  key={idx}
                  className="py-3.5 first:pt-0 last:pb-0 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline text-xs sm:text-sm"
                >
                  <div className="sm:col-span-3 font-bold text-[#0B1524]">
                    {row.aspect}
                  </div>
                  <div className="sm:col-span-4 text-[#7E8E9E] line-through">
                    {row.before}
                  </div>
                  <div className="sm:col-span-5 text-[#0B1524] font-semibold">
                    {row.after}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
