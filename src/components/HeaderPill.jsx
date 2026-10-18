import React, { useState } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import FullscreenMenu from './FullscreenMenu';

export default function HeaderPill({ currentPath, navigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: 'Menu', path: '/menu' },
    { label: 'À Propos', path: '/about' },
    { label: 'Réservation', path: '/reservation' }
  ];

  return (
    <>
      {/* Positioned lower and more to the right as requested */}
      <header className="fixed top-7 sm:top-10 left-6 sm:left-12 z-40 transition-all duration-300">
        <div className="bg-[#121312]/85 backdrop-blur-md border border-[#333330]/80 rounded-2xl sm:rounded-full px-4 sm:px-5 py-2.5 sm:py-3 flex items-center gap-3.5 sm:gap-5 shadow-[0_12px_35px_rgba(0,0,0,0.7)] text-[#efe7d2]">
          
          {/* Logo / Brand Name */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 group focus:outline-none"
            aria-label="Accueil"
          >
            <span className="font-serif text-lg sm:text-xl tracking-[0.2em] uppercase text-[#efe7d2] group-hover:text-[#cfbe91] transition-colors">
              {RESTAURANT_INFO.name}
            </span>
          </button>

          {/* Divider */}
          <div className="w-[1px] h-4 bg-[#333330]" />

          {/* Inline Navigation Links (Desktop) */}
          <nav className="hidden sm:flex items-center gap-1.5">
            {links.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-widest transition-all duration-200 ${
                    isActive
                      ? 'bg-[#efe7d2] text-[#0a0b0a] font-semibold shadow-sm'
                      : 'text-[#efe7d2]/75 hover:text-[#efe7d2] hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Divider on desktop */}
          <div className="hidden sm:block w-[1px] h-4 bg-[#333330]" />

          {/* Hamburger Trigger Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-[#efe7d2] hover:text-[#cfbe91] transition-colors flex items-center gap-2 focus:outline-none"
            aria-label="Ouvrir le menu complet"
            title="Menu complet"
          >
            <div className="flex flex-col gap-1 w-4 sm:w-5">
              <span className="h-[1.5px] w-full bg-current rounded-full" />
              <span className="h-[1.5px] w-3/4 bg-current rounded-full" />
              <span className="h-[1.5px] w-full bg-current rounded-full" />
            </div>
            <span className="hidden lg:inline text-[11px] uppercase tracking-widest text-[#efe7d2]/70 font-light">
              Menu
            </span>
          </button>

        </div>
      </header>

      {/* Fullscreen Overlay Menu */}
      <FullscreenMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        navigate={navigate}
        currentPath={currentPath}
      />
    </>
  );
}
