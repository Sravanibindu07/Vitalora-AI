import React, { useState } from 'react';
import { Compass, MapPin, ArrowRight, Building2, Stethoscope, FlaskConical, Pill, Receipt, ShieldAlert, UserCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const HospitalNavigationModule: React.FC = () => {
  const { t } = useLanguage();
  const [selectedDestination, setSelectedDestination] = useState<string>('Cardiology Department');

  const destinations = [
    { name: 'Cardiology Department', level: 'Level 4, East Wing', route: 'Take Elevator A to Level 4, turn right past the Glass Atrium.', icon: Building2 },
    { name: 'Neurology Department', level: 'Level 3, North Wing', route: 'Take Elevator B to Level 3, follow the blue neon pathway.', icon: Building2 },
    { name: 'Emergency Room (ER)', level: 'Ground Floor, West Wing', route: 'Direct access from main entrance lobby, follow red emergency markers.', icon: ShieldAlert },
    { name: 'Central Pharmacy', level: 'Ground Floor, Central Atrium', route: 'Adjacent to reception desk opposite the main waiting lounge.', icon: Pill },
    { name: 'Laboratory Diagnostics', level: 'Level 2, South Wing', route: 'Take Escalator to Level 2, enter corridor B.', icon: FlaskConical },
    { name: 'Billing Counter', level: 'Ground Floor, Reception', route: 'Located at Reception Desk counter 3 and 4.', icon: Receipt },
    { name: 'Doctor Consultation Rooms', level: 'Levels 1 - 4', route: 'Consult room numbers listed on specialist directory.', icon: Stethoscope },
    { name: 'Restrooms & Cafeteria', level: 'Ground Floor & Level 2', route: 'Signposted near central elevators.', icon: Compass }
  ];

  const currentDestObj = destinations.find(d => d.name === selectedDestination) || destinations[0];
  const IconComponent = currentDestObj.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 border border-cyan-500/20 p-6 rounded-2xl shadow-xl">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Compass className="w-5 h-5 text-cyan-400" />
          {t.navNavigation}
        </h2>
        <p className="text-xs text-slate-400 mt-1">{t.navNavigation}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Destinations List */}
        <div className="bg-slate-900/80 border border-cyan-500/20 rounded-2xl p-6 shadow-xl space-y-2.5">
          <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">Select Destination</h3>
          {destinations.map((dest) => {
            const isSelected = selectedDestination === dest.name;
            const ItemIcon = dest.icon;
            return (
              <button
                key={dest.name}
                onClick={() => setSelectedDestination(dest.name)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 border-cyan-400 text-white shadow-lg'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ItemIcon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-cyan-400'}`} />
                  <div>
                    <h4 className="font-bold text-xs">{dest.name}</h4>
                    <p className={`text-[10px] ${isSelected ? 'text-cyan-100' : 'text-slate-400'}`}>{dest.level}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4" />
              </button>
            );
          })}
        </div>

        {/* Visual Map & Directions */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-cyan-500/20 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{currentDestObj.name}</h3>
                  <p className="text-xs text-cyan-400">{currentDestObj.level}</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-full">
                Active Route
              </span>
            </div>

            <div className="my-6 p-6 bg-slate-950 border border-cyan-500/30 rounded-2xl space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                Step-by-Step Wayfinding Directions
              </h4>
              <p className="text-sm text-slate-200 leading-relaxed bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                {currentDestObj.route}
              </p>
            </div>
          </div>

          <div className="p-4 bg-cyan-950/20 border border-cyan-500/20 rounded-xl text-xs text-cyan-300 text-center">
            Voice guidance is active. You can also ask Vitalora AI assistant for walking directions anytime.
          </div>
        </div>
      </div>
    </div>
  );
};
