import React, { useState } from 'react';
import { Ambulance as AmbIcon, ShieldAlert, Phone, Navigation, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Ambulance } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface AmbulanceModuleProps {
  ambulances: Ambulance[];
  onRequestAmbulance: (id: string) => void;
  onEmergencySOS: () => void;
}

export const AmbulanceModule: React.FC<AmbulanceModuleProps> = ({ ambulances, onRequestAmbulance, onEmergencySOS }) => {
  const { t } = useLanguage();
  const [sosActive, setSosActive] = useState(false);

  const handleSOSClick = () => {
    setSosActive(true);
    onEmergencySOS();
    setTimeout(() => setSosActive(false), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Header & Emergency SOS */}
      <div className="relative overflow-hidden bg-gradient-to-r from-rose-950 via-slate-900 to-rose-950 border border-rose-500/40 p-8 rounded-3xl shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/20 border border-rose-500/40 rounded-full text-xs font-semibold text-rose-300 mb-3">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              {t.navAmbulance}
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">
              {t.dispatchSos}
            </h2>
            <p className="text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
              {t.ambulanceUnits}
            </p>
          </div>
          <button
            onClick={handleSOSClick}
            className={`px-8 py-5 bg-gradient-to-r from-rose-600 via-red-600 to-pink-600 text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-2xl shadow-rose-600/40 hover:scale-105 transition-all flex items-center gap-3 cursor-pointer ${
              sosActive ? 'animate-bounce ring-4 ring-rose-400' : ''
            }`}
          >
            <ShieldAlert className="w-6 h-6 animate-pulse" />
            {sosActive ? 'SOS DISPATCHED!' : t.dispatchSos}
          </button>
        </div>
      </div>

      {/* Ambulance Fleet List */}
      <div className="bg-slate-900/80 border border-cyan-500/20 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white mb-2">Ambulance Availability & Live Tracking</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {ambulances.map((amb) => {
            const isDispatched = amb.status === 'Dispatched';
            return (
              <div key={amb.id} className="bg-slate-950/70 border border-cyan-500/20 p-5 rounded-2xl flex flex-col justify-between shadow-xl">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-base text-white">{amb.ambulanceNumber}</span>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      isDispatched ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 animate-pulse' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    }`}>
                      {amb.status}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-3">
                    <p className="flex justify-between"><span className="text-slate-400">Driver:</span> <span className="font-bold text-white">{amb.driverName}</span></p>
                    <p className="flex justify-between"><span className="text-slate-400">Phone:</span> <span className="text-cyan-300">{amb.driverPhone}</span></p>
                    <p className="flex justify-between"><span className="text-slate-400">Current Location:</span> <span className="text-slate-200">{amb.currentLocation}</span></p>
                    {isDispatched && (
                      <>
                        <p className="flex justify-between"><span className="text-slate-400">Destination:</span> <span className="text-amber-300">{amb.destination}</span></p>
                        <p className="flex justify-between"><span className="text-slate-400">Estimated ETA:</span> <span className="font-bold text-emerald-400">{amb.etaMinutes} mins</span></p>
                      </>
                    )}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800">
                  {isDispatched ? (
                    <div className="flex items-center justify-center gap-2 py-2 bg-rose-950/30 border border-rose-500/30 rounded-xl text-xs font-semibold text-rose-300">
                      <Navigation className="w-3.5 h-3.5 animate-spin" />
                      Live Tracking Active
                    </div>
                  ) : (
                    <button
                      onClick={() => onRequestAmbulance(amb.id)}
                      className="w-full py-2.5 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:opacity-90 transition-all cursor-pointer"
                    >
                      Request Ambulance
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
