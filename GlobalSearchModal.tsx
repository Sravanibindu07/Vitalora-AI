import React, { useState, useEffect } from 'react';
import { Search, X, User, Stethoscope, Calendar, Pill, FlaskConical, Building2, ArrowRight } from 'lucide-react';
import { Patient, Doctor, Appointment, Medicine, LabTest, Department } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  patients: Patient[];
  doctors: Doctor[];
  appointments: Appointment[];
  medicines: Medicine[];
  labTests: LabTest[];
  departments: Department[];
  onNavigate: (tab: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  patients,
  doctors,
  appointments,
  medicines,
  labTests,
  departments,
  onNavigate
}) => {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredPatients = q ? patients.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.condition.toLowerCase().includes(q) ||
    p.bloodGroup.toLowerCase().includes(q) ||
    p.qrCodeId.toLowerCase().includes(q)
  ) : [];

  const filteredDoctors = q ? doctors.filter(d =>
    d.name.toLowerCase().includes(q) ||
    d.specialty.toLowerCase().includes(q) ||
    d.department.toLowerCase().includes(q)
  ) : [];

  const filteredAppointments = q ? appointments.filter(a =>
    a.patientName.toLowerCase().includes(q) ||
    a.doctorName.toLowerCase().includes(q) ||
    a.department.toLowerCase().includes(q) ||
    a.tokenNumber.toString().includes(q)
  ) : [];

  const filteredMedicines = q ? medicines.filter(m =>
    m.name.toLowerCase().includes(q) ||
    m.category.toLowerCase().includes(q) ||
    m.manufacturer.toLowerCase().includes(q)
  ) : [];

  const filteredLabTests = q ? labTests.filter(l =>
    l.testName.toLowerCase().includes(q) ||
    l.patientName.toLowerCase().includes(q)
  ) : [];

  const totalResults = filteredPatients.length + filteredDoctors.length + filteredAppointments.length + filteredMedicines.length + filteredLabTests.length;

  const handleItemClick = (tab: string) => {
    onNavigate(tab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl bg-slate-900 border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Header Input */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-950">
          <Search className="w-5 h-5 text-cyan-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Global search across patients, doctors, appointments, medicines, lab reports..."
            autoFocus
            className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none placeholder-slate-500"
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {!q ? (
            <div className="text-center py-10">
              <Search className="w-8 h-8 text-cyan-500/40 mx-auto mb-2 animate-pulse" />
              <p className="text-xs text-slate-400">Type to search patients, doctors, medicines, or appointments...</p>
            </div>
          ) : totalResults === 0 ? (
            <p className="text-center py-10 text-xs text-slate-400">No matching record found for "{query}".</p>
          ) : (
            <div className="space-y-4">
              {/* Patients */}
              {filteredPatients.length > 0 && (
                <div>
                  <h4 className="text-[11px] uppercase font-bold text-cyan-400 tracking-wider mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" /> Patients ({filteredPatients.length})
                  </h4>
                  <div className="space-y-1.5">
                    {filteredPatients.map(p => (
                      <div
                        key={p.id}
                        onClick={() => handleItemClick('patients')}
                        className="p-2.5 bg-slate-950/60 hover:bg-slate-800 border border-slate-800 rounded-xl flex items-center justify-between cursor-pointer transition-all"
                      >
                        <div>
                          <p className="text-xs font-bold text-white">{p.name} <span className="text-[10px] text-cyan-400 font-mono">({p.qrCodeId})</span></p>
                          <p className="text-[11px] text-slate-400">{p.condition} • Blood: {p.bloodGroup} • Room: {p.roomNumber}</p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Doctors */}
              {filteredDoctors.length > 0 && (
                <div>
                  <h4 className="text-[11px] uppercase font-bold text-cyan-400 tracking-wider mb-2 flex items-center gap-1.5">
                    <Stethoscope className="w-3.5 h-3.5" /> Doctors ({filteredDoctors.length})
                  </h4>
                  <div className="space-y-1.5">
                    {filteredDoctors.map(d => (
                      <div
                        key={d.id}
                        onClick={() => handleItemClick('doctors')}
                        className="p-2.5 bg-slate-950/60 hover:bg-slate-800 border border-slate-800 rounded-xl flex items-center justify-between cursor-pointer transition-all"
                      >
                        <div>
                          <p className="text-xs font-bold text-white">{d.name}</p>
                          <p className="text-[11px] text-slate-400">{d.specialty} • Dept: {d.department}</p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Medicines */}
              {filteredMedicines.length > 0 && (
                <div>
                  <h4 className="text-[11px] uppercase font-bold text-cyan-400 tracking-wider mb-2 flex items-center gap-1.5">
                    <Pill className="w-3.5 h-3.5" /> Medicines ({filteredMedicines.length})
                  </h4>
                  <div className="space-y-1.5">
                    {filteredMedicines.map(m => (
                      <div
                        key={m.id}
                        onClick={() => handleItemClick('pharmacy')}
                        className="p-2.5 bg-slate-950/60 hover:bg-slate-800 border border-slate-800 rounded-xl flex items-center justify-between cursor-pointer transition-all"
                      >
                        <div>
                          <p className="text-xs font-bold text-white">{m.name}</p>
                          <p className="text-[11px] text-slate-400">Stock: {m.stock} units • Price: ₹{m.price}</p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Appointments */}
              {filteredAppointments.length > 0 && (
                <div>
                  <h4 className="text-[11px] uppercase font-bold text-cyan-400 tracking-wider mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Appointments ({filteredAppointments.length})
                  </h4>
                  <div className="space-y-1.5">
                    {filteredAppointments.map(a => (
                      <div
                        key={a.id}
                        onClick={() => handleItemClick('appointments')}
                        className="p-2.5 bg-slate-950/60 hover:bg-slate-800 border border-slate-800 rounded-xl flex items-center justify-between cursor-pointer transition-all"
                      >
                        <div>
                          <p className="text-xs font-bold text-white">{a.patientName} (Token #{a.tokenNumber})</p>
                          <p className="text-[11px] text-slate-400">Doctor: {a.doctorName} • {a.time}</p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
