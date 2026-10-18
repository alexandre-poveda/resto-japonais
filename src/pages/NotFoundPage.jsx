import React from 'react';
import { Compass, ArrowRight, Utensils } from 'lucide-react';

export default function NotFoundPage({ navigate }) {
  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 min-h-[80vh] flex items-center justify-center bg-[#0a0b0a] text-[#efe7d2]">
      <div className="max-w-xl text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-[#cfbe91]/15 text-[#cfbe91] flex items-center justify-center mx-auto border border-[#cfbe91]/30">
          <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '20s' }} />
        </div>

        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#cfbe91] block">
          404 • Page Non Trouvée
        </span>

        <h1 className="font-serif text-4xl sm:text-6xl text-[#efe7d2] tracking-wide">
          Cette Table N'Existe Pas
        </h1>

        <p className="text-xs sm:text-sm text-[#efe7d2]/70 font-light leading-relaxed max-w-md mx-auto">
          La page que vous recherchez semble introuvable. Rejoignez-nous pour savourer nos sushis d'exception.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto px-7 py-3 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#efe7d2] text-[#0a0b0a] hover:bg-[#cfbe91] transition-all flex items-center justify-center gap-2"
          >
            <span>Retour à l'accueil</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate('/menu')}
            className="w-full sm:w-auto px-7 py-3 rounded-full text-xs uppercase tracking-widest font-medium bg-white/5 hover:bg-white/10 text-[#efe7d2] border border-[#efe7d2]/20 transition-all flex items-center justify-center gap-2"
          >
            <Utensils className="w-4 h-4 text-[#cfbe91]" />
            <span>Découvrir la carte</span>
          </button>
        </div>
      </div>
    </div>
  );
}
