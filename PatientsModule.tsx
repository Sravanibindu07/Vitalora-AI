import React, { useState } from 'react';
import { Users, Plus, Search, QrCode, Phone, Mail, Calendar, UserPlus, X, Check } from 'lucide-react';
import { Patient } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface PatientsModuleProps {
  patients: Patient[];
  onAddPatient: (patient: Patient) => void;
}

export const PatientsModule: React.FC<PatientsModuleProps> = ({ patients, onAddPatient }) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatientForCard, setSelectedPatientForCard] = useState<Patient | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');
  const [newGender, setNewGender] = useState('Male');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newBloodGroup, setNewBloodGroup] = useState('O+');
  const [newCondition, setNewCondition] = useState('');
  const [newDoctor, setNewDoctor] = useState('Dr. Ananya Roy');
  const [newRoom, setNewRoom] = useState('GEN-101');
  const [newEmergency, setNewEmergency] = useState('');

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.qrCodeId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreatePatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPhone) return;

    const newPatient: Patient = {
      id: `p-${Date.now()}`,
      name: newName,
      age: parseInt(newAge) || 30,
      gender: newGender,
      phone: newPhone,
      email: newEmail || 'patient@vitalora.ai',
      bloodGroup: newBloodGroup,
      condition: newCondition || 'General Observation',
      admissionDate: new Date().toISOString().split('T')[0],
      assignedDoctor: newDoctor,
      roomNumber: newRoom,
      qrCodeId: `VITALORA-QR-${Math.floor(10000 + Math.random() * 90000)}`,
      emergencyContact: newEmergency || 'Emergency Contact (+91 99999 99999)'
    };

    onAddPatient(newPatient);
    setShowAddModal(false);
    setNewName('');
    setNewAge('');
    setNewPhone('');
    setNewEmail('');
    setNewCondition('');
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/80 border border-cyan-500/20 p-6 rounded-2xl shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-400" />
            {t.navPatients} & {t.qrHealthCard}
          </h2>
          <p className="text-xs text-slate-400 mt-1">{t.patientRecords}</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          {t.registerPatient}
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.searchPatientPlaceholder}
          className="w-full bg-slate-900/80 border border-cyan-500/20 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
        />
      </div>

      {/* Patient Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPatients.map((patient) => (
          <div key={patient.id} className="bg-slate-900/80 border border-cyan-500/20 rounded-2xl p-5 shadow-xl flex flex-col justify-between hover:border-cyan-400/40 transition-all">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-base text-white">{patient.name}</h3>
                  <p className="text-xs text-cyan-400 font-medium">{patient.gender}, {patient.age} yrs • Blood: {patient.bloodGroup}</p>
                </div>
                <span className="px-2.5 py-1 bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold rounded-full">
                  {patient.roomNumber}
                </span>
              </div>

              <div className="mt-4 space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-3">
                <p className="flex items-center gap-2"><span className="text-slate-500 font-semibold">Condition:</span> {patient.condition}</p>
                <p className="flex items-center gap-2"><span className="text-slate-500 font-semibold">Doctor:</span> {patient.assignedDoctor}</p>
                <p className="flex items-center gap-2"><span className="text-slate-500 font-semibold">Phone:</span> {patient.phone}</p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-cyan-400">{patient.qrCodeId}</span>
              <button
                onClick={() => setSelectedPatientForCard(patient)}
                className="px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-xl text-xs font-semibold text-cyan-300 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5" />
                Health Card
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Health Card Modal */}
      {selectedPatientForCard && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-cyan-400/40 rounded-3xl w-full max-w-md p-6 shadow-2xl text-slate-100 relative">
            <button
              onClick={() => setSelectedPatientForCard(null)}
              className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center pb-4 border-b border-cyan-500/20">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Vitalora AI Digital Health ID</span>
              <h3 className="text-2xl font-black text-white mt-1">{selectedPatientForCard.name}</h3>
              <p className="text-xs text-slate-400">“Smarter Care. Better Lives.”</p>
            </div>

            <div className="py-5 space-y-4">
              <div className="flex justify-center">
                <div className="w-36 h-36 bg-white p-3 rounded-2xl shadow-lg border-2 border-cyan-500 flex items-center justify-center">
                  <QrCode className="w-full h-full text-slate-950" />
                </div>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-xl border border-cyan-500/20 space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-slate-400">QR ID:</span> <span className="font-mono text-cyan-300">{selectedPatientForCard.qrCodeId}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Age / Gender:</span> <span className="text-white">{selectedPatientForCard.age} yrs / {selectedPatientForCard.gender}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Blood Group:</span> <span className="text-rose-400 font-bold">{selectedPatientForCard.bloodGroup}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Condition:</span> <span className="text-white">{selectedPatientForCard.condition}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Emergency Contact:</span> <span className="text-amber-300">{selectedPatientForCard.emergencyContact}</span></div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => alert(`Health Card ID ${selectedPatientForCard.qrCodeId} downloaded successfully.`)}
                className="flex-1 py-3 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:opacity-90 transition-all cursor-pointer"
              >
                Download ID Card
              </button>
              <button
                onClick={() => setSelectedPatientForCard(null)}
                className="px-5 py-3 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl hover:bg-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Patient Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-cyan-500/30 rounded-3xl w-full max-w-lg p-6 shadow-2xl text-slate-100 relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold text-white mb-4">Register New Patient</h3>

            <form onSubmit={handleCreatePatient} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 font-medium">Patient Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Enter name"
                    className="w-full mt-1 bg-slate-950 border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-medium">Age</label>
                  <input
                    type="number"
                    value={newAge}
                    onChange={(e) => setNewAge(e.target.value)}
                    placeholder="e.g. 32"
                    className="w-full mt-1 bg-slate-950 border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 font-medium">Gender</label>
                  <select
                    value={newGender}
                    onChange={(e) => setNewGender(e.target.value)}
                    className="w-full mt-1 bg-slate-950 border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-medium">Blood Group</label>
                  <select
                    value={newBloodGroup}
                    onChange={(e) => setNewBloodGroup(e.target.value)}
                    className="w-full mt-1 bg-slate-950 border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white"
                  >
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 font-medium">Phone Number *</label>
                  <input
                    type="text"
                    required
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full mt-1 bg-slate-950 border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-medium">Medical Condition</label>
                  <input
                    type="text"
                    value={newCondition}
                    onChange={(e) => setNewCondition(e.target.value)}
                    placeholder="Diagnosis / condition"
                    className="w-full mt-1 bg-slate-950 border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
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
                  Save Patient Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
