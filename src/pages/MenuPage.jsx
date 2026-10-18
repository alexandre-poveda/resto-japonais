import React, { useState, useMemo, useEffect, useRef } from 'react';
import { RESTAURANT_INFO, MENU_CATEGORIES } from '../data/restaurantData';
import { getStoredMenu } from '../data/storage';
import { ArrowUp, Lock } from 'lucide-react';
import KineticTitle from '../components/KineticTitle';

export default function MenuPage({ navigate, onOpenLicensing }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [menuItems, setMenuItems] = useState(() => getStoredMenu());
  const [showBackToTop, setShowBackToTop] = useState(false);
  const scrollRef = useRef(null);

  // Listen to manager data updates
  useEffect(() => {
    const handleUpdate = () => {
      setMenuItems(getStoredMenu());
    };
    window.addEventListener('yugen_data_updated', handleUpdate);
    return () => window.removeEventListener('yugen_data_updated', handleUpdate);
  }, []);

  const handleScroll = (e) => {
    const scrollTop = e.currentTarget.scrollTop;
    setShowBackToTop(scrollTop > 280);
  };

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const filteredDishes = useMemo(() => {
    if (activeCategory === 'all') return menuItems;
    return menuItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, menuItems]);

  return (
    <div className="min-h-screen lg:h-screen w-full bg-[#0a0b0a] text-[#efe7d2] flex flex-col lg:flex-row lg:overflow-hidden">
      
      {/* LEFT 50%: STRICTLY FIXED TO VIEWPORT — DOES NOT SCROLL AT ALL */}
      <div className="w-full lg:w-1/2 h-[45vh] lg:h-screen lg:fixed lg:top-0 lg:left-0 relative overflow-hidden bg-[#121312] border-b lg:border-b-0 lg:border-r border-[#333330]/80 p-6 sm:p-10 lg:p-14 flex flex-col justify-end z-10 shrink-0">
        {/* Cover Image for Menu - 100% Fixed */}
        <img
          src={RESTAURANT_INFO.assets.menuCover}
          alt="Menu Yūgen"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0a] via-[#0a0b0a]/35 to-black/20 pointer-events-none" />

        {/* Bottom-Left Kinetic Title (pure MENU) */}
        <div className="relative z-10">
          <KineticTitle title="MENU" />
        </div>
      </div>

      {/* RIGHT 50%: SCROLLABLE COLUMN WITH VERTICAL DISHES LIST */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="w-full lg:w-1/2 lg:ml-[50%] min-h-screen lg:h-screen lg:overflow-y-auto flex flex-col justify-between scroll-smooth relative"
      >
        
        {/* Sticky Category Filter Tabs at Top */}
        <div className="sticky top-0 z-30 bg-[#0a0b0a]/95 backdrop-blur-md border-b border-[#333330]/60 px-6 sm:px-10 lg:px-14 pt-24 lg:pt-8 pb-4 transition-all">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? 'bg-[#efe7d2] text-[#0a0b0a] font-semibold shadow-md'
                      : 'text-[#efe7d2]/70 hover:text-[#efe7d2] hover:bg-white/5'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dishes Vertical List */}
        <div className="p-6 sm:p-10 lg:p-14 space-y-10">
          <div className="space-y-8 sm:space-y-10">
            {filteredDishes.map((dish) => (
              <div
                key={dish.id}
                className="group flex flex-col sm:flex-row gap-5 items-start sm:items-center pb-8 border-b border-[#333330]/40 last:border-b-0"
              >
                {/* Dish Photo on Left with Pure Hover Zoom */}
                <div className="shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-[#141514] border border-[#333330]/80">
                  <img
                    src={dish.image}
                    alt={dish.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>

                {/* Dish Information on Right */}
                <div className="flex-1 w-full space-y-2">
                  
                  {/* Title + Dots + Price in Euros */}
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-serif text-xl sm:text-2xl text-[#efe7d2] tracking-wide group-hover:text-[#cfbe91] transition-colors">
                      {dish.title}
                    </h3>

                    {/* Qitchen Dotted Line */}
                    <div className="dots-divider flex-1 min-w-[20px] mb-1" />

                    {/* Price in EUR */}
                    <span className="font-serif text-xl sm:text-2xl text-[#cfbe91] font-medium shrink-0">
                      {dish.priceStr || `${dish.price} €`}
                    </span>
                  </div>

                  {/* Pure French Culinary Description */}
                  <p className="text-xs sm:text-sm text-[#efe7d2]/70 leading-relaxed font-light">
                    {dish.desc}
                  </p>

                </div>
              </div>
            ))}
          </div>

          {/* Subtle Bottom Note */}
          <div className="pt-6 border-t border-[#333330]/60 text-center sm:text-left text-xs text-[#efe7d2]/40 font-light">
            Tous nos sushis sont préparés à la minute à partir de poissons issus de pêches durables et raisonnées.
          </div>
        </div>

        {/* Floating Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-[#181918]/90 text-[#efe7d2] border border-[#333330] hover:bg-[#cfbe91] hover:text-[#0a0b0a] transition-all duration-300 shadow-2xl backdrop-blur-md group animate-fade-in"
            aria-label="Retour en haut"
            title="Retour en haut"
          >
            <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
          </button>
        )}

        {/* Minimal Legal Bar with Manager Lock */}
        <div className="mt-auto px-6 sm:px-10 lg:px-14 py-6 border-t border-[#333330]/40 flex flex-col sm:flex-row items-center justify-between text-xs text-[#efe7d2]/40 font-light gap-3">
          <span>© {new Date().getFullYear()} Yūgen Paris. Tous droits réservés.</span>
          <div className="flex items-center gap-4">
            <button 
              onClick={onOpenLicensing} 
              className="hover:text-[#cfbe91] transition-colors"
            >
              Mentions Légales
            </button>
            <span className="text-[#333330]">•</span>
            <button
              onClick={() => navigate('/manager')}
              className="hover:text-[#cfbe91] transition-colors flex items-center gap-1.5 opacity-60 hover:opacity-100"
              title="Espace Direction & Gestion"
            >
              <Lock className="w-3 h-3 text-[#cfbe91]/70" />
              <span>Espace Gestionnaire</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
