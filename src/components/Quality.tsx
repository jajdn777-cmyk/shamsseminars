import React, { useState } from 'react';
import { CheckSquare, ShieldCheck, TrendingUp, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { CONTENT, Language } from '../content';

interface QualityProps {
  currentLang: Language;
}

export const Quality: React.FC<QualityProps> = ({ currentLang }) => {
  const [activeGate, setActiveGate] = useState(0);
  const t = CONTENT[currentLang];
  const isRtl = currentLang === 'fa';

  const comparisonData = isRtl
    ? [
        { aspect: 'الگوی تدریس', before: 'محور معلم و حفظ طوطی‌وار', after: 'یادگیری فعال و مسئله‌محور شاگردان' },
        { aspect: 'نظارت سرمعلم', before: 'تفتیش فرمایشی و اداری', after: 'مربیگری بالینی و بازخورد علمی مستمر' },
        { aspect: 'سنجش یادگیری', before: 'امتحانات سنتی حافظه‌سنج', after: 'ارزیابی تکوینی و سنجش مهارت‌های تفکر' },
        { aspect: 'بازده مکتب', before: 'نتایج ناهماهنگ و افت شاگرد', after: 'ارتقای مستند شاخص‌های کیفی تدریس' },
      ]
    : [
        { aspect: 'Pedagogical Model', before: 'Teacher-centric rote memorization', after: 'Active, problem-based student inquiry' },
        { aspect: 'Supervision Mode', before: 'Routine administrative inspection', after: 'Clinical coaching & ongoing constructive feedback' },
        { aspect: 'Assessment', before: 'High-stakes memory examinations', after: 'Formative continuous skills & conceptual rubrics' },
        { aspect: 'School Outcomes', before: 'Inconsistent student attainment', after: 'Documented, verifiable instructional growth' },
      ];

  return (
    <section id="quality" className="py-24 md:py-32 bg-transparent border-b border-[#E8E2D4] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with On-Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16 text-start"
        >
          <div className="text-xs font-bold text-[#B45309] uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="w-3 h-0.5 bg-[#B45309] rounded-full" />
            <span>{t.quality.badge}</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#0B1524] leading-tight">
            {t.quality.title}
          </h2>
          <p className="text-[#5E7086] text-sm sm:text-base mt-2">
            {t.quality.subtitle}
          </p>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 72 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full mt-3"
          />
        </motion.div>

        {/* 4-Stage Audit Matrix with Motion */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {t.quality.steps.map((step, idx) => {
            const isSelected = activeGate === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                whileHover={{ y: -6 }}
                onClick={() => setActiveGate(idx)}
                className={`celestial-card rounded-3xl p-7 text-start flex flex-col justify-between group cursor-pointer transition-all duration-300 relative overflow-hidden ${
                  isSelected ? 'border-[#B45309] ring-2 ring-amber-500/25 shadow-lg' : 'hover:border-[#D2C9B6]'
                }`}
              >
                {/* Active Indicator Top Golden Bar */}
                {isSelected && (
                  <motion.div
                    layoutId="qualityActiveGlow"
                    className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-500 rounded-t-3xl"
                  />
                )}

                <div>
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E8E2D4]">
                    <span className="font-mono text-xs font-bold text-[#B45309]">
                      {isRtl ? `گام ۰${idx + 1}` : `Stage 0${idx + 1}`}
                    </span>
                    <span className="text-[11px] font-semibold text-[#5E7086] px-2.5 py-1 rounded-full bg-[#F6F3EB]">
                      {step.step}
                    </span>
                  </div>

                  <h3 className="font-bold text-base sm:text-lg text-[#0B1524] mb-2 group-hover:text-[#B45309] transition-colors leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs text-[#5E7086] leading-relaxed mb-4">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E8E2D4] flex items-center gap-2 text-[11px] text-[#0B1524] font-medium">
                  <CheckSquare className="w-4 h-4 text-[#B45309]" />
                  <span>{isRtl ? 'شاخص ارزیابی رسمی' : 'Official Audit Metric'}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Unique Before vs After Institutional Transformation Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="celestial-card rounded-3xl p-6 sm:p-8 border border-[#D2C9B6] text-start shadow-sm"
        >
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E8E2D4]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-[#B45309]">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-base sm:text-lg text-[#0B1524]">
                {isRtl ? 'تحول ملموس پیش و پس از اجرای نظام شمس' : 'Measurable Impact: Before & After Shams'}
              </h3>
            </div>
            <span className="text-xs font-semibold text-[#B45309] bg-amber-500/10 px-3 py-1 rounded-full border border-amber-600/20">
              {isRtl ? 'ارزیابی مستند' : 'Documented Rubric'}
            </span>
          </div>

          <div className="space-y-3">
            {comparisonData.map((row, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.01 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 rounded-2xl bg-white/90 border border-[#E8E2D4] items-center text-xs sm:text-sm"
              >
                <div className="md:col-span-3 font-bold text-[#0B1524] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>{row.aspect}</span>
                </div>
                <div className="md:col-span-4 text-[#7E8E9E] line-through bg-red-50/50 p-2.5 rounded-xl border border-red-100">
                  <span className="font-normal">{row.before}</span>
                </div>
                <div className="md:col-span-5 text-[#0B1524] font-semibold bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200/60 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{row.after}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
