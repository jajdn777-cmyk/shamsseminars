import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle2, Compass, BookOpen, GraduationCap } from 'lucide-react';
import { CONTENT, Language } from '../content';

interface WhyProps {
  currentLang: Language;
}

export const Why: React.FC<WhyProps> = ({ currentLang }) => {
  const t = CONTENT[currentLang];
  const isRtl = currentLang === 'fa';

  const pillars = isRtl
    ? [
        {
          title: 'تدریس فعال و شاگردمحور',
          desc: 'ایجاد نشاط در صنف و تقویت درک عمیق مفاهیم تعلیمی بر اساس نصاب ملی',
          icon: BookOpen,
        },
        {
          title: 'نظارت بالینی و رهبری مکتب',
          desc: 'ارتقای مهارتی مدیران و سرمعلمین در مدیریت علمی مکتب و هدایت آموزگاران',
          icon: GraduationCap,
        },
      ]
    : [
        {
          title: 'Active & Student-Centered Pedagogy',
          desc: 'Energizing classrooms and fostering deep conceptual understanding in alignment with national curriculum',
          icon: BookOpen,
        },
        {
          title: 'Clinical Supervision & Leadership',
          desc: 'Equipping principals and supervisors with modern observational coaching and school governance',
          icon: GraduationCap,
        },
      ];

  return (
    <section id="why" className="py-24 md:py-32 bg-transparent border-b border-[#E8E2D4] relative overflow-hidden">
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
            <span>{t.why.badge}</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#0B1524] leading-tight">
            {t.why.title}
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 72 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full mt-3"
          />
        </motion.div>

        {/* Dual-Column Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Pull Quote Column: Arch-Header Illuminated Manuscript Card */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 30 : -30, rotateY: 5 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-5 celestial-card p-8 sm:p-10 rounded-3xl border border-[#D2C9B6] shadow-sm relative group hover:border-[#B45309] transition-all"
          >
            {/* Background solar medallion watermark */}
            <div className="absolute top-4 right-4 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />

            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E8E2D4]">
              <div className="flex items-center gap-2 text-xs font-bold text-[#B45309]">
                <Compass className="w-4 h-4 animate-spin [animation-duration:20s]" />
                <span>{isRtl ? 'رسالت محوری' : 'Core Mission'}</span>
              </div>
              <span className="text-[11px] font-mono text-[#7E8E9E]">SHAMS-01</span>
            </div>

            <span className="font-serif text-6xl text-[#B45309]/30 leading-none select-none block mb-1">
              {isRtl ? '«' : '“'}
            </span>

            <blockquote className="font-heading text-xl sm:text-2xl text-[#0B1524] leading-[2.1] font-bold">
              {t.why.quote}
            </blockquote>

            <div className="mt-8 pt-5 border-t border-[#E8E2D4] flex items-center justify-between text-xs text-[#5E7086]">
              <span className="font-bold text-[#0B1524]">
                {isRtl ? 'اصول راهبردی مرکز شمس' : 'Shams Strategic Foundations'}
              </span>
              <span className="text-[#B45309] font-semibold">
                {isRtl ? 'نظام آموزش پایدار' : 'Sustainable Pedagogy'}
              </span>
            </div>
          </motion.div>

          {/* Analytical Text Column with Interactive Highlighted Pillars */}
          <div className="lg:col-span-7 space-y-6 text-[#2C3E55] text-base leading-[2.1] text-start">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="bg-white/85 p-6 rounded-2xl border-s-4 border-[#B45309] border-y border-e border-[#E8E2D4] shadow-2xs backdrop-blur-xs"
            >
              <p className="font-medium">{t.why.body1}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/85 p-6 rounded-2xl border-s-4 border-[#0B1524] border-y border-e border-[#E8E2D4] shadow-2xs backdrop-blur-xs"
            >
              <p className="font-medium">{t.why.body2}</p>
            </motion.div>

            {/* Unboxed Pillars Grid with Motion Hover */}
            <div className="pt-6 border-t border-[#E8E2D4] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    whileHover={{ y: -4, borderColor: '#B45309' }}
                    className="p-5 rounded-2xl bg-white/90 border border-[#E8E2D4] shadow-2xs transition-all"
                  >
                    <div className="font-bold text-[#0B1524] mb-1.5 flex items-center gap-2.5 text-sm">
                      <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-[#B45309]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span>{pillar.title}</span>
                    </div>
                    <div className="text-[#5E7086] ps-9 leading-relaxed text-xs">
                      {pillar.desc}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
