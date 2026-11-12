import React from 'react';
import {
  Baby,
  BookOpen,
  GraduationCap,
  Award,
  Users2,
  Building2,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { motion } from 'motion/react';
import { CONTENT, Language } from '../content';

interface AudiencesProps {
  currentLang: Language;
  onSelectAudience: (audienceTitle: string) => void;
}

export const Audiences: React.FC<AudiencesProps> = ({
  currentLang,
  onSelectAudience,
}) => {
  const t = CONTENT[currentLang];
  const isRtl = currentLang === 'fa';

  const iconMap: Record<string, React.ReactNode> = {
    prep: <Baby className="w-5 h-5 text-[#B45309]" />,
    primary: <BookOpen className="w-5 h-5 text-[#B45309]" />,
    middle: <GraduationCap className="w-5 h-5 text-[#B45309]" />,
    high: <Award className="w-5 h-5 text-[#B45309]" />,
    leaders: <Users2 className="w-5 h-5 text-amber-300" />,
    admin: <Building2 className="w-5 h-5 text-[#B45309]" />,
  };

  return (
    <section id="audiences" className="py-24 md:py-32 bg-transparent border-b border-[#E8E2D4] relative overflow-hidden">
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
            <span>{t.audiences.badge}</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#0B1524] leading-tight">
            {t.audiences.title}
          </h2>
          <p className="text-[#5E7086] text-sm sm:text-base mt-2">
            {t.audiences.subtitle}
          </p>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 72 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full mt-3"
          />
        </motion.div>

        {/* 6-Card Academic Grid with Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.audiences.items.map((item, idx) => {
            const isLeaders = item.highlight;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className={`p-7 rounded-3xl border text-start transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${
                  isLeaders
                    ? 'celestial-card-dark text-white ring-2 ring-amber-500/35'
                    : 'celestial-card border-[#E8E2D4] hover:border-[#B45309] hover:shadow-md'
                }`}
              >
                {/* Subtle corner badge for leadership */}
                {isLeaders && (
                  <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-amber-400/20 to-transparent rounded-bl-full pointer-events-none" />
                )}

                <div>
                  <div className="flex items-center justify-between mb-5 pb-3 border-b border-black/5 dark:border-white/10">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                        isLeaders ? 'bg-white/10 border border-white/15' : 'bg-amber-500/10 border border-amber-600/15'
                      }`}
                    >
                      {iconMap[item.id]}
                    </div>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        isLeaders
                          ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-2xs'
                          : 'bg-[#F6F3EB] text-[#5E7086] border border-[#E8E2D4]'
                      }`}
                    >
                      {item.age}
                    </span>
                  </div>

                  <h3
                    className={`font-bold text-lg mb-2 leading-snug ${
                      isLeaders ? 'text-white' : 'text-[#0B1524] group-hover:text-[#B45309]'
                    } transition-colors`}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`text-xs leading-relaxed mb-6 font-normal ${
                      isLeaders ? 'text-gray-300' : 'text-[#5E7086]'
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>

                <div
                  className={`pt-4 border-t flex items-center justify-between ${
                    isLeaders ? 'border-white/10' : 'border-[#E8E2D4]'
                  }`}
                >
                  <span
                    className={`text-[11px] ${
                      isLeaders ? 'text-gray-400' : 'text-[#7E8E9E]'
                    }`}
                  >
                    {isRtl ? 'محتوای منطبق با صنف' : 'Classroom-tailored'}
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSelectAudience(item.title)}
                    type="button"
                    className={`inline-flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                      isLeaders
                        ? 'text-amber-300 hover:text-white'
                        : 'text-[#B45309] hover:text-[#0B1524]'
                    }`}
                  >
                    <span>{t.audiences.registerAction}</span>
                    <ArrowLeft className={`w-3.5 h-3.5 transition-transform duration-200 ${isRtl ? 'group-hover:-translate-x-1' : 'rotate-180 group-hover:translate-x-1'}`} />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
