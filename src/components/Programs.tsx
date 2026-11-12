import React, { useState } from 'react';
import { CalendarPlus, BookCheck, Clock, Award, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CONTENT, Language } from '../content';

interface ProgramsProps {
  currentLang: Language;
  onRequestTopic: (topicTitle: string) => void;
}

export const Programs: React.FC<ProgramsProps> = ({
  currentLang,
  onRequestTopic,
}) => {
  const [activeTab, setActiveTab] = useState<'teachers' | 'leaders'>('teachers');
  const t = CONTENT[currentLang];
  const isRtl = currentLang === 'fa';

  const currentList =
    activeTab === 'teachers' ? t.programs.teacherTopics : t.programs.leaderTopics;

  return (
    <section id="programs" className="py-24 md:py-32 bg-gradient-to-b from-[#F6F3EB]/70 via-[#FDFBF7]/90 to-[#F6F3EB]/70 border-b border-[#E8E2D4] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with On-Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-12 text-start"
        >
          <div className="text-xs font-bold text-[#B45309] uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="w-3 h-0.5 bg-[#B45309] rounded-full" />
            <span>{t.programs.badge}</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#0B1524] leading-tight">
            {t.programs.title}
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 72 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full mt-3"
          />
        </motion.div>

        {/* Animated Segmented Tab Control */}
        <div className="flex justify-start mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-white/95 border border-[#D2C9B6] shadow-2xs relative">
            <button
              onClick={() => setActiveTab('teachers')}
              type="button"
              className={`relative z-10 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                activeTab === 'teachers' ? 'text-white' : 'text-[#5E7086] hover:text-[#0B1524]'
              }`}
            >
              {t.programs.tabTeachers}
              {activeTab === 'teachers' && (
                <motion.div
                  layoutId="programTabActive"
                  className="absolute inset-0 bg-[#0B1524] rounded-xl -z-10 shadow-xs"
                  transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('leaders')}
              type="button"
              className={`relative z-10 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                activeTab === 'leaders' ? 'text-white' : 'text-[#5E7086] hover:text-[#0B1524]'
              }`}
            >
              {t.programs.tabLeaders}
              {activeTab === 'leaders' && (
                <motion.div
                  layoutId="programTabActive"
                  className="absolute inset-0 bg-[#0B1524] rounded-xl -z-10 shadow-xs"
                  transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                />
              )}
            </button>
          </div>
        </div>

        {/* Course Catalog Grid with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {currentList.map((prog, idx) => (
              <motion.div
                key={prog.id}
                whileHover={{ y: -6, borderColor: 'rgba(180, 83, 9, 0.5)' }}
                className="celestial-card rounded-3xl p-7 hover:shadow-lg transition-all duration-300 text-start flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Subtle golden top-corner glow */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-amber-400/15 to-transparent rounded-bl-3xl pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E8E2D4]">
                    <span className="font-mono text-xs font-bold text-[#B45309] bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-600/20">
                      {isRtl ? `دوره ۰${idx + 1} · ${prog.tag}` : `Module 0${idx + 1} · ${prog.tag}`}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-[#B45309] group-hover:bg-[#B45309] group-hover:text-white transition-colors">
                      <BookCheck className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-bold text-base sm:text-lg text-[#0B1524] mb-2 leading-snug group-hover:text-[#B45309] transition-colors">
                    {prog.title}
                  </h3>

                  <p className="text-xs text-[#5E7086] leading-relaxed mb-6 font-normal">
                    {prog.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8E2D4]">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onRequestTopic(prog.title)}
                    type="button"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white hover:bg-[#B45309] text-[#0B1524] hover:text-white border border-[#D2C9B6] hover:border-[#B45309] text-xs font-bold transition-all cursor-pointer shadow-2xs hover:shadow-md"
                  >
                    <CalendarPlus className="w-4 h-4" />
                    <span>{t.programs.requestBtn}</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
