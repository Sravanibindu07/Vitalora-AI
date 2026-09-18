import React, { useState } from 'react';
import {
  Shield, Stethoscope, UserCheck, Users, Activity, BedDouble, Pill,
  Receipt, Ambulance as AmbulanceIcon, Calendar, Clock, AlertTriangle,
  Download, CheckCircle2, FileText, MessageSquare, Plus, Search,
  TrendingUp, CreditCard, Sparkles, UserPlus, Phone, ArrowUpRight,
  ShieldAlert, RefreshCw, BarChart2
} from 'lucide-react';
import {
  UserRole, Patient, Doctor, Department, Appointment, Bed, Medicine,
  LabTest, BillingItem, Ambulance, MedicineReminder, AppNotification,
  ActivityItem
} from '../types';
import { useLanguage } from '../context/LanguageContext';
import { soundManager } from '../utils/audio';

interface RoleDashboardProps {
  currentRole: UserRole;
  patients: Patient[];
  doctors: Doctor[];
  departments: Department[];
  beds: Bed[];
  medicines: Medicine[];
  appointments: Appointment[];
  labTests: LabTest[];
  billings: BillingItem[];
  ambulances: Ambulance[];
  reminders: MedicineReminder[];
  activities: ActivityItem[];
  onAddPatient: (patient: Patient) => void;
  onAddAppointment: (apt: Appointment) => void;
  onAddMedicine: (med: Medicine) => void;
  onPayBill: (id: string) => void;
  onUpdateBedStatus: (id: string, status: 'Available' | 'Occupied' | 'Reserved', patientName?: string) => void;
  onRequestAmbulance: (id: string) => void;
  onEmergencySOS: () => void;
  onToggleReminderTaken: (id: string) => void;
  onNavigate: (tab: string) => void;
  onAddActivity: (action: string, details: string, type?: 'info' | 'success' | 'warning' | 'emergency') => void;
}

