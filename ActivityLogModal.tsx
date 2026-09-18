import React from 'react';
import { Activity, X, ShieldAlert, CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import { ActivityItem } from '../types';

interface ActivityLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  activities: ActivityItem[];
}

export const ActivityLogModal: React.FC<ActivityLogModalProps> = ({
  isOpen,
  onClose,
  activities
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-xl bg-slate-900 border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            Hospital Recent Activity & Audit Trail
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {activities.length === 0 ? (
            <p className="text-center py-10 text-xs text-slate-400">No activities recorded yet.</p>
          ) : (
            activities.map((item) => (
              <div
                key={item.id}
                className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl flex items-start gap-3"
              >
                <div className="mt-0.5">
                  {item.type === 'emergency' && <ShieldAlert className="w-4 h-4 text-rose-400" />}
                  {item.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  {item.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                  {item.type === 'info' && <Info className="w-4 h-4 text-cyan-400" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{item.action}</span>
                    <span className="text-[10px] text-slate-500">{item.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">{item.details}</p>
                  <p className="text-[10px] text-cyan-400/80 mt-1">Logged by: {item.userName} ({item.userRole})</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
