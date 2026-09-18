import React from 'react';
import { FileText, Calendar, CheckCircle2, Pill, FlaskConical, Stethoscope } from 'lucide-react';
import { HealthJourneyEvent } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface HealthTimelineModuleProps {
  timelineEvents: HealthJourneyEvent[];
}

export const HealthTimelineModule: React.FC<HealthTimelineModuleProps> = ({ timelineEvents }) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 border border-cyan-500/20 p-6 rounded-2xl shadow-xl">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-cyan-400" />
          {t.navTimeline}
        </h2>
        <p className="text-xs text-slate-400 mt-1">{t.navTimeline}</p>
      </div>

      {/* Timeline List */}
      <div className="bg-slate-900/80 border border-cyan-500/20 rounded-2xl p-6 shadow-xl">
        <div className="relative border-l-2 border-cyan-500/30 ml-4 pl-6 space-y-8">
          {timelineEvents.map((evt, idx) => (
            <div key={evt.id || idx} className="relative group">
              <div className="absolute -left-[35px] top-0 w-8 h-8 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 shadow-lg">
                {evt.type === 'Appointment' ? <Calendar className="w-4 h-4" /> :
                 evt.type === 'LabTest' ? <FlaskConical className="w-4 h-4" /> :
                 evt.type === 'Prescription' ? <Pill className="w-4 h-4" /> :
                 <Stethoscope className="w-4 h-4" />}
              </div>

              <div className="bg-slate-950/70 border border-cyan-500/20 p-5 rounded-2xl shadow-xl">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 bg-cyan-950 text-cyan-300 rounded-full border border-cyan-500/30 font-semibold">{evt.type}</span>
                  <span className="text-slate-400 font-mono">{evt.date}</span>
                </div>
                <h3 className="text-base font-bold text-white mt-2">{evt.title}</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{evt.description}</p>
                <p className="text-xs text-slate-400 mt-3 font-medium">Attending Specialist: <strong className="text-cyan-300">{evt.doctorName}</strong></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
