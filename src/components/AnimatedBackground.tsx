import React from 'react';

/**
 * Calm, understated architectural parchment backdrop.
 * Avoids distracting particle movement or rotating rings behind readable prose.
 */
export const AnimatedBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#FDFBF7]"
    >
      <div className="absolute -top-48 -right-48 w-[38rem] h-[38rem] rounded-full bg-amber-400/[0.06] blur-3xl" />
      <div className="absolute -bottom-48 -left-48 w-[34rem] h-[34rem] rounded-full bg-amber-600/[0.04] blur-3xl" />
    </div>
  );
};
