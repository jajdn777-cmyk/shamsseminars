import React from 'react';
import { MapPin, Navigation, Sparkles, Building, Landmark, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import { CONTENT, Language } from '../content';

interface RoadmapProps {
  currentLang: Language;
}

export const Roadmap: React.FC<RoadmapProps> = ({ currentLang }) => {
  const t = CONTENT[currentLang];
  const isRtl = currentLang === 'fa';

  const provinces = isRtl
    ? ['هرات', 'بلخ (مزار شریف)', 'ننگرهار', 'قندهار', 'کندز']
    : ['Herat', 'Balkh (Mazar)', 'Nangarhar', 'Kandahar', 'Kunduz'];

  return (
    <section className="py-24 md:py-32 bg-transparent border-b border-[#E8E2D4] relative overflow-hidden">
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
            <span>{t.roadmap.badge}</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#0B1524] leading-tight">
            {t.roadmap.title}
          </h2>
          <p className="text-[#5E7086] text-sm sm:text-base mt-2">
            {t.roadmap.subtitle}
          </p>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 72 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full mt-3"
          />
        </motion.div>

        {/* Two-Node Strategic Plan Graphic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-5xl mx-auto celestial-card rounded-3xl p-8 sm:p-12 border border-[#D2C9B6] text-start shadow-sm relative overflow-hidden"
        >
          {/* Subtle background solar line */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-11 gap-6 items-center">
            
            {/* Phase 1: Kabul (Headquarters & Active Hub) */}
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              className="md:col-span-5 bg-gradient-to-br from-[#0B1524] via-[#101E33] to-[#0B1524] text-white rounded-3xl p-7 border border-amber-500/30 shadow-xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/15 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center gap-3.5 mb-4 pb-3 border-b border-white/10">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#B45309] to-[#D97706] flex items-center justify-center text-white shadow-md">
                  <Landmark className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-amber-300 font-semibold block">
                    {t.roadmap.phase1.status}
                  </span>
                  <h3 className="font-bold text-xl text-white">
                    {t.roadmap.phase1.title}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed font-normal mb-4">
                {t.roadmap.phase1.desc}
              </p>

              <div className="pt-3 border-t border-white/10 flex items-center gap-2 text-[11px] text-amber-200">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>{isRtl ? 'مرکز عملیاتی فعال · ناحیه شهر نو و کارته سه' : 'Active Operational Center · Kabul'}</span>
              </div>
            </motion.div>

            {/* Strategic Link Arrow with Glowing Pulse */}
            <div className="md:col-span-1 flex items-center justify-center py-4 md:py-0">
              <div className="h-12 md:h-0.5 md:w-full w-0.5 border-dashed border-2 border-[#B45309] flex items-center justify-center relative">
                <div className="w-8 h-8 rounded-full bg-[#B45309] text-white flex items-center justify-center shadow-md animate-pulse">
                  <Navigation
                    className={`w-4 h-4 ${
                      isRtl ? 'rotate-90 md:rotate-180' : 'rotate-90 md:rotate-0'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Phase 2: Other Provinces */}
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              className="md:col-span-5 bg-white/95 text-[#0B1524] rounded-3xl p-7 border border-[#E8E2D4] hover:border-[#B45309] shadow-sm transition-all"
            >
              <div className="flex items-center gap-3.5 mb-4 pb-3 border-b border-[#E8E2D4]">
                <div className="w-12 h-12 rounded-2xl bg-[#F6F3EB] border border-[#E8E2D4] flex items-center justify-center text-[#B45309]">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-[#5E7086] font-semibold block">
                    {t.roadmap.phase2.status}
                  </span>
                  <h3 className="font-bold text-xl text-[#0B1524]">
                    {t.roadmap.phase2.title}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-[#5E7086] leading-relaxed font-normal mb-4">
                {t.roadmap.phase2.desc}
              </p>

              {/* Target Provincial Nodes */}
              <div className="pt-3 border-t border-[#E8E2D4] flex flex-wrap gap-1.5">
                {provinces.map((prov, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#F6F3EB] text-[#2C3E55] border border-[#E8E2D4]"
                  >
                    {prov}
                  </span>
                ))}
              </div>
            </motion.div>

          </div>

          <div className="mt-8 pt-6 border-t border-[#E8E2D4] text-center">
            <p className="text-xs text-[#5E7086] italic font-medium">
              {t.roadmap.note}
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
