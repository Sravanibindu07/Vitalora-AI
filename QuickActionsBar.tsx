import React from 'react';
import { ShieldAlert, Plus, Calendar, Pill, Receipt, MessageSquare, Search, Compass, BedDouble } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface QuickActionsBarProps {
  onOpenSearch: () => void;
  onOpenSOS: () => void;
  onNavigate: (tab: string) => void;
}

export const QuickActionsBar: React.FC<QuickActionsBarProps> = ({
  onOpenSearch,
  onOpenSOS,
  onNavigate
}) => {
  const { t } = useLanguage();

  return (
    <div className="bg-slate-900/90 border border-cyan-500/20 p-3 rounded-2xl shadow-xl flex flex-wrap items-center justify-between gap-3 mb-6 backdrop-blur-md">
      <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        <button
          onClick={onOpenSearch}
          className="px-3 py-2 bg-slate-950 hover:bg-slate-800 border border-cyan-500/30 rounded-xl text-xs font-semibold text-cyan-300 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
        >
          <Search className="w-3.5 h-3.5 text-cyan-400" />
          <span>Search (Cmd+K)</span>
        </button>

        <button
          onClick={() => onNavigate('appointments')}
          className="px-3 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
        >
          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
          <span>{t.bookAppointmentBtn}</span>
        </button>

        <button
          onClick={() => onNavigate('patients')}
          className="px-3 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-3.5 h-3.5 text-emerald-400" />
          <span>{t.registerPatient}</span>
        </button>

        <button
          onClick={() => onNavigate('pharmacy')}
          className="px-3 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
        >
          <Pill className="w-3.5 h-3.5 text-amber-400" />
          <span>{t.navPharmacy}</span>
        </button>

        <button
          onClick={() => onNavigate('billing')}
          className="px-3 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
        >
          <Receipt className="w-3.5 h-3.5 text-indigo-400" />
          <span>{t.navBilling}</span>
        </button>

        <button
          onClick={() => onNavigate('chat')}
          className="px-3 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
        >
          <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
          <span>{t.navChat}</span>
        </button>
      </div>

      <button
        onClick={onOpenSOS}
        className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap"
      >
        <ShieldAlert className="w-4 h-4 animate-pulse" />
        <span>SOS Dispatch</span>
      </button>
    </div>
  );
};
