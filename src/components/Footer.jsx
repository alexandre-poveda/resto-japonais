import React from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { MapPin, Phone, Mail, Clock, Lock } from 'lucide-react';

export default function Footer({ navigate, onOpenLicensing }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0a0b0a] text-[#efe7d2] border-t border-[#333330] overflow-hidden">
      
      {/* Background Japanese texture overlay */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <img
          src={RESTAURANT_INFO.assets.footerImage}
          alt="Texture d'ambiance"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0a] via-[#0a0b0a]/90 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#333330]/60">
          
          {/* Col 1: Brand & Philosophy */}
          <div className="lg:col-span-4 space-y-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 focus:outline-none"
            >
              <span className="font-serif text-3xl tracking-[0.25em] uppercase text-[#efe7d2] hover:text-[#cfbe91] transition-colors">
                {RESTAURANT_INFO.name}
              </span>
            </button>

            <p className="text-xs sm:text-sm text-[#efe7d2]/70 leading-relaxed font-light max-w-sm">
              L'excellence du sushi japonais contemporain à Paris. Chaque découpe, chaque grain de riz shari et chaque accord sont pensés pour honorer l'art millénaire de l'artisanat nippon.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {/* Instagram SVG */}
              <a
                href={RESTAURANT_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/5 border border-white/10 text-[#efe7d2]/80 hover:text-[#cfbe91] hover:border-[#cfbe91]/40 transition-colors"
                aria-label="Instagram Yūgen"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* X / Twitter SVG */}
              <a
                href={RESTAURANT_INFO.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/5 border border-white/10 text-[#efe7d2]/80 hover:text-[#cfbe91] hover:border-[#cfbe91]/40 transition-colors"
                aria-label="X / Twitter Yūgen"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links (Sans l'espace gestionnaire qui doit être uniquement en bas) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#cfbe91] font-semibold">
              Exploration
            </h4>
            <ul className="space-y-2 text-xs uppercase tracking-wider text-[#efe7d2]/70 font-light">
              <li>
                <button
                  onClick={() => navigate('/')}
                  className="hover:text-[#efe7d2] transition-colors"
                >
                  Accueil
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/menu')}
                  className="hover:text-[#efe7d2] transition-colors"
                >
                  Notre Carte
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/about')}
                  className="hover:text-[#efe7d2] transition-colors"
                >
                  À Propos
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/reservation')}
                  className="hover:text-[#efe7d2] transition-colors"
                >
                  Réservation
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#cfbe91] font-semibold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Horaires des Services
            </h4>
            <div className="space-y-2 text-xs text-[#efe7d2]/70 font-light">
              {RESTAURANT_INFO.hours.map((h, idx) => (
                <div key={idx} className="pb-1">
                  <p className="text-[#efe7d2] font-medium">{h.days}</p>
                  <p className="text-[11px] text-[#efe7d2]/60">
                    Déjeuner : {h.lunch} <br />
                    Dîner : {h.dinner}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Col 4: Contact & Address */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#cfbe91] font-semibold flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              Adresse & Contact
            </h4>
            <div className="space-y-2 text-xs text-[#efe7d2]/70 font-light">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#cfbe91] shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#cfbe91] shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-[#efe7d2]">
                  {RESTAURANT_INFO.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#cfbe91] shrink-0" />
                <a href={`mailto:${RESTAURANT_INFO.email}`} className="hover:text-[#efe7d2]">
                  {RESTAURANT_INFO.email}
                </a>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom bar with discreet Espace Gestionnaire strictly placed here */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#efe7d2]/50 font-light">
          <p>© {currentYear} {RESTAURANT_INFO.name} Paris. Tous droits réservés.</p>
          
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              onClick={onOpenLicensing}
              className="hover:text-[#cfbe91] transition-colors underline-offset-4 hover:underline"
            >
              Mentions Légales & Crédits
            </button>

            <span className="text-[#333330]">•</span>

            {/* Espace Gestionnaire (discret, uniquement dans le footer) */}
            <button
              onClick={() => navigate('/gestionnaire')}
              className="flex items-center gap-1.5 hover:text-[#cfbe91] transition-colors underline-offset-4 hover:underline text-[#efe7d2]/50 group"
              title="Accès réservé à la direction du restaurant"
            >
              <Lock className="w-3 h-3 text-[#cfbe91]/70 group-hover:text-[#cfbe91]" />
              <span>Espace Gestionnaire</span>
            </button>

            <span className="text-[#333330] hidden sm:inline">•</span>
            <span className="hidden sm:inline">Haute Gastronomie Japonaise</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
