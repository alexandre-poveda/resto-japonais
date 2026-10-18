import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import AboutPage from './pages/AboutPage';
import ReservationPage from './pages/ReservationPage';
import LicensingModal from './components/LicensingModal';
import { Utensils, X, Check, ArrowRight } from 'lucide-react';

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [selectedDishes, setSelectedDishes] = useState([]);
  const [isLicensingOpen, setIsLicensingOpen] = useState(false);
  const [isSelectionDrawerOpen, setIsSelectionDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3200);
  };

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSelectDish = (dish) => {
    setSelectedDishes((prev) => {
      const exists = prev.some((d) => d.id === dish.id);
      if (exists) {
        showToast(`« ${dish.titleFr || dish.title} » retiré de votre sélection.`);
        return prev.filter((d) => d.id !== dish.id);
      } else {
        showToast(`« ${dish.titleFr || dish.title} » ajouté à votre sélection de table.`);
        return [...prev, dish];
      }
    });
  };

  const clearSelection = () => {
    setSelectedDishes([]);
    showToast('Sélection réinitialisée.');
  };

  // Determine current page
  const basePath = currentPath.split('?')[0].split('#')[0];
  let PageComponent = HomePage;
  if (basePath === '/menu') {
    PageComponent = MenuPage;
  } else if (basePath === '/about') {
    PageComponent = AboutPage;
  } else if (basePath === '/reservation' || basePath === '/book-a-table') {
    PageComponent = ReservationPage;
  } else {
    PageComponent = HomePage;
  }

  return (
    <div className="bg-[#0a0b0a] text-[#efe7d2] min-h-screen flex flex-col font-sans selection:bg-[#cfbe91] selection:text-[#0a0b0a]">
      
      {/* Top Navbar */}
      <Navbar
        currentPath={currentPath}
        navigate={navigate}
        selectedDishesCount={selectedDishes.length}
        onOpenSelection={() => setIsSelectionDrawerOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        <PageComponent
          navigate={navigate}
          selectedDishes={selectedDishes}
          onToggleSelectDish={toggleSelectDish}
          onClearSelection={clearSelection}
        />
      </main>

      {/* Footer */}
      <Footer
        navigate={navigate}
        onOpenLicensing={() => setIsLicensingOpen(true)}
      />

      {/* Licensing & Legal Modal */}
      <LicensingModal
        isOpen={isLicensingOpen}
        onClose={() => setIsLicensingOpen(false)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
          <div className="bg-[#181918] border border-[#cfbe91]/50 text-[#efe7d2] px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs">
            <span className="w-2 h-2 rounded-full bg-[#cfbe91] shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Table Selection Side Drawer Modal */}
      {isSelectionDrawerOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsSelectionDrawerOpen(false)}
        >
          <div
            className="w-full max-w-md h-full bg-[#141514] border-l border-[#333330] p-6 flex flex-col justify-between text-[#efe7d2] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6 overflow-y-auto">
              <div className="flex items-center justify-between border-b border-[#333330] pb-4">
                <div className="flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-[#cfbe91]" />
                  <h3 className="font-serif text-2xl text-[#efe7d2]">
                    Ma Sélection de Table
                  </h3>
                </div>
                <button
                  onClick={() => setIsSelectionDrawerOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-[#efe7d2]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {selectedDishes.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <Utensils className="w-8 h-8 text-[#cfbe91] opacity-40 mx-auto" />
                  <p className="text-xs text-[#efe7d2]/60">
                    Vous n'avez pas encore sélectionné de plats.
                  </p>
                  <button
                    onClick={() => {
                      setIsSelectionDrawerOpen(false);
                      navigate('/menu');
                    }}
                    className="px-5 py-2 rounded-full text-xs uppercase tracking-widest bg-[#efe7d2] text-[#0a0b0a] font-semibold hover:bg-[#cfbe91]"
                  >
                    Explorer la carte
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-[#efe7d2]/60">
                    Ces mets seront notés pour votre table lors de votre venue :
                  </p>
                  <div className="divide-y divide-[#333330]/50">
                    {selectedDishes.map((dish) => (
                      <div key={dish.id} className="py-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={dish.image}
                            alt={dish.titleFr || dish.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="text-xs font-medium text-[#efe7d2]">
                              {dish.titleFr || dish.title}
                            </p>
                            <p className="text-[11px] text-[#cfbe91]">
                              {dish.priceStr}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => toggleSelectDish(dish)}
                          className="p-1.5 text-[#efe7d2]/40 hover:text-red-400 transition-colors"
                          title="Retirer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {selectedDishes.length > 0 && (
              <div className="pt-4 border-t border-[#333330] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#efe7d2]/70">Total estimé :</span>
                  <span className="font-serif text-xl text-[#cfbe91] font-semibold">
                    {selectedDishes.reduce((sum, d) => sum + (d.price || 0), 0)} €
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={clearSelection}
                    className="w-1/3 py-2.5 rounded-xl text-xs uppercase tracking-widest text-[#efe7d2]/60 hover:text-[#efe7d2] border border-[#333330]"
                  >
                    Vider
                  </button>
                  <button
                    onClick={() => {
                      setIsSelectionDrawerOpen(false);
                      navigate('/reservation');
                    }}
                    className="w-2/3 py-2.5 rounded-xl text-xs uppercase tracking-widest font-semibold bg-[#cfbe91] text-[#0a0b0a] hover:bg-[#efe7d2] transition-colors flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <span>Réserver</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
