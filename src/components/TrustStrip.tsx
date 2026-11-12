import React from 'react';
import { ShieldCheck, BarChart2, FileCheck2, UserCheck2, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { CONTENT, Language } from '../content';

interface TrustStripProps {
  currentLang: Language;
}

export const TrustStrip: React.FC<TrustStripProps> = ({ currentLang }) => {
  const t = CONTENT[currentLang];
  const isRtl = currentLang === 'fa';

  const icons = [
    <ShieldCheck className="w-5 h-5 text-[#B45309]" key="1" />,
    <BarChart2 className="w-5 h-5 text-[#B45309]" key="2" />,
    <FileCheck2 className="w-5 h-5 text-[#B45309]" key="3" />,
    <UserCheck2 className="w-5 h-5 text-[#B45309]" key="4" />,
  ];

  return (
    <section className="bg-gradient-to-b from-[#F6F3EB]/90 to-[#FDFBF7]/90 py-12 border-b border-[#E8E2D4] relative z-10 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {t.trust.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.1, duration: 0.45 }}
              whileHover={{ y: -4, borderColor: 'rgba(180, 83, 9, 0.4)' }}
              className="flex items-start gap-4 text-start p-4 rounded-2xl bg-white/80 border border-[#E8E2D4] shadow-xs hover:shadow-md transition-all group relative overflow-hidden"
            >
              {/* Corner Golden Accent */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-amber-400/20 to-transparent rounded-bl-xl pointer-events-none" />

              <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-600/20 flex items-center justify-center shrink-0 text-[#B45309] shadow-2xs group-hover:bg-[#B45309] group-hover:text-white transition-all duration-300">
                {icons[index % icons.length]}
              </div>

              <div className="space-y-1">
                <h3 className="font-bold text-sm sm:text-base text-[#0B1524] leading-snug group-hover:text-[#B45309] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#5E7086] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
