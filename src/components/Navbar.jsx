import React, { useState, useEffect } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Menu as MenuIcon, X, Calendar, Utensils, BookOpen, Compass, ChevronRight } from 'lucide-react';

export default function Navbar({ currentPath, navigate, selectedDishesCount = 0, onOpenSelection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Accueil', path: '/' },
    { label: 'Menu', path: '/menu' },
    { label: 'À Propos', path: '/about' },
    { label: 'Réservation', path: '/reservation' },
  ];

  const handleNav = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0b0a]/90 backdrop-blur-md py-3.5 border-b border-[#333330]/60 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo QITCHEN */}
          <button
            onClick={() => handleNav('/')}
            className="group flex items-center gap-3 text-left focus:outline-none"
            aria-label="Accueil Qitchen"
          >
            <img
              src={RESTAURANT_INFO.assets.logo}
              alt="Qitchen Logo"
              className="h-7 sm:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                // Fallback to text if image fails
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <span className="hidden font-serif text-2xl tracking-[0.25em] text-[#efe7d2] uppercase">
              Qitchen
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-[#141514]/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#333330]/50 shadow-inner">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className={`px-4 py-1.5 text-xs uppercase tracking-widest transition-all duration-200 rounded-full ${
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

          {/* Right Action: Table Selection & CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            {selectedDishesCount > 0 && (
              <button
                onClick={onOpenSelection}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs bg-[#cfbe91]/15 text-[#cfbe91] border border-[#cfbe91]/30 hover:bg-[#cfbe91]/25 transition-all"
                title="Voir ma sélection"
              >
                <Utensils className="w-3.5 h-3.5" />
                <span>{selectedDishesCount} plat{selectedDishesCount > 1 ? 's' : ''}</span>
              </button>
            )}

            <button
              onClick={() => handleNav('/reservation')}
              className="relative group overflow-hidden px-5 py-2 rounded-full text-xs uppercase tracking-widest font-medium bg-[#efe7d2] text-[#0a0b0a] transition-all duration-300 hover:bg-[#cfbe91] hover:shadow-[0_0_20px_rgba(207,190,145,0.4)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>Réserver une table</span>
              </span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            {selectedDishesCount > 0 && (
              <button
                onClick={onOpenSelection}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-[#cfbe91]/20 text-[#cfbe91] border border-[#cfbe91]/30"
              >
                <Utensils className="w-3 h-3" />
                <span>{selectedDishesCount}</span>
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#efe7d2] hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="Ouvrir le menu de navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] bg-[#0a0b0a]/95 backdrop-blur-xl border-b border-[#333330] p-6 shadow-2xl animate-fade-in">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm uppercase tracking-wider text-left transition-all ${
                    isActive
                      ? 'bg-[#efe7d2] text-[#0a0b0a] font-semibold'
                      : 'text-[#efe7d2]/80 hover:bg-white/5 hover:text-[#efe7d2]'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#0a0b0a]' : 'text-[#efe7d2]/40'}`} />
                </button>
              );
            })}

            <div className="pt-3 border-t border-[#333330]/50 mt-1">
              <button
                onClick={() => handleNav('/reservation')}
                className="w-full py-3.5 rounded-xl text-center text-xs uppercase tracking-widest font-semibold bg-[#cfbe91] text-[#0a0b0a] shadow-lg hover:bg-[#efe7d2] transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Réserver une table</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
