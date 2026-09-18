import React from 'react';
import { User, Shield, Stethoscope, UserCheck, Users, Moon, Sun, Volume2, VolumeX, LogOut, RefreshCw, Activity, Check } from 'lucide-react';
import { UserRole } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ProfileMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  onResetData: () => void;
  onOpenActivityLog: () => void;
}

export const ProfileMenuModal: React.FC<ProfileMenuModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  setCurrentRole,
  isDarkMode,
  setIsDarkMode,
  soundEnabled,
  setSoundEnabled,
  onResetData,
  onOpenActivityLog
}) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  const getProfileDetails = (role: UserRole) => {
    switch (role) {
      case 'Admin':
        return { name: 'Hospital Director / Admin', email: 'admin@vitalora.ai', id: 'ADM-9042' };
      case 'Doctor':
        return { name: 'Dr. Sarah Jenkins', email: 's.jenkins@vitalora.ai', id: 'DOC-1024' };
      case 'Receptionist':
        return { name: 'Front Desk Operator', email: 'reception@vitalora.ai', id: 'REC-3011' };
      case 'Patient':
        return { name: 'Rahul Sharma', email: 'rahul.sharma@example.com', id: 'PAT-8819' };
    }
  };

  const details = getProfileDetails(currentRole);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end pt-20 pr-6 bg-slate-950/60 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
      <div className="w-80 bg-slate-900 border border-cyan-500/30 rounded-3xl shadow-2xl p-5 text-white space-y-4" onClick={(e) => e.stopPropagation()}>
        {/* User Card */}
        <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 to-indigo-600 p-0.5 shadow-lg">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <User className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <div>
            <h4 className="font-bold text-sm text-white">{details.name}</h4>
            <span className="inline-block px-2 py-0.5 bg-cyan-500/20 text-cyan-300 text-[10px] font-bold rounded-md mt-0.5">
              {currentRole} Mode • {details.id}
            </span>
          </div>
        </div>

        {/* Quick Role Selection */}
        <div>
          <label className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">Switch Role Perspective</label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {(['Admin', 'Doctor', 'Receptionist', 'Patient'] as UserRole[]).map(role => (
              <button
                key={role}
                onClick={() => {
                  setCurrentRole(role);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                  currentRole === role
                    ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-md'
                    : 'bg-slate-950 border border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span>{role}</span>
                {currentRole === role && <Check className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Toggles */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-full p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl flex items-center justify-between text-xs text-slate-300 transition-all cursor-pointer"
          >
            <span className="flex items-center gap-2">
              {isDarkMode ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
              {isDarkMode ? 'Dark Theme' : 'Light Theme'}
            </span>
            <span className="text-[10px] text-cyan-400 font-bold">{isDarkMode ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="w-full p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl flex items-center justify-between text-xs text-slate-300 transition-all cursor-pointer"
          >
            <span className="flex items-center gap-2">
              {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              Notification Sounds
            </span>
            <span className="text-[10px] text-cyan-400 font-bold">{soundEnabled ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={() => {
              onOpenActivityLog();
              onClose();
            }}
            className="w-full p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl flex items-center justify-between text-xs text-slate-300 transition-all cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              Recent Activity Log
            </span>
          </button>
        </div>

        {/* Reset / Logout */}
        <div className="pt-2 border-t border-slate-800">
          <button
            onClick={() => {
              onResetData();
              onClose();
            }}
            className="w-full py-2.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-xl text-rose-300 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Demo State
          </button>
        </div>
      </div>
    </div>
  );
};
