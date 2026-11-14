import React, { useState, useRef, useEffect } from 'react';
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

  // Active card index for mobile navigation controls & touch expansion
  const [activeMemberId, setActiveMemberId] = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Reset scroll & active slide when language changes
  useEffect(() => {
    setActiveSlide(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, [currentLang]);

  const scrollToCard = (targetIndex: number) => {
    const bounded = Math.max(0, Math.min(members.length - 1, targetIndex));
    setActiveSlide(bounded);
    const cardEl = cardRefs.current[bounded];
    if (cardEl) {
      cardEl.scrollIntoView({
        behavior: 'smooth',
        inline: 'start',
        block: 'nearest',
      });
    }
  };

  const handleStep = (direction: 'prev' | 'next') => {
    const nextIdx = direction === 'next' ? activeSlide + 1 : activeSlide - 1;
    scrollToCard(nextIdx);
  };

  const handleTrackScroll = () => {
    const container = scrollContainerRef.current;
    if (!container || cardRefs.current.length === 0) return;

    const containerRect = container.getBoundingClientRect();
    let closestIdx = 0;
    let minDistance = Infinity;

    cardRefs.current.forEach((el, idx) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const distance = isRtl
        ? Math.abs(rect.right - containerRect.right)
        : Math.abs(rect.left - containerRect.left);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });

    setActiveSlide(closestIdx);
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
      className="py-16 md:py-28 bg-[#FBF9F5] border-b border-[#E8E2D4] relative overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Horizontal Scroll Controls (visible on tablet/mobile) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-10 text-start">
          <div className="max-w-3xl">
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
          </div>

          {/* Navigation Controls for Horizontal Browsing on mobile/tablet */}
          <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0 lg:hidden">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C7A65]">
              <MoveHorizontal className="w-3.5 h-3.5 text-[#B45309]" />
              <span>{isRtl ? 'پیمایش افقی اساتید' : 'Scroll faculty'}</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleStep(isRtl ? 'next' : 'prev')}
                disabled={isRtl ? activeSlide >= members.length - 1 : activeSlide <= 0}
                title={isRtl ? 'استاد بعدی' : 'Previous trainer'}
                className="w-10 h-10 rounded-xl bg-white hover:bg-amber-50 active:scale-95 disabled:opacity-40 border border-[#E8E2D4] hover:border-amber-400 text-[#0B1524] flex items-center justify-center shadow-xs transition-all cursor-pointer disabled:cursor-not-allowed"
                aria-label={isRtl ? 'استاد بعدی' : 'Previous trainer'}
              >
                <ChevronLeft className="w-5 h-5 text-[#B45309]" />
              </button>

              <button
                type="button"
                onClick={() => handleStep(isRtl ? 'prev' : 'next')}
                disabled={isRtl ? activeSlide <= 0 : activeSlide >= members.length - 1}
                title={isRtl ? 'استاد قبلی' : 'Next trainer'}
                className="w-10 h-10 rounded-xl bg-white hover:bg-amber-50 active:scale-95 disabled:opacity-40 border border-[#E8E2D4] hover:border-amber-400 text-[#0B1524] flex items-center justify-center shadow-xs transition-all cursor-pointer disabled:cursor-not-allowed"
                aria-label={isRtl ? 'استاد قبلی' : 'Next trainer'}
              >
                <ChevronRight className="w-5 h-5 text-[#B45309]" />
              </button>
            </div>
          </div>
        </div>

        {/* Quality Standards Strip */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E8E2D4] mb-8 md:mb-10 text-start shadow-xs">
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
        </div>

        {/* Mobile Swipe Hint */}
        <div className="lg:hidden flex items-center justify-between mb-3 text-[11px] text-[#8C7A65] font-medium px-1">
          <span className="flex items-center gap-1 text-[#B45309]">
            <MoveHorizontal className="w-3.5 h-3.5 animate-pulse" />
            <span>{isRtl ? 'برای مشاهده سایر اساتید به راست یا چپ بکشید' : 'Swipe horizontally to view all'}</span>
          </span>
          <span className="text-[11px] font-semibold text-[#5E7086]">
            {activeSlide + 1} / {members.length}
          </span>
        </div>

        {/* Team Track: 5-column grid on desktop (lg+), smooth horizontal carousel on mobile/tablet */}
        <div
          ref={scrollContainerRef}
          onScroll={handleTrackScroll}
          dir={isRtl ? 'rtl' : 'ltr'}
          className="flex lg:grid lg:grid-cols-5 overflow-x-auto lg:overflow-x-visible gap-4 md:gap-5 pb-4 lg:pb-0 pt-1 px-1 snap-x snap-mandatory scroll-smooth touch-pan-x"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#D2C9B6 transparent',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {members.map((member, index) => {
            const isActive = activeMemberId === member.id;
            const isFounder = member.id === 'fahima-shams';
            const imgFailed = failedImages[member.id];

            return (
              <div
                key={member.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                onClick={() => setActiveMemberId((prev) => (prev === member.id ? null : member.id))}
                className={`group relative flex flex-col lg:justify-end w-[84vw] max-w-[310px] sm:w-[305px] lg:w-full lg:h-[430px] shrink-0 snap-start rounded-2xl overflow-hidden border transition-all duration-300 bg-white cursor-pointer shadow-sm hover:shadow-xl text-start ${
                  isFounder
                    ? 'border-amber-400/80 ring-2 ring-amber-400/20'
                    : 'border-[#E8E2D4] hover:border-amber-400'
                }`}
              >
                {/* 1. Portrait Photo: clean unobstructed top block on mobile, full-bleed background on desktop */}
                <div className="relative h-[255px] w-full shrink-0 lg:absolute lg:inset-0 lg:h-full overflow-hidden bg-slate-100">
                  {!imgFailed ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      loading="eager"
                      decoding="async"
                      onError={() =>
                        setFailedImages((prev) => ({
                          ...prev,
                          [member.id]: true,
                        }))
                      }
                      className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
                        member.photoPosition || 'object-center'
                      }`}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-amber-50 text-[#B45309] font-display font-black text-3xl">
                      {member.initials}
                    </div>
                  )}

                  {/* Subtle top shading for the badge */}
                  <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />

                  {/* 2. Top Credential Badge */}
                  <div className="absolute top-3 start-3 z-10 pointer-events-none">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold backdrop-blur-xs border shadow-xs ${
                        isFounder
                          ? 'bg-amber-600 text-white border-amber-500 shadow-md font-black'
                          : 'bg-white/95 text-[#B45309] border-amber-200/80'
                      }`}
                    >
                      {member.badge}
                    </span>
                  </div>
                </div>

                {/* 3. Content Block: solid full card body on mobile, floating bottom hover drawer on desktop */}
                <div
                  className={`relative z-20 flex-1 lg:flex-none flex flex-col justify-between p-4 lg:m-3 lg:p-3.5 bg-white lg:bg-white/95 lg:backdrop-blur-md border-t border-[#F0EBE1] lg:border lg:rounded-xl lg:border-[#E8E2D4] lg:group-hover:border-amber-300 lg:shadow-md lg:group-hover:shadow-xl transition-all duration-300 ${
                    isActive ? 'lg:border-amber-300 lg:shadow-xl' : ''
                  }`}
                >
                  {/* Always Visible: Name, Role & hover sparkle */}
                  <div className="flex items-center justify-between gap-1">
                    <div className="min-w-0">
                      <h4 className="font-display font-bold text-base text-[#0B1524] leading-tight group-hover:text-[#B45309] transition-colors truncate">
                        {member.name}
                      </h4>
                      <p className="text-[11px] font-semibold text-[#B45309] mt-0.5 leading-snug truncate">
                        {member.role}
                      </p>
                    </div>

                    <span className="hidden lg:inline-flex p-1 rounded-md text-amber-500/70 group-hover:text-amber-600 transition-colors shrink-0">
                      <Sparkles className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Bio Text Paragraph & Action Buttons: ALWAYS VISIBLE ON MOBILE, HOVER ON DESKTOP */}
                  <div
                    className={`flex-1 flex flex-col justify-between lg:grid transition-all duration-300 ease-out mt-2.5 pt-2.5 border-t border-[#F0EBE1] lg:mt-0 lg:pt-0 lg:border-t-0 lg:grid-rows-[0fr] lg:opacity-0 lg:pointer-events-none lg:group-hover:pointer-events-auto lg:group-hover:grid-rows-[1fr] lg:group-hover:opacity-100 lg:group-hover:mt-2.5 lg:group-hover:pt-2 lg:group-hover:border-t lg:group-hover:border-[#F0EBE1] ${
                      isActive ? 'lg:grid-rows-[1fr] lg:opacity-100 lg:mt-2.5 lg:pt-2 lg:border-t lg:border-[#F0EBE1] lg:pointer-events-auto' : ''
                    }`}
                  >
                    <div className="lg:overflow-hidden flex flex-col justify-between h-full">
                      {/* Full Info Text Paragraph */}
                      <p className="text-xs lg:text-[11px] text-[#334155] leading-relaxed mb-3 lg:mb-2.5 font-normal">
                        {member.summary}
                      </p>

                      {/* Direct Action Buttons */}
                      <div className="flex items-center gap-1.5 pt-0.5 mt-auto">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBookWithTrainer(member.name);
                          }}
                          title={isRtl ? 'ثبت وقت با این استاد' : 'Book with this Trainer'}
                          className="flex-1 py-2 lg:py-1.5 px-2.5 rounded-lg bg-[#B45309] hover:bg-[#92400E] active:scale-98 text-white font-bold text-xs lg:text-[11px] shadow-xs flex items-center justify-center gap-1 transition-all cursor-pointer"
                        >
                          <CalendarCheck2 className="w-3.5 h-3.5 lg:w-3 lg:h-3 shrink-0" />
                          <span>{isRtl ? 'درخواست سمینار' : 'Book Seminar'}</span>
                          {isRtl ? (
                            <ArrowLeft className="w-3.5 h-3.5 lg:w-3 lg:h-3 shrink-0" />
                          ) : (
                            <ArrowRight className="w-3.5 h-3.5 lg:w-3 lg:h-3 shrink-0" />
                          )}
                        </button>

                        <a
                          href={getWhatsappTrainerUrl(member.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          title={isRtl ? 'استعلام واتساپ' : 'Inquire on WhatsApp'}
                          className="p-2 lg:p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800 border border-emerald-200 transition-colors shrink-0"
                          aria-label={`WhatsApp ${member.name}`}
                        >
                          <MessageCircle className="w-4 h-4 lg:w-3.5 lg:h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Dot Pagination Indicators */}
        <div className="lg:hidden flex items-center justify-center gap-2 mt-4">
          {members.map((member, idx) => (
            <button
              key={member.id}
              type="button"
              onClick={() => scrollToCard(idx)}
              aria-label={member.name}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                activeSlide === idx
                  ? 'w-6 bg-[#B45309]'
                  : 'w-2 bg-[#D2C9B6] hover:bg-[#B45309]/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