export const RoleDashboard: React.FC<RoleDashboardProps> = ({
  currentRole,
  patients,
  doctors,
  departments,
  beds,
  medicines,
  appointments,
  labTests,
  billings,
  ambulances,
  reminders,
  activities,
  onAddPatient,
  onAddAppointment,
  onAddMedicine,
  onPayBill,
  onUpdateBedStatus,
  onRequestAmbulance,
  onEmergencySOS,
  onToggleReminderTaken,
  onNavigate,
  onAddActivity
}) => {
  const { t } = useLanguage();
  const [rxPatientName, setRxPatientName] = useState(patients[0]?.name || 'Rahul Sharma');
  const [rxMedicine, setRxMedicine] = useState('Paracetamol 650mg');
  const [rxDosage, setRxDosage] = useState('1 Tablet twice daily after meals');
  const [rxSuccessMsg, setRxSuccessMsg] = useState(false);

  const [currentTokenIndex, setCurrentTokenIndex] = useState(1);
  const [searchFilter, setSearchFilter] = useState('');

  // Quick Stats
  const totalBeds = beds.length;
  const occupiedBeds = beds.filter(b => b.status === 'Occupied').length;
  const occupancyRate = Math.round((occupiedBeds / totalBeds) * 100);
  const totalRevenue = billings.reduce((sum, b) => b.status === 'Paid' ? sum + b.totalAmount : sum, 0);
  const lowStockCount = medicines.filter(m => m.stock <= m.lowStockThreshold).length;

  const handleCreatePrescription = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playSuccessSound();
    onAddActivity('Prescription Created', `Prescribed ${rxMedicine} for ${rxPatientName}`, 'success');
    setRxSuccessMsg(true);
    setTimeout(() => setRxSuccessMsg(false), 3000);
  };

  const handleCallNextToken = () => {
    soundManager.playNotificationSound();
    setCurrentTokenIndex(prev => prev + 1);
    onAddActivity('Queue Dispatch', `Called Token #${currentTokenIndex + 1} to Consultation Counter 04`, 'info');
  };

  const handleReorderStock = (medId: string) => {
    soundManager.playSuccessSound();
    const med = medicines.find(m => m.id === medId);
    if (med) {
      med.stock += 100;
      onAddActivity('Stock Restocked', `Restocked +100 units for ${med.name}`, 'success');
    }
  };

  const handleExportCSVReport = () => {
    soundManager.playSuccessSound();
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Report Type,Vitalora AI Hospital Analytics\n"
      + `Total Patients,${patients.length}\n`
      + `Bed Occupancy Rate,${occupancyRate}%\n`
      + `Total Revenue Generated,₹${totalRevenue}\n`
      + `Low Stock Count,${lowStockCount}\n`
      + `Active Ambulances,${ambulances.length}\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Vitalora_Hospital_Audit_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onAddActivity('Report Downloaded', 'Exported Executive Hospital Audit Report', 'info');
  };

  // Render Admin Dashboard View
  if (currentRole === 'Admin') {
    return (
      <div className="space-y-8 animate-fadeIn">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-cyan-950 to-indigo-950 border border-cyan-500/30 p-6 lg:p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/20 border border-cyan-500/40 rounded-full text-xs font-bold text-cyan-300 mb-3">
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                Hospital Executive Command & Analytics Mode
              </div>
              <h2 className="text-3xl font-black text-white tracking-tight">
                {t.admin} Overview
              </h2>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                Real-time operational monitoring, bed capacity metrics, staff deployment, pharmacy reorder thresholds, and financial telemetry.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleExportCSVReport}
                className="px-4 py-3 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center gap-2 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Export Audit Report
              </button>
              <button
                onClick={onEmergencySOS}
                className="px-4 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center gap-2 transition-all cursor-pointer"
              >
                <ShieldAlert className="w-4 h-4 animate-pulse" />
                {t.dispatchSos}
              </button>
            </div>
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-slate-900/90 border border-cyan-500/20 p-5 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Bed Occupancy</span>
              <BedDouble className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <h3 className="text-2xl font-black text-white">{occupancyRate}%</h3>
              <span className="text-xs text-cyan-400 font-bold">{occupiedBeds} / {totalBeds} Beds</span>
            </div>
            <div className="mt-3 w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full rounded-full transition-all duration-500" style={{ width: `${occupancyRate}%` }} />
            </div>
          </div>

          <div className="bg-slate-900/90 border border-emerald-500/20 p-5 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Revenue Generated</span>
              <Receipt className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-black text-emerald-300">₹{totalRevenue.toLocaleString()}</h3>
              <p className="text-[11px] text-slate-400 mt-1">Paid Invoices to Date</p>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-amber-500/20 p-5 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Low Stock Alerts</span>
              <Pill className="w-4 h-4 text-amber-400" />
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <h3 className="text-2xl font-black text-amber-300">{lowStockCount} Items</h3>
              <button onClick={() => onNavigate('pharmacy')} className="text-xs text-amber-400 font-bold hover:underline">Manage</button>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-rose-500/20 p-5 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Ambulance Readiness</span>
              <AmbulanceIcon className="w-4 h-4 text-rose-400" />
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <h3 className="text-2xl font-black text-white">{ambulances.filter(a => a.status === 'Available').length} Ready</h3>
              <span className="text-xs text-rose-400 font-bold">{ambulances.length} Fleet</span>
            </div>
          </div>
        </div>

        {/* Staff & Departments Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Doctors Staffing */}
          <div className="bg-slate-900/80 border border-cyan-500/20 p-6 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-cyan-400" />
                Active Medical Staff Roster
              </h3>
              <button onClick={() => onNavigate('doctors')} className="text-xs text-cyan-400 font-semibold hover:underline flex items-center gap-1">
                View All <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-3">
              {doctors.slice(0, 4).map(doc => (
                <div key={doc.id} className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={doc.image} alt={doc.name} className="w-10 h-10 rounded-full object-cover border border-cyan-500/30" />
                    <div>
                      <h4 className="text-sm font-bold text-white">{doc.name}</h4>
                      <p className="text-xs text-slate-400">{doc.specialty} • {doc.department}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold rounded-full">
                    {doc.availability}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock Quick Restock */}
          <div className="bg-slate-900/80 border border-cyan-500/20 p-6 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                Pharmacy Stock Restock Command
              </h3>
              <button onClick={() => onNavigate('pharmacy')} className="text-xs text-cyan-400 font-semibold hover:underline flex items-center gap-1">
                Open Pharmacy <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {medicines.map(med => {
                const isLow = med.stock <= med.lowStockThreshold;
                return (
                  <div key={med.id} className={`p-3.5 rounded-xl border flex items-center justify-between ${
                    isLow ? 'bg-amber-500/10 border-amber-500/30' : 'bg-slate-950/60 border-slate-800'
                  }`}>
                    <div>
                      <h4 className="text-sm font-bold text-white">{med.name}</h4>
                      <p className="text-xs text-slate-400">Stock: <span className={isLow ? 'text-amber-300 font-bold' : 'text-slate-300'}>{med.stock} units</span> • Reorder at: {med.lowStockThreshold}</p>
                    </div>
                    {isLow && (
                      <button
                        onClick={() => handleReorderStock(med.id)}
                        className="px-3 py-1.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-lg hover:bg-amber-400 transition-all cursor-pointer flex items-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3" /> Restock +100
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Doctor Dashboard View
  if (currentRole === 'Doctor') {
    return (
      <div className="space-y-8 animate-fadeIn">
        {/* Doctor Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 border border-indigo-500/30 p-6 lg:p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 border border-indigo-500/40 rounded-full text-xs font-bold text-indigo-300 mb-3">
                <Stethoscope className="w-3.5 h-3.5 text-indigo-400" />
                Doctor Consultation & Diagnostic Command
              </div>
              <h2 className="text-3xl font-black text-white tracking-tight">
                Dr. Sarah Jenkins's Workstation
              </h2>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                Review assigned patients, process live token consultations, issue digital prescriptions, and review diagnostic lab reports.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleCallNextToken}
                className="px-5 py-3 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-lg flex items-center gap-2 transition-all cursor-pointer"
              >
                <Clock className="w-4 h-4" />
                Call Next Token (#{currentTokenIndex})
              </button>
            </div>
          </div>
        </div>

        {/* Appointments & Prescription Tool */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Assigned Appointments */}
          <div className="lg:col-span-2 bg-slate-900/80 border border-cyan-500/20 p-6 rounded-2xl shadow-xl">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-cyan-400" />
              Scheduled Consultations for Today
            </h3>
            <div className="space-y-3">
              {appointments.map(apt => (
                <div key={apt.id} className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold rounded-md">
                        Token #{apt.tokenNumber}
                      </span>
                      <h4 className="font-bold text-sm text-white">{apt.patientName}</h4>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Doctor: {apt.doctorName} • Dept: {apt.department} • {apt.time}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold rounded-lg">
                      {apt.status}
                    </span>
                    <button
                      onClick={() => onNavigate('chat')}
                      className="p-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-lg transition-all"
                      title="Open Doctor Chat"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Prescription Creator */}
          <div className="bg-slate-900/80 border border-indigo-500/20 p-6 rounded-2xl shadow-xl">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              Issue Digital Prescription
            </h3>
            <form onSubmit={handleCreatePrescription} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-400">Select Patient</label>
                <select
                  value={rxPatientName}
                  onChange={(e) => setRxPatientName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white mt-1 focus:border-cyan-400 focus:outline-none"
                >
                  {patients.map(p => <option key={p.id} value={p.name}>{p.name} ({p.condition})</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400">Prescribed Medicine</label>
                <input
                  type="text"
                  value={rxMedicine}
                  onChange={(e) => setRxMedicine(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white mt-1 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400">Dosage Instructions</label>
                <textarea
                  value={rxDosage}
                  onChange={(e) => setRxDosage(e.target.value)}
                  required
                  rows={2}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white mt-1 focus:border-cyan-400 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Sign & Issue Prescription
              </button>

              {rxSuccessMsg && (
                <p className="text-xs text-emerald-400 font-bold text-center mt-2 animate-bounce">
                  Prescription sent to Patient & Pharmacy!
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Render Receptionist Dashboard View
  if (currentRole === 'Receptionist') {
    return (
      <div className="space-y-8 animate-fadeIn">
        {/* Receptionist Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-teal-950 border border-emerald-500/30 p-6 lg:p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 rounded-full text-xs font-bold text-emerald-300 mb-3">
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                Hospital Front Desk & Reception Control
              </div>
              <h2 className="text-3xl font-black text-white tracking-tight">
                Front Desk Operations
              </h2>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                Rapid patient intake, digital appointment token generation, counter queue calling, bed allocation, and payment collections.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('patients')}
                className="px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center gap-2 transition-all cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                {t.registerPatient}
              </button>
              <button
                onClick={() => onNavigate('appointments')}
                className="px-4 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center gap-2 transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                {t.bookAppointmentBtn}
              </button>
            </div>
          </div>
        </div>

        {/* Counter Dispatcher & Bed Allocation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Token Queue Dispatcher */}
          <div className="bg-slate-900/80 border border-cyan-500/20 p-6 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-cyan-400" />
                Live OPD Token Caller
              </h3>
              <button
                onClick={handleCallNextToken}
                className="px-3.5 py-1.5 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white text-xs font-bold rounded-lg hover:opacity-90 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Clock className="w-3.5 h-3.5" /> Call Token #{currentTokenIndex}
              </button>
            </div>
            <div className="bg-slate-950 p-6 rounded-2xl border border-cyan-500/30 text-center">
              <p className="text-xs uppercase font-bold text-slate-400 tracking-wider">Now Serving at Counter 01</p>
              <h2 className="text-5xl font-black text-cyan-400 mt-2 tracking-tight">TOKEN #{currentTokenIndex}</h2>
              <p className="text-xs text-slate-300 mt-2">Next in line: Token #{currentTokenIndex + 1} (General OPD)</p>
            </div>
          </div>

          {/* Rapid Bed Ward Checker */}
          <div className="bg-slate-900/80 border border-emerald-500/20 p-6 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BedDouble className="w-5 h-5 text-emerald-400" />
                Rapid Ward Bed Checker
              </h3>
              <button onClick={() => onNavigate('beds')} className="text-xs text-emerald-400 font-bold hover:underline">Full Ward View</button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['ICU', 'General', 'Emergency', 'Private'].map((wardName) => {
                const wardBeds = beds.filter(b => b.ward === wardName);
                const avail = wardBeds.filter(b => b.status === 'Available').length;
                return (
                  <div key={wardName} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                    <h4 className="text-xs font-bold text-slate-300">{wardName} Ward</h4>
                    <p className="text-lg font-black text-white mt-1">{avail} Available</p>
                    <p className="text-[10px] text-slate-400">{wardBeds.length} Total Beds</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Patient Dashboard View
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Patient Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-cyan-950 to-blue-950 border border-cyan-500/30 p-6 lg:p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/20 border border-cyan-500/40 rounded-full text-xs font-bold text-cyan-300 mb-3">
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              Patient Personal Health Portal
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">
              Welcome Back, Rahul Sharma
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Track your scheduled appointments, medicine dosage reminders, lab reports, digital health ID, and chat directly with your doctor.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('chat')}
              className="px-4 py-3 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center gap-2 transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              Consult Doctor Chat
            </button>
            <button
              onClick={onEmergencySOS}
              className="px-4 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center gap-2 transition-all cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4 animate-pulse" />
              Emergency SOS
            </button>
          </div>
        </div>
      </div>

      {/* Patient Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Token Queue Status */}
        <div className="bg-slate-900/80 border border-cyan-500/20 p-6 rounded-2xl shadow-xl">
          <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            Your OPD Token
          </h3>
          <div className="mt-3">
            <h2 className="text-4xl font-black text-cyan-400">TOKEN #104</h2>
            <p className="text-xs text-slate-400 mt-1">Status: <span className="text-emerald-400 font-bold">2 Patients Ahead</span></p>
            <p className="text-xs text-slate-300 mt-1">Est. Wait: <span className="font-bold">~12 Mins</span> (Cardiology Counter)</p>
          </div>
        </div>

        {/* Medicine Dosage Tracker */}
        <div className="bg-slate-900/80 border border-cyan-500/20 p-6 rounded-2xl shadow-xl">
          <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2">
            <Pill className="w-4 h-4 text-cyan-400" />
            Today's Medicine Schedule
          </h3>
          <div className="mt-3 space-y-2">
            {reminders.slice(0, 2).map(r => (
              <div key={r.id} className="flex items-center justify-between text-xs p-2 bg-slate-950 rounded-lg border border-slate-800">
                <span>{r.medicineName} ({r.dosage})</span>
                <button
                  onClick={() => onToggleReminderTaken(r.id)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    r.status === 'Taken' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {r.status === 'Taken' ? '✓ Taken' : 'Mark Taken'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Diagnostic Reports */}
        <div className="bg-slate-900/80 border border-cyan-500/20 p-6 rounded-2xl shadow-xl">
          <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            Latest Lab Diagnostic Reports
          </h3>
          <div className="mt-3 space-y-2">
            {labTests.slice(0, 2).map(test => (
              <div key={test.id} className="flex items-center justify-between text-xs p-2 bg-slate-950 rounded-lg border border-slate-800">
                <span>{test.testName}</span>
                <button onClick={() => onNavigate('lab')} className="text-cyan-400 font-bold hover:underline flex items-center gap-1">
                  <Download className="w-3 h-3" /> Report
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
