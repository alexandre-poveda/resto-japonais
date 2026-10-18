import React, { useState } from 'react';
import { RESTAURANT_INFO, AWARDS, GALLERY_IMAGES, STORY_CONTENT } from '../data/restaurantData';
import { Award, ChevronLeft, ChevronRight, ZoomIn, ArrowRight, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import ImageLightbox from '../components/ImageLightbox';

export default function AboutPage({ navigate }) {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const prevImage = () => {
    setCarouselIndex((prev) => (prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCarouselIndex((prev) => (prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-[#0a0b0a] text-[#efe7d2] pt-24 sm:pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">
        
        {/* Top Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#cfbe91] font-semibold">
            Maison Qitchen
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#efe7d2] tracking-wide leading-[1.05]">
            L'Art du Sushi <br />
            <span className="italic font-light text-[#cfbe91]">Redéfini</span>
          </h1>
          <p className="text-sm sm:text-base text-[#efe7d2]/75 font-light leading-relaxed max-w-2xl mx-auto">
            {RESTAURANT_INFO.subtitle}
          </p>
        </div>

        {/* Awards / Badges Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {AWARDS.map((award, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-6 sm:p-8 space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-[#cfbe91] font-medium">
                  {award.source}
                </span>
                <Award className="w-5 h-5 text-[#cfbe91]" />
              </div>

              <h3 className="font-serif text-xl sm:text-2xl text-[#efe7d2]">
                {award.title}
              </h3>

              <p className="text-xs text-[#efe7d2]/70 leading-relaxed font-light">
                {award.description}
              </p>

              <div className="pt-2 text-[11px] tracking-wider text-[#cfbe91] font-medium">
                {award.badge}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Photo Carousel */}
        <div className="space-y-6">
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#cfbe91] font-semibold">
                Immersion Visuelle
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-[#efe7d2]">
                La Galerie de Nos Créations
              </h2>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevImage}
                className="p-3 rounded-full bg-[#161716] text-[#efe7d2] hover:bg-[#cfbe91] hover:text-[#0a0b0a] border border-[#333330] transition-colors"
                aria-label="Image précédente"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="p-3 rounded-full bg-[#161716] text-[#efe7d2] hover:bg-[#cfbe91] hover:text-[#0a0b0a] border border-[#333330] transition-colors"
                aria-label="Image suivante"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Carousel Viewport */}
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#333330] bg-[#121312] aspect-[16/9] sm:aspect-[21/9] max-h-[550px] shadow-2xl group">
            <img
              src={GALLERY_IMAGES[carouselIndex].src}
              alt={GALLERY_IMAGES[carouselIndex].caption}
              className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 cursor-pointer"
              onClick={() => setLightboxIndex(carouselIndex)}
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Caption & Zoom trigger */}
            <div className="absolute bottom-6 inset-x-6 z-10 flex items-end justify-between gap-4">
              <div className="space-y-1 max-w-lg">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#cfbe91] bg-black/60 px-2.5 py-1 rounded-full border border-white/10">
                  {GALLERY_IMAGES[carouselIndex].category}
                </span>
                <p className="text-sm sm:text-base text-[#efe7d2] font-serif">
                  {GALLERY_IMAGES[carouselIndex].caption}
                </p>
              </div>

              <button
                onClick={() => setLightboxIndex(carouselIndex)}
                className="p-3 rounded-full bg-black/60 backdrop-blur-md text-[#efe7d2] hover:bg-[#cfbe91] hover:text-[#0a0b0a] border border-white/10 transition-colors flex items-center gap-2 text-xs"
                title="Agrandir en plein écran"
              >
                <ZoomIn className="w-4 h-4" />
                <span className="hidden sm:inline uppercase tracking-widest text-[10px]">Agrandir</span>
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="absolute top-6 right-6 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
              {GALLERY_IMAGES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCarouselIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === carouselIndex ? 'w-5 bg-[#cfbe91]' : 'bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Aller à l'image ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnails row */}
          <div className="grid grid-cols-6 gap-3 pt-2">
            {GALLERY_IMAGES.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setCarouselIndex(idx)}
                className={`relative aspect-video rounded-xl overflow-hidden cursor-pointer border transition-all duration-300 ${
                  idx === carouselIndex
                    ? 'border-[#cfbe91] ring-2 ring-[#cfbe91]/30 opacity-100 scale-102'
                    : 'border-[#333330] opacity-50 hover:opacity-80'
                }`}
              >
                <img src={img.src} alt={img.caption} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Our Story Narrative Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Master Chef & Craftsmanship Portrait */}
          <div className="lg:col-span-5 relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#333330] bg-[#141514] shadow-2xl group">
            <img
              src={RESTAURANT_INFO.assets.chefPortrait}
              alt="Maître Sushi au travail"
              className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0a] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6 z-10 space-y-1">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#cfbe91] font-semibold">
                Maître Sushi Exécutif
              </span>
              <p className="font-serif text-xl text-[#efe7d2]">
                Kenzo Takahashi
              </p>
              <p className="text-xs text-[#efe7d2]/70 font-light">
                25 ans de dévouement à la pureté de la découpe et à la transmission de l'Omakase.
              </p>
            </div>
          </div>

          {/* Right: The Story & Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#cfbe91] font-semibold">
                Notre Histoire
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#efe7d2] leading-tight">
                {STORY_CONTENT.headline}
              </h2>
            </div>

            <p className="text-base text-[#cfbe91] font-serif leading-relaxed italic">
              « {STORY_CONTENT.subheading} »
            </p>

            <div className="space-y-4 text-xs sm:text-sm text-[#efe7d2]/75 leading-relaxed font-light">
              {STORY_CONTENT.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/menu')}
                className="px-6 py-3 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#efe7d2] text-[#0a0b0a] hover:bg-[#cfbe91] transition-colors flex items-center gap-2"
              >
                <span>Découvrir la carte</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/reservation')}
                className="px-6 py-3 rounded-full text-xs uppercase tracking-widest font-medium bg-white/5 hover:bg-white/10 text-[#efe7d2] border border-[#efe7d2]/20 transition-colors"
              >
                Réserver une table
              </button>
            </div>
          </div>

        </div>

        {/* 4 Pillars of Excellence */}
        <div className="space-y-8 pt-8 border-t border-[#333330]/60">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#cfbe91] font-semibold">
              Exigence & Pureté
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#efe7d2]">
              Nos 4 Engagements Fondateurs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STORY_CONTENT.commitments.map((com, idx) => (
              <div
                key={idx}
                className="bg-[#141514] border border-[#333330] rounded-2xl p-6 space-y-3 hover:border-[#cfbe91]/40 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#cfbe91]/10 text-[#cfbe91] flex items-center justify-center font-serif text-sm">
                  0{idx + 1}
                </div>
                <h3 className="font-serif text-lg text-[#efe7d2]">
                  {com.title}
                </h3>
                <p className="text-xs text-[#efe7d2]/70 font-light leading-relaxed">
                  {com.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      <ImageLightbox
        images={GALLERY_IMAGES}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() => setLightboxIndex((prev) => (prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1))}
        onNext={() => setLightboxIndex((prev) => (prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1))}
      />

    </div>
  );
}
