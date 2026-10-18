import React, { useState, useEffect } from 'react';
import HeaderPill from './components/HeaderPill';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import AboutPage from './pages/AboutPage';
import ReservationPage from './pages/ReservationPage';
import NotFoundPage from './pages/NotFoundPage';
import LicensingModal from './components/LicensingModal';

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [isLicensingOpen, setIsLicensingOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const basePath = currentPath.split('?')[0].split('#')[0];
  let PageComponent = HomePage;
  if (basePath === '/menu') {
    PageComponent = MenuPage;
  } else if (basePath === '/about') {
    PageComponent = AboutPage;
  } else if (basePath === '/reservation' || basePath === '/book-a-table') {
    PageComponent = ReservationPage;
  } else if (basePath === '/' || basePath === '') {
    PageComponent = HomePage;
  } else {
    PageComponent = NotFoundPage;
  }

  const isHomePage = basePath === '/' || basePath === '';

  return (
    <div className="bg-[#0a0b0a] text-[#efe7d2] min-h-screen flex flex-col font-sans selection:bg-[#cfbe91] selection:text-[#0a0b0a] overflow-x-hidden">
      
      {/* Top-Left Header Pill with links and Fullscreen Burger Menu */}
      <HeaderPill currentPath={currentPath} navigate={navigate} />

      {/* Main Page Content (50/50 Split Layout) */}
      <main className="flex-1 w-full">
        <PageComponent navigate={navigate} />
      </main>

      {/* Footer on Subpages */}
      {!isHomePage && (
        <Footer
          navigate={navigate}
          onOpenLicensing={() => setIsLicensingOpen(true)}
        />
      )}

      {/* Licensing Modal */}
      <LicensingModal
        isOpen={isLicensingOpen}
        onClose={() => setIsLicensingOpen(false)}
      />

    </div>
  );
}
