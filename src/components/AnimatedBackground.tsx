import React, { useEffect, useRef } from 'react';

/**
 * AnimatedBackground
 * A rich, living celestial & solar ambient canvas.
 * Features:
 * - Dynamic golden solar particle field with real-time constellation links
 * - Concentric rotating astrolabe celestial dials with degree marks
 * - Interactive mouse-following solar illumination flare
 * - Sacred geometric 8-pointed star watermark
 * - Ambient warm golden and dawn-sky radiant orbs
 * Pauses automatically when tab is hidden or when reduced motion is preferred.
 */
export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracking for subtle interactive solar spotlight
    const mouse = {
      x: width * 0.5,
      y: height * 0.3,
      targetX: width * 0.5,
      targetY: height * 0.3,
      active: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    interface Star {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
      baseAlpha: number;
      pulseSpeed: number;
      pulseAngle: number;
      color: string;
      glow: boolean;
    }

    const starCount = Math.min(65, Math.max(30, Math.floor((width * height) / 24000)));
    const stars: Star[] = [];

    const goldPalette = [
      'rgba(217, 119, 6, ',  // Amber-600
      'rgba(245, 158, 11, ', // Amber-500
      'rgba(251, 191, 36, ', // Amber-400
      'rgba(180, 83, 9, ',   // Solar Gold 700
      'rgba(59, 130, 246, ', // Lapis / Dawn Azure
    ];

    for (let i = 0; i < starCount; i++) {
      const baseAlpha = Math.random() * 0.45 + 0.25;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.8,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -Math.random() * 0.45 - 0.12, // Gentle ascending solar drift
        alpha: baseAlpha,
        baseAlpha,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulseAngle: Math.random() * Math.PI * 2,
        color: goldPalette[Math.floor(Math.random() * goldPalette.length)],
        glow: Math.random() > 0.65,
      });
    }

    let dialAngle = 0;
    let rosetteAngle = 0;
    let time = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    const render = () => {
      time += 0.015;

      // Smooth mouse easing
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // 1. Radiant Solar Sun & Corona in the Top Corner (Upper Right in RTL)
      const sunCenterX = width > 1024 ? width * 0.82 : width * 0.5;
      const sunCenterY = height * 0.18;
      const sunRadius = Math.min(width, height) * 0.65;

      const sunGlow = ctx.createRadialGradient(
        sunCenterX,
        sunCenterY,
        0,
        sunCenterX,
        sunCenterY,
        sunRadius
      );
      sunGlow.addColorStop(0, 'rgba(251, 191, 36, 0.14)');
      sunGlow.addColorStop(0.25, 'rgba(245, 158, 11, 0.07)');
      sunGlow.addColorStop(0.6, 'rgba(217, 119, 6, 0.025)');
      sunGlow.addColorStop(1, 'rgba(253, 251, 247, 0)');
      ctx.fillStyle = sunGlow;
      ctx.fillRect(0, 0, width, height);

      // Secondary Morning Dawn Azure Flare (Bottom Left)
      const dawnGlow = ctx.createRadialGradient(
        width * 0.12,
        height * 0.75,
        0,
        width * 0.12,
        height * 0.75,
        Math.min(width, height) * 0.5
      );
      dawnGlow.addColorStop(0, 'rgba(59, 130, 246, 0.06)');
      dawnGlow.addColorStop(0.5, 'rgba(30, 143, 214, 0.02)');
      dawnGlow.addColorStop(1, 'rgba(253, 251, 247, 0)');
      ctx.fillStyle = dawnGlow;
      ctx.fillRect(0, 0, width, height);

      // Interactive mouse light if active
      if (mouse.active) {
        const mouseGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          220
        );
        mouseGlow.addColorStop(0, 'rgba(245, 158, 11, 0.09)');
        mouseGlow.addColorStop(1, 'rgba(245, 158, 11, 0)');
        ctx.fillStyle = mouseGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Rotating Astrolabe Celestial Rings
      dialAngle += 0.0012;
      ctx.save();
      ctx.translate(sunCenterX, sunCenterY);
      ctx.rotate(dialAngle);

      // Outer graduated ring
      ctx.strokeStyle = 'rgba(180, 83, 9, 0.09)';
      ctx.lineWidth = 1.25;
      ctx.setLineDash([4, 8]);
      ctx.beginPath();
      ctx.arc(0, 0, 240, 0, Math.PI * 2);
      ctx.stroke();

      // Middle ring with ticks
      ctx.strokeStyle = 'rgba(217, 119, 6, 0.08)';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 14]);
      ctx.beginPath();
      ctx.arc(0, 0, 360, 0, Math.PI * 2);
      ctx.stroke();

      // Inner solid ring
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.12)';
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(0, 0, 140, 0, Math.PI * 2);
      ctx.stroke();

      // Delicate Astrolabe Degree Ticks (36 divisions)
      for (let d = 0; d < 36; d++) {
        const tickAngle = (d * Math.PI) / 18;
        const innerR = d % 3 === 0 ? 232 : 236;
        const outerR = 244;
        ctx.beginPath();
        ctx.moveTo(Math.cos(tickAngle) * innerR, Math.sin(tickAngle) * innerR);
        ctx.lineTo(Math.cos(tickAngle) * outerR, Math.sin(tickAngle) * outerR);
        ctx.strokeStyle = 'rgba(180, 83, 9, 0.08)';
        ctx.lineWidth = d % 3 === 0 ? 1.5 : 0.75;
        ctx.stroke();
      }

      ctx.restore();

      // 3. Rotating 8-Pointed Star Rosette Watermark in the Distance
      rosetteAngle -= 0.0006;
      ctx.save();
      ctx.translate(width * 0.18, height * 0.45);
      ctx.rotate(rosetteAngle);
      ctx.strokeStyle = 'rgba(180, 83, 9, 0.04)';
      ctx.lineWidth = 1;

      // Draw two interlocking squares (8-pointed Islamic Star)
      const r = 160;
      ctx.strokeRect(-r / 2, -r / 2, r, r);
      ctx.rotate(Math.PI / 4);
      ctx.strokeRect(-r / 2, -r / 2, r, r);
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.72, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // 4. Draw Stardust Particles & Real-Time Constellation Lines
      for (let i = 0; i < stars.length; i++) {
        const p = stars[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          p.pulseAngle += p.pulseSpeed;
          p.alpha = p.baseAlpha + Math.sin(p.pulseAngle) * 0.18;

          // Screen wrapping
          if (p.y < -20) {
            p.y = height + 20;
            p.x = Math.random() * width;
          }
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
        }

        // Draw connections between nearby stars (Astrolabe Constellation grid)
        for (let j = i + 1; j < stars.length; j++) {
          const p2 = stars[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const lineAlpha = (1 - dist / 110) * 0.14;
            ctx.strokeStyle = `rgba(217, 119, 6, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Star core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0.1, p.alpha)})`;
        ctx.fill();

        // Star soft glow halo
        if (p.glow) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${Math.max(0.04, p.alpha * 0.25)})`;
          ctx.fill();
        }
      }

      if (!document.hidden) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Dynamic Solar Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />

      {/* Layered Architectural Geometry Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#B45309_0.9px,transparent_0.9px)] [background-size:36px_36px] opacity-20" />

      {/* Ambient Breathing Solar Flares */}
      <div className="absolute -top-40 -right-40 w-[34rem] h-[34rem] rounded-full bg-gradient-to-br from-amber-400/15 via-solar-500/10 to-transparent blur-3xl animate-pulse [animation-duration:9s]" />
      <div className="absolute top-1/2 -left-32 w-[32rem] h-[32rem] rounded-full bg-gradient-to-tr from-sky-400/8 via-amber-300/6 to-transparent blur-3xl" />
      <div className="absolute -bottom-40 left-1/3 w-[38rem] h-[38rem] rounded-full bg-gradient-to-t from-amber-500/10 via-solar-600/5 to-transparent blur-3xl" />
    </div>
  );
};
