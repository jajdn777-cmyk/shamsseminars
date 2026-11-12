import React, { useState } from 'react';
import { Search, Presentation, CheckCircle2, Repeat, Sparkles, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CONTENT, Language } from '../content';

interface OrbitModelProps {
  currentLang: Language;
}

export const OrbitModel: React.FC<OrbitModelProps> = ({ currentLang }) => {
  const [activeStage, setActiveStage] = useState(0);
  const t = CONTENT[currentLang];
  const isRtl = currentLang === 'fa';

  const icons = [Search, Presentation, CheckCircle2, Repeat];

  return (
    <section id="model" className="py-24 md:py-32 bg-gradient-to-b from-[#F6F3EB]/70 via-[#FDFBF7]/90 to-[#F6F3EB]/70 border-b border-[#E8E2D4] relative overflow-hidden">
      {/* Background celestial orbit line watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-amber-500/10 pointer-events-none" />

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
            <span>{t.model.badge}</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#0B1524] leading-tight">
            {t.model.title}
          </h2>
          <p className="text-[#5E7086] text-sm sm:text-base mt-2">
            {t.model.subtitle}
          </p>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 72 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full mt-3"
          />
        </motion.div>

        {/* Interactive Orbital Flow Ribbon (Connecting SVG Arcs) */}
        <div className="relative mb-12 hidden lg:block">
          <div className="absolute top-1/2 inset-x-8 -translate-y-1/2 h-1 bg-[#E8E2D4] -z-0">
            {/* Animated Golden Progress Light */}
            <motion.div
              className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-500"
              animate={{ width: `${((activeStage + 1) / 4) * 100}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            />
          </div>
        </div>

        {/* 4-Stage Architectural Cycle Grid with Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {t.model.steps.map((step, idx) => {
            const Icon = icons[idx];
            const isSelected = activeStage === idx;

            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                onClick={() => setActiveStage(idx)}
                className={`p-7 rounded-3xl border text-start cursor-pointer transition-all duration-300 flex flex-col justify-between relative group ${
                  isSelected
                    ? 'bg-white border-[#B45309] shadow-lg ring-2 ring-amber-500/25 scale-[1.02]'
                    : 'bg-white/80 border-[#E8E2D4] hover:bg-white hover:border-[#D2C9B6] shadow-xs'
                }`}
              >
                {/* Active Indicator Top Golden Light Bar */}
                {isSelected && (
                  <motion.div
                    layoutId="modelActiveGlow"
                    className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-500 rounded-t-3xl"
                  />
                )}

                <div>
                  <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#E8E2D4]">
                    <span className={`font-mono font-bold text-xs ${isSelected ? 'text-[#B45309]' : 'text-[#7E8E9E]'}`}>
                      {isRtl ? `مرحله ۰${idx + 1}` : `Phase 0${idx + 1}`}
                    </span>
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-gradient-to-br from-[#B45309] to-[#D97706] text-white shadow-md'
                          : 'bg-[#F6F3EB] text-[#5E7086] group-hover:bg-amber-100 group-hover:text-[#B45309]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-bold text-lg text-[#0B1524] mb-2 group-hover:text-[#B45309] transition-colors leading-snug">
                    {step.name}
                  </h3>

                  <p className="text-xs text-[#5E7086] leading-relaxed mb-6 font-normal">
                    {step.summary}
                  </p>
                </div>

                <div className={`pt-3 border-t text-[11px] leading-relaxed p-3 rounded-xl transition-colors ${
                  isSelected
                    ? 'bg-amber-50/80 border border-amber-200/60 text-[#0B1524]'
                    : 'bg-[#FDFBF7] border border-[#E8E2D4] text-[#2C3E55]'
                }`}>
                  <div className="flex items-center gap-1.5 mb-1 font-semibold text-[#B45309]">
                    <Activity className="w-3.5 h-3.5" />
                    <span>{isRtl ? 'خروجی عملیاتی' : 'Operational Deliverable'}</span>
                  </div>
                  <span>{step.details}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Central Motto Banner with Animated Solar Flare */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 celestial-card rounded-3xl p-6 sm:p-8 text-center max-w-4xl mx-auto border-gold-subtle relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-amber-500/10 to-amber-500/5 pointer-events-none" />
          <p className="font-heading text-lg sm:text-xl text-[#0B1524] font-bold leading-relaxed relative z-10">
            {t.model.motto}
          </p>
        </motion.div>

      </div>
    </section>
  );
};
