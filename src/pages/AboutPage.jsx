import React, { useState, useEffect } from 'react';
import { RESTAURANT_INFO, AWARDS, GALLERY_IMAGES } from '../data/restaurantData';
import { getStoredStory } from '../data/storage';
import { Award, ChevronLeft, ChevronRight } from 'lucide-react';
import KineticTitle from '../components/KineticTitle';

export default function AboutPage({ navigate }) {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [storyContent, setStoryContent] = useState(() => getStoredStory());

  // Listen to manager data updates
  useEffect(() => {
    const handleUpdate = () => {
      setStoryContent(getStoredStory());
    };
    window.addEventListener('yugen_data_updated', handleUpdate);
    return () => window.removeEventListener('yugen_data_updated', handleUpdate);
  }, []);

  // Auto-scroll carousel every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const prevImage = () => {
    setCarouselIndex((prev) => (prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCarouselIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0b0a] text-[#efe7d2] flex flex-col lg:flex-row">
      
      {/* LEFT 50%: Fixed Hero Image with Animated Kinetic Title (Pure À PROPOS) */}
      <div className="w-full lg:w-1/2 h-[45vh] lg:h-screen lg:sticky lg:top-0 relative overflow-hidden bg-[#121312] border-b lg:border-b-0 lg:border-r border-[#333330]/80 p-6 sm:p-10 lg:p-14 flex flex-col justify-end">
        {/* Cover Image for About */}
        <img
          src={RESTAURANT_INFO.assets.aboutCover}
          alt="À Propos Yūgen"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0a] via-[#0a0b0a]/35 to-black/20" />

        {/* Bottom-Left Kinetic Title (pure À PROPOS) */}
        <div className="relative z-10">
          <KineticTitle title="À PROPOS" />
        </div>
      </div>

      {/* RIGHT 50%: Scrollable Content with Auto-Scrolling Carousel */}
      <div className="w-full lg:w-1/2 min-h-screen p-6 sm:p-10 lg:p-14 space-y-12">
        
        {/* Introduction */}
        <div className="pt-20 lg:pt-10 space-y-4">
          <h2 className="font-serif text-3xl sm:text-5xl text-[#efe7d2] leading-tight">
            L'Art du Sushi <br />
            <span className="italic font-light text-[#cfbe91]">Redéfini</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#efe7d2]/75 font-light leading-relaxed">
            {RESTAURANT_INFO.subtitle}
          </p>
        </div>

        {/* Awards Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {AWARDS.map((award, idx) => (
            <div
              key={idx}
              className="bg-[#141514] border border-[#333330]/80 rounded-2xl p-5 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-[#cfbe91] font-medium">
                  {award.source}
                </span>
                <Award className="w-4 h-4 text-[#cfbe91]" />
              </div>
              <h4 className="font-serif text-base sm:text-lg text-[#efe7d2]">
                {award.title}
              </h4>
              <p className="text-[11px] text-[#efe7d2]/60 font-light leading-relaxed">
                {award.description}
              </p>
            </div>
          ))}
        </div>

        {/* Auto-scrolling Carousel */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#cfbe91] font-semibold">
              Galerie & Atmosphère
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={prevImage}
                className="p-2 rounded-full bg-[#181918] hover:bg-[#cfbe91] hover:text-[#0a0b0a] text-[#efe7d2] transition-colors border border-[#333330]"
                aria-label="Image précédente"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextImage}
                className="p-2 rounded-full bg-[#181918] hover:bg-[#cfbe91] hover:text-[#0a0b0a] text-[#efe7d2] transition-colors border border-[#333330]"
                aria-label="Image suivante"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Carousel Viewport with smooth image transition */}
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#333330] bg-[#121312] aspect-[16/10] shadow-xl group">
            <img
              src={GALLERY_IMAGES[carouselIndex].src}
              alt={GALLERY_IMAGES[carouselIndex].caption}
              className="w-full h-full object-cover object-center transition-all duration-700 ease-out"
            />

            {/* Gradient Overlay & Caption */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-4 inset-x-4 z-10 flex items-center justify-between gap-3">
              <p className="text-xs sm:text-sm text-[#efe7d2] font-serif">
                {GALLERY_IMAGES[carouselIndex].caption}
              </p>
              <span className="text-[10px] uppercase tracking-widest text-[#cfbe91] shrink-0 bg-black/60 px-2.5 py-1 rounded-full border border-white/10">
                {GALLERY_IMAGES[carouselIndex].category}
              </span>
            </div>

            {/* Slide Indicators */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-black/60 px-2.5 py-1 rounded-full border border-white/10">
              {GALLERY_IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCarouselIndex(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    i === carouselIndex ? 'w-4 bg-[#cfbe91]' : 'bg-white/40'
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Notre Histoire & Chef Portrait */}
        <div className="space-y-6 pt-4 border-t border-[#333330]/60">
          <div className="relative rounded-2xl overflow-hidden border border-[#333330] aspect-[16/9] shadow-lg">
            <img
              src={RESTAURANT_INFO.assets.chefPortrait}
              alt="Maître Sushi"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0a] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <span className="text-[10px] uppercase tracking-widest text-[#cfbe91] font-semibold">
                Savoir-Faire Artisanal
              </span>
              <p className="font-serif text-lg text-[#efe7d2]">
                La Maîtrise de la Découpe & du Riz Shari
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-[#efe7d2]/75 leading-relaxed font-light">
            <p className="font-serif text-base text-[#cfbe91] italic">
              « {storyContent.subheading} »
            </p>
            {storyContent.paragraphs?.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>

        {/* 4 Pillars of Excellence */}
        <div className="space-y-4 pt-6 border-t border-[#333330]/60">
          <h3 className="font-serif text-2xl text-[#efe7d2]">
            Nos 4 Engagements
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {storyContent.commitments?.map((com, idx) => (
              <div
                key={idx}
                className="bg-[#141514] border border-[#333330] rounded-xl p-4 space-y-1.5"
              >
                <span className="text-[10px] text-[#cfbe91] font-mono">0{idx + 1}</span>
                <h4 className="font-serif text-sm text-[#efe7d2]">
                  {com.title}
                </h4>
                <p className="text-[11px] text-[#efe7d2]/60 font-light leading-relaxed">
                  {com.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
