import React, { useState } from 'react';
import {
  Activity, Bell, Shield, UserCheck, Stethoscope, Users, Sliders, Moon, Sun,
  Volume2, VolumeX, CheckCircle, AlertTriangle, Globe, Search, User, Check, Trash2, CheckCheck
} from 'lucide-react';
import { UserRole, AppNotification } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../utils/translations';

interface NavbarProps {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  notifications: AppNotification[];
  onMarkNotificationRead: (id: string) => void;
  onMarkAllNotificationsRead: () => void;
  onClearNotifications: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  onOpenPersonalization: () => void;
  onOpenAccessibility: () => void;
  onOpenSearch: () => void;
  onOpenProfileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  setCurrentRole,
  notifications,
  onMarkNotificationRead,
  onMarkAllNotificationsRead,
  onClearNotifications,
  isDarkMode,
  setIsDarkMode,
  soundEnabled,
  setSoundEnabled,
  onOpenPersonalization,
  onOpenAccessibility,
  onOpenSearch,
  onOpenProfileMenu
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationFilter, setNotificationFilter] = useState<'all' | 'emergency' | 'appointment' | 'medicine' | 'lab' | 'billing'>('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = notifications.filter(n => {
    if (notificationFilter === 'all') return true;
    return n.type === notificationFilter;
  });

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'Admin': return t.admin;
      case 'Doctor': return t.doctor;
      case 'Receptionist': return t.receptionist;
      case 'Patient': return t.patient;
    }
  };

  return (
    <header className="h-20 bg-slate-900/95 border-b border-cyan-500/20 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 backdrop-blur-xl shadow-lg">
      {/* Brand */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentRole('Admin')}>
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-600 via-indigo-600 to-blue-500 p-0.5 shadow-lg shadow-cyan-500/20 flex items-center justify-center">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
            <Activity className="w-6 h-6 text-cyan-400 animate-pulse" />
          </div>
        </div>
        <div className="hidden sm:block">
          <h1 className="text-xl font-black bg-gradient-to-r from-cyan-400 via-indigo-300 to-white bg-clip-text text-transparent tracking-tight">
            {t.brandName}
          </h1>
          <p className="text-[11px] font-medium text-cyan-400/80 tracking-wide uppercase">
            {t.slogan}
          </p>
        </div>
      </div>

      {/* Center Controls / Role Switcher */}
      <div className="hidden md:flex items-center gap-1.5 bg-slate-950/60 p-1.5 rounded-2xl border border-cyan-500/20">
        <span className="text-[11px] text-slate-400 px-2 font-medium">{t.dashboardRole}</span>
        {(['Admin', 'Doctor', 'Receptionist', 'Patient'] as UserRole[]).map((role) => {
          const isActive = currentRole === role;
          return (
            <button
              key={role}
              onClick={() => setCurrentRole(role)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-md shadow-cyan-500/20 scale-105'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {role === 'Admin' && <Shield className="w-3.5 h-3.5" />}
              {role === 'Doctor' && <Stethoscope className="w-3.5 h-3.5" />}
              {role === 'Receptionist' && <UserCheck className="w-3.5 h-3.5" />}
              {role === 'Patient' && <Users className="w-3.5 h-3.5" />}
              {getRoleLabel(role)}
            </button>
          );
        })}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        {/* Global Search Trigger */}
        <button
          onClick={onOpenSearch}
          className="p-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-cyan-400 hover:border-cyan-500/40 transition-all cursor-pointer flex items-center gap-2"
          title="Global Search (Cmd+K)"
        >
          <Search className="w-4 h-4" />
          <span className="hidden xl:inline text-xs font-medium text-slate-300">Search...</span>
        </button>

        {/* Language Selector */}
        <div className="flex items-center gap-1 bg-slate-950/80 border border-cyan-500/40 rounded-2xl px-2 py-1.5 shadow-md">
          <Globe className="w-4 h-4 text-cyan-400 animate-spin-slow" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="bg-transparent text-xs font-bold text-cyan-200 focus:outline-none cursor-pointer pr-1"
            title="Application Language Selector"
          >
            <option value="en" className="bg-slate-900 text-slate-100">🇬🇧 EN</option>
            <option value="te" className="bg-slate-900 text-slate-100">🇮🇳 తె</option>
            <option value="hi" className="bg-slate-900 text-slate-100">🇮🇳 हि</option>
          </select>
        </div>

        {/* Sound Toggle */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
            soundEnabled ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' : 'bg-slate-800 border-slate-700 text-slate-400'
          }`}
          title={soundEnabled ? "Notification Sounds ON" : "Notification Sounds OFF"}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-slate-300 hover:border-cyan-500/40 transition-all cursor-pointer"
          title={t.themeToggle}
        >
          {isDarkMode ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
        </button>

        {/* Personalization Modal Trigger */}
        <button
          onClick={onOpenPersonalization}
          className="hidden sm:flex p-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-300 transition-all cursor-pointer"
          title={t.personalization}
        >
          <Sliders className="w-4 h-4 text-cyan-400" />
        </button>

        {/* Notifications Center */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-300 transition-all cursor-pointer"
            title="Notifications"
          >
            <Bell className={`w-4 h-4 text-cyan-400 ${unreadCount > 0 ? 'animate-bounce text-rose-400' : ''}`} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-slate-900 border border-cyan-500/30 rounded-3xl shadow-2xl p-4 z-50 text-slate-100 backdrop-blur-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-cyan-300">{t.notificationsTitle}</h4>
                  <span className="text-[10px] bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-500/20 font-bold">
                    {unreadCount} {t.unread}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={onMarkAllNotificationsRead}
                    className="p-1 text-[11px] text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-0.5 cursor-pointer"
                    title="Mark All Read"
                  >
                    <CheckCheck className="w-3.5 h-3.5" /> Read
                  </button>
                  <button
                    onClick={onClearNotifications}
                    className="p-1 text-[11px] text-rose-400 hover:text-rose-300 font-medium flex items-center gap-0.5 cursor-pointer"
                    title="Clear All"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear
                  </button>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none border-b border-slate-800">
                {(['all', 'emergency', 'appointment', 'medicine', 'lab', 'billing'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setNotificationFilter(f)}
                    className={`px-2 py-0.5 rounded-md text-[10px] uppercase font-bold transition-all cursor-pointer whitespace-nowrap ${
                      notificationFilter === f ? 'bg-cyan-500 text-slate-950' : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <div className="mt-3 max-h-80 overflow-y-auto space-y-2.5">
                {filteredNotifications.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-6">{t.noNotifications}</p>
                ) : (
                  filteredNotifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => onMarkNotificationRead(n.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        n.read ? 'bg-slate-950/40 border-slate-800 opacity-60' : 'bg-slate-800/90 border-cyan-500/30 shadow-md'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-semibold text-cyan-300">
                        <span className="flex items-center gap-1.5">
                          {n.priority === 'high' ? <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> : <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
                          {n.title}
                        </span>
                        <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu Avatar */}
        <button
          onClick={onOpenProfileMenu}
          className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 p-0.5 shadow-md hover:scale-105 transition-all cursor-pointer"
          title="User Profile & Role Switcher"
        >
          <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-cyan-400 font-bold text-xs">
            {currentRole.slice(0, 2).toUpperCase()}
          </div>
        </button>
      </div>
    </header>
  );
};
