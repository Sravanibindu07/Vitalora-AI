import React, { useState } from 'react';
import { Stethoscope, Search, Star, Phone, Mail, MapPin, Calendar, Clock } from 'lucide-react';
import { Doctor } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface DoctorsModuleProps {
  doctors: Doctor[];
  onBookAppointmentWithDoctor: (doctor: Doctor) => void;
}

export const DoctorsModule: React.FC<DoctorsModuleProps> = ({ doctors, onBookAppointmentWithDoctor }) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDoctors = doctors.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/85 border border-cyan-500/20 p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-cyan-400" />
            {t.doctorsOnDuty}
          </h2>
          <p className="text-xs text-slate-400 mt-1">{t.navDoctors}</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.searchDoctorPlaceholder}
          className="w-full bg-slate-900/80 border border-cyan-500/20 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
        />
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDoctors.map((doc) => (
          <div key={doc.id} className="bg-slate-900/80 border border-cyan-500/20 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between hover:border-cyan-400/40 transition-all">
            <div>
              <div className="relative h-48 overflow-hidden bg-slate-950">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-cyan-500/30 flex items-center gap-1 text-xs font-bold text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {doc.rating}
                </div>
                <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full border border-cyan-500/30 text-xs font-semibold text-cyan-300">
                  {doc.department}
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <h3 className="font-bold text-base text-white">{doc.name}</h3>
                  <p className="text-xs text-slate-400 font-medium">{doc.specialty} • {doc.qualification}</p>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300 border-t border-slate-800 pt-3">
                  <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> {doc.roomNumber}</p>
                  <p className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> {doc.availability}</p>
                  <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> {doc.phone}</p>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => onBookAppointmentWithDoctor(doc)}
                className="w-full py-2.5 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                {t.bookAppointmentBtn}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
