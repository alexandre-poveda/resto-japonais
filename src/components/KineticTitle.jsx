import React from 'react';

export default function KineticTitle({ title, className = '' }) {
  if (!title) return null;

  // Split into words so lines don't break awkwardly mid-word
  const words = title.split(' ');
  let charCounter = 0;

  return (
    <div key={title} className={`select-none pointer-events-none ${className}`}>
      <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-wider text-[#efe7d2] leading-[0.95] flex flex-wrap gap-x-4 gap-y-2 items-baseline">
        {words.map((word, wIdx) => {
          const chars = Array.from(word);
          return (
            <span key={wIdx} className="inline-flex whitespace-nowrap">
              {chars.map((char, cIdx) => {
                const currentDelay = charCounter * 50; // 50ms stagger per character
                charCounter++;
                return (
                  <span
                    key={cIdx}
                    className="animate-kinetic-char"
                    style={{
                      animationDelay: `${currentDelay}ms`,
                    }}
                  >
                    {char}
                  </span>
                );
              })}
            </span>
          );
        })}
      </h1>
    </div>
  );
}
