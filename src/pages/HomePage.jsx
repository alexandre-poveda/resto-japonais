import React, { useRef, useState } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Volume2, VolumeX, ArrowUpRight } from 'lucide-react';
import KineticTitle from '../components/KineticTitle';

export default function HomePage({ navigate }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const rightCards = [
    {
      id: 'menu',
      title: 'Menu',
      image: RESTAURANT_INFO.assets.menuCover, // Photo de nourriture sushi
      path: '/menu'
    },
    {
      id: 'reservation',
      title: 'Réservation',
      image: RESTAURANT_INFO.assets.reservationCover, // Photo de la femme
      path: '/reservation'
    },
    {
      id: 'about',
      title: 'Notre Restaurant',
      image: RESTAURANT_INFO.assets.aboutCover, // Photo du restaurant
      path: '/about'
    }
  ];

  return (
    <div className="min-h-screen lg:h-screen w-full bg-[#0a0b0a] text-[#efe7d2] flex flex-col lg:flex-row overflow-hidden p-3 sm:p-4 gap-3 sm:gap-4">
      
      {/* LEFT 50%: The Video Hero with Kinetic Title at bottom-left */}
      <div className="w-full lg:w-1/2 h-[55vh] lg:h-full relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#121312] border border-[#333330]/80 group flex flex-col justify-end p-6 sm:p-10 lg:p-12 shadow-2xl shrink-0">
        
        {/* Looping Ambient Video */}
        <video
          ref={videoRef}
          src={RESTAURANT_INFO.assets.video}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Cinematic Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0a] via-[#0a0b0a]/30 to-transparent" />
        <div className="absolute inset-0 bg-black/20" />

        {/* Audio Toggle in top-right */}
        <button
          onClick={toggleSound}
          className="absolute top-6 right-6 z-20 p-2.5 rounded-full bg-black/60 backdrop-blur-md text-[#efe7d2] hover:bg-[#cfbe91] hover:text-[#0a0b0a] transition-all border border-white/10"
          title={isMuted ? "Activer le son" : "Couper le son"}
          aria-label={isMuted ? "Activer le son" : "Couper le son"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Bottom-Left Kinetic Title with Blur-in letter-by-letter */}
        <div className="relative z-10">
          <KineticTitle
            title={RESTAURANT_INFO.name}
            subtitle="SENSATION SUSHI"
          />
        </div>

      </div>

      {/* RIGHT 50%: The 3 Vertical Image Cards (Menu, Réservation, Notre Restaurant) */}
      <div className="w-full lg:w-1/2 h-full flex flex-col gap-3 sm:gap-4 justify-between">
        {rightCards.map((card) => (
          <div
            key={card.id}
            onClick={() => navigate(card.path)}
            className="group relative flex-1 min-h-[170px] lg:min-h-0 rounded-2xl sm:rounded-3xl overflow-hidden bg-[#141514] border border-[#333330]/80 cursor-pointer shadow-lg transition-all duration-500 hover:border-[#cfbe91]/60"
          >
            {/* Background Image with smooth subtle hover zoom */}
            <img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0a]/80 via-black/20 to-transparent transition-opacity group-hover:opacity-70" />

            {/* Corner Badge Pill (Menu / Réservation / Notre Restaurant) */}
            <div className="absolute bottom-5 left-5 z-10">
              <div className="bg-[#0a0b0a]/85 backdrop-blur-md border border-[#333330] rounded-full px-4 py-2 flex items-center gap-2 group-hover:border-[#cfbe91]/50 transition-colors">
                <span className="font-serif text-base sm:text-lg text-[#efe7d2] tracking-wider group-hover:text-[#cfbe91] transition-colors">
                  {card.title}
                </span>
                <div className="p-1 rounded-full bg-white/10 group-hover:bg-[#cfbe91] group-hover:text-[#0a0b0a] text-[#efe7d2] transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
