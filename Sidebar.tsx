import React from 'react';
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  Calendar,
  Building2,
  BedDouble,
  Pill,
  FlaskConical,
  Receipt,
  Ambulance,
  Clock,
  Compass,
  FileText,
  MessageSquare,
  Smile,
  ShieldAlert
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { t } = useLanguage();

  const menuItems = [
    { id: 'role-dashboard', label: 'Role Command Dashboard', icon: LayoutDashboard, badge: 'Role' },
    { id: 'digital-twin', label: t.navDigitalTwin, icon: LayoutDashboard, badge: t.liveBadge },
    { id: 'patients', label: t.navPatients, icon: Users },
    { id: 'doctors', label: t.navDoctors, icon: Stethoscope },
    { id: 'appointments', label: t.navAppointments, icon: Calendar },
    { id: 'departments', label: t.navDepartments, icon: Building2 },
    { id: 'beds', label: t.navBeds, icon: BedDouble },
    { id: 'pharmacy', label: t.navPharmacy, icon: Pill },
    { id: 'lab', label: t.navLab, icon: FlaskConical },
    { id: 'billing', label: t.navBilling, icon: Receipt },
    { id: 'ambulance', label: t.navAmbulance, icon: Ambulance, highlight: true },
    { id: 'medicines', label: t.navMedicines, icon: Clock },
    { id: 'navigation', label: t.navNavigation, icon: Compass },
    { id: 'queue', label: t.navQueue, icon: ShieldAlert },
    { id: 'timeline', label: t.navTimeline, icon: FileText },
    { id: 'chat', label: t.navChat, icon: MessageSquare },
    { id: 'feedback', label: t.navFeedback, icon: Smile }
  ];

  return (
    <aside className="w-72 bg-slate-900/90 border-r border-cyan-500/20 flex flex-col shrink-0 overflow-y-auto h-[calc(100vh-5rem)] sticky top-20">
      <div className="p-4 space-y-1">
        <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-cyan-400">
          {t.coreHeader}
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-lg shadow-cyan-500/20'
                  : item.highlight
                  ? 'bg-rose-950/30 border border-rose-500/30 text-rose-300 hover:bg-rose-900/40'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-cyan-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-rose-400' : 'text-cyan-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold rounded-full animate-pulse">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
};
