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
      {/* Positioned lower and to the right, burger on the left */}
      <header className="fixed top-8 sm:top-10 left-8 sm:left-12 z-40 transition-all duration-300">
        <div className="bg-[#121312]/90 backdrop-blur-md border border-[#333330] rounded-full px-4 sm:px-5 py-2.5 sm:py-3 flex items-center gap-3.5 sm:gap-4 shadow-[0_12px_35px_rgba(0,0,0,0.8)] text-[#efe7d2]">
          
          {/* Hamburger Trigger Button on the LEFT */}
          <button
            onClick={() => setMenuOpen(true)}
            className="group flex items-center gap-2 p-1 text-[#efe7d2] hover:text-[#cfbe91] transition-colors focus:outline-none"
            aria-label="Ouvrir le menu complet"
            title="Menu complet"
          >
            <div className="flex flex-col gap-1 w-4 sm:w-5">
              <span className="h-[1.5px] w-full bg-current rounded-full transition-transform group-hover:translate-x-0.5" />
              <span className="h-[1.5px] w-3/4 bg-current rounded-full transition-transform group-hover:translate-x-1" />
              <span className="h-[1.5px] w-full bg-current rounded-full transition-transform group-hover:translate-x-0.5" />
            </div>
            <span className="text-xs uppercase tracking-widest font-medium text-[#efe7d2]">
              Menu
            </span>
          </button>

          {/* Divider */}
          <div className="w-[1px] h-4 bg-[#333330]" />

          {/* Inline Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-1.5">
            {links.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className={`px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-xs uppercase tracking-widest transition-all duration-200 ${
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
