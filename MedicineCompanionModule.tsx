import React from 'react';
import { Clock, CheckCircle2, AlertCircle, Plus, Bell } from 'lucide-react';
import { MedicineReminder } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface MedicineCompanionModuleProps {
  reminders: MedicineReminder[];
  onToggleTaken: (id: string) => void;
}

export const MedicineCompanionModule: React.FC<MedicineCompanionModuleProps> = ({ reminders, onToggleTaken }) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 border border-cyan-500/20 p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            {t.navMedicines}
          </h2>
          <p className="text-xs text-slate-400 mt-1">{t.navMedicines}</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs font-bold">
          <Bell className="w-4 h-4 animate-bounce" />
          Browser Notifications Active
        </div>
      </div>

      {/* Reminders List */}
      <div className="bg-slate-900/80 border border-cyan-500/20 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white mb-2">Today's Scheduled Dosages</h3>
        {reminders.map((rem) => {
          const isTaken = rem.status === 'Taken';
          return (
            <div key={rem.id} className="bg-slate-950/60 border border-cyan-500/10 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold border ${
                  isTaken ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                }`}>
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-white">{rem.medicineName}</h4>
                  <p className="text-xs text-cyan-300 mt-0.5">Dosage: {rem.dosage} • Time: {rem.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  isTaken ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                }`}>
                  {rem.status}
                </span>
                <button
                  onClick={() => onToggleTaken(rem.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isTaken
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                  }`}
                >
                  {isTaken ? 'Undo' : 'Mark as Taken'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
