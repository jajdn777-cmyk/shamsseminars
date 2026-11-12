import React from 'react';
import { ArrowLeft, Calendar, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { CONTENT, Language } from '../content';

interface CtaBandProps {
  currentLang: Language;
  onBookClick: () => void;
}

export const CtaBand: React.FC<CtaBandProps> = ({ currentLang, onBookClick }) => {
  const t = CONTENT[currentLang];
  const isRtl = currentLang === 'fa';

  return (
    <section className="py-16 md:py-24 bg-[#FDFCF7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-3xl p-8 sm:p-12 md:p-16 text-center text-white bg-[#0D1929] border border-[#182C44] shadow-xl relative overflow-hidden group"
        >
          {/* Subtle luminous solar background flare */}
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/25 transition-colors duration-500" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-xs font-mono font-bold tracking-widest text-amber-300 uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{isRtl ? 'رسالت مرکز شمس' : 'Shams Center Mission'}</span>
            </span>

            <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-white leading-[1.35] tracking-tight">
              {t.ctaBand.heading}
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed font-normal max-w-xl mx-auto">
              {t.ctaBand.sub}
            </p>

            <div className="pt-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onBookClick}
                type="button"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#B45309] hover:bg-[#92400E] text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-amber-200" />
                <span>{t.ctaBand.btn}</span>
                <ArrowLeft className={`w-4 h-4 ${isRtl ? 'rtl:rotate-0' : 'rotate-180'}`} />
              </motion.button>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};
