import React, { useState } from 'react';
import { Calendar, Plus, CheckCircle, Clock, XCircle, User, Stethoscope, Building2, QrCode, X } from 'lucide-react';
import { Appointment, Doctor, Department } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface AppointmentsModuleProps {
  appointments: Appointment[];
  doctors: Doctor[];
  departments: Department[];
  onAddAppointment: (apt: Appointment) => void;
  preselectedDoctor?: Doctor | null;
}

export const AppointmentsModule: React.FC<AppointmentsModuleProps> = ({
  appointments,
  doctors,
  departments,
  onAddAppointment,
  preselectedDoctor
}) => {
  const { t } = useLanguage();
  const [showModal, setShowModal] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(preselectedDoctor ? preselectedDoctor.name : (doctors[0]?.name || ''));
  const [selectedDepartment, setSelectedDepartment] = useState(preselectedDoctor ? preselectedDoctor.department : (departments[0]?.name || ''));
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('10:00 AM');
  const [generatedToken, setGeneratedToken] = useState<Appointment | null>(null);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName) return;

    const tokenNum = Math.floor(10 + Math.random() * 89);
    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      patientName,
      doctorName: selectedDoctor,
      department: selectedDepartment,
      date,
      time,
      status: 'Confirmed',
      tokenNumber: tokenNum
    };

    onAddAppointment(newApt);
    setGeneratedToken(newApt);
    setPatientName('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 border border-cyan-500/20 p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-cyan-400" />
            {t.navAppointments}
          </h2>
          <p className="text-xs text-slate-400 mt-1">{t.navQueue}</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          {t.bookAppointmentBtn}
        </button>
      </div>

      {/* Appointments List */}
      <div className="bg-slate-900/80 border border-cyan-500/20 rounded-2xl p-6 shadow-xl">
        <h3 className="text-base font-bold text-white mb-4">{t.navAppointments} & Tokens</h3>
        <div className="space-y-3">
          {appointments.map((apt) => (
            <div key={apt.id} className="bg-slate-950/60 border border-cyan-500/10 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex flex-col items-center justify-center text-cyan-400 font-bold">
                  <span className="text-[10px] uppercase">Token</span>
                  <span className="text-sm">#{apt.tokenNumber}</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">{apt.patientName}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Doctor: {apt.doctorName} • Dept: {apt.department}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right text-xs">
                  <p className="text-cyan-300 font-medium">{apt.date}</p>
                  <p className="text-slate-400">{apt.time}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  apt.status === 'Confirmed' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
                  apt.status === 'Pending' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' :
                  'bg-slate-800 text-slate-400'
                }`}>
                  {apt.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-cyan-500/30 rounded-3xl w-full max-w-lg p-6 shadow-2xl text-slate-100 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold text-white mb-4">Book Consultation & Generate Token</h3>

            <form onSubmit={handleBook} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 font-medium">Patient Full Name *</label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Enter patient name"
                  className="w-full mt-1 bg-slate-950 border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 font-medium">Department</label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full mt-1 bg-slate-950 border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white"
                  >
                    {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-medium">Doctor</label>
                  <select
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    className="w-full mt-1 bg-slate-950 border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white"
                  >
                    {doctors.map(doc => <option key={doc.id} value={doc.name}>{doc.name} ({doc.specialty})</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 font-medium">Appointment Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full mt-1 bg-slate-950 border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-medium">Time Slot</label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full mt-1 bg-slate-950 border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white"
                  >
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 font-semibold text-xs rounded-xl hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:opacity-90 transition-all cursor-pointer"
                >
                  Confirm & Generate Token
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Generated Token Success Modal */}
      {generatedToken && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-cyan-400/40 rounded-3xl w-full max-w-sm p-6 shadow-2xl text-slate-100 text-center relative">
            <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-400">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-white">Appointment Confirmed!</h3>
            <p className="text-xs text-slate-300 mt-1">Digital Token Generated Successfully</p>

            <div className="my-6 p-4 bg-slate-950 border border-cyan-500/30 rounded-2xl">
              <span className="text-[10px] uppercase tracking-widest text-cyan-400 font-bold">Token Number</span>
              <div className="text-4xl font-black text-cyan-300 mt-1">#{generatedToken.tokenNumber}</div>
              <div className="mt-3 text-xs text-slate-300 space-y-1">
                <p><strong>Patient:</strong> {generatedToken.patientName}</p>
                <p><strong>Doctor:</strong> {generatedToken.doctorName}</p>
                <p><strong>Time:</strong> {generatedToken.date} at {generatedToken.time}</p>
              </div>
            </div>

            <button
              onClick={() => setGeneratedToken(null)}
              className="w-full py-3 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:opacity-90 transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
