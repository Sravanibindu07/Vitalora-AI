import React from 'react';
import {
  BedDouble,
  Users,
  Stethoscope,
  Ambulance,
  Pill,
  Activity,
  ShieldAlert,
  TrendingUp,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Building2
} from 'lucide-react';
import { Department, Bed, Doctor, Ambulance as AmbType, Medicine } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface DashboardDigitalTwinProps {
  departments: Department[];
  beds: Bed[];
  doctors: Doctor[];
  ambulances: AmbType[];
  medicines: Medicine[];
  onNavigate: (tab: string) => void;
}

export const DashboardDigitalTwin: React.FC<DashboardDigitalTwinProps> = ({
  departments,
  beds,
  doctors,
  ambulances,
  medicines,
  onNavigate
}) => {
  const { t } = useLanguage();
  const totalBeds = beds.length;
  const occupiedBeds = beds.filter(b => b.status === 'Occupied').length;
  const availableBeds = totalBeds - occupiedBeds;
  const availableDoctors = doctors.length;
  const lowStockMeds = medicines.filter(m => m.stock <= m.lowStockThreshold);
  const activeAmbulances = ambulances.filter(a => a.status === 'Dispatched').length;

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-cyan-500/30 rounded-3xl p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs font-semibold text-cyan-300 mb-3">
              <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              {t.dtTitle}
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">
              {t.brandName} Ecosystem
            </h2>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              {t.dtSubtitle}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => onNavigate('ambulance')}
              className="px-5 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-rose-500/20 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4" />
              {t.dispatchSos}
            </button>
            <button
              onClick={() => onNavigate('appointments')}
              className="px-5 py-3 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              {t.bookAppointmentBtn}
            </button>
          </div>
        </div>
      </div>

      {/* Real-time Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div 
          onClick={() => onNavigate('beds')}
          className="bg-slate-900/80 border border-cyan-500/20 rounded-2xl p-5 hover:border-cyan-400/50 transition-all cursor-pointer shadow-xl group"
        >
          <div className="flex items-center justify-between">
            <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400 group-hover:scale-110 transition-all">
              <BedDouble className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full">
              {availableBeds} {t.available}
            </span>
          </div>
          <div className="mt-4">
            <h4 className="text-2xl font-black text-white">{occupiedBeds} / {totalBeds}</h4>
            <p className="text-xs text-slate-400 mt-1">{t.totalBeds}</p>
          </div>
        </div>

        <div 
          onClick={() => onNavigate('doctors')}
          className="bg-slate-900/80 border border-cyan-500/20 rounded-2xl p-5 hover:border-cyan-400/50 transition-all cursor-pointer shadow-xl group"
        >
          <div className="flex items-center justify-between">
            <div className="p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-indigo-400 group-hover:scale-110 transition-all">
              <Stethoscope className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/30 px-2.5 py-1 rounded-full">
              {t.available}
            </span>
          </div>
          <div className="mt-4">
            <h4 className="text-2xl font-black text-white">{availableDoctors}</h4>
            <p className="text-xs text-slate-400 mt-1">{t.doctorsOnDuty}</p>
          </div>
        </div>

        <div 
          onClick={() => onNavigate('ambulance')}
          className="bg-slate-900/80 border border-cyan-500/20 rounded-2xl p-5 hover:border-cyan-400/50 transition-all cursor-pointer shadow-xl group"
        >
          <div className="flex items-center justify-between">
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 group-hover:scale-110 transition-all">
              <Ambulance className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/30 px-2.5 py-1 rounded-full">
              {activeAmbulances} Dispatched
            </span>
          </div>
          <div className="mt-4">
            <h4 className="text-2xl font-black text-white">{ambulances.length} Units</h4>
            <p className="text-xs text-slate-400 mt-1">{t.ambulanceUnits}</p>
          </div>
        </div>

        <div 
          onClick={() => onNavigate('pharmacy')}
          className="bg-slate-900/80 border border-cyan-500/20 rounded-2xl p-5 hover:border-cyan-400/50 transition-all cursor-pointer shadow-xl group"
        >
          <div className="flex items-center justify-between">
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400 group-hover:scale-110 transition-all">
              <Pill className="w-6 h-6" />
            </div>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
              lowStockMeds.length > 0 ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
            }`}>
              {lowStockMeds.length} Alerts
            </span>
          </div>
          <div className="mt-4">
            <h4 className="text-2xl font-black text-white">{medicines.length}</h4>
            <p className="text-xs text-slate-400 mt-1">{t.lowStockAlerts}</p>
          </div>
        </div>
      </div>

      {/* Departments & Crowd Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900/80 border border-cyan-500/20 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-cyan-400" />
              {t.departmentCrowdTitle}
            </h3>
            <button
              onClick={() => onNavigate('departments')}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              {t.viewDetails} <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {departments.map((dept) => (
              <div key={dept.id} className="bg-slate-950/60 border border-cyan-500/10 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-white">{dept.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Head: {dept.head} • {t.bestVisitTime} {dept.bestTimeToVisit}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    dept.crowdLevel === 'High' ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' :
                    dept.crowdLevel === 'Moderate' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' :
                    'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  }`}>
                    {dept.crowdLevel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Alerts & Pharmacy Warnings */}
        <div className="bg-slate-900/80 border border-cyan-500/20 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              {t.reorderAlert}
            </h3>
            <div className="space-y-3">
              {lowStockMeds.map((med) => (
                <div key={med.id} className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-xl">
                  <div className="flex items-center justify-between text-xs font-semibold text-amber-300">
                    <span>{med.name}</span>
                    <span>Stock: {med.stock}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Threshold: {med.lowStockThreshold} units. Reorder recommended.</p>
                </div>
              ))}
              {lowStockMeds.length === 0 && (
                <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-xl text-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
                  <p className="text-xs text-emerald-300 font-semibold">All pharmacy inventory levels optimal.</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <button
              onClick={() => onNavigate('queue')}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 border border-cyan-500/30 rounded-xl text-xs font-bold text-cyan-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <TrendingUp className="w-4 h-4" />
              {t.navQueue}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
