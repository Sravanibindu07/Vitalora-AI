import React, { useState } from 'react';
import { Receipt, Plus, CreditCard, CheckCircle2, Clock, X } from 'lucide-react';
import { BillingItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface BillingModuleProps {
  billings: BillingItem[];
  onAddBill: (bill: BillingItem) => void;
  onPayBill: (id: string) => void;
}

export const BillingModule: React.FC<BillingModuleProps> = ({ billings, onAddBill, onPayBill }) => {
  const { t } = useLanguage();
  const [showModal, setShowModal] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [desc, setDesc] = useState('Consultation & Diagnostics');
  const [amount, setAmount] = useState('');

  const handleCreateBill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !amount) return;

    const amt = parseFloat(amount) || 1000;
    const newBill: BillingItem = {
      id: `bill-${Date.now()}`,
      patientName,
      items: [{ description: desc, amount: amt }],
      totalAmount: amt,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]
    };

    onAddBill(newBill);
    setShowModal(false);
    setPatientName('');
    setAmount('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 border border-cyan-500/20 p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Receipt className="w-5 h-5 text-cyan-400" />
            {t.navBilling}
          </h2>
          <p className="text-xs text-slate-400 mt-1">{t.navBilling}</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Create Invoice
        </button>
      </div>

      {/* Bills List */}
      <div className="bg-slate-900/80 border border-cyan-500/20 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white mb-2">Itemized Patient Invoices</h3>
        {billings.map((bill) => (
          <div key={bill.id} className="bg-slate-950/60 border border-cyan-500/10 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h4 className="font-bold text-base text-white">{bill.patientName}</h4>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                  bill.status === 'Paid' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                }`}>
                  {bill.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">Date: {bill.date} • Due: {bill.dueDate}</p>
              
              <div className="mt-3 space-y-1">
                {bill.items.map((item, idx) => (
                  <div key={idx} className="text-xs text-slate-300 flex justify-between gap-8">
                    <span>{item.description}</span>
                    <span className="font-mono text-cyan-300">₹{item.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-end gap-3 shrink-0">
              <div className="text-right">
                <span className="text-[10px] uppercase text-slate-400 font-semibold">Total Amount</span>
                <div className="text-xl font-black text-white">₹{bill.totalAmount.toLocaleString()}</div>
              </div>
              {bill.status === 'Pending' ? (
                <button
                  onClick={() => onPayBill(bill.id)}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:opacity-90 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  Pay Now
                </button>
              ) : (
                <button
                  onClick={() => alert('Receipt downloaded successfully.')}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
                >
                  Download Receipt
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Create Bill Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-cyan-500/30 rounded-3xl w-full max-w-md p-6 shadow-2xl text-slate-100 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold text-white mb-4">Create Patient Invoice</h3>

            <form onSubmit={handleCreateBill} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 font-medium">Patient Name *</label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Enter patient name"
                  className="w-full mt-1 bg-slate-950 border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 font-medium">Description</label>
                <input
                  type="text"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full mt-1 bg-slate-950 border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 font-medium">Amount (₹) *</label>
                <input
                  type="number"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 5000"
                  className="w-full mt-1 bg-slate-950 border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white"
                />
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
                  Generate Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
