import React, { useState, useRef, useEffect } from 'react';
import {
  CalendarCheck2,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { CONFIG } from '../config';
import { CONTENT, Language } from '../content';
import { toPersianDigits } from '../lib/date';

interface TeamProps {
  currentLang: Language;
  onSelectTrainer?: (trainerName: string) => void;
}

interface TeamMemberItem {
  id: string;
  name: string;
  role: string;
  initials: string;
  photo: string;
  photoPosition?: string;
  summary: string;
}

export const Team: React.FC<TeamProps> = ({ currentLang, onSelectTrainer }) => {
  const t = CONTENT[currentLang];
  const isRtl = currentLang === 'fa';
  const members = (t.team.members || []) as unknown as TeamMemberItem[];

  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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
      className="py-16 md:py-24 bg-[#FDFBF7] border-b border-[#E8E2D4] overflow-x-clip"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 text-start">
          <div className="max-w-2xl">
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[#0B1524] leading-tight">
              {t.team.title}
            </h2>
            <p className="text-[#5E7086] text-sm sm:text-base mt-2">
              {t.team.subtitle}
            </p>
          </div>

          {/* Mobile Carousel Controls */}
          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 lg:hidden">
            <span className="text-xs font-semibold text-[#5E7086]">
              {isRtl
                ? `${toPersianDigits(activeSlide + 1)} از ${toPersianDigits(members.length)}`
                : `${activeSlide + 1} / ${members.length}`}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleStep(isRtl ? 'next' : 'prev')}
                disabled={isRtl ? activeSlide >= members.length - 1 : activeSlide <= 0}
                title={isRtl ? 'استاد بعدی' : 'Previous trainer'}
                className="w-10 h-10 rounded-xl bg-white hover:bg-[#F6F3EB] disabled:opacity-40 border border-[#E8E2D4] text-[#0B1524] flex items-center justify-center transition-colors cursor-pointer disabled:cursor-not-allowed"
                aria-label={isRtl ? 'استاد بعدی' : 'Previous trainer'}
              >
                <ChevronLeft className="w-5 h-5 text-[#B45309]" />
              </button>

              <button
                type="button"
                onClick={() => handleStep(isRtl ? 'prev' : 'next')}
                disabled={isRtl ? activeSlide <= 0 : activeSlide >= members.length - 1}
                title={isRtl ? 'استاد قبلی' : 'Next trainer'}
                className="w-10 h-10 rounded-xl bg-white hover:bg-[#F6F3EB] disabled:opacity-40 border border-[#E8E2D4] text-[#0B1524] flex items-center justify-center transition-colors cursor-pointer disabled:cursor-not-allowed"
                aria-label={isRtl ? 'استاد قبلی' : 'Next trainer'}
              >
                <ChevronRight className="w-5 h-5 text-[#B45309]" />
              </button>
            </div>
          </div>
        </div>

        {/* Team Cards: Horizontal swipe on mobile/tablet, clean 3-column grid on desktop */}
        <div
          ref={scrollContainerRef}
          onScroll={handleTrackScroll}
          dir={isRtl ? 'rtl' : 'ltr'}
          className="flex lg:grid lg:grid-cols-3 overflow-x-auto lg:overflow-x-visible gap-5 pb-3 lg:pb-0 snap-x snap-mandatory scroll-smooth touch-pan-x"
          style={{
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {members.map((member, index) => {
            const imgFailed = failedImages[member.id];

            return (
              <div
                key={member.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="flex flex-col w-[85vw] max-w-[330px] sm:w-[320px] lg:w-full shrink-0 snap-start rounded-2xl overflow-hidden border border-[#E8E2D4] bg-white text-start"
              >
                {/* Clean Unobstructed Portrait Photo (no overlay pills or dark gradients) */}
                <div className="relative h-[250px] w-full shrink-0 overflow-hidden bg-[#F6F3EB]">
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
                      className={`w-full h-full object-cover ${
                        member.photoPosition || 'object-center'
                      }`}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-amber-50 text-[#B45309] font-display font-black text-3xl">
                      {member.initials}
                    </div>
                  )}
                </div>

                {/* Clean Card Body */}
                <div className="flex-1 flex flex-col justify-between p-5 border-t border-[#F0EBE1]">
                  <div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-[#0B1524] leading-snug">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#B45309] mt-0.5 leading-snug">
                      {member.role}
                    </p>
                    <p className="text-xs sm:text-[13px] text-[#475569] leading-[1.8] mt-3 pt-3 border-t border-[#F0EBE1]">
                      {member.summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-4 mt-4 border-t border-[#F0EBE1]">
                    <button
                      type="button"
                      onClick={() => handleBookWithTrainer(member.name)}
                      className="flex-1 py-2.5 px-3 rounded-lg bg-[#0B1524] hover:bg-[#162944] text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <CalendarCheck2 className="w-3.5 h-3.5 shrink-0" />
                      <span>{isRtl ? 'درخواست سمینار' : 'Book Seminar'}</span>
                      {isRtl ? (
                        <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
                      ) : (
                        <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                      )}
                    </button>

                    <a
                      href={getWhatsappTrainerUrl(member.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={isRtl ? 'استعلام واتساپ' : 'Inquire on WhatsApp'}
                      className="p-2.5 rounded-lg bg-[#F6F3EB] text-[#0B1524] hover:bg-emerald-50 hover:text-emerald-700 border border-[#E8E2D4] transition-colors shrink-0"
                      aria-label={`WhatsApp ${member.name}`}
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Dot Pagination Indicators */}
        <div className="lg:hidden flex items-center justify-center gap-2 mt-5">
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
