import React from 'react';
import { Language } from '../content';

interface SunLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  showSubtitle?: boolean;
  textClassName?: string;
  subtitle?: string;
  dark?: boolean;
  currentLang?: Language;
}

export const SunLogo: React.FC<SunLogoProps> = ({
  className = '',
  size = 38,
  showText = true,
  showSubtitle = true,
  textClassName = '',
  subtitle,
  dark = false,
  currentLang = 'fa',
}) => {
  const isEn = currentLang === 'en';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Dignified Institutional Solar Seal */}
      <div
        className="relative shrink-0 flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <circle
            cx="32"
            cy="32"
            r="30"
            stroke={dark ? 'rgba(251, 191, 36, 0.35)' : 'rgba(180, 83, 9, 0.25)'}
            strokeWidth="1.2"
          />
          <circle
            cx="32"
            cy="32"
            r="23"
            stroke={dark ? '#F59E0B' : '#B45309'}
            strokeWidth="1.5"
            fill={dark ? '#0B1524' : '#FFFFFF'}
          />
          <circle
            cx="32"
            cy="32"
            r="8"
            fill={dark ? '#F59E0B' : '#B45309'}
          />
          <g
            stroke={dark ? '#F59E0B' : '#B45309'}
            strokeWidth="1.75"
            strokeLinecap="round"
          >
            <line x1="32" y1="4" x2="32" y2="10" />
            <line x1="32" y1="54" x2="32" y2="60" />
            <line x1="4" y1="32" x2="10" y2="32" />
            <line x1="54" y1="32" x2="60" y2="32" />
            <line x1="12" y1="12" x2="16.5" y2="16.5" />
            <line x1="47.5" y1="47.5" x2="52" y2="52" />
            <line x1="12" y1="52" x2="16.5" y2="47.5" />
            <line x1="47.5" y1="16.5" x2="52" y2="12" />
          </g>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-tight text-start">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-display font-extrabold text-lg sm:text-xl tracking-normal whitespace-nowrap ${
                dark ? 'text-white' : 'text-[#0B1524]'
              } ${textClassName}`}
            >
              {isEn ? (
                <>
                  Shams <span className={dark ? 'text-[#F59E0B]' : 'text-[#B45309]'}>Center</span>
                </>
              ) : (
                <>
                  مرکز <span className={dark ? 'text-[#F59E0B]' : 'text-[#B45309]'}>شمس</span>
                </>
              )}
            </span>
          </div>
          {showSubtitle && (
            subtitle ? (
              <span
                className={`text-[11px] font-medium leading-none mt-0.5 ${
                  dark ? 'text-gray-400' : 'text-[#5E7086]'
                }`}
              >
                {subtitle}
              </span>
            ) : (
              <span
                className={`text-[10px] sm:text-[11px] font-normal leading-none mt-0.5 ${
                  dark ? 'text-gray-400' : 'text-[#5E7086]'
                }`}
              >
                {isEn ? 'Teacher Empowerment Afghanistan' : 'توانمندسازی معلمان افغانستان'}
              </span>
            )
          )}
        </div>
      )}
    </div>
  );
};
