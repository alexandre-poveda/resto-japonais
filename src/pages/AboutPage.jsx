import React, { useState, useEffect } from 'react';
import { RESTAURANT_INFO, AWARDS, GALLERY_IMAGES } from '../data/restaurantData';
import { getStoredStory } from '../data/storage';
import { Award, Clock, MapPin, Phone, Mail, Calendar, Lock, ArrowRight } from 'lucide-react';
import KineticTitle from '../components/KineticTitle';

export default function AboutPage({ navigate, onOpenLicensing }) {
  const [storyContent, setStoryContent] = useState(() => getStoredStory());

  // Listen to manager data updates
  useEffect(() => {
    const handleUpdate = () => {
      setStoryContent(getStoredStory());
    };
    window.addEventListener('yugen_data_updated', handleUpdate);
    return () => window.removeEventListener('yugen_data_updated', handleUpdate);
  }, []);

  return (
    <div className="min-h-screen lg:h-screen w-full bg-[#0a0b0a] text-[#efe7d2] flex flex-col lg:flex-row lg:overflow-hidden">
      
      {/* LEFT 50%: STRICTLY FIXED TO VIEWPORT — DOES NOT SCROLL AT ALL */}
      <div className="w-full lg:w-1/2 h-[45vh] lg:h-screen lg:fixed lg:top-0 lg:left-0 relative overflow-hidden bg-[#121312] border-b lg:border-b-0 lg:border-r border-[#333330]/80 p-6 sm:p-10 lg:p-14 flex flex-col justify-end z-10 shrink-0">
        {/* Cover Image for About - 100% Fixed */}
        <img
          src={RESTAURANT_INFO.assets.aboutCover}
          alt="À Propos Yūgen"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0a] via-[#0a0b0a]/35 to-black/20 pointer-events-none" />

        {/* Bottom-Left Kinetic Title (pure À PROPOS) */}
        <div className="relative z-10">
          <KineticTitle title="À PROPOS" />
        </div>
      </div>

      {/* RIGHT 50%: SCROLLABLE COLUMN WITH ESSENTIAL RESTAURANT INFORMATION */}
      <div className="w-full lg:w-1/2 lg:ml-[50%] min-h-screen lg:h-screen lg:overflow-y-auto flex flex-col justify-between">
        
        <div className="p-6 sm:p-10 lg:p-14 space-y-12">
          
          {/* Section 1: Introduction & Identity */}
          <div className="pt-24 lg:pt-14 space-y-4">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#cfbe91] font-semibold">
              Maison de Haute Gastronomie Japonaise
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#efe7d2] leading-tight">
              L'Art du Sushi <br />
              <span className="italic font-light text-[#cfbe91]">Redéfini à Paris</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#efe7d2]/75 font-light leading-relaxed">
              {RESTAURANT_INFO.subtitle}
            </p>
          </div>

          {/* Section 2: Essential Restaurant Informations (Gathered Here) */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl sm:text-2xl text-[#efe7d2]">
              Informations Essentielles
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Horaires & Services */}
              <div className="bg-[#141514] border border-[#333330] rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-[#cfbe91]">
                  <Clock className="w-4 h-4" />
                  <span className="text-[11px] uppercase tracking-widest font-semibold">
                    Horaires des Services
                  </span>
                </div>
                <div className="space-y-1 text-xs text-[#efe7d2]/80 font-light">
                  <p className="font-medium text-[#efe7d2]">Mardi — Vendredi</p>
                  <p>Midi : 12h00 — 14h30</p>
                  <p>Soir : 19h00 — 23h00</p>
                  <div className="pt-1.5 border-t border-[#333330]/50" />
                  <p className="font-medium text-[#efe7d2]">Samedi — Dimanche</p>
                  <p>Midi : 12h30 — 15h00</p>
                  <p>Soir : 19h00 — 23h30</p>
                  <p className="text-[#cfbe91] text-[11px] pt-1">Fermé le Lundi</p>
                </div>
              </div>

              {/* Adresse & Accès */}
              <div className="bg-[#141514] border border-[#333330] rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-[#cfbe91]">
                  <MapPin className="w-4 h-4" />
                  <span className="text-[11px] uppercase tracking-widest font-semibold">
                    Adresse & Accès
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-[#efe7d2]/80 font-light">
                  <p className="font-medium text-[#efe7d2]">{RESTAURANT_INFO.address}</p>
                  <p className="text-[#efe7d2]/60">Quartier de la Madeleine, 8e Arrondissement</p>
                  <div className="pt-1.5 border-t border-[#333330]/50" />
                  <p>Métro Madeleine (Lignes 8, 12, 14)</p>
                  <p>Métro Concorde (Lignes 1, 8, 12)</p>
                  <p className="text-[#cfbe91] text-[11px] pt-1">Service de voiturier disponible le soir</p>
                </div>
              </div>

              {/* Contact Direct */}
              <div className="bg-[#141514] border border-[#333330] rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-[#cfbe91]">
                  <Phone className="w-4 h-4" />
                  <span className="text-[11px] uppercase tracking-widest font-semibold">
                    Contact & Réservation Directe
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-[#efe7d2]/80 font-light">
                  <p>Téléphone : <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-[#efe7d2] hover:text-[#cfbe91] transition-colors">{RESTAURANT_INFO.phone}</a></p>
                  <p>Email Général : <a href={`mailto:${RESTAURANT_INFO.email}`} className="text-[#efe7d2] hover:text-[#cfbe91] transition-colors">{RESTAURANT_INFO.email}</a></p>
                  <p>Email Réservation : <a href={`mailto:${RESTAURANT_INFO.reservationsEmail}`} className="text-[#efe7d2] hover:text-[#cfbe91] transition-colors">{RESTAURANT_INFO.reservationsEmail}</a></p>
                </div>
              </div>

              {/* Réservation Instantanée CTA */}
              <div className="bg-[#141514] border border-[#cfbe91]/30 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-[#cfbe91]">
                    <Calendar className="w-4 h-4" />
                    <span className="text-[11px] uppercase tracking-widest font-semibold">
                      Votre Table au Comptoir
                    </span>
                  </div>
                  <p className="text-xs text-[#efe7d2]/70 font-light">
                    Réservation recommandée au moins 48 heures à l'avance pour le menu Omakase.
                  </p>
                </div>
                <button
                  onClick={() => navigate('/reservation')}
                  className="w-full py-2.5 px-4 rounded-xl text-xs uppercase tracking-widest font-semibold bg-[#efe7d2] text-[#0a0b0a] hover:bg-[#cfbe91] transition-all flex items-center justify-center gap-2"
                >
                  <span>Réserver une table</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

          {/* Section 3: Distinctions Gastronomiques */}
          <div className="space-y-4 pt-4 border-t border-[#333330]/60">
            <h3 className="font-serif text-xl sm:text-2xl text-[#efe7d2]">
              Distinctions & Reconnaissances
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {AWARDS.map((award, idx) => (
                <div
                  key={idx}
                  className="bg-[#141514] border border-[#333330] rounded-2xl p-5 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-[#cfbe91] font-semibold">
                      {award.source}
                    </span>
                    <Award className="w-4 h-4 text-[#cfbe91]" />
                  </div>
                  <h4 className="font-serif text-base text-[#efe7d2]">
                    {award.title}
                  </h4>
                  <p className="text-[11px] text-[#efe7d2]/60 font-light leading-relaxed">
                    {award.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Pure Photography Showcase (NO annotations, NO subtitles, NO pills) */}
          <div className="space-y-4 pt-4 border-t border-[#333330]/60">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl sm:text-2xl text-[#efe7d2]">
                L'Atmosphère & Le Geste
              </h3>
              <span className="text-[10px] uppercase tracking-widest text-[#cfbe91] font-light">
                Immersion Culinaire
              </span>
            </div>

            {/* Aesthetic 2x2 Photo Grid — Pure Photography with ZERO text, ZERO pills, ZERO subtitles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {GALLERY_IMAGES.slice(0, 4).map((img, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-2xl overflow-hidden border border-[#333330] aspect-[4/3] bg-[#141514] shadow-md"
                >
                  <img
                    src={img.src}
                    alt="Atmosphère Yūgen"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Notre Histoire & Maître Sushi */}
          <div className="space-y-6 pt-4 border-t border-[#333330]/60">
            <div className="relative rounded-2xl overflow-hidden border border-[#333330] aspect-[16/9] shadow-lg">
              <img
                src={RESTAURANT_INFO.assets.chefPortrait}
                alt="Maître Sushi Yūgen"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0a] via-black/20 to-transparent" />
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#efe7d2]/75 leading-relaxed font-light">
              <p className="font-serif text-base text-[#cfbe91] italic">
                « {storyContent.subheading} »
              </p>
              {storyContent.paragraphs?.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>

        </div>

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
