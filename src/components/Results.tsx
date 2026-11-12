import React from 'react';
import { Target, BarChart2, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { CONTENT, Language } from '../content';

interface ResultsProps {
  currentLang: Language;
}

export const Results: React.FC<ResultsProps> = ({ currentLang }) => {
  const t = CONTENT[currentLang];
  const isRtl = currentLang === 'fa';

  return (
    <section id="results" className="py-24 md:py-32 bg-gradient-to-b from-[#F6F3EB]/70 via-[#FDFBF7]/90 to-[#F6F3EB]/70 border-b border-[#E8E2D4] relative overflow-hidden">
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
            <span>{t.results.badge}</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#0B1524] leading-tight">
            {t.results.title}
          </h2>
          <p className="text-[#5E7086] text-sm sm:text-base mt-2">
            {t.results.subtitle}
          </p>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 72 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full mt-3"
          />
        </motion.div>

        {/* 6 Outcome Cards Grid with Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14 text-start">
          {t.results.items.map((item, idx) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              whileHover={{ y: -6, borderColor: 'rgba(180, 83, 9, 0.5)' }}
              className="celestial-card rounded-3xl p-7 hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
            >
              {/* Corner Golden Accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-400/15 to-transparent rounded-bl-3xl pointer-events-none" />

              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E8E2D4]">
                <span className="font-mono text-xs font-bold text-[#B45309] bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-600/20">
                  {isRtl ? `شاخص ${item.num}` : `Outcome ${item.num}`}
                </span>
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-[#B45309] group-hover:bg-[#B45309] group-hover:text-white transition-colors">
                  <Target className="w-4 h-4" />
                </div>
              </div>

              <h3 className="font-bold text-base sm:text-lg text-[#0B1524] mb-2 leading-snug group-hover:text-[#B45309] transition-colors">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#5E7086] leading-relaxed font-normal">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Evaluation Metrics Strip with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="celestial-card rounded-3xl p-6 sm:p-8 text-start shadow-sm"
        >
          <div className="flex items-center gap-2.5 mb-5 text-[#0B1524] pb-3 border-b border-[#E8E2D4]">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-[#B45309]">
              <BarChart2 className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-base sm:text-lg">
              {t.results.metricsTitle}
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {t.results.metrics.map((metric, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4, borderColor: '#B45309' }}
                className="bg-white/95 p-4 rounded-2xl border border-[#E8E2D4] hover:shadow-xs transition-all"
              >
                <div className="font-bold text-xs sm:text-sm text-[#0B1524] mb-1">
                  {metric.label}
                </div>
                <div className="text-[11px] text-[#5E7086] leading-relaxed">
                  {metric.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
