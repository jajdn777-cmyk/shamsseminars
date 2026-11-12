import React, { useState, useRef } from 'react';
import {
  ShieldCheck,
  Check,
  CalendarCheck2,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  MoveHorizontal,
} from 'lucide-react';
import { motion } from 'motion/react';
import { CONFIG } from '../config';
import { CONTENT, Language } from '../content';

interface TeamProps {
  currentLang: Language;
  onSelectTrainer?: (trainerName: string) => void;
}

interface TeamMemberItem {
  id: string;
  name: string;
  alias?: string;
  role: string;
  badge: string;
  initials: string;
  photo: string;
  photoPosition?: string;
  degree: string;
  pipeBio: string;
  tags: string[];
  summary: string;
  education?: string[];
  employment?: string[];
  research?: string[];
  phone?: string;
  phoneAlt?: string;
}

export const Team: React.FC<TeamProps> = ({ currentLang, onSelectTrainer }) => {
  const t = CONTENT[currentLang];
  const isRtl = currentLang === 'fa';
  const members = (t.team.members || []) as unknown as TeamMemberItem[];

  // Mobile active state for touch devices without hover
  const [activeMemberId, setActiveMemberId] = useState<string | null>(null);

  // Horizontal scroll container reference
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'prev' | 'next') => {
    if (!scrollContainerRef.current) return;
    const cardWidth = 320;
    // In RTL, scrolling "next" moves to the left in coordinate terms or right visually
    const multiplier = isRtl
      ? direction === 'next' ? -cardWidth : cardWidth
      : direction === 'next' ? cardWidth : -cardWidth;

    scrollContainerRef.current.scrollBy({
      left: multiplier,
      behavior: 'smooth',
    });
  };

  const handleBookWithTrainer = (trainerName: string) => {
    if (onSelectTrainer) {
      onSelectTrainer(trainerName);
    } else {
      const bookingEl = document.getElementById('booking');
      if (bookingEl) {
        bookingEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const getWhatsappTrainerUrl = (trainerName: string) => {
    const text = isRtl
      ? `سلام و احترام، از طریق وبسایت مرکز شمس پیام می‌دهم و علاقه‌مند به هماهنگی سمینار با «${trainerName}» برای مکتب خود هستم.`
      : `Hello, I am contacting you through the Shams Center website to inquire about organizing a workshop with ${trainerName}.`;
    return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section
      id="team"
      className="py-20 md:py-28 bg-[#FBF9F5] border-b border-[#E8E2D4] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Horizontal Scroll Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 text-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
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
            <div className="h-1 w-16 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full mt-3" />
          </motion.div>

          {/* Navigation Controls for Horizontal Browsing */}
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C7A65]">
              <MoveHorizontal className="w-3.5 h-3.5 text-[#B45309]" />
              <span>{isRtl ? 'پیمایش افقی اساتید' : 'Scroll faculty'}</span>
            </span>

            <button
              type="button"
              onClick={() => scroll('prev')}
              title={isRtl ? 'استاد بعدی' : 'Previous trainer'}
              className="w-10 h-10 rounded-xl bg-white hover:bg-amber-50 active:scale-95 border border-[#E8E2D4] hover:border-amber-400 text-[#0B1524] flex items-center justify-center shadow-xs transition-all cursor-pointer"
              aria-label="Scroll backward"
            >
              {isRtl ? (
                <ChevronRight className="w-5 h-5 text-[#B45309]" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-[#B45309]" />
              )}
            </button>

            <button
              type="button"
              onClick={() => scroll('next')}
              title={isRtl ? 'استاد قبلی' : 'Next trainer'}
              className="w-10 h-10 rounded-xl bg-white hover:bg-amber-50 active:scale-95 border border-[#E8E2D4] hover:border-amber-400 text-[#0B1524] flex items-center justify-center shadow-xs transition-all cursor-pointer"
              aria-label="Scroll forward"
            >
              {isRtl ? (
                <ChevronLeft className="w-5 h-5 text-[#B45309]" />
              ) : (
                <ChevronRight className="w-5 h-5 text-[#B45309]" />
              )}
            </button>
          </div>
        </div>

        {/* Quality Standards Strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E8E2D4] mb-10 text-start shadow-xs"
        >
          <div className="flex items-center gap-2.5 mb-3 text-[#0B1524] pb-2.5 border-b border-[#F0EBE1]">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-[#B45309]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-xs sm:text-sm text-[#0B1524]">
              {t.team.criteriaTitle}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs text-[#475569]">
            {t.team.criteria.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#B45309] shrink-0" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mobile Swipe Hint */}
        <div className="sm:hidden flex items-center justify-between mb-3 text-[11px] text-[#8C7A65] font-medium px-1">
          <span className="flex items-center gap-1 text-[#B45309]">
            <MoveHorizontal className="w-3.5 h-3.5 animate-pulse" />
            <span>{isRtl ? 'برای مشاهده سایر اساتید به راست یا چپ بکشید' : 'Swipe horizontally to view all'}</span>
          </span>
          <span className="text-[10px] text-gray-400">
            {members.length} {isRtl ? 'استاد' : 'trainers'}
          </span>
        </div>

        {/* Mobile-Optimized & Horizontally Scrollable Team Track */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-5 pb-6 pt-2 px-1 text-start snap-x snap-mandatory scroll-smooth touch-pan-x"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#D2C9B6 transparent',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {members.map((member, index) => {
            const isActive = activeMemberId === member.id;
            const isFounder = member.id === 'fahima-shams';

            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                onClick={() => setActiveMemberId((prev) => (prev === member.id ? null : member.id))}
                className={`group relative h-[400px] w-[290px] sm:w-[310px] shrink-0 snap-start rounded-2xl overflow-hidden border transition-all duration-300 bg-white flex flex-col justify-end cursor-pointer shadow-sm hover:shadow-xl ${
                  isFounder
                    ? 'border-amber-400/80 ring-2 ring-amber-400/20'
                    : 'border-[#E8E2D4] hover:border-amber-400'
                }`}
              >
                {/* 1. Portrait Photo */}
                <div className="absolute inset-0 w-full h-full overflow-hidden bg-slate-100">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
                      member.photoPosition || 'object-center'
                    }`}
                    loading="lazy"
                  />
                  {/* Subtle top shading for the badge */}
                  <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/35 to-transparent pointer-events-none" />
                </div>

                {/* 2. Top Badge (Founder / Seniority) */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10 pointer-events-none">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold backdrop-blur-xs border shadow-xs ${
                      isFounder
                        ? 'bg-amber-600 text-white border-amber-500 shadow-md font-black'
                        : 'bg-white/95 text-[#B45309] border-amber-200/80'
                    }`}
                  >
                    {member.badge}
                  </span>

                  {isFounder && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#0B1524]/80 text-amber-300 border border-amber-400/30">
                      {isRtl ? 'مرکز شمس' : 'Shams'}
                    </span>
                  )}
                </div>

                {/* 3. Floating Light Content Block at Bottom - Info Appears on Hover */}
                <div
                  className={`relative z-20 m-3 p-3 sm:p-3.5 bg-white/95 backdrop-blur-md rounded-xl border border-[#E8E2D4] group-hover:border-amber-300 shadow-md group-hover:shadow-xl transition-all duration-300 ${
                    isActive ? 'border-amber-300 shadow-xl' : ''
                  }`}
                >
                  {/* Always Visible: Name, Role & subtle hover indicator */}
                  <div className="flex items-center justify-between gap-1">
                    <div className="min-w-0">
                      <h4 className="font-display font-bold text-base text-[#0B1524] leading-tight group-hover:text-[#B45309] transition-colors truncate">
                        {member.name}
                      </h4>
                      <p className="text-[11px] font-semibold text-[#B45309] mt-0.5 leading-snug truncate">
                        {member.role}
                      </p>
                    </div>

                    {/* Subtle sparkle indicator on initial view */}
                    <span className="p-1 rounded-md text-amber-500/70 group-hover:text-amber-600 transition-colors shrink-0">
                      <Sparkles className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Appears on Hover (and touch active on mobile): Short Info & Action Buttons */}
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isActive
                        ? 'grid-rows-[1fr] opacity-100 mt-2.5 pt-2 border-t border-[#F0EBE1]'
                        : 'grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-hover:mt-2.5 group-hover:pt-2 group-hover:border-t group-hover:border-[#F0EBE1]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      {/* Short Info Text (Clean pipe-separated highlights, not a whole paragraph) */}
                      <p className="text-[11px] text-[#475569] leading-relaxed line-clamp-2 mb-2.5">
                        {member.pipeBio}
                      </p>

                      {/* Direct Action Buttons */}
                      <div className="flex items-center gap-1.5 pt-0.5">
                        {/* Primary Working Button: Scrolls to booking and pre-selects trainer */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBookWithTrainer(member.name);
                          }}
                          title={isRtl ? 'ثبت وقت با این استاد' : 'Book with this Trainer'}
                          className="flex-1 py-1.5 px-2.5 rounded-lg bg-[#B45309] hover:bg-[#92400E] active:scale-98 text-white font-bold text-[11px] shadow-xs flex items-center justify-center gap-1 transition-all cursor-pointer"
                        >
                          <CalendarCheck2 className="w-3 h-3 shrink-0" />
                          <span>{isRtl ? 'درخواست سمینار' : 'Book Seminar'}</span>
                          {isRtl ? (
                            <ArrowLeft className="w-3 h-3 shrink-0" />
                          ) : (
                            <ArrowRight className="w-3 h-3 shrink-0" />
                          )}
                        </button>

                        {/* Quick WhatsApp Inquiry */}
                        <a
                          href={getWhatsappTrainerUrl(member.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          title={isRtl ? 'استعلام واتساپ' : 'Inquire on WhatsApp'}
                          className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800 border border-emerald-200 transition-colors shrink-0"
                          aria-label="WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
