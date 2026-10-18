import React, { useState, useEffect } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { X, ArrowUpRight, MapPin, Phone, Clock } from 'lucide-react';

export default function FullscreenMenu({ isOpen, onClose, navigate, currentPath }) {
  const [hoveredIndex, setHoveredIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const menuLinks = [
    { label: 'ACCUEIL', path: '/', image: RESTAURANT_INFO.assets.heroImage, desc: "L'Art du Sushi Redéfini" },
    { label: 'MENU', path: '/menu', image: RESTAURANT_INFO.assets.menuCover, desc: 'Carte Gastronomique & Assortiments' },
    { label: 'RÉSERVATION', path: '/reservation', image: RESTAURANT_INFO.assets.reservationCover, desc: 'Comptoir Omakase & Salons Intimes' },
    { label: 'À PROPOS', path: '/about', image: RESTAURANT_INFO.assets.aboutCover, desc: 'Histoire, Philosophie & Équipe' },
  ];

  const handleLinkClick = (path) => {
    onClose();
    navigate(path);
  };

  // Close when clicking on backdrop / empty space
  const handleBackdropClick = (e) => {
    if (e.target.closest('button') || e.target.closest('a')) {
      return;
    }
    onClose();
  };

  return (
    <div 
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 bg-[#0a0b0a]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 lg:p-14 animate-fade-in text-[#efe7d2] cursor-pointer selection:bg-[#cfbe91] selection:text-[#0a0b0a]"
    >
      
      {/* Top Bar with Brand & Close Button */}
      <div className="flex items-center justify-between border-b border-[#333330]/60 pb-6 shrink-0 cursor-default">
        <button
          onClick={() => handleLinkClick('/')}
          className="font-serif text-2xl sm:text-3xl tracking-[0.25em] uppercase text-[#efe7d2] hover:text-[#cfbe91] transition-colors"
        >
          {RESTAURANT_INFO.name}
        </button>

        <button
          onClick={onClose}
          className="group p-3 rounded-full bg-white/5 border border-white/10 hover:bg-[#cfbe91] hover:text-[#0a0b0a] transition-all duration-300"
          aria-label="Fermer le menu"
          title="Fermer (ou cliquer n'importe où)"
        >
          <X className="w-6 h-6 transition-transform group-hover:rotate-90 duration-300" />
        </button>
      </div>

      {/* Center Giant Navigation Links + Large Hover Preview Image */}
      <div className="my-auto py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center cursor-default">
        
        {/* Left Column: Navigation Links with 4-pointed stars */}
        <nav className="lg:col-span-7">
          <ul className="space-y-5 sm:space-y-7">
            {menuLinks.map((item, idx) => {
              const isActive = currentPath === item.path;
              const isHovered = hoveredIndex === idx;
              return (
                <li key={item.path} className="overflow-hidden">
                  <button
                    onClick={() => handleLinkClick(item.path)}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onFocus={() => setHoveredIndex(idx)}
                    className="group flex items-baseline gap-4 sm:gap-6 text-left transition-all duration-300 hover:translate-x-3 w-full"
                  >
                    {/* 4-pointed luxury star */}
                    <span 
                      className={`text-sm sm:text-base transition-all duration-300 ${
                        isHovered || isActive 
                          ? 'text-[#cfbe91] scale-125' 
                          : 'text-[#efe7d2]/40 group-hover:text-[#cfbe91]'
                      }`}
                    >
                      ✦
                    </span>

                    {/* Giant Label */}
                    <span
                      className={`font-serif text-4xl sm:text-6xl lg:text-7xl tracking-wider transition-colors duration-300 ${
                        isActive
                          ? 'text-[#cfbe91] italic'
                          : 'text-[#efe7d2] group-hover:text-[#cfbe91]'
                      }`}
                    >
                      {item.label}
                    </span>

                    {/* Arrow Icon */}
                    <ArrowUpRight 
                      className={`w-6 h-6 sm:w-8 sm:h-8 transition-all duration-300 shrink-0 ${
                        isHovered ? 'opacity-100 text-[#cfbe91] translate-x-1 -translate-y-1' : 'opacity-0 text-[#cfbe91]'
                      }`} 
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right Column (Desktop): Large Prominent Image that pops out on hover */}
        <div className="hidden lg:flex lg:col-span-5 items-center justify-center">
          <div className="w-[360px] xl:w-[420px] h-[460px] xl:h-[500px] rounded-3xl overflow-hidden border border-[#333330] shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative bg-[#141514] p-1.5 transition-transform duration-500 hover:scale-[1.02]">
            <div className="relative w-full h-full rounded-[22px] overflow-hidden">
              {menuLinks.map((item, idx) => (
                <div
                  key={item.path}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    hoveredIndex === idx
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-95 pointer-events-none'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6 space-y-1">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#cfbe91] font-semibold">
                      Yūgen Paris
                    </span>
                    <h4 className="font-serif text-2xl text-[#efe7d2] tracking-wide">
                      {item.label}
                    </h4>
                    <p className="text-xs text-[#efe7d2]/70 font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Information Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#333330]/60 text-xs text-[#efe7d2]/70 font-light shrink-0 cursor-default">
        <div className="space-y-1">
          <p className="text-[11px] uppercase tracking-widest text-[#cfbe91] font-medium flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            Adresse
          </p>
          <p>{RESTAURANT_INFO.address}</p>
        </div>

        <div className="space-y-1">
          <p className="text-[11px] uppercase tracking-widest text-[#cfbe91] font-medium flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5" />
            Contact & Réservations
          </p>
          <p>{RESTAURANT_INFO.phone}</p>
          <p>{RESTAURANT_INFO.email}</p>
        </div>

        <div className="space-y-1">
          <p className="text-[11px] uppercase tracking-widest text-[#cfbe91] font-medium flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            Horaires
          </p>
          <p>Mardi — Dimanche : 12h00-14h30 / 19h00-23h00</p>
          <p className="text-[#efe7d2]/40">Fermé le Lundi</p>
        </div>
      </div>

    </div>
  );
}
