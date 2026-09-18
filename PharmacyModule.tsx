import React, { useState } from 'react';
import { Pill, Search, Plus, AlertTriangle, ShieldCheck, X } from 'lucide-react';
import { Medicine } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface PharmacyModuleProps {
  medicines: Medicine[];
  onAddMedicine: (med: Medicine) => void;
}

export const PharmacyModule: React.FC<PharmacyModuleProps> = ({ medicines, onAddMedicine }) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Analgesic');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [threshold, setThreshold] = useState('50');
  const [manufacturer, setManufacturer] = useState('');

  const filteredMeds = medicines.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateMedicine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !stock) return;

    const newMed: Medicine = {
      id: `med-${Date.now()}`,
      name,
      category,
      stock: parseInt(stock) || 100,
      price: parseFloat(price) || 50,
      expiryDate: '2028-12-31',
      lowStockThreshold: parseInt(threshold) || 50,
      manufacturer: manufacturer || 'Vitalora Biotech'
    };

    onAddMedicine(newMed);
    setShowModal(false);
    setName('');
    setStock('');
    setPrice('');
    setManufacturer('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 border border-cyan-500/20 p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Pill className="w-5 h-5 text-cyan-400" />
            {t.navPharmacy}
          </h2>
          <p className="text-xs text-slate-400 mt-1">{t.lowStockAlerts}</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add New Medicine
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search medicines by name or category..."
          className="w-full bg-slate-900/80 border border-cyan-500/20 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMeds.map((med) => {
          const isLowStock = med.stock <= med.lowStockThreshold;
          return (
            <div key={med.id} className="bg-slate-900/80 border border-cyan-500/20 rounded-2xl p-5 shadow-xl flex flex-col justify-between hover:border-cyan-400/40 transition-all">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-base text-white">{med.name}</h3>
                    <p className="text-xs text-cyan-400 font-medium">{med.category} • {med.manufacturer}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                    isLowStock ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  }`}>
                    {isLowStock ? 'Low Stock' : 'In Stock'}
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-3">
                  <div className="flex justify-between"><span className="text-slate-400">Available Units:</span> <span className="font-bold text-white">{med.stock} units</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Price per Unit:</span> <span className="text-emerald-400 font-bold">₹{med.price.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Expiry Date:</span> <span className="text-cyan-300">{med.expiryDate}</span></div>
                </div>
              </div>

              {isLowStock && (
                <div className="mt-4 p-2.5 bg-amber-950/30 border border-amber-500/30 rounded-xl flex items-center gap-2 text-xs text-amber-300">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                  <span>Stock below threshold ({med.lowStockThreshold}). Reorder needed.</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Medicine Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-cyan-500/30 rounded-3xl w-full max-w-lg p-6 shadow-2xl text-slate-100 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold text-white mb-4">Add Pharmacy Inventory Item</h3>

            <form onSubmit={handleCreateMedicine} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 font-medium">Medicine Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter medicine name"
                  className="w-full mt-1 bg-slate-950 border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 font-medium">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full mt-1 bg-slate-950 border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white"
                  >
                    <option value="Analgesic">Analgesic</option>
                    <option value="Cardiovascular">Cardiovascular</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Antibiotic">Antibiotic</option>
                    <option value="Diabetes">Diabetes</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-medium">Stock Units *</label>
                  <input
                    type="number"
                    required
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="e.g. 500"
                    className="w-full mt-1 bg-slate-950 border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 font-medium">Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 120.00"
                    className="w-full mt-1 bg-slate-950 border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-medium">Manufacturer</label>
                  <input
                    type="text"
                    value={manufacturer}
                    onChange={(e) => setManufacturer(e.target.value)}
                    placeholder="Pharma brand"
                    className="w-full mt-1 bg-slate-950 border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 font-semibold text-xs rounded-xl hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:opacity-90 transition-all cursor-pointer"
                >
                  Save Medicine
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
