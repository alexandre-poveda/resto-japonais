import React, { useRef } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { ArrowUpRight } from 'lucide-react';
import KineticTitle from '../components/KineticTitle';

export default function HomePage({ navigate }) {
  const videoRef = useRef(null);

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
      
      {/* LEFT 70%: Video Hero with Kinetic Title, strictly muted, NO audio button */}
      <div className="w-full lg:w-[70%] h-[55vh] lg:h-full relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#121312] border border-[#333330]/80 group flex flex-col justify-end p-6 sm:p-10 lg:p-14 shadow-2xl shrink-0">
        
        {/* Ambient Silent Video Loop */}
        <video
          ref={videoRef}
          src={RESTAURANT_INFO.assets.video}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        />

        {/* Cinematic Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0a] via-[#0a0b0a]/35 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-black/15 pointer-events-none" />

        {/* Bottom-Left Kinetic Title (pure YŪGEN) */}
        <div className="relative z-10">
          <KineticTitle title={RESTAURANT_INFO.name} />
        </div>

      </div>

      {/* RIGHT 30%: The 3 Vertical Image Cards (Menu, Réservation, Notre Restaurant) */}
      <div className="w-full lg:w-[30%] h-full flex flex-col gap-3 sm:gap-4 justify-between">
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
