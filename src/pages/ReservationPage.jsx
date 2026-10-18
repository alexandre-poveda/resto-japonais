import React, { useState } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { addReservation } from '../data/storage';
import { CheckCircle2, Calendar, Clock, User, Mail, Phone, Users, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import KineticTitle from '../components/KineticTitle';

export default function ReservationPage({ navigate }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '2',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '20:00',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [bookingRef, setBookingRef] = useState('');

  const timeSlots = [
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
    const ref = 'YG-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(ref);

    // Persist to storage for Manager
    addReservation({
      id: ref,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      guests: formData.guests,
      date: formData.date,
      time: formData.time,
      notes: formData.notes,
      status: 'confirmée',
      createdAt: new Date().toISOString()
    });

    setSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#cfbe91', '#efe7d2', '#ffffff']
      });
    } catch (err) {}
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0b0a] text-[#efe7d2] flex flex-col lg:flex-row">
      
      {/* LEFT 50%: Fixed Big Image with Animated Kinetic Title (Pure RÉSERVATION) */}
      <div className="w-full lg:w-1/2 h-[45vh] lg:h-screen lg:sticky lg:top-0 relative overflow-hidden bg-[#121312] border-b lg:border-b-0 lg:border-r border-[#333330]/80 p-6 sm:p-10 lg:p-14 flex flex-col justify-end">
        {/* Cover Image for Reservation */}
        <img
          src={RESTAURANT_INFO.assets.reservationBanner}
          alt="Réservation Yūgen"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0a] via-[#0a0b0a]/35 to-black/20" />

        {/* Bottom-Left Kinetic Title (pure RÉSERVATION) */}
        <div className="relative z-10">
          <KineticTitle title="RÉSERVATION" />
        </div>
      </div>

      {/* RIGHT 50%: Clean Reservation Form */}
      <div className="w-full lg:w-1/2 min-h-screen p-6 sm:p-10 lg:p-14 space-y-8">
        
        <div className="pt-20 lg:pt-10 space-y-2">
          <h2 className="font-serif text-3xl sm:text-5xl text-[#efe7d2]">
            Réserver une Table
          </h2>
          <p className="text-xs sm:text-sm text-[#efe7d2]/70 font-light leading-relaxed">
            Assurez votre place au comptoir ou en salon intime pour une expérience gastronomique singulière.
          </p>
        </div>

        {submitted ? (
          <div className="bg-[#141514] border border-[#333330] rounded-2xl p-6 sm:p-10 text-center space-y-6 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-[#cfbe91]/15 text-[#cfbe91] flex items-center justify-center mx-auto border border-[#cfbe91]/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-widest text-[#cfbe91] font-semibold">
                Réservation Confirmée
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#efe7d2]">
                Au Plaisir de Vous Recevoir
              </h3>
              <p className="text-xs text-[#efe7d2]/70 max-w-sm mx-auto font-light">
                Un e-mail récapitulatif a été envoyé à <strong>{formData.email}</strong>.
              </p>
            </div>

            <div className="bg-[#181918] border border-[#333330] rounded-xl p-5 text-left space-y-2.5 text-xs max-w-md mx-auto">
              <div className="flex justify-between border-b border-[#333330]/60 pb-2">
                <span className="text-[#efe7d2]/50">Numéro de dossier</span>
                <span className="font-mono text-[#cfbe91] font-semibold">{bookingRef}</span>
              </div>
              <div className="flex justify-between border-b border-[#333330]/60 pb-2">
                <span className="text-[#efe7d2]/50">Titulaire</span>
                <span className="text-[#efe7d2] font-medium">{formData.name}</span>
              </div>
              <div className="flex justify-between border-b border-[#333330]/60 pb-2">
                <span className="text-[#efe7d2]/50">Date & Heure</span>
                <span className="text-[#efe7d2] font-medium">{formData.date} à {formData.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#efe7d2]/50">Nombre de convives</span>
                <span className="text-[#efe7d2] font-medium">{formData.guests} personne{Number(formData.guests) > 1 ? 's' : ''}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-full text-xs uppercase tracking-widest bg-white/5 hover:bg-white/10 text-[#efe7d2] border border-white/10"
              >
                Nouvelle réservation
              </button>
              <button
                onClick={() => navigate('/menu')}
                className="px-6 py-2.5 rounded-full text-xs uppercase tracking-widest bg-[#efe7d2] text-[#0a0b0a] font-semibold hover:bg-[#cfbe91]"
              >
                Voir le menu
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

            {/* Name & Guests */}
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
                  Convives *
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full bg-[#181918] border border-[#333330] rounded-xl px-4 py-2.5 text-xs text-[#efe7d2] focus:outline-none focus:border-[#cfbe91] transition-colors"
                >
                  <option value="1">1 Personne</option>
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

            {/* Email & Phone */}
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
                  Téléphone *
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

            {/* Date */}
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider text-[#efe7d2]/60 font-medium flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#cfbe91]" />
                Date Souhaitée *
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

            {/* Time Slots */}
            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-wider text-[#efe7d2]/60 font-medium flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#cfbe91]" />
                Créneau Horaire *
              </label>
              
              <div className="space-y-3">
                {timeSlots.map((period, idx) => (
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

            {/* Notes */}
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider text-[#efe7d2]/60 font-medium">
                Demandes Particulières ou Allergies (Optionnel)
              </label>
              <textarea
                rows={3}
                placeholder="Allergies au sésame, anniversaire, préférence comptoir Omakase..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-[#181918] border border-[#333330] rounded-xl px-4 py-2.5 text-xs text-[#efe7d2] placeholder-[#efe7d2]/30 focus:outline-none focus:border-[#cfbe91] transition-colors resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl text-xs uppercase tracking-widest font-semibold bg-[#efe7d2] text-[#0a0b0a] hover:bg-[#cfbe91] transition-all shadow-xl"
            >
              Confirmer la Réservation
            </button>

          </form>
        )}

      </div>

    </div>
  );
}
