import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Utensils, Check, AlertCircle, Sparkles, Calendar } from 'lucide-react';

export default function DishModal({ dish, onClose, onToggleSelect, isSelected, onBookTable }) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!dish) return null;

  const handleZoomToggle = () => {
    setZoomLevel((prev) => (prev === 1 ? 1.75 : prev === 1.75 ? 2.5 : 1));
  };

  const resetZoom = () => setZoomLevel(1);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#141514] border border-[#333330] rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] text-[#efe7d2]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-[#efe7d2] hover:bg-[#cfbe91] hover:text-[#0a0b0a] transition-all duration-200 border border-white/10"
          aria-label="Fermer la vue détaillée"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden rounded-2xl sm:rounded-3xl">
          
          {/* Left Column: Interactive Image Viewer with Zoom */}
          <div className="md:col-span-7 relative bg-[#0e0f0e] flex flex-col justify-center items-center overflow-hidden min-h-[320px] sm:min-h-[420px] border-b md:border-b-0 md:border-r border-[#333330]">
            
            {/* Zoom Controls Overlay */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-black/70 backdrop-blur-md p-1.5 rounded-full border border-white/10">
              <button
                onClick={handleZoomToggle}
                className="p-1.5 rounded-full hover:bg-white/15 text-[#efe7d2] transition-colors"
                title={zoomLevel > 1 ? "Dézoomer" : "Agrandir (Zoom)"}
              >
                {zoomLevel > 1 ? <ZoomOut className="w-4 h-4 text-[#cfbe91]" /> : <ZoomIn className="w-4 h-4" />}
              </button>
              {zoomLevel > 1 && (
                <button
                  onClick={resetZoom}
                  className="p-1.5 rounded-full hover:bg-white/15 text-[#efe7d2] transition-colors text-xs"
                  title="Réinitialiser le zoom"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
              <span className="text-[11px] font-mono text-[#efe7d2]/70 px-2 select-none">
                {Math.round(zoomLevel * 100)}%
              </span>
            </div>

            {/* Hint overlay */}
            <div className="absolute bottom-3 inset-x-0 text-center pointer-events-none z-10">
              <span className="text-[11px] tracking-wider uppercase text-[#efe7d2]/60 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/5">
                Cliquez pour basculer le zoom
              </span>
            </div>

            {/* Clickable Image Container */}
            <div
              className="w-full h-full flex items-center justify-center p-4 sm:p-6 cursor-zoom-in"
              onClick={handleZoomToggle}
            >
              <img
                src={dish.image}
                alt={dish.titleFr || dish.title}
                className="max-h-[380px] sm:max-h-[460px] w-auto max-w-full object-contain rounded-xl transition-transform duration-300 ease-out shadow-2xl"
                style={{ transform: `scale(${zoomLevel})` }}
              />
            </div>
          </div>

          {/* Right Column: Dish Information */}
          <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              {/* Category & Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] tracking-widest uppercase font-semibold bg-[#cfbe91]/15 text-[#cfbe91] border border-[#cfbe91]/30">
                  {dish.category?.toUpperCase()}
                </span>
                {dish.pieces && (
                  <span className="text-[11px] tracking-wider text-[#efe7d2]/60">
                    • {dish.pieces}
                  </span>
                )}
                {dish.badges?.map((badge, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-full text-[10px] tracking-wide bg-white/5 text-[#efe7d2]/80 border border-white/10"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* Dish Titles */}
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#efe7d2] leading-tight">
                  {dish.titleFr || dish.title}
                </h3>
                {dish.titleFr && dish.titleFr !== dish.title && (
                  <p className="text-xs uppercase tracking-widest text-[#cfbe91] mt-0.5">
                    {dish.title}
                  </p>
                )}
              </div>

              {/* Price in Euros */}
              <div className="flex items-baseline gap-2 py-2 border-y border-[#333330]/60">
                <span className="text-2xl sm:text-3xl font-serif text-[#cfbe91]">
                  {dish.priceStr || `${dish.price} €`}
                </span>
                <span className="text-xs text-[#efe7d2]/50 tracking-wider uppercase">
                  TTC • Préparé à la minute
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-[#efe7d2]/80 leading-relaxed font-light">
                {dish.desc}
              </p>

              {/* Ingredients */}
              {dish.ingredients && dish.ingredients.length > 0 && (
                <div className="pt-2">
                  <h4 className="text-xs uppercase tracking-widest text-[#cfbe91] mb-2 font-medium flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Composition & Ingrédients
                  </h4>
                  <ul className="grid grid-cols-2 gap-1.5 text-xs text-[#efe7d2]/75">
                    {dish.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#cfbe91]" />
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Allergens */}
              {dish.allergens && dish.allergens.length > 0 && (
                <div className="pt-2">
                  <div className="flex items-center gap-1.5 text-xs text-[#efe7d2]/55">
                    <AlertCircle className="w-3.5 h-3.5 text-[#cfbe91]/70" />
                    <span>Allergènes : {dish.allergens.join(', ')}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#333330]/80 space-y-2.5">
              <button
                onClick={() => onToggleSelect && onToggleSelect(dish)}
                className={`w-full py-3 px-4 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                  isSelected
                    ? 'bg-[#cfbe91] text-[#0a0b0a] shadow-lg'
                    : 'bg-white/5 hover:bg-white/10 text-[#efe7d2] border border-[#efe7d2]/20'
                }`}
              >
                {isSelected ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Sélectionné pour ma table</span>
                  </>
                ) : (
                  <>
                    <Utensils className="w-4 h-4 text-[#cfbe91]" />
                    <span>Ajouter à ma sélection de table</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  onClose();
                  if (onBookTable) onBookTable();
                }}
                className="w-full py-2.5 px-4 rounded-xl text-xs uppercase tracking-widest text-center text-[#cfbe91] hover:text-[#efe7d2] transition-colors flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Réserver une table pour déguster</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
