import React from 'react';
import { ShieldCheck, Check, Award, GraduationCap, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { CONFIG } from '../config';
import { CONTENT, Language } from '../content';

interface TeamProps {
  currentLang: Language;
}

export const Team: React.FC<TeamProps> = ({ currentLang }) => {
  const t = CONTENT[currentLang];
  const isRtl = currentLang === 'fa';

  const teamMembers = isRtl
    ? CONFIG.team
    : [
        {
          id: 'lead-1',
          name: 'Academic Directorate & Advisory Board',
          role: 'Instructional Supervision Lead',
          initials: 'AD',
          bio: 'Seasoned educational advisor with over 15 years directing teacher development and active pedagogical design in Kabul schools.',
          badge: 'Directorate',
        },
        {
          id: 'lead-2',
          name: 'Primary & Early Years Faculty',
          role: 'Early Childhood Methodology Specialist',
          initials: 'EY',
          bio: 'Specialist in playful learning, motor skills development, and positive behavioral management for grades 1 through 6.',
          badge: 'Faculty',
        },
        {
          id: 'lead-3',
          name: 'Secondary Science & Leadership Faculty',
          role: 'Curriculum & School Leadership Coach',
          initials: 'SL',
          bio: 'Expert coach in instructional supervision, clinical feedback for head teachers, and scientific lesson architecture.',
          badge: 'Faculty',
        },
      ];

  return (
    <section id="team" className="py-24 md:py-32 bg-gradient-to-b from-[#F6F3EB]/70 via-[#FDFBF7]/90 to-[#F6F3EB]/70 border-b border-[#E8E2D4] relative overflow-hidden">
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
            <span>{t.team.badge}</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#0B1524] leading-tight">
            {t.team.title}
          </h2>
          <p className="text-[#5E7086] text-sm sm:text-base mt-2">
            {t.team.subtitle}
          </p>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 72 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full mt-3"
          />
        </motion.div>

        {/* Selection Criteria Box with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="celestial-card rounded-3xl p-6 sm:p-8 border border-[#D2C9B6] mb-14 text-start shadow-sm"
        >
          <div className="flex items-center gap-2.5 mb-5 text-[#0B1524] pb-3 border-b border-[#E8E2D4]">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-[#B45309]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base sm:text-lg">
              {t.team.criteriaTitle}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm text-[#2C3E55]">
            {t.team.criteria.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#B45309] shrink-0" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 3 Profile Cards with Motion */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-start">
          {teamMembers.map((member, index) => {
            const isLead = index === 0;
            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -6, borderColor: 'rgba(180, 83, 9, 0.5)' }}
                className={`celestial-card rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group ${
                  isLead
                    ? 'border-[#B45309] shadow-md ring-1 ring-amber-500/25'
                    : 'border-[#E8E2D4] hover:shadow-md'
                }`}
              >
                {/* Golden corner emblem */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-amber-400/15 to-transparent rounded-bl-3xl pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#E8E2D4]">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg ${
                        isLead
                          ? 'bg-gradient-to-br from-[#0B1524] to-[#162944] text-amber-300 shadow-md border border-amber-500/30'
                          : 'bg-[#F6F3EB] text-[#0B1524] border border-[#E8E2D4]'
                      }`}
                    >
                      {member.initials}
                    </div>

                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        isLead
                          ? 'bg-[#B45309] text-white shadow-2xs'
                          : 'bg-[#F6F3EB] text-[#5E7086] border border-[#E8E2D4]'
                      }`}
                    >
                      {member.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-[#0B1524] mb-1 leading-snug">
                    {member.name}
                  </h3>

                  <div className="text-xs font-semibold text-[#B45309] mb-4">
                    {member.role}
                  </div>

                  <p className="text-xs text-[#5E7086] leading-relaxed font-normal">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-[#E8E2D4] flex items-center justify-between text-[11px] text-[#7E8E9E]">
                  <span>{isRtl ? 'تخصص و نظارت بالینی' : 'Clinical Supervision'}</span>
                  <span className="font-bold text-[#0B1524]">{isRtl ? 'مرکز شمس' : 'Shams Center'}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
