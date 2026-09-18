import React from 'react';
import { Clock, Users, TrendingDown, ShieldAlert, Sparkles } from 'lucide-react';
import { QueueItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface QueuePredictorModuleProps {
  queueItems: QueueItem[];
}

export const QueuePredictorModule: React.FC<QueuePredictorModuleProps> = ({ queueItems }) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 border border-cyan-500/20 p-6 rounded-2xl shadow-xl">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-cyan-400" />
          {t.navQueue}
        </h2>
        <p className="text-xs text-slate-400 mt-1">{t.navQueue}</p>
      </div>

      {/* AI Crowd Predictor Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-cyan-500/30 p-6 rounded-2xl shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl text-cyan-400">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-cyan-300">AI Best Time to Visit Recommendation</h3>
            <p className="text-xs text-slate-300 mt-0.5">To experience minimal waiting time, visit Cardiology or Neurology between <strong className="text-white">01:30 PM - 03:30 PM</strong> today.</p>
          </div>
        </div>
        <span className="hidden sm:inline-block px-3.5 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-full">
          Crowd Index: Low (18%)
        </span>
      </div>

      {/* Queue List */}
      <div className="bg-slate-900/80 border border-cyan-500/20 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white mb-2">Active Live Queue Status</h3>
        <div className="space-y-3">
          {queueItems.map((q) => (
            <div key={q.id} className="bg-slate-950/70 border border-cyan-500/10 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex flex-col items-center justify-center text-cyan-400 font-bold">
                  <span className="text-[10px] uppercase">Token</span>
                  <span className="text-base">#{q.tokenNumber}</span>
                </div>
                <div>
                  <h4 className="font-bold text-base text-white">{q.patientName}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Department: {q.department} • Position in Queue: #{q.position}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right text-xs">
                  <p className="text-slate-400">Patients Ahead: <strong className="text-white">{q.aheadCount}</strong></p>
                  <p className="text-cyan-300 mt-0.5">Est. Wait: <strong className="text-emerald-400">{q.estimatedWaitMinutes} mins</strong></p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  q.status === 'In Consultation' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 animate-pulse' : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
                }`}>
                  {q.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
