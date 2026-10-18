import React, { useEffect } from 'react';
import { X, ShieldCheck, FileText, Award } from 'lucide-react';

export default function LicensingModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#141514] border border-[#333330] rounded-2xl p-6 sm:p-8 text-[#efe7d2] shadow-2xl max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-[#cfbe91] hover:text-[#0a0b0a] text-[#efe7d2] transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <ShieldCheck className="w-6 h-6 text-[#cfbe91]" />
          <h3 className="font-serif text-2xl sm:text-3xl text-[#efe7d2]">
            Mentions Légales & Crédits
          </h3>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-[#efe7d2]/75 leading-relaxed font-light">
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#cfbe91] font-semibold mb-2">
              Éditeur du Site
            </h4>
            <p>
              Qitchen SAS — Restaurant Gastronomique Japonais<br />
              18 Rue Royale, 75008 Paris, France<br />
              SIRET : 894 512 340 00012 • RCS Paris<br />
              Numéro de TVA intracommunautaire : FR 34 894512340<br />
              Directeur de la publication : Le Chef Exécutif Qitchen
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#cfbe91] font-semibold mb-2">
              Crédits Typographiques & Design
            </h4>
            <p>
              • Typographie Titres : <strong>Forum</strong> (conçue par Denis Masharov, sous licence SIL Open Font License).<br />
              • Typographie Corps de texte : <strong>Plus Jakarta Sans</strong> (par Tokotype, sous SIL Open Font License) & <strong>Satoshi</strong> (par Indian Type Foundry / Fontshare).<br />
              • Inspiré du template officiel Framer <em>Qitchen</em> par Paweł Gola.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#cfbe91] font-semibold mb-2">
              Photographies & Vidéos
            </h4>
            <p>
              Toutes les photographies culinaires et les vidéos immersives proviennent de photographes d'art culinaire et des ressources officielles de la maison Qitchen (Unsplash, banques d'images d'exception sous licence libre d'utilisation commerciale).
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#cfbe91] font-semibold mb-2">
              Protection des Données Personnelles (RGPD)
            </h4>
            <p>
              Les données recueillies dans le cadre des réservations de table (nom, e-mail, téléphone) sont strictement destinées au service de conciergerie de Qitchen afin de confirmer votre table et de vous accueillir dans les meilleures conditions. Aucune donnée n'est cédée à des tiers. Conformément au RGPD, vous disposez d'un droit d'accès et de rectification sur simple demande par e-mail à contact@qitchen-paris.fr.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-[#333330] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#efe7d2] text-[#0a0b0a] hover:bg-[#cfbe91] transition-colors"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
}
