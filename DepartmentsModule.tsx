import React from 'react';
import { Building2, Users, BedDouble, Clock, ShieldAlert } from 'lucide-react';
import { Department } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface DepartmentsModuleProps {
  departments: Department[];
}

export const DepartmentsModule: React.FC<DepartmentsModuleProps> = ({ departments }) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 border border-cyan-500/20 p-6 rounded-2xl shadow-xl flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-cyan-400" />
            {t.departmentCrowdTitle}
          </h2>
          <p className="text-xs text-slate-400 mt-1">{t.navDepartments}</p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {departments.map((dept) => (
          <div key={dept.id} className="bg-slate-900/80 border border-cyan-500/20 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-cyan-400/40 transition-all">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-base text-white">{dept.name}</h3>
                  <p className="text-xs text-cyan-400 font-medium">Head: {dept.head}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  dept.crowdLevel === 'High' ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' :
                  dept.crowdLevel === 'Moderate' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' :
                  'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                }`}>
                  {dept.crowdLevel} Crowd
                </span>
              </div>

              <p className="text-xs text-slate-300 mt-3 leading-relaxed">{dept.description}</p>

              <div className="mt-5 space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-4">
                <div className="flex justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-cyan-400" /> Active Doctors:</span>
                  <span className="font-bold text-white">{dept.doctorsCount} Specialists</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5"><BedDouble className="w-3.5 h-3.5 text-cyan-400" /> Bed Availability:</span>
                  <span className="font-bold text-emerald-400">{dept.availableBeds} / {dept.totalBeds} Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-cyan-400" /> Best Visit Time:</span>
                  <span className="font-bold text-cyan-300">{dept.bestTimeToVisit}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
