import React, { useState, useEffect } from 'react';
import { ShieldAlert, X, Ambulance, AlertCircle, PhoneCall, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface EmergencySOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmSOS: () => void;
}

export const EmergencySOSModal: React.FC<EmergencySOSModalProps> = ({
  isOpen,
  onClose,
  onConfirmSOS
}) => {
  const [countdown, setCountdown] = useState(5);
  const [isTriggered, setIsTriggered] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen && countdown > 0 && !isTriggered) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    } else if (countdown === 0 && !isTriggered && isOpen) {
      handleConfirm();
    }
    return () => clearInterval(timer);
  }, [isOpen, countdown, isTriggered]);

  useEffect(() => {
    if (isOpen) {
      setCountdown(5);
      setIsTriggered(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    setIsTriggered(true);
    soundManager.playEmergencySound();
    onConfirmSOS();
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md bg-slate-900 border-2 border-rose-500 rounded-3xl shadow-2xl p-6 text-white relative overflow-hidden text-center">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-rose-500/20 rounded-full blur-2xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 bg-rose-500/20 border-2 border-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
          <ShieldAlert className="w-8 h-8 text-rose-400" />
        </div>

        <h3 className="text-2xl font-black text-rose-300 tracking-tight">
          EMERGENCY SOS DISPATCH
        </h3>
        <p className="text-xs text-slate-300 mt-2 leading-relaxed">
          Triggering emergency dispatch will immediately allocate the nearest Trauma Ambulance unit and alert on-duty ER surgeons.
        </p>

        {!isTriggered ? (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-slate-950 rounded-2xl border border-rose-500/30">
              <p className="text-[10px] font-bold uppercase tracking-wider text-rose-400">Auto-Dispatch Countdown</p>
              <h2 className="text-4xl font-black text-rose-400 mt-1">{countdown}s</h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
              >
                Cancel SOS
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" /> CONFIRM NOW
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-6 p-4 bg-rose-500/20 border border-rose-500 rounded-2xl text-center animate-pulse">
            <CheckCircle2 className="w-8 h-8 text-rose-400 mx-auto mb-1" />
            <p className="font-bold text-sm text-rose-200">SOS DISPATCHED SUCCESSFULLY!</p>
            <p className="text-[11px] text-rose-300 mt-0.5">Ambulance Unit TS-09-EA-4488 En Route</p>
          </div>
        )}
      </div>
    </div>
  );
};
