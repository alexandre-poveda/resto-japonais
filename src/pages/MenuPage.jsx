import React, { useState, useMemo } from 'react';
import { RESTAURANT_INFO, MENU_CATEGORIES, MENU_ITEMS } from '../data/restaurantData';
import KineticTitle from '../components/KineticTitle';

export default function MenuPage({ navigate }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredDishes = useMemo(() => {
    if (activeCategory === 'all') return MENU_ITEMS;
    return MENU_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen w-full bg-[#0a0b0a] text-[#efe7d2] flex flex-col lg:flex-row">
      
      {/* LEFT 50%: Fixed Hero Image with Animated Kinetic Title */}
      <div className="w-full lg:w-1/2 h-[45vh] lg:h-screen lg:sticky lg:top-0 relative overflow-hidden bg-[#121312] border-b lg:border-b-0 lg:border-r border-[#333330]/80 p-6 sm:p-10 lg:p-14 flex flex-col justify-end">
        {/* Cover Image for Menu */}
        <img
          src={RESTAURANT_INFO.assets.menuCover}
          alt="Menu Yūgen"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0a] via-[#0a0b0a]/35 to-black/20" />

        {/* Bottom-Left Kinetic Title with Blur-in letter-by-letter */}
        <div className="relative z-10">
          <KineticTitle
            title="MENU"
            subtitle="CARTE GASTRONOMIQUE"
          />
        </div>
      </div>

      {/* RIGHT 50%: Purely Descriptive, Clean Vertical Menu List */}
      <div className="w-full lg:w-1/2 min-h-screen p-6 sm:p-10 lg:p-14 space-y-10">
        
        {/* Category Filter Tabs at Top */}
        <div className="pt-16 lg:pt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#333330]/60">
          {MENU_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? 'bg-[#efe7d2] text-[#0a0b0a] font-semibold'
                    : 'text-[#efe7d2]/70 hover:text-[#efe7d2] hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Dishes Vertical List */}
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
                    {dish.priceStr}
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

    </div>
  );
}
