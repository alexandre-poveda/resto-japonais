import React, { useState, useMemo } from 'react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/restaurantData';
import { Search, ZoomIn, Utensils, Check, Sparkles, Filter, X } from 'lucide-react';
import DishModal from '../components/DishModal';

export default function MenuPage({ navigate, selectedDishes = [], onToggleSelectDish, onClearSelection }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [activeDishForModal, setActiveDishForModal] = useState(null);

  // Filtered dishes
  const filteredDishes = useMemo(() => {
    return MENU_ITEMS.filter((dish) => {
      // Category filter
      const matchesCategory = activeCategory === 'all' || dish.category === activeCategory;

      // Search filter
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        dish.title.toLowerCase().includes(query) ||
        dish.titleFr.toLowerCase().includes(query) ||
        dish.desc.toLowerCase().includes(query) ||
        dish.ingredients?.some((ing) => ing.toLowerCase().includes(query));

      // Tag filter
      const matchesTag =
        !selectedTag ||
        dish.badges?.some((b) => b.toLowerCase().includes(selectedTag.toLowerCase()));

      return matchesCategory && matchesSearch && matchesTag;
    });
  }, [activeCategory, searchQuery, selectedTag]);

  const quickTags = [
    { label: 'Tous', value: '' },
    { label: '🌶️ Épicé', value: 'Épicé' },
    { label: '🌱 Végétarien', value: 'Végétarien' },
    { label: '⭐ Signatures', value: 'Signature' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0b0a] text-[#efe7d2] pt-24 sm:pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#cfbe91] font-semibold">
            Carte Gastronomique
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#efe7d2] tracking-wide">
            L'Art Culinaire du Sushi
          </h1>
          <p className="text-xs sm:text-sm text-[#efe7d2]/70 font-light leading-relaxed max-w-xl mx-auto">
            Découvrez nos compositions de haute précision. Survolez ou cliquez sur les visuels pour explorer chaque découpe en détail.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {MENU_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-xs uppercase tracking-widest whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? 'bg-[#efe7d2] text-[#0a0b0a] font-semibold shadow-[0_0_15px_rgba(239,231,210,0.3)]'
                    : 'bg-[#141514] text-[#efe7d2]/70 hover:text-[#efe7d2] hover:bg-[#1f201f] border border-[#333330]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Bar & Quick Tags */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 bg-[#121312] p-3 sm:p-4 rounded-2xl border border-[#333330]/60">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#efe7d2]/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un maki, ingrédient..."
              className="w-full bg-[#181918] border border-[#333330] rounded-xl pl-10 pr-9 py-2 text-xs text-[#efe7d2] placeholder-[#efe7d2]/40 focus:outline-none focus:border-[#cfbe91] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#efe7d2]/40 hover:text-[#efe7d2]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Tag Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            {quickTags.map((tag) => (
              <button
                key={tag.value}
                onClick={() => setSelectedTag(tag.value)}
                className={`px-3 py-1.5 rounded-lg text-[11px] uppercase tracking-wider transition-colors whitespace-nowrap ${
                  selectedTag === tag.value
                    ? 'bg-[#cfbe91]/20 text-[#cfbe91] border border-[#cfbe91]/40'
                    : 'bg-[#181918] text-[#efe7d2]/60 hover:text-[#efe7d2] border border-[#333330]'
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>

        </div>

        {/* Menu Dishes Grid */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-20 bg-[#121312] rounded-3xl border border-[#333330] p-8">
            <Utensils className="w-10 h-10 text-[#cfbe91] mx-auto mb-3 opacity-60" />
            <h3 className="font-serif text-2xl text-[#efe7d2] mb-1">
              Aucun plat ne correspond à votre recherche
            </h3>
            <p className="text-xs text-[#efe7d2]/60 mb-6">
              Essayez de modifier votre mot-clé ou réinitialisez les filtres.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setSelectedTag('');
              }}
              className="px-6 py-2.5 rounded-full text-xs uppercase tracking-widest bg-[#efe7d2] text-[#0a0b0a] font-semibold hover:bg-[#cfbe91]"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {filteredDishes.map((dish) => {
              const isSelected = selectedDishes.some((d) => d.id === dish.id);

              return (
                <div
                  key={dish.id}
                  className="group relative bg-[#141514] hover:bg-[#181a18] border border-[#333330] hover:border-[#cfbe91]/40 rounded-2xl p-4 sm:p-5 transition-all duration-300 flex flex-col sm:flex-row gap-4 sm:gap-5 shadow-lg"
                >
                  
                  {/* Dish Thumbnail with HOVER ZOOM & CLICK TO ZOOM */}
                  <div
                    onClick={() => setActiveDishForModal(dish)}
                    className="relative shrink-0 w-full sm:w-36 h-48 sm:h-36 rounded-xl overflow-hidden bg-[#0a0b0a] cursor-pointer"
                    title="Cliquez pour zoomer en haute résolution"
                  >
                    <img
                      src={dish.image}
                      alt={dish.titleFr || dish.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-115"
                    />

                    {/* Subtle Dark Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                    {/* Magnifier Hover Icon (Click hint) */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                      <span className="p-2 rounded-full bg-[#0a0b0a]/80 text-[#cfbe91] border border-[#cfbe91]/40 shadow-lg flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold">
                        <ZoomIn className="w-3.5 h-3.5" />
                        <span>Zoomer</span>
                      </span>
                    </div>

                    {/* Badges on mobile thumbnail */}
                    {dish.pieces && (
                      <span className="sm:hidden absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] bg-black/70 text-[#efe7d2] backdrop-blur-sm border border-white/10">
                        {dish.pieces}
                      </span>
                    )}
                  </div>

                  {/* Dish Content & Dotted Price Line */}
                  <div className="flex-1 flex flex-col justify-between space-y-2.5">
                    <div>
                      {/* Top Row: Title, Dots, Price in EUR */}
                      <div className="flex items-baseline gap-2 mb-1">
                        <h3
                          onClick={() => setActiveDishForModal(dish)}
                          className="font-serif text-lg sm:text-xl text-[#efe7d2] group-hover:text-[#cfbe91] transition-colors cursor-pointer"
                        >
                          {dish.titleFr}
                        </h3>

                        {/* Qitchen Dotted Separator */}
                        <div className="dots-divider flex-1 min-w-[20px] mb-1" />

                        {/* Price in Euros */}
                        <span className="font-serif text-lg sm:text-xl text-[#cfbe91] font-semibold shrink-0">
                          {dish.priceStr}
                        </span>
                      </div>

                      {/* Original Japanese/English Subtitle & Badges */}
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {dish.titleFr !== dish.title && (
                          <span className="text-[11px] uppercase tracking-wider text-[#efe7d2]/40 font-mono">
                            {dish.title}
                          </span>
                        )}
                        {dish.badges?.map((b, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded text-[10px] tracking-wide bg-white/5 text-[#efe7d2]/70 border border-white/5"
                          >
                            {b}
                          </span>
                        ))}
                      </div>

                      {/* French Description */}
                      <p className="text-xs text-[#efe7d2]/75 leading-relaxed font-light line-clamp-2">
                        {dish.desc}
                      </p>
                    </div>

                    {/* Bottom Actions Row */}
                    <div className="pt-2 flex items-center justify-between border-t border-[#333330]/40 text-xs">
                      <button
                        onClick={() => setActiveDishForModal(dish)}
                        className="text-[11px] uppercase tracking-widest text-[#cfbe91] hover:text-[#efe7d2] transition-colors flex items-center gap-1"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                        <span>Détails & Zoom</span>
                      </button>

                      <button
                        onClick={() => onToggleSelectDish && onToggleSelectDish(dish)}
                        className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-widest transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-[#cfbe91] text-[#0a0b0a] font-semibold'
                            : 'bg-white/5 hover:bg-white/10 text-[#efe7d2]/70 hover:text-[#efe7d2] border border-white/10'
                        }`}
                        title="Sélectionner pour ma visite"
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>Choisi</span>
                          </>
                        ) : (
                          <>
                            <Utensils className="w-3 h-3 text-[#cfbe91]" />
                            <span>Sélectionner</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Floating Table Selection Pill if items selected */}
        {selectedDishes.length > 0 && (
          <div className="fixed bottom-6 inset-x-4 max-w-lg mx-auto z-30 animate-fade-in">
            <div className="bg-[#141514]/95 backdrop-blur-xl border border-[#cfbe91]/50 p-4 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.8)] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#cfbe91]/20 text-[#cfbe91]">
                  <Utensils className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#efe7d2]">
                    {selectedDishes.length} plat{selectedDishes.length > 1 ? 's' : ''} dans votre sélection
                  </p>
                  <p className="text-[11px] text-[#cfbe91]">
                    Total estimé : {selectedDishes.reduce((sum, d) => sum + (d.price || 0), 0)} €
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onClearSelection}
                  className="px-2.5 py-1.5 text-[11px] text-[#efe7d2]/60 hover:text-[#efe7d2] transition-colors"
                >
                  Effacer
                </button>
                <button
                  onClick={() => navigate('/reservation')}
                  className="px-4 py-2 rounded-xl text-xs uppercase tracking-widest font-semibold bg-[#cfbe91] text-[#0a0b0a] hover:bg-[#efe7d2] transition-colors shadow-md"
                >
                  Réserver ma table
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Dish Modal with Interactive Zoom & Details */}
      <DishModal
        dish={activeDishForModal}
        onClose={() => setActiveDishForModal(null)}
        onToggleSelect={onToggleSelectDish}
        isSelected={activeDishForModal && selectedDishes.some((d) => d.id === activeDishForModal.id)}
        onBookTable={() => navigate('/reservation')}
      />

    </div>
  );
}
