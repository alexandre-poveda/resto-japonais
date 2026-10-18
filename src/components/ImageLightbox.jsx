import React, { useEffect, useState } from 'react';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ImageLightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!images || images.length === 0 || currentIndex === null || currentIndex === undefined) {
    return null;
  }

  const currentItem = images[currentIndex];
  const src = typeof currentItem === 'string' ? currentItem : currentItem.src;
  const caption = typeof currentItem === 'object' ? currentItem.caption : '';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg animate-fade-in"
      onClick={onClose}
    >
      {/* Top bar */}
      <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20 pointer-events-none">
        <span className="text-xs uppercase tracking-widest text-[#efe7d2]/70 bg-black/60 px-3 py-1.5 rounded-full border border-white/10 pointer-events-auto">
          {currentIndex + 1} / {images.length}
        </span>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setZoomed(!zoomed);
            }}
            className="p-2.5 rounded-full bg-black/60 text-[#efe7d2] hover:bg-[#cfbe91] hover:text-[#0a0b0a] transition-all border border-white/10"
            title={zoomed ? "Dézoomer" : "Zoomer"}
          >
            {zoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
          </button>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-black/60 text-[#efe7d2] hover:bg-[#cfbe91] hover:text-[#0a0b0a] transition-all border border-white/10"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setZoomed(false);
              if (onPrev) onPrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-[#efe7d2] hover:bg-[#cfbe91] hover:text-[#0a0b0a] transition-all border border-white/10 z-20"
            aria-label="Image précédente"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setZoomed(false);
              if (onNext) onNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-[#efe7d2] hover:bg-[#cfbe91] hover:text-[#0a0b0a] transition-all border border-white/10 z-20"
            aria-label="Image suivante"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Center Image */}
      <div
        className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={caption || 'Vue agrandie'}
          className={`max-h-[80vh] w-auto max-w-full object-contain rounded-xl transition-transform duration-300 ${
            zoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
          }`}
          onClick={() => setZoomed(!zoomed)}
        />

        {caption && (
          <p className="mt-3 text-center text-xs sm:text-sm text-[#efe7d2]/80 font-light tracking-wide bg-black/60 px-4 py-1.5 rounded-full border border-white/5">
            {caption}
          </p>
        )}
      </div>
    </div>
  );
}
