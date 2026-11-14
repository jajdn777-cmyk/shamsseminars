import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CONTENT, Language } from '../content';
import { toPersianDigits } from '../lib/date';

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
    <section id="programs" className="py-16 md:py-24 bg-[#F6F3EB]/50 border-b border-[#E8E2D4]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-start">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[#0B1524] leading-tight">
              {t.programs.title}
            </h2>
            <p className="text-[#5E7086] text-sm sm:text-base mt-2">
              {t.audiences.subtitle}
            </p>
          </div>

          {/* Clean Segmented Tab Control */}
          <div className="inline-flex p-1 rounded-xl bg-white border border-[#E8E2D4] shrink-0 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('teachers')}
              type="button"
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'teachers'
                  ? 'bg-[#0B1524] text-white'
                  : 'text-[#5E7086] hover:text-[#0B1524]'
              }`}
            >
              {t.programs.tabTeachers}
            </button>
            <button
              onClick={() => setActiveTab('leaders')}
              type="button"
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'leaders'
                  ? 'bg-[#0B1524] text-white'
                  : 'text-[#5E7086] hover:text-[#0B1524]'
              }`}
            >
              {t.programs.tabLeaders}
            </button>
          </div>
        </div>

        {/* Clean Minimal Workshop Grid (No pill badges, corner glows, or repeated icon clutter) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {currentList.map((prog, idx) => (
            <div
              key={prog.id}
              className="bg-white rounded-2xl p-6 border border-[#E8E2D4] hover:border-[#B45309]/50 transition-colors flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-[#B45309] tabular-nums">
                  {isRtl ? `۰${toPersianDigits(idx + 1)}` : `0${idx + 1}`}
                </span>
                <h3 className="font-bold text-base text-[#0B1524] mt-2 leading-snug">
                  {prog.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#5E7086] leading-relaxed mt-2 mb-5">
                  {prog.desc}
                </p>
              </div>

              <button
                onClick={() => onRequestTopic(prog.title)}
                type="button"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B45309] hover:text-[#0B1524] transition-colors cursor-pointer pt-3 border-t border-[#F0EBE1] self-start"
              >
                <span>{t.programs.requestBtn}</span>
                {isRtl ? (
                  <ArrowLeft className="w-3.5 h-3.5" />
                ) : (
                  <ArrowRight className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
