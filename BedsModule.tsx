import React, { useState } from 'react';
import { BedDouble, CheckCircle2, User, Plus, X } from 'lucide-react';
import { Bed } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface BedsModuleProps {
  beds: Bed[];
  onAddBed: (bed: Bed) => void;
  onUpdateBedStatus: (id: string, status: 'Available' | 'Occupied' | 'Reserved', patientName?: string) => void;
}

export const BedsModule: React.FC<BedsModuleProps> = ({ beds, onAddBed, onUpdateBedStatus }) => {
  const { t } = useLanguage();
  const [selectedWard, setSelectedWard] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newWard, setNewWard] = useState<'ICU' | 'General' | 'Emergency' | 'Private'>('General');
  const [newBedNumber, setNewBedNumber] = useState('');

  const filteredBeds = selectedWard === 'All' ? beds : beds.filter(b => b.ward === selectedWard);

  const handleCreateBed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBedNumber) return;

    const newBed: Bed = {
      id: `b-${Date.now()}`,
      ward: newWard,
      bedNumber: newBedNumber,
      status: 'Available'
    };

    onAddBed(newBed);
    setShowAddModal(false);
    setNewBedNumber('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 border border-cyan-500/20 p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BedDouble className="w-5 h-5 text-cyan-400" />
            {t.navBeds}
          </h2>
          <p className="text-xs text-slate-400 mt-1">{t.totalBeds}</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add New Bed
        </button>
      </div>

      {/* Ward Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['All', 'ICU', 'General', 'Emergency', 'Private'].map((ward) => (
          <button
            key={ward}
            onClick={() => setSelectedWard(ward)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedWard === ward
                ? 'bg-cyan-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {ward} Ward
          </button>
        ))}
      </div>

      {/* Bed Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredBeds.map((bed) => {
          const isOccupied = bed.status === 'Occupied';
          return (
            <div key={bed.id} className={`p-5 rounded-2xl border shadow-xl flex flex-col justify-between transition-all ${
              isOccupied ? 'bg-slate-900/90 border-rose-500/30' : 'bg-slate-900/90 border-emerald-500/30'
            }`}>
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-base text-white">{bed.bedNumber}</span>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                    isOccupied ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  }`}>
                    {bed.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 font-medium">{bed.ward} Ward</p>

                {isOccupied && bed.patientName && (
                  <div className="mt-3 p-3 bg-slate-950/60 rounded-xl border border-rose-500/20 text-xs text-slate-300">
                    <p className="text-slate-400 text-[10px] uppercase font-semibold">Assigned Patient</p>
                    <p className="font-bold text-white mt-0.5">{bed.patientName}</p>
                    {bed.assignedDate && <p className="text-[10px] text-slate-400 mt-1">Since: {bed.assignedDate}</p>}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Status Control</span>
                {isOccupied ? (
                  <button
                    onClick={() => onUpdateBedStatus(bed.id, 'Available')}
                    className="px-3 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold rounded-lg transition-all cursor-pointer"
                  >
                    Mark Free
                  </button>
                ) : (
                  <button
                    onClick={() => onUpdateBedStatus(bed.id, 'Occupied', 'New Patient')}
                    className="px-3 py-1 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold rounded-lg transition-all cursor-pointer"
                  >
                    Allocate
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Bed Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-cyan-500/30 rounded-3xl w-full max-w-sm p-6 shadow-2xl text-slate-100 relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold text-white mb-4">Add New Hospital Bed</h3>

            <form onSubmit={handleCreateBed} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 font-medium">Ward Type</label>
                <select
                  value={newWard}
                  onChange={(e) => setNewWard(e.target.value as any)}
                  className="w-full mt-1 bg-slate-950 border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white"
                >
                  <option value="ICU">ICU Ward</option>
                  <option value="General">General Ward</option>
                  <option value="Emergency">Emergency Ward</option>
                  <option value="Private">Private Room</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-medium">Bed Number / Room ID *</label>
                <input
                  type="text"
                  required
                  value={newBedNumber}
                  onChange={(e) => setNewBedNumber(e.target.value)}
                  placeholder="e.g. GEN-115"
                  className="w-full mt-1 bg-slate-950 border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 font-semibold text-xs rounded-xl hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:opacity-90 transition-all cursor-pointer"
                >
                  Save Bed
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
