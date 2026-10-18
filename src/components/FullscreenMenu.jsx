import React, { useEffect } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { X, ArrowUpRight, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function FullscreenMenu({ isOpen, onClose, navigate, currentPath }) {
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
    { num: '01', label: 'ACCUEIL', path: '/' },
    { num: '02', label: 'MENU', path: '/menu' },
    { num: '03', label: 'RÉSERVATION', path: '/reservation' },
    { num: '04', label: 'À PROPOS', path: '/about' },
  ];

  const handleLinkClick = (path) => {
    onClose();
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0b0a]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-12 lg:p-16 animate-fade-in text-[#efe7d2]">
      
      {/* Top Bar with Brand & Close Button */}
      <div className="flex items-center justify-between border-b border-[#333330]/60 pb-6">
        <button
          onClick={() => handleLinkClick('/')}
          className="font-serif text-2xl sm:text-3xl tracking-[0.25em] uppercase text-[#efe7d2]"
        >
          {RESTAURANT_INFO.name}
        </button>

        <button
          onClick={onClose}
          className="group p-3 rounded-full bg-white/5 border border-white/10 hover:bg-[#cfbe91] hover:text-[#0a0b0a] transition-all duration-300"
          aria-label="Fermer le menu"
        >
          <X className="w-6 h-6 transition-transform group-hover:rotate-90 duration-300" />
        </button>
      </div>

      {/* Center Giant Navigation Links */}
      <nav className="my-auto py-8">
        <ul className="space-y-4 sm:space-y-6 max-w-4xl">
          {menuLinks.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <li key={item.path} className="overflow-hidden">
                <button
                  onClick={() => handleLinkClick(item.path)}
                  className="group flex items-baseline gap-4 sm:gap-8 text-left transition-transform duration-300 hover:translate-x-3 w-full"
                >
                  <span className="font-mono text-xs sm:text-sm text-[#cfbe91] font-light">
                    {item.num}
                  </span>
                  <span
                    className={`font-serif text-4xl sm:text-6xl lg:text-7xl tracking-wider transition-colors duration-300 ${
                      isActive
                        ? 'text-[#cfbe91] italic'
                        : 'text-[#efe7d2] group-hover:text-[#cfbe91]'
                    }`}
                  >
                    {item.label}
                  </span>
                  <ArrowUpRight className="w-5 h-5 sm:w-8 sm:h-8 opacity-0 group-hover:opacity-100 transition-opacity text-[#cfbe91] shrink-0" />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Information Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-[#333330]/60 text-xs text-[#efe7d2]/70 font-light">
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
