import React, { useRef, useState } from 'react';
import { RESTAURANT_INFO, AWARDS } from '../data/restaurantData';
import { ArrowRight, Sparkles, Volume2, VolumeX, Calendar, Award, ChevronRight } from 'lucide-react';

export default function HomePage({ navigate }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const bentoCards = [
    {
      id: 'menu',
      title: 'Notre Carte',
      subtitle: 'Makis d\'auteur, Uramakis créatifs & Poissons d\'exception',
      image: RESTAURANT_INFO.assets.menuCover,
      path: '/menu',
      badge: 'Carte Gastronomique',
      cta: 'Découvrir la carte'
    },
    {
      id: 'reservation',
      title: 'Réservation',
      subtitle: 'Comptoir omakase ou table intime pour vos moments précieux',
      image: RESTAURANT_INFO.assets.reservationCover,
      path: '/reservation',
      badge: 'Expérience Privée',
      cta: 'Réserver une table'
    },
    {
      id: 'about',
      title: 'Notre Histoire',
      subtitle: 'L\'artisanat culinaire ancestral revisité avec audace',
      image: RESTAURANT_INFO.assets.aboutCover,
      path: '/about',
      badge: 'Savoir-Faire',
      cta: 'Découvrir l\'histoire'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0b0a] text-[#efe7d2] pt-20 sm:pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Left Hero with Video + Right Bento Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 min-h-[700px] lg:h-[calc(100vh-140px)] max-h-[880px]">
          
          {/* LEFT: Video Hero Section */}
          <div className="lg:col-span-7 relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#333330] bg-[#121312] group flex flex-col justify-end p-6 sm:p-10 shadow-2xl min-h-[460px] lg:min-h-0">
            
            {/* Background Looping Video */}
            <video
              ref={videoRef}
              src={RESTAURANT_INFO.assets.video}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-center scale-105 transition-transform duration-1000 group-hover:scale-100"
            />

            {/* Dark Aesthetic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0a] via-[#0a0b0a]/40 to-transparent" />
            <div className="absolute inset-0 bg-black/25" />

            {/* Sound Toggle Button */}
            <button
              onClick={toggleSound}
              className="absolute top-6 right-6 z-20 p-2.5 rounded-full bg-black/60 backdrop-blur-md text-[#efe7d2] hover:bg-[#cfbe91] hover:text-[#0a0b0a] transition-all border border-white/10"
              title={isMuted ? "Activer le son" : "Couper le son"}
              aria-label={isMuted ? "Activer le son" : "Couper le son"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Top Badge */}
            <div className="relative z-10 mb-auto">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-[0.2em] font-medium bg-black/60 backdrop-blur-md text-[#cfbe91] border border-[#cfbe91]/30">
                <Sparkles className="w-3.5 h-3.5 text-[#cfbe91]" />
                Haute Gastronomie Japonaise
              </span>
            </div>

            {/* Hero Headlines & CTA */}
            <div className="relative z-10 space-y-4 max-w-xl">
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl tracking-wider text-[#efe7d2] leading-[0.95]">
                SENSATION <br />
                <span className="italic font-light text-[#cfbe91]">SUSHI</span>
              </h1>

              <p className="text-sm sm:text-base text-[#efe7d2]/85 leading-relaxed font-light">
                Où la pureté du geste ancestral rencontre l'élégance contemporaine. Savourez des découpes d'orfèvre et un riz shari d'exception.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => navigate('/menu')}
                  className="px-6 py-3 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#efe7d2] text-[#0a0b0a] hover:bg-[#cfbe91] transition-all duration-300 shadow-lg flex items-center gap-2"
                >
                  <span>Explorer le Menu</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigate('/reservation')}
                  className="px-6 py-3 rounded-full text-xs uppercase tracking-widest font-medium bg-black/60 backdrop-blur-md text-[#efe7d2] hover:bg-white/15 border border-white/20 transition-all flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#cfbe91]" />
                  <span>Réserver</span>
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT: Bento Cards Stack (Menu, Reservation, About) */}
          <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-5 justify-between">
            {bentoCards.map((card) => (
              <div
                key={card.id}
                onClick={() => navigate(card.path)}
                className="group relative flex-1 min-h-[180px] lg:min-h-0 rounded-2xl sm:rounded-3xl overflow-hidden border border-[#333330] bg-[#141514] cursor-pointer transition-all duration-500 hover:border-[#cfbe91]/50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex items-end p-6"
              >
                {/* Background Image with Hover Zoom */}
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Dark Vignette & Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0a] via-[#0a0b0a]/60 to-transparent" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

                {/* Card Content */}
                <div className="relative z-10 w-full flex items-end justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#cfbe91]">
                      {card.badge}
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#efe7d2] group-hover:text-[#cfbe91] transition-colors">
                      {card.title}
                    </h2>
                    <p className="text-xs text-[#efe7d2]/70 font-light line-clamp-1 max-w-xs">
                      {card.subtitle}
                    </p>
                  </div>

                  <div className="shrink-0 p-3 rounded-full bg-black/60 backdrop-blur-md text-[#efe7d2] border border-white/10 group-hover:bg-[#cfbe91] group-hover:text-[#0a0b0a] transition-all duration-300">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* Section Distinction & Distinctions Banner */}
        <div className="mt-16 sm:mt-24 pt-12 border-t border-[#333330]/60">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#cfbe91] font-semibold">
              Reconnaissance & Distinctions
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#efe7d2]">
              L'Éloge de l'Excellence Culinaire
            </h3>
            <p className="text-xs sm:text-sm text-[#efe7d2]/70 font-light leading-relaxed">
              Salué par les guides les plus exigeants pour notre rigueur d'approvisionnement et l'harmonie subtile de nos créations.
            </p>
          </div>

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

                <h4 className="font-serif text-xl sm:text-2xl text-[#efe7d2]">
                  {award.title}
                </h4>

                <p className="text-xs text-[#efe7d2]/70 leading-relaxed font-light">
                  {award.description}
                </p>

                <div className="pt-2 text-[11px] tracking-wider text-[#cfbe91] font-medium">
                  {award.badge}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Invitation CTA Banner */}
        <div className="mt-16 sm:mt-20 relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#333330] p-8 sm:p-12 text-center bg-[#141514] shadow-2xl">
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <img
              src={RESTAURANT_INFO.assets.heroImage}
              alt="Atmosphère sushi"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#0a0b0a]/80" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#cfbe91] font-semibold">
              Votre Expérience Qitchen
            </span>
            <h3 className="font-serif text-3xl sm:text-5xl text-[#efe7d2]">
              Préparez Votre Voyage Sensoriel
            </h3>
            <p className="text-xs sm:text-sm text-[#efe7d2]/80 font-light leading-relaxed">
              Nos places au comptoir et en salon sont limitées afin de garantir une expérience gastronomique personnalisée et inoubliable.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate('/reservation')}
                className="px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#cfbe91] text-[#0a0b0a] hover:bg-[#efe7d2] transition-all shadow-xl"
              >
                Réserver une Table
              </button>
              <button
                onClick={() => navigate('/menu')}
                className="px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-medium bg-white/5 hover:bg-white/10 text-[#efe7d2] border border-[#efe7d2]/20 transition-all"
              >
                Consulter la Carte
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
