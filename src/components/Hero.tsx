import React, { useState } from 'react';
import { ArrowLeft, Compass, CheckCircle2, Sparkles, Sun, Shield, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CONTENT, Language } from '../content';

interface HeroProps {
  currentLang: Language;
  onBookClick: () => void;
  onModelClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  onBookClick,
  onModelClick,
}) => {
  const [activeOrbitNode, setActiveOrbitNode] = useState<number>(0);
  const t = CONTENT[currentLang];
  const isRtl = currentLang === 'fa';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: 'easeOut' as const },
    },
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-28 border-b border-[#E8E2D4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center"
        >
          {/* Main Editorial Text Column */}
          <div className="lg:col-span-7 space-y-6 text-start">
            
            {/* Tagline kicker with glowing solar badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-600/25 text-xs md:text-sm font-semibold text-[#B45309] shadow-2xs backdrop-blur-xs"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B45309]" />
              </span>
              <span>{t.hero.tagline}</span>
              <span className="text-[#A8B4C0]" aria-hidden="true">·</span>
              <span className="text-[#5E7086] font-normal">{t.hero.location}</span>
            </motion.div>

            {/* Dominant Bilingual Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-[3.6rem] text-[#0B1524] leading-[1.28] tracking-tight"
            >
              {t.hero.h1Part1}
              <span className="text-[#B45309] block sm:inline font-heading font-normal relative ps-2">
                {t.hero.h1Part2}
                <svg
                  className="absolute -bottom-2 inset-x-0 w-full h-2 text-amber-500/40 pointer-events-none hidden sm:block"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="2.5" fill="none" />
                </svg>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-[#2C3E55] leading-[1.9] max-w-2xl font-normal"
            >
              {t.hero.sub}
            </motion.p>

            {/* Action Buttons with Motion Hover */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <motion.button
                whileHover={{ scale: 1.025, boxShadow: '0 8px 25px -4px rgba(180, 83, 9, 0.35)' }}
                whileTap={{ scale: 0.98 }}
                onClick={onBookClick}
                type="button"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#B45309] via-[#D97706] to-[#B45309] text-white font-bold text-sm sm:text-base shadow-sm transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#B45309]"
              >
                <span>{t.hero.ctaPrimary}</span>
                <ArrowLeft
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isRtl ? 'group-hover:-translate-x-1' : 'rotate-180 group-hover:translate-x-1'
                  }`}
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: '#F6F3EB' }}
                whileTap={{ scale: 0.98 }}
                onClick={onModelClick}
                type="button"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/95 backdrop-blur-sm text-[#0B1524] font-bold text-sm sm:text-base border border-[#D2C9B6] shadow-2xs hover:border-[#0B1524] transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0B1524]"
              >
                <Compass className="w-4 h-4 text-[#B45309]" />
                <span>{t.hero.ctaSecondary}</span>
              </motion.button>
            </motion.div>

            {/* Assurances ribbon with animated checkmarks */}
            <motion.div
              variants={itemVariants}
              className="pt-5 border-t border-[#E8E2D4] flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs text-[#5E7086]"
            >
              {t.hero.assurances.map((item, idx) => (
                <span key={idx} className="inline-flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#B45309]" />
                  <span>{item}</span>
                </span>
              ))}
            </motion.div>

          </div>

          {/* Side Column: Kinetic 3D Astrolabe & Solar Orbit Display */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5"
          >
            <div className="celestial-card rounded-3xl p-6 sm:p-8 relative overflow-hidden group hover:border-[#B45309]/60 transition-all duration-300">
              
              {/* Radial flare behind dial */}
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-gradient-to-br from-amber-400/20 to-transparent rounded-full blur-2xl pointer-events-none" />

              {/* Header Ribbon of the Astrolabe */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E8E2D4] relative z-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#0B1524] flex items-center justify-center text-amber-400 shadow-2xs">
                    <Sun className="w-4 h-4 animate-spin [animation-duration:18s]" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0B1524]">
                    {t.hero.matrixTitle}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-[#B45309] px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-600/20">
                  {t.hero.matrixBadge}
                </span>
              </div>

              {/* Kinetic Astrolabe Dial Mechanism */}
              <div className="relative py-2 flex flex-col items-center justify-center">
                
                {/* SVG Solar Axis Dial with smooth rotating motion */}
                <div className="w-56 h-56 relative flex items-center justify-center mb-6">
                  
                  {/* Outer slow-spinning decorative ring with degree markings */}
                  <motion.svg
                    animate={{ rotate: 360 }}
                    transition={{ duration: 75, repeat: Infinity, ease: 'linear' }}
                    viewBox="0 0 240 240"
                    className="w-full h-full text-[#D2C9B6] absolute inset-0"
                  >
                    <circle cx="120" cy="120" r="112" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" />
                    <circle cx="120" cy="120" r="92" fill="none" stroke="#B45309" strokeOpacity="0.3" strokeWidth="1.2" />
                    <line x1="120" y1="8" x2="120" y2="232" stroke="#B45309" strokeOpacity="0.2" strokeWidth="0.75" />
                    <line x1="8" y1="120" x2="232" y2="120" stroke="#B45309" strokeOpacity="0.2" strokeWidth="0.75" />
                  </motion.svg>

                  {/* Middle counter-rotating astrolabe ring with 4 solar beacons */}
                  <motion.svg
                    animate={{ rotate: -360 }}
                    transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                    viewBox="0 0 240 240"
                    className="w-full h-full text-[#B45309] absolute inset-0"
                  >
                    <circle cx="120" cy="120" r="62" fill="none" stroke="#D97706" strokeWidth="1.5" strokeDasharray="5 7" />
                    <circle cx="120" cy="58" r="4" fill="#B45309" />
                    <circle cx="182" cy="120" r="4" fill="#B45309" />
                    <circle cx="120" cy="182" r="4" fill="#B45309" />
                    <circle cx="58" cy="120" r="4" fill="#B45309" />
                  </motion.svg>

                  {/* Core Golden Sun Core with breathing glow */}
                  <motion.div
                    animate={{ scale: [1, 1.04, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-[#0B1524] to-[#162944] border-2 border-amber-400 flex flex-col items-center justify-center shadow-lg cursor-pointer"
                  >
                    <span className="font-heading text-base font-bold text-amber-300">
                      {t.hero.sunCenter}
                    </span>
                    <span className="text-[8px] font-mono text-amber-400/80 -mt-0.5">
                      SHAMS
                    </span>
                  </motion.div>
                </div>

                {/* 3 Core Interactive Highlights from the content dictionary */}
                <div className="w-full space-y-2.5">
                  {t.hero.orbitCards.map((card, idx) => {
                    const isSelected = activeOrbitNode === idx;
                    return (
                      <motion.div
                        key={idx}
                        onClick={() => setActiveOrbitNode(idx)}
                        whileHover={{ x: isRtl ? -4 : 4 }}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                          isSelected
                            ? 'bg-amber-500/10 border-amber-500/50 shadow-xs'
                            : 'bg-white/80 border-[#E8E2D4] hover:border-[#B45309]/40'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-lg font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            isSelected
                              ? 'bg-[#B45309] text-white shadow-2xs'
                              : 'bg-[#0B1524] text-amber-400'
                          }`}
                        >
                          {idx + 1}
                        </div>
                        <div className="text-start">
                          <div className="text-xs font-bold text-[#0B1524]">
                            {card.title}
                          </div>
                          <div className="text-[11px] text-[#5E7086] mt-0.5 leading-relaxed">
                            {card.desc}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

              </div>

            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};
