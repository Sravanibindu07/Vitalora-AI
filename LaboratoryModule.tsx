import React, { useState } from 'react';
import { FlaskConical, Plus, FileText, CheckCircle2, Clock, X } from 'lucide-react';
import { LabTest } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface LaboratoryModuleProps {
  labTests: LabTest[];
  onAddTest: (test: LabTest) => void;
}

export const LaboratoryModule: React.FC<LaboratoryModuleProps> = ({ labTests, onAddTest }) => {
  const { t } = useLanguage();
  const [showModal, setShowModal] = useState(false);
  const [testName, setTestName] = useState('');
  const [patientName, setPatientName] = useState('');
  const [doctorName, setDoctorName] = useState('Dr. Ananya Roy');

  const handleCreateTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testName || !patientName) return;

    const newTest: LabTest = {
      id: `lab-${Date.now()}`,
      testName,
      patientName,
      doctorName,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };

    onAddTest(newTest);
    setShowModal(false);
    setTestName('');
    setPatientName('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 border border-cyan-500/20 p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-cyan-400" />
            {t.navLab}
          </h2>
          <p className="text-xs text-slate-400 mt-1">{t.navLab}</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Order Lab Test
        </button>
      </div>

      {/* Lab Tests List */}
      <div className="bg-slate-900/80 border border-cyan-500/20 rounded-2xl p-6 shadow-xl space-y-3">
        <h3 className="text-base font-bold text-white mb-4">Active & Completed Diagnostic Tests</h3>
        {labTests.map((test) => (
          <div key={test.id} className="bg-slate-950/60 border border-cyan-500/10 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-sm text-white">{test.testName}</h4>
              <p className="text-xs text-slate-400 mt-0.5">Patient: {test.patientName} • Ordered by: {test.doctorName} ({test.date})</p>
              {test.resultSummary && (
                <p className="text-xs text-cyan-300 mt-2 bg-cyan-950/40 p-2.5 rounded-lg border border-cyan-500/20">
                  <strong>Result Summary:</strong> {test.resultSummary}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                test.status === 'Completed' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
              }`}>
                {test.status}
              </span>
              {test.status === 'Completed' && (
                <button
                  onClick={() => alert(`Downloading lab report for ${test.testName}`)}
                  className="px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Download
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Order Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-cyan-500/30 rounded-3xl w-full max-w-md p-6 shadow-2xl text-slate-100 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold text-white mb-4">Order New Diagnostic Test</h3>

            <form onSubmit={handleCreateTest} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 font-medium">Test Name *</label>
                <input
                  type="text"
                  required
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                  placeholder="e.g. Lipid Profile / MRI Brain"
                  className="w-full mt-1 bg-slate-950 border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white"
                />
              </div>

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
                <label className="text-xs text-slate-400 font-medium">Referring Doctor</label>
                <input
                  type="text"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
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
                  Submit Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
