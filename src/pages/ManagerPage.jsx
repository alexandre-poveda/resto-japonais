import React, { useState, useEffect } from 'react';
import { 
  Lock, Unlock, Eye, EyeOff, ShieldCheck, KeyRound, LogOut, ArrowLeft,
  Plus, Edit2, Trash2, RotateCcw, Check, X, Search, Utensils, Calendar,
  Clock, MapPin, Phone, Mail, Sparkles, AlertCircle, FileText, CheckCircle2
} from 'lucide-react';
import { 
  getStoredMenu, saveStoredMenu, resetStoredMenu,
  getStoredInfo, saveStoredInfo, resetStoredInfo,
  getStoredStory, saveStoredStory, resetStoredStory,
  getStoredReservations, updateReservationStatus, deleteReservation
} from '../data/storage';
import { MENU_CATEGORIES } from '../data/restaurantData';

export default function ManagerPage({ navigate }) {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('yugen_manager_auth') === 'true';
  });

  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' | 'reservations' | 'info' | 'story'
  const [feedback, setFeedback] = useState(null);

  // Data states
  const [menuItems, setMenuItems] = useState(() => getStoredMenu());
  const [reservations, setReservations] = useState(() => getStoredReservations());
  const [restaurantInfo, setRestaurantInfo] = useState(() => getStoredInfo());
  const [storyContent, setStoryContent] = useState(() => getStoredStory());

  // Search & filter for menu
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Dish modal state
  const [isDishModalOpen, setIsDishModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState(null);
  const [dishForm, setDishForm] = useState({
    title: '',
    category: 'maki',
    price: 6,
    priceStr: '6 €',
    desc: '',
    image: '/assets/QAnUAEBWAkCE4NM4Ja4aQy9Tu4.webp'
  });

  // Listen to external data changes
  useEffect(() => {
    const handleUpdate = () => {
      setMenuItems(getStoredMenu());
      setReservations(getStoredReservations());
      setRestaurantInfo(getStoredInfo());
      setStoryContent(getStoredStory());
    };
    window.addEventListener('yugen_data_updated', handleUpdate);
    return () => window.removeEventListener('yugen_data_updated', handleUpdate);
  }, []);

  const triggerFeedback = (message, type = 'success') => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback(null), 3500);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const clean = passwordInput.trim().toLowerCase();
    // Accepted passwords
    if (clean === 'yugen2026' || clean === 'yugen' || clean === 'admin' || clean === '1234') {
      sessionStorage.setItem('yugen_manager_auth', 'true');
      setIsAuthenticated(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('yugen_manager_auth');
    setIsAuthenticated(false);
    setPasswordInput('');
    setPasswordError(false);
  };

  // --- DISH ACTIONS ---
  const handleOpenNewDish = () => {
    setEditingDish(null);
    setDishForm({
      title: '',
      category: 'maki',
      price: 14,
      priceStr: '14 €',
      desc: '',
      image: '/assets/QAnUAEBWAkCE4NM4Ja4aQy9Tu4.webp'
    });
    setIsDishModalOpen(true);
  };

  const handleOpenEditDish = (dish) => {
    setEditingDish(dish);
    setDishForm({
      title: dish.title || '',
      category: dish.category || 'maki',
      price: dish.price || 14,
      priceStr: dish.priceStr || `${dish.price} €`,
      desc: dish.desc || '',
      image: dish.image || '/assets/QAnUAEBWAkCE4NM4Ja4aQy9Tu4.webp'
    });
    setIsDishModalOpen(true);
  };

  const handleSaveDish = (e) => {
    e.preventDefault();
    if (!dishForm.title.trim()) return;

    const formattedPriceStr = `${dishForm.price} €`;

    if (editingDish) {
      const updated = menuItems.map(item => 
        item.id === editingDish.id 
          ? { ...item, ...dishForm, priceStr: formattedPriceStr }
          : item
      );
      setMenuItems(updated);
      saveStoredMenu(updated);
      triggerFeedback(`Le plat « ${dishForm.title} » a été mis à jour.`);
    } else {
      const newDish = {
        id: 'dish-' + Date.now(),
        ...dishForm,
        priceStr: formattedPriceStr
      };
      const updated = [newDish, ...menuItems];
      setMenuItems(updated);
      saveStoredMenu(updated);
      triggerFeedback(`Nouveau plat « ${dishForm.title} » ajouté à la carte.`);
    }

    setIsDishModalOpen(false);
  };

  const handleDeleteDish = (id, name) => {
    if (window.confirm(`Confirmer la suppression du plat « ${name} » ?`)) {
      const updated = menuItems.filter(item => item.id !== id);
      setMenuItems(updated);
      saveStoredMenu(updated);
      triggerFeedback(`Le plat « ${name} » a été supprimé.`);
    }
  };

  const handleResetMenu = () => {
    if (window.confirm('Voulez-vous rétablir tous les plats officiels par défaut ?')) {
      const def = resetStoredMenu();
      setMenuItems(def);
      triggerFeedback('Carte restaurée avec succès.');
    }
  };

  // --- INFO ACTIONS ---
  const handleSaveInfo = (e) => {
    e.preventDefault();
    saveStoredInfo(restaurantInfo);
    triggerFeedback('Coordonnées et horaires sauvegardés.');
  };

  // --- STORY ACTIONS ---
  const handleSaveStory = (e) => {
    e.preventDefault();
    saveStoredStory(storyContent);
    triggerFeedback('Récit et engagements sauvegardés.');
  };

  // Filtered dishes in dashboard
  const visibleDishes = menuItems.filter(dish => {
    const matchesCat = categoryFilter === 'all' || dish.category === categoryFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      dish.title?.toLowerCase().includes(query) ||
      dish.desc?.toLowerCase().includes(query);
    return matchesCat && matchesSearch;
  });

  // ----------------------------------------------------
  // LOGIN SCREEN
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0b0a] text-[#efe7d2] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#141514] border border-[#333330] rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6 animate-fade-in">
          
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#cfbe91]/15 text-[#cfbe91] flex items-center justify-center mx-auto border border-[#cfbe91]/30">
              <KeyRound className="w-7 h-7" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#cfbe91] font-semibold">
              Accès Privilégié
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#efe7d2]">
              Espace Gestionnaire
            </h1>
            <p className="text-xs text-[#efe7d2]/60 font-light">
              Portail sécurisé pour la mise à jour de la carte, des réservations et des horaires.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider text-[#efe7d2]/70 font-medium">
                Mot de Passe de Sécurité
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoFocus
                  placeholder="Entrez votre mot de passe"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setPasswordError(false);
                  }}
                  className={`w-full bg-[#181918] border rounded-xl px-4 py-3 text-xs text-[#efe7d2] placeholder-[#efe7d2]/30 pr-10 focus:outline-none transition-colors ${
                    passwordError 
                      ? 'border-red-600 focus:border-red-500' 
                      : 'border-[#333330] focus:border-[#cfbe91]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#efe7d2]/50 hover:text-[#efe7d2]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {passwordError && (
                <p className="text-xs text-red-400 pt-1 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Mot de passe incorrect. (Indice : <em>yugen2026</em>)
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-xs uppercase tracking-widest font-semibold bg-[#efe7d2] text-[#0a0b0a] hover:bg-[#cfbe91] transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Déverrouiller l'Espace</span>
            </button>
          </form>

          <div className="pt-2 text-center border-t border-[#333330]/50">
            <button
              onClick={() => navigate('/')}
              className="text-xs text-[#efe7d2]/50 hover:text-[#efe7d2] flex items-center justify-center gap-1.5 mx-auto transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Retourner sur le site public</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // AUTHENTICATED DASHBOARD
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-[#0a0b0a] text-[#efe7d2] pt-24 sm:pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#141514] border border-[#333330] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#cfbe91] font-semibold">
                Session Administrateur Active
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#efe7d2]">
              Tableau de Bord — {restaurantInfo.name}
            </h1>
            <p className="text-xs text-[#efe7d2]/60 font-light">
              Gérez votre carte, vos réservations et toutes les informations de votre établissement.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => navigate('/')}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-full text-xs uppercase tracking-widest bg-white/5 hover:bg-white/10 text-[#efe7d2] border border-white/10 transition-colors flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voir le site</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-full text-xs uppercase tracking-widest bg-red-950/40 hover:bg-red-900/60 text-red-200 border border-red-800/40 transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Quitter</span>
            </button>
          </div>
        </div>

        {/* Floating Feedback Toast */}
        {feedback && (
          <div className="p-4 rounded-2xl bg-[#cfbe91]/20 border border-[#cfbe91]/50 text-[#efe7d2] text-xs flex items-center gap-2.5 shadow-xl animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-[#cfbe91] shrink-0" />
            <span>{feedback.message}</span>
          </div>
        )}

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#333330]/60 scrollbar-none">
          {[
            { id: 'menu', label: `Carte & Plats (${menuItems.length})`, icon: Utensils },
            { id: 'reservations', label: `Réservations (${reservations.length})`, icon: Calendar },
            { id: 'info', label: 'Coordonnées & Horaires', icon: Clock },
            { id: 'story', label: 'Histoire & Engagements', icon: FileText },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-xl text-xs uppercase tracking-widest whitespace-nowrap transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#efe7d2] text-[#0a0b0a] font-semibold shadow-md'
                    : 'text-[#efe7d2]/70 hover:text-[#efe7d2] hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ==================================================== */}
        {/* TAB 1: MENU ITEMS MANAGEMENT                         */}
        {/* ==================================================== */}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#141514] p-4 rounded-2xl border border-[#333330]">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleOpenNewDish}
                  className="px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#cfbe91] text-[#0a0b0a] hover:bg-[#efe7d2] transition-colors flex items-center gap-2 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Ajouter un Plat</span>
                </button>

                <button
                  onClick={handleResetMenu}
                  className="px-4 py-2.5 rounded-full text-xs uppercase tracking-widest bg-white/5 hover:bg-white/10 text-[#efe7d2]/70 hover:text-[#efe7d2] border border-[#333330] transition-colors flex items-center gap-1.5"
                  title="Restaurer la liste d'origine"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Réinitialiser</span>
                </button>
              </div>

              {/* Search & Category Filter */}
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="relative w-full sm:w-60">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#efe7d2]/40" />
                  <input
                    type="text"
                    placeholder="Chercher un plat..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#181918] border border-[#333330] rounded-xl pl-9 pr-4 py-2 text-xs text-[#efe7d2] focus:outline-none focus:border-[#cfbe91]"
                  />
                </div>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full sm:w-auto bg-[#181918] border border-[#333330] rounded-xl px-3 py-2 text-xs text-[#efe7d2] focus:outline-none focus:border-[#cfbe91]"
                >
                  <option value="all">Toutes Catégories</option>
                  <option value="maki">Maki</option>
                  <option value="uramaki">Uramaki</option>
                  <option value="special">Créations Spéciales</option>
                </select>
              </div>
            </div>

            {/* Dishes Table / Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {visibleDishes.map((dish) => (
                <div
                  key={dish.id}
                  className="bg-[#141514] border border-[#333330] hover:border-[#cfbe91]/40 rounded-2xl p-4 flex gap-4 transition-all"
                >
                  <div className="shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-black/60 border border-[#333330]">
                    <img
                      src={dish.image}
                      alt={dish.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-[#cfbe91] font-semibold">
                          {dish.category?.toUpperCase()}
                        </span>
                        <h3 className="font-serif text-lg text-[#efe7d2] truncate">
                          {dish.title}
                        </h3>
                      </div>
                      <span className="font-serif text-lg text-[#cfbe91] font-semibold shrink-0">
                        {dish.priceStr || `${dish.price} €`}
                      </span>
                    </div>

                    <p className="text-[11px] text-[#efe7d2]/70 font-light line-clamp-2">
                      {dish.desc}
                    </p>

                    <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#333330]/40">
                      <button
                        onClick={() => handleOpenEditDish(dish)}
                        className="px-3 py-1 rounded-lg text-[10px] uppercase tracking-wider bg-white/5 hover:bg-[#cfbe91] hover:text-[#0a0b0a] text-[#efe7d2] transition-colors flex items-center gap-1"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Modifier</span>
                      </button>
                      <button
                        onClick={() => handleDeleteDish(dish.id, dish.title)}
                        className="px-2.5 py-1 rounded-lg text-[10px] uppercase tracking-wider bg-red-950/30 hover:bg-red-900/60 text-red-300 transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Supprimer</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 2: RESERVATIONS MANAGEMENT                       */}
        {/* ==================================================== */}
        {activeTab === 'reservations' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-[#141514] p-4 rounded-2xl border border-[#333330]">
              <span className="text-xs uppercase tracking-widest text-[#cfbe91] font-medium">
                {reservations.length} Réservation{reservations.length > 1 ? 's' : ''} enregistrée{reservations.length > 1 ? 's' : ''}
              </span>
              <p className="text-xs text-[#efe7d2]/50 font-light">
                Total convives prévus : {reservations.reduce((sum, r) => sum + Number(r.guests || 2), 0)} personnes
              </p>
            </div>

            {reservations.length === 0 ? (
              <div className="text-center py-16 bg-[#141514] border border-[#333330] rounded-2xl">
                <p className="text-xs text-[#efe7d2]/50">Aucune réservation pour le moment.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {reservations.map((res) => (
                  <div
                    key={res.id}
                    className="bg-[#141514] border border-[#333330] rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-semibold text-[#cfbe91] bg-black/40 px-2 py-0.5 rounded border border-white/5">
                          {res.id}
                        </span>
                        <h4 className="font-serif text-lg text-[#efe7d2]">
                          {res.name}
                        </h4>
                        <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          res.status === 'confirmée' 
                            ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40' 
                            : 'bg-amber-950/60 text-amber-300 border border-amber-800/40'
                        }`}>
                          {res.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#efe7d2]/70 font-light pt-1">
                        <span>📅 {res.date}</span>
                        <span>⏰ {res.time}</span>
                        <span>👥 {res.guests} convive{Number(res.guests) > 1 ? 's' : ''}</span>
                        <span>📞 {res.phone}</span>
                        <span>✉️ {res.email}</span>
                      </div>

                      {res.notes && (
                        <p className="text-xs text-[#cfbe91]/80 italic pt-1">
                          « {res.notes} »
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-[#333330]/40">
                      <button
                        onClick={() => {
                          const nextStatus = res.status === 'confirmée' ? 'en_attente' : 'confirmée';
                          updateReservationStatus(res.id, nextStatus);
                          triggerFeedback(`Statut mis à jour : ${nextStatus}`);
                        }}
                        className="px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-wider bg-white/5 hover:bg-white/10 text-[#efe7d2] border border-[#333330] transition-colors"
                      >
                        Basculer statut
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`Supprimer la réservation ${res.id} ?`)) {
                            deleteReservation(res.id);
                            triggerFeedback('Réservation supprimée.');
                          }
                        }}
                        className="p-2 rounded-lg text-red-300 hover:bg-red-950/40 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 3: RESTAURANT INFO & HOURS                       */}
        {/* ==================================================== */}
        {activeTab === 'info' && (
          <form onSubmit={handleSaveInfo} className="bg-[#141514] border border-[#333330] rounded-2xl sm:rounded-3xl p-6 sm:p-10 space-y-6">
            <h3 className="font-serif text-2xl text-[#efe7d2]">
              Coordonnées & Horaires du Restaurant
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#efe7d2]/60">Nom de l'Établissement</label>
                <input
                  type="text"
                  value={restaurantInfo.name}
                  onChange={(e) => setRestaurantInfo({ ...restaurantInfo, name: e.target.value })}
                  className="w-full bg-[#181918] border border-[#333330] rounded-xl px-4 py-2.5 text-xs text-[#efe7d2] focus:border-[#cfbe91]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#efe7d2]/60">Numéro de Téléphone</label>
                <input
                  type="text"
                  value={restaurantInfo.phone}
                  onChange={(e) => setRestaurantInfo({ ...restaurantInfo, phone: e.target.value })}
                  className="w-full bg-[#181918] border border-[#333330] rounded-xl px-4 py-2.5 text-xs text-[#efe7d2] focus:border-[#cfbe91]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#efe7d2]/60">Adresse Postale</label>
                <input
                  type="text"
                  value={restaurantInfo.address}
                  onChange={(e) => setRestaurantInfo({ ...restaurantInfo, address: e.target.value })}
                  className="w-full bg-[#181918] border border-[#333330] rounded-xl px-4 py-2.5 text-xs text-[#efe7d2] focus:border-[#cfbe91]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#efe7d2]/60">E-mail Principal</label>
                <input
                  type="email"
                  value={restaurantInfo.email}
                  onChange={(e) => setRestaurantInfo({ ...restaurantInfo, email: e.target.value })}
                  className="w-full bg-[#181918] border border-[#333330] rounded-xl px-4 py-2.5 text-xs text-[#efe7d2] focus:border-[#cfbe91]"
                />
              </div>
            </div>

            {/* Opening hours list */}
            <div className="space-y-3 pt-4 border-t border-[#333330]/60">
              <h4 className="text-xs uppercase tracking-widest text-[#cfbe91] font-semibold">
                Services & Créneaux Horaires
              </h4>

              {restaurantInfo.hours?.map((h, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#181918] p-3 rounded-xl border border-[#333330]/50">
                  <input
                    type="text"
                    value={h.days}
                    onChange={(e) => {
                      const updated = [...restaurantInfo.hours];
                      updated[idx].days = e.target.value;
                      setRestaurantInfo({ ...restaurantInfo, hours: updated });
                    }}
                    className="bg-transparent border-b border-[#333330] pb-1 text-xs text-[#efe7d2] font-medium focus:outline-none focus:border-[#cfbe91]"
                  />
                  <input
                    type="text"
                    placeholder="Midi"
                    value={h.lunch}
                    onChange={(e) => {
                      const updated = [...restaurantInfo.hours];
                      updated[idx].lunch = e.target.value;
                      setRestaurantInfo({ ...restaurantInfo, hours: updated });
                    }}
                    className="bg-transparent border-b border-[#333330] pb-1 text-xs text-[#efe7d2]/80 focus:outline-none focus:border-[#cfbe91]"
                  />
                  <input
                    type="text"
                    placeholder="Soir"
                    value={h.dinner}
                    onChange={(e) => {
                      const updated = [...restaurantInfo.hours];
                      updated[idx].dinner = e.target.value;
                      setRestaurantInfo({ ...restaurantInfo, hours: updated });
                    }}
                    className="bg-transparent border-b border-[#333330] pb-1 text-xs text-[#efe7d2]/80 focus:outline-none focus:border-[#cfbe91]"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#333330]/60">
              <button
                type="submit"
                className="px-8 py-3 rounded-xl text-xs uppercase tracking-widest font-semibold bg-[#cfbe91] text-[#0a0b0a] hover:bg-[#efe7d2] transition-colors shadow-lg"
              >
                Enregistrer les Modifications
              </button>
            </div>
          </form>
        )}

        {/* ==================================================== */}
        {/* TAB 4: STORY & PHILOSOPHY                            */}
        {/* ==================================================== */}
        {activeTab === 'story' && (
          <form onSubmit={handleSaveStory} className="bg-[#141514] border border-[#333330] rounded-2xl sm:rounded-3xl p-6 sm:p-10 space-y-6">
            <h3 className="font-serif text-2xl text-[#efe7d2]">
              Récit de la Maison & Engagements
            </h3>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#efe7d2]/60">Titre Principal</label>
                <input
                  type="text"
                  value={storyContent.headline || ''}
                  onChange={(e) => setStoryContent({ ...storyContent, headline: e.target.value })}
                  className="w-full bg-[#181918] border border-[#333330] rounded-xl px-4 py-2.5 text-xs text-[#efe7d2] focus:border-[#cfbe91]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#efe7d2]/60">Citation / Sous-titre</label>
                <textarea
                  rows={2}
                  value={storyContent.subheading || ''}
                  onChange={(e) => setStoryContent({ ...storyContent, subheading: e.target.value })}
                  className="w-full bg-[#181918] border border-[#333330] rounded-xl px-4 py-2.5 text-xs text-[#efe7d2] focus:border-[#cfbe91]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#efe7d2]/60">Paragraphe 1</label>
                <textarea
                  rows={3}
                  value={storyContent.paragraphs?.[0] || ''}
                  onChange={(e) => {
                    const pars = [...(storyContent.paragraphs || [])];
                    pars[0] = e.target.value;
                    setStoryContent({ ...storyContent, paragraphs: pars });
                  }}
                  className="w-full bg-[#181918] border border-[#333330] rounded-xl px-4 py-2.5 text-xs text-[#efe7d2] focus:border-[#cfbe91]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#efe7d2]/60">Paragraphe 2</label>
                <textarea
                  rows={3}
                  value={storyContent.paragraphs?.[1] || ''}
                  onChange={(e) => {
                    const pars = [...(storyContent.paragraphs || [])];
                    pars[1] = e.target.value;
                    setStoryContent({ ...storyContent, paragraphs: pars });
                  }}
                  className="w-full bg-[#181918] border border-[#333330] rounded-xl px-4 py-2.5 text-xs text-[#efe7d2] focus:border-[#cfbe91]"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-[#333330]/60">
              <button
                type="submit"
                className="px-8 py-3 rounded-xl text-xs uppercase tracking-widest font-semibold bg-[#cfbe91] text-[#0a0b0a] hover:bg-[#efe7d2] transition-colors shadow-lg"
              >
                Sauvegarder le Récit
              </button>
            </div>
          </form>
        )}

      </div>

      {/* ==================================================== */}
      {/* DISH EDIT / ADD MODAL                                */}
      {/* ==================================================== */}
      {isDishModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setIsDishModalOpen(false)}
        >
          <div 
            className="w-full max-w-lg bg-[#141514] border border-[#333330] rounded-3xl p-6 sm:p-8 space-y-5 text-[#efe7d2] shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#333330] pb-4">
              <h3 className="font-serif text-2xl text-[#efe7d2]">
                {editingDish ? 'Modifier le Plat' : 'Nouveau Plat'}
              </h3>
              <button
                onClick={() => setIsDishModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-[#efe7d2]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDish} className="space-y-4 text-xs">
              
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#efe7d2]/70 font-medium">Nom du Plat *</label>
                <input
                  type="text"
                  required
                  placeholder="ex: Maki Thon Truffé"
                  value={dishForm.title}
                  onChange={(e) => setDishForm({ ...dishForm, title: e.target.value })}
                  className="w-full bg-[#181918] border border-[#333330] rounded-xl px-4 py-2.5 text-xs text-[#efe7d2] focus:border-[#cfbe91]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#efe7d2]/70 font-medium">Catégorie</label>
                  <select
                    value={dishForm.category}
                    onChange={(e) => setDishForm({ ...dishForm, category: e.target.value })}
                    className="w-full bg-[#181918] border border-[#333330] rounded-xl px-3 py-2.5 text-xs text-[#efe7d2] focus:border-[#cfbe91]"
                  >
                    <option value="maki">Maki</option>
                    <option value="uramaki">Uramaki</option>
                    <option value="special">Créations Spéciales</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#efe7d2]/70 font-medium">Prix (€) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="500"
                    value={dishForm.price}
                    onChange={(e) => setDishForm({ ...dishForm, price: Number(e.target.value) })}
                    className="w-full bg-[#181918] border border-[#333330] rounded-xl px-4 py-2.5 text-xs text-[#efe7d2] focus:border-[#cfbe91]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#efe7d2]/70 font-medium">Description Culinaire</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Détaillez les ingrédients, la texture et les saveurs..."
                  value={dishForm.desc}
                  onChange={(e) => setDishForm({ ...dishForm, desc: e.target.value })}
                  className="w-full bg-[#181918] border border-[#333330] rounded-xl px-4 py-2.5 text-xs text-[#efe7d2] focus:border-[#cfbe91]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#efe7d2]/70 font-medium">Image (Choisir parmi les visuels ou URL)</label>
                <input
                  type="text"
                  value={dishForm.image}
                  onChange={(e) => setDishForm({ ...dishForm, image: e.target.value })}
                  className="w-full bg-[#181918] border border-[#333330] rounded-xl px-4 py-2 text-xs text-[#efe7d2] font-mono focus:border-[#cfbe91]"
                />
                
                {/* Visual image picker */}
                <div className="pt-2">
                  <p className="text-[10px] text-[#efe7d2]/50 mb-1.5">Photos disponibles :</p>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {[
                      '/assets/QAnUAEBWAkCE4NM4Ja4aQy9Tu4.webp',
                      '/assets/fhMMbGkmrMBjUIswKIN5x3w.webp',
                      '/assets/9kkGOeR8XfJ0bkSq5vagmboso.webp',
                      '/assets/obPljpm9PHIdcU8RiJB5Q4qcTBo.webp',
                      '/assets/quqbVpcYdgH65rZqF71BSohYQ.webp',
                      '/assets/05utisiCSaVR87iUNMsXid3Jgs.webp',
                      '/assets/Ed2EhaCAbs1wRkDTc5vxXiOczE4.webp',
                      '/assets/dewXkdK3qGBrcu5aDMswBstC4c.webp',
                      '/assets/27vE5qIMgg0IarFBK9fDPTLr9ZA.webp',
                      '/assets/obWS2NDDG7Rnd4D7xOGDyh4FCA.webp',
                      '/assets/zoCG6siF05pS2bpapbv0gEtdPqE.webp',
                    ].map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt="Choix"
                        onClick={() => setDishForm({ ...dishForm, image: src })}
                        className={`w-12 h-12 rounded-lg object-cover cursor-pointer border transition-all ${
                          dishForm.image === src ? 'border-[#cfbe91] ring-2 ring-[#cfbe91]' : 'border-[#333330] opacity-60 hover:opacity-100'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#333330]">
                <button
                  type="button"
                  onClick={() => setIsDishModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs uppercase tracking-widest text-[#efe7d2]/70 hover:text-[#efe7d2]"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest font-semibold bg-[#cfbe91] text-[#0a0b0a] hover:bg-[#efe7d2] transition-colors"
                >
                  Enregistrer
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
