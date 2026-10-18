import React, { useState } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Calendar, Users, Clock, Mail, Phone, User, CheckCircle2, Sparkles, Utensils, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ReservationPage({ navigate, selectedDishes = [], onClearSelection }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '2',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
    time: '20:00',
    seatingPreference: 'comptoir', // comptoir or table
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [bookingRef, setBookingRef] = useState('');

  const availableTimes = [
    { label: 'Déjeuner', slots: ['12:00', '12:30', '13:00', '13:30'] },
    { label: 'Dîner', slots: ['19:00', '19:30', '20:00', '20:30', '21:15', '21:45'] }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setErrorMsg('Veuillez renseigner votre nom, adresse e-mail et numéro de téléphone.');
      return;
    }

    setErrorMsg('');
    const randomRef = 'QK-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(randomRef);
    setSubmitted(true);

    // Launch celebratory confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#cfbe91', '#efe7d2', '#ffffff']
      });
    } catch (err) {
      // Ignore if confetti fails
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0b0a] text-[#efe7d2] pt-24 sm:pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#cfbe91] font-semibold">
            Réservation en Ligne
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#efe7d2]">
            Réserver Votre Table
          </h1>
          <p className="text-xs sm:text-sm text-[#efe7d2]/70 font-light leading-relaxed">
            {RESTAURANT_INFO.subtitle}
          </p>
        </div>

        {/* Split Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Atmospheric Visual & Practical Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#333330] bg-[#141514] aspect-[4/5] shadow-2xl group">
              <img
                src={RESTAURANT_INFO.assets.reservationBanner}
                alt="Réservation Qitchen"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0a] via-[#0a0b0a]/30 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 z-10 space-y-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#cfbe91] font-semibold">
                  Expérience Omakase
                </span>
                <p className="font-serif text-2xl text-[#efe7d2]">
                  L'Immersion au Comptoir Hinoki
                </p>
                <p className="text-xs text-[#efe7d2]/70 font-light leading-relaxed">
                  Assistez aux découpes en direct de nos chefs et savourez chaque sushi servi à température idéale dès sa confection.
                </p>
              </div>
            </div>

            {/* Practical Info Card */}
            <div className="glass-card rounded-2xl p-6 space-y-3">
              <h3 className="font-serif text-lg text-[#efe7d2] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#cfbe91]" />
                Informations & Politique d'Accueil
              </h3>
              <ul className="space-y-2 text-xs text-[#efe7d2]/70 font-light">
                <li>• Les réservations sont garanties pendant 15 minutes après l'horaire convenu.</li>
                <li>• Pour les tables de plus de 6 personnes, un menu dégustation unique est proposé.</li>
                <li>• Régimes spéciaux et allergies : merci de les préciser dans vos remarques.</li>
              </ul>
            </div>
          </div>

          {/* Right: Reservation Form / Success Card */}
          <div className="lg:col-span-7 bg-[#141514] border border-[#333330] rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl">
            
            {submitted ? (
              <div className="text-center py-8 space-y-6 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-[#cfbe91]/15 text-[#cfbe91] flex items-center justify-center mx-auto border border-[#cfbe91]/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-widest text-[#cfbe91] font-semibold">
                    Réservation Confirmée
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-[#efe7d2]">
                    Au Plaisir de Vous Recevoir
                  </h2>
                  <p className="text-xs sm:text-sm text-[#efe7d2]/70 max-w-md mx-auto font-light">
                    Un e-mail de confirmation détaillé vous a été adressé à <strong>{formData.email}</strong>.
                  </p>
                </div>

                {/* Booking summary box */}
                <div className="bg-[#181918] border border-[#333330] rounded-2xl p-6 max-w-md mx-auto text-left space-y-3 text-xs">
                  <div className="flex justify-between border-b border-[#333330]/60 pb-2">
                    <span className="text-[#efe7d2]/50">Référence dossier</span>
                    <span className="font-mono text-[#cfbe91] font-semibold">{bookingRef}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#333330]/60 pb-2">
                    <span className="text-[#efe7d2]/50">Nom du titulaire</span>
                    <span className="text-[#efe7d2] font-medium">{formData.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#333330]/60 pb-2">
                    <span className="text-[#efe7d2]/50">Date & Heure</span>
                    <span className="text-[#efe7d2] font-medium">{formData.date} à {formData.time}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#333330]/60 pb-2">
                    <span className="text-[#efe7d2]/50">Nombre de convives</span>
                    <span className="text-[#efe7d2] font-medium">{formData.guests} personne{Number(formData.guests) > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#efe7d2]/50">Emplacement souhaité</span>
                    <span className="text-[#cfbe91] capitalize">{formData.seatingPreference === 'comptoir' ? 'Comptoir Omakase' : 'Table Salle Intime'}</span>
                  </div>

                  {selectedDishes.length > 0 && (
                    <div className="pt-3 border-t border-[#333330]/60">
                      <p className="text-[#efe7d2]/50 mb-1">Plats présélectionnés ({selectedDishes.length}) :</p>
                      <ul className="text-[11px] text-[#efe7d2]/80 space-y-0.5">
                        {selectedDishes.map((d, i) => (
                          <li key={i}>• {d.titleFr || d.title} ({d.priceStr})</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="pt-4 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      if (onClearSelection) onClearSelection();
                    }}
                    className="px-6 py-2.5 rounded-full text-xs uppercase tracking-widest bg-white/5 hover:bg-white/10 text-[#efe7d2] border border-white/10"
                  >
                    Nouvelle réservation
                  </button>
                  <button
                    onClick={() => navigate('/menu')}
                    className="px-6 py-2.5 rounded-full text-xs uppercase tracking-widest bg-[#cfbe91] text-[#0a0b0a] font-semibold hover:bg-[#efe7d2]"
                  >
                    Voir la carte
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-800/60 text-red-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Pre-selected dishes notice */}
                {selectedDishes.length > 0 && (
                  <div className="p-4 rounded-xl bg-[#cfbe91]/10 border border-[#cfbe91]/30 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-[#cfbe91]">
                      <Utensils className="w-4 h-4 shrink-0" />
                      <span>{selectedDishes.length} plat{selectedDishes.length > 1 ? 's' : ''} présélectionné{selectedDishes.length > 1 ? 's' : ''} pour votre table</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate('/menu')}
                      className="text-[11px] underline text-[#efe7d2]/70 hover:text-[#efe7d2]"
                    >
                      Modifier
                    </button>
                  </div>
                )}

                {/* Row 1: Name & Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#efe7d2]/60 font-medium flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#cfbe91]" />
                      Nom & Prénom *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Alexandre Dubois"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#181918] border border-[#333330] rounded-xl px-4 py-2.5 text-xs text-[#efe7d2] placeholder-[#efe7d2]/30 focus:outline-none focus:border-[#cfbe91] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#efe7d2]/60 font-medium flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#cfbe91]" />
                      Nombre de Personnes *
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full bg-[#181918] border border-[#333330] rounded-xl px-4 py-2.5 text-xs text-[#efe7d2] focus:outline-none focus:border-[#cfbe91] transition-colors"
                    >
                      <option value="1">1 Personne (Comptoir)</option>
                      <option value="2">2 Personnes</option>
                      <option value="3">3 Personnes</option>
                      <option value="4">4 Personnes</option>
                      <option value="5">5 Personnes</option>
                      <option value="6">6 Personnes</option>
                      <option value="7">7 Personnes</option>
                      <option value="8">8 Personnes ou salon privé</option>
                    </select>
                  </div>
                </div>

                {/* Row 2: Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#efe7d2]/60 font-medium flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#cfbe91]" />
                      Adresse E-mail *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alexandre@example.fr"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#181918] border border-[#333330] rounded-xl px-4 py-2.5 text-xs text-[#efe7d2] placeholder-[#efe7d2]/30 focus:outline-none focus:border-[#cfbe91] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#efe7d2]/60 font-medium flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#cfbe91]" />
                      Numéro de Téléphone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+33 6 12 34 56 78"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#181918] border border-[#333330] rounded-xl px-4 py-2.5 text-xs text-[#efe7d2] placeholder-[#efe7d2]/30 focus:outline-none focus:border-[#cfbe91] transition-colors"
                    />
                  </div>
                </div>

                {/* Row 3: Date & Seating Preference */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#efe7d2]/60 font-medium flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#cfbe91]" />
                      Date de Visite *
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-[#181918] border border-[#333330] rounded-xl px-4 py-2.5 text-xs text-[#efe7d2] focus:outline-none focus:border-[#cfbe91] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#efe7d2]/60 font-medium flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#cfbe91]" />
                      Emplacement Souhaité
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, seatingPreference: 'comptoir' })}
                        className={`py-2 px-3 rounded-xl text-xs uppercase tracking-wider transition-colors border ${
                          formData.seatingPreference === 'comptoir'
                            ? 'bg-[#cfbe91]/20 border-[#cfbe91] text-[#cfbe91] font-semibold'
                            : 'bg-[#181918] border-[#333330] text-[#efe7d2]/70'
                        }`}
                      >
                        Comptoir
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, seatingPreference: 'table' })}
                        className={`py-2 px-3 rounded-xl text-xs uppercase tracking-wider transition-colors border ${
                          formData.seatingPreference === 'table'
                            ? 'bg-[#cfbe91]/20 border-[#cfbe91] text-[#cfbe91] font-semibold'
                            : 'bg-[#181918] border-[#333330] text-[#efe7d2]/70'
                        }`}
                      >
                        Table
                      </button>
                    </div>
                  </div>
                </div>

                {/* Time Slots Selector */}
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-wider text-[#efe7d2]/60 font-medium flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#cfbe91]" />
                    Créneau Horaire *
                  </label>
                  
                  <div className="space-y-3">
                    {availableTimes.map((period, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <span className="text-[10px] uppercase tracking-widest text-[#cfbe91]">
                          {period.label}
                        </span>
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                          {period.slots.map((slot) => {
                            const isSelected = formData.time === slot;
                            return (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setFormData({ ...formData, time: slot })}
                                className={`py-2 rounded-lg text-xs font-mono transition-all border ${
                                  isSelected
                                    ? 'bg-[#efe7d2] border-[#efe7d2] text-[#0a0b0a] font-bold shadow-md'
                                    : 'bg-[#181918] border-[#333330] text-[#efe7d2]/70 hover:text-[#efe7d2] hover:border-[#efe7d2]/30'
                                }`}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes & Special Requests */}
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#efe7d2]/60 font-medium">
                    Demandes Particulières ou Allergies (Optionnel)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Allergies au sésame, anniversaire, préférence de placement..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-[#181918] border border-[#333330] rounded-xl px-4 py-2.5 text-xs text-[#efe7d2] placeholder-[#efe7d2]/30 focus:outline-none focus:border-[#cfbe91] transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl text-xs uppercase tracking-widest font-semibold bg-[#cfbe91] text-[#0a0b0a] hover:bg-[#efe7d2] transition-all shadow-xl hover:shadow-[0_0_25px_rgba(207,190,145,0.4)] flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Confirmer la Réservation</span>
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
