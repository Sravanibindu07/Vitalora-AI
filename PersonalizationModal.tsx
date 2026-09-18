import React from 'react';
import { X, Sliders, Moon, Sun, Volume2 } from 'lucide-react';

interface PersonalizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
}

export const PersonalizationModal: React.FC<PersonalizationModalProps> = ({
  isOpen,
  onClose,
  isDarkMode,
  setIsDarkMode,
  soundEnabled,
  setSoundEnabled
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-cyan-500/30 rounded-3xl w-full max-w-md p-6 shadow-2xl text-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300"
        >
          <X className="w-4 h-4" />
        </button>

        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
          <Sliders className="w-5 h-5 text-cyan-400" />
          Personalization & Ecosystem Settings
        </h3>
        <p className="text-xs text-slate-400 mb-6">Customize themes, dark mode, and audio preferences.</p>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded-xl">
            <div>
              <h4 className="text-xs font-bold text-white">Dark Futurist Mode</h4>
              <p className="text-[11px] text-slate-400">Cybernetic high-contrast dark telemetry theme</p>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`w-12 h-6 rounded-full transition-all relative ${
                isDarkMode ? 'bg-cyan-500' : 'bg-slate-800'
              }`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                isDarkMode ? 'right-1' : 'left-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded-xl">
            <div>
              <h4 className="text-xs font-bold text-white">Notification Audio</h4>
              <p className="text-[11px] text-slate-400">Play alert sounds for medicine reminders and SOS</p>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`w-12 h-6 rounded-full transition-all relative ${
                soundEnabled ? 'bg-cyan-500' : 'bg-slate-800'
              }`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                soundEnabled ? 'right-1' : 'left-1'
              }`} />
            </button>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg cursor-pointer"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};
