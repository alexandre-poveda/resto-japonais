import React, { useState, useEffect } from 'react';

export default function KineticTitle({ title, subtitle, className = '' }) {
  const [displayText, setDisplayText] = useState(title);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // When title changes: start fresh animation
    setIsAnimating(false);
    const timeout = setTimeout(() => {
      setDisplayText(title);
      setIsAnimating(true);
    }, 150);

    return () => clearTimeout(timeout);
  }, [title]);

  const characters = Array.from(displayText);

  return (
    <div className={`space-y-2 select-none pointer-events-none ${className}`}>
      <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-wider text-[#efe7d2] leading-[0.95] flex flex-wrap items-baseline">
        {characters.map((char, index) => (
          <span
            key={`${displayText}-${index}`}
            className="inline-block transition-all duration-700 ease-out"
            style={{
              opacity: isAnimating ? 1 : 0,
              filter: isAnimating ? 'blur(0px)' : 'blur(16px)',
              transform: isAnimating ? 'translateY(0px)' : 'translateY(24px)',
              transitionDelay: `${index * 45}ms`,
              marginRight: char === ' ' ? '0.3em' : '0'
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>

      {subtitle && (
        <p
          className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#cfbe91] font-light transition-all duration-1000 ease-out"
          style={{
            opacity: isAnimating ? 0.9 : 0,
            filter: isAnimating ? 'blur(0px)' : 'blur(8px)',
            transform: isAnimating ? 'translateY(0px)' : 'translateY(12px)',
            transitionDelay: `${characters.length * 45 + 100}ms`
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
