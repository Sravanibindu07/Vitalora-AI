import React from 'react';
import { X, Mic, Volume2, Eye, Sliders } from 'lucide-react';

interface AccessibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  fontSize: string;
  setFontSize: (size: string) => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
}

export const AccessibilityModal: React.FC<AccessibilityModalProps> = ({
  isOpen,
  onClose,
  fontSize,
  setFontSize,
  highContrast,
  setHighContrast
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
          <Eye className="w-5 h-5 text-cyan-400" />
          Voice-First & Accessibility Settings
        </h3>
        <p className="text-xs text-slate-400 mb-6">Designed specifically for elderly and visually impaired users.</p>

        <div className="space-y-5">
          <div>
            <label className="text-xs text-slate-300 font-semibold mb-2 block">Font Scaling</label>
            <div className="grid grid-cols-3 gap-2">
              {['normal', 'large', 'extra-large'].map((size) => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  className={`py-2 rounded-xl text-xs font-bold border capitalize transition-all cursor-pointer ${
                    fontSize === size
                      ? 'bg-cyan-600 border-cyan-400 text-white shadow-lg'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded-xl">
            <div>
              <h4 className="text-xs font-bold text-white">High Contrast Mode</h4>
              <p className="text-[11px] text-slate-400">Maximize visual legibility across all UI components</p>
            </div>
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`w-12 h-6 rounded-full transition-all relative ${
                highContrast ? 'bg-cyan-500' : 'bg-slate-800'
              }`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                highContrast ? 'right-1' : 'left-1'
              }`} />
            </button>
          </div>

          <div className="p-4 bg-cyan-950/30 border border-cyan-500/20 rounded-xl text-xs text-cyan-300 space-y-2">
            <p className="font-bold flex items-center gap-1.5"><Mic className="w-4 h-4 text-cyan-400" /> Voice Commands Active</p>
            <p className="text-[11px] text-slate-300">You can use the floating Vitalora AI assistant to speak commands naturally in English, Telugu, or Hindi.</p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg cursor-pointer"
          >
            Apply Settings
          </button>
        </div>
      </div>
    </div>
  );
};
