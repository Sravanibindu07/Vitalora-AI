import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { RoleDashboard } from './components/RoleDashboard';
import { QuickActionsBar } from './components/QuickActionsBar';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { EmergencySOSModal } from './components/EmergencySOSModal';
import { ProfileMenuModal } from './components/ProfileMenuModal';
import { ActivityLogModal } from './components/ActivityLogModal';
import { DashboardDigitalTwin } from './components/DashboardDigitalTwin';
import { PatientsModule } from './components/PatientsModule';
import { DoctorsModule } from './components/DoctorsModule';
import { AppointmentsModule } from './components/AppointmentsModule';
import { DepartmentsModule } from './components/DepartmentsModule';
import { BedsModule } from './components/BedsModule';
import { PharmacyModule } from './components/PharmacyModule';
import { LaboratoryModule } from './components/LaboratoryModule';
import { BillingModule } from './components/BillingModule';
import { AmbulanceModule } from './components/AmbulanceModule';
import { MedicineCompanionModule } from './components/MedicineCompanionModule';
import { HospitalNavigationModule } from './components/HospitalNavigationModule';
import { QueuePredictorModule } from './components/QueuePredictorModule';
import { HealthTimelineModule } from './components/HealthTimelineModule';
import { DoctorChatModule } from './components/DoctorChatModule';
import { FeedbackModule } from './components/FeedbackModule';
import { AccessibilityModal } from './components/AccessibilityModal';
import { PersonalizationModal } from './components/PersonalizationModal';
import { VitaloraAIAssistant } from './components/VitaloraAIAssistant';
import { soundManager } from './utils/audio';

import {
  initialPatients,
  initialDoctors,
  initialDepartments,
  initialBeds,
  initialMedicines,
  initialAppointments,
  initialLabTests,
  initialBillings,
  initialAmbulances,
  initialPrescriptions,
  initialReminders,
  initialFeedbacks,
  initialQueueItems,
  initialHealthJourney,
  initialMessages,
  initialNotifications
} from './data/mockData';

import { UserRole, Patient, Doctor, Department, Appointment, Bed, Medicine, LabTest, BillingItem, Ambulance, MedicineReminder, Feedback, HealthJourneyEvent, ChatMessage, AppNotification, ActivityItem } from './types';
import { ShieldAlert, X, CheckCircle2, BellRing } from 'lucide-react';

export default function App() {
  // Role & View State
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('vitalora_role');
    return (saved as UserRole) || 'Admin';
  });
  const [activeTab, setActiveTab] = useState<string>('role-dashboard');

  // LocalStorage state persistence
  const [patients, setPatients] = useState<Patient[]>(() => {
    const saved = localStorage.getItem('vitalora_patients');
    return saved ? JSON.parse(saved) : initialPatients;
  });

  const [doctors, setDoctors] = useState<Doctor[]>(() => {
    const saved = localStorage.getItem('vitalora_doctors');
    return saved ? JSON.parse(saved) : initialDoctors;
  });

  const [departments] = useState<Department[]>(initialDepartments);

  const [beds, setBeds] = useState<Bed[]>(() => {
    const saved = localStorage.getItem('vitalora_beds');
    return saved ? JSON.parse(saved) : initialBeds;
  });

  const [medicines, setMedicines] = useState<Medicine[]>(() => {
    const saved = localStorage.getItem('vitalora_medicines');
    return saved ? JSON.parse(saved) : initialMedicines;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('vitalora_appointments');
    return saved ? JSON.parse(saved) : initialAppointments;
  });

  const [labTests, setLabTests] = useState<LabTest[]>(() => {
    const saved = localStorage.getItem('vitalora_lab_tests');
    return saved ? JSON.parse(saved) : initialLabTests;
  });

  const [billings, setBillings] = useState<BillingItem[]>(() => {
    const saved = localStorage.getItem('vitalora_billings');
    return saved ? JSON.parse(saved) : initialBillings;
  });

  const [ambulances, setAmbulances] = useState<Ambulance[]>(() => {
    const saved = localStorage.getItem('vitalora_ambulances');
    return saved ? JSON.parse(saved) : initialAmbulances;
  });

  const [reminders, setReminders] = useState<MedicineReminder[]>(() => {
    const saved = localStorage.getItem('vitalora_reminders');
    return saved ? JSON.parse(saved) : initialReminders;
  });

  const [feedbacks, setFeedbacks] = useState<Feedback[]>(() => {
    const saved = localStorage.getItem('vitalora_feedbacks');
    return saved ? JSON.parse(saved) : initialFeedbacks;
  });

  const [queueItems] = useState(initialQueueItems);
  const [timelineEvents] = useState(initialHealthJourney);

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('vitalora_messages');
    return saved ? JSON.parse(saved) : initialMessages;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('vitalora_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  const [activities, setActivities] = useState<ActivityItem[]>(() => {
    const saved = localStorage.getItem('vitalora_activities');
    return saved ? JSON.parse(saved) : [
      {
        id: 'act-1',
        userRole: 'Admin',
        userName: 'System Audit',
        action: 'Vitalora AI Initialization',
        details: 'Loaded telemetry, departments, and active patient registry.',
        timestamp: 'Just now',
        type: 'info'
      }
    ];
  });

  // Settings & Modals
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('vitalora_theme');
    return saved ? JSON.parse(saved) : true;
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('vitalora_sound');
    return saved ? JSON.parse(saved) : true;
  });

  const [fontSize, setFontSize] = useState('normal');
  const [highContrast, setHighContrast] = useState(false);

  const [accessibilityModalOpen, setAccessibilityModalOpen] = useState(false);
  const [personalizationModalOpen, setPersonalizationModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSOSOpen, setIsSOSOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isActivityLogOpen, setIsActivityLogOpen] = useState(false);

  const [activeSOSBanner, setActiveSOSBanner] = useState(false);
  const [activeToast, setActiveToast] = useState<AppNotification | null>(null);
  const [preselectedDoctor, setPreselectedDoctor] = useState<Doctor | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('vitalora_role', currentRole);
    localStorage.setItem('vitalora_patients', JSON.stringify(patients));
    localStorage.setItem('vitalora_doctors', JSON.stringify(doctors));
    localStorage.setItem('vitalora_beds', JSON.stringify(beds));
    localStorage.setItem('vitalora_medicines', JSON.stringify(medicines));
    localStorage.setItem('vitalora_appointments', JSON.stringify(appointments));
    localStorage.setItem('vitalora_lab_tests', JSON.stringify(labTests));
    localStorage.setItem('vitalora_billings', JSON.stringify(billings));
    localStorage.setItem('vitalora_ambulances', JSON.stringify(ambulances));
    localStorage.setItem('vitalora_reminders', JSON.stringify(reminders));
    localStorage.setItem('vitalora_feedbacks', JSON.stringify(feedbacks));
    localStorage.setItem('vitalora_messages', JSON.stringify(messages));
    localStorage.setItem('vitalora_notifications', JSON.stringify(notifications));
    localStorage.setItem('vitalora_activities', JSON.stringify(activities));
    localStorage.setItem('vitalora_theme', JSON.stringify(isDarkMode));
    localStorage.setItem('vitalora_sound', JSON.stringify(soundEnabled));
  }, [currentRole, patients, doctors, beds, medicines, appointments, labTests, billings, ambulances, reminders, feedbacks, messages, notifications, activities, isDarkMode, soundEnabled]);

  // Keyboard Shortcuts (Cmd+K for search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Role Switching Handler
  const handleRoleChange = (newRole: UserRole) => {
    setCurrentRole(newRole);
    setActiveTab('role-dashboard');
    soundManager.playSuccessSound();
    handleAddActivity('Role Switched', `Switched view mode to ${newRole}`, 'info');
  };

  // Activity logger helper
  const handleAddActivity = (action: string, details: string, type: 'info' | 'success' | 'warning' | 'emergency' = 'info') => {
    const item: ActivityItem = {
      id: `act-${Date.now()}`,
      userRole: currentRole,
      userName: currentRole === 'Doctor' ? 'Dr. Sarah Jenkins' : currentRole === 'Patient' ? 'Rahul Sharma' : `${currentRole} Staff`,
      action,
      details,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type
    };
    setActivities(prev => [item, ...prev]);
  };

  // Notification Trigger
  const triggerNotification = (notif: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: AppNotification = {
      ...notif,
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
    setActiveToast(newNotif);

    if (soundEnabled) {
      if (notif.type === 'emergency') {
        soundManager.playEmergencySound();
      } else {
        soundManager.playNotificationSound();
      }
    }

    setTimeout(() => setActiveToast(null), 5000);
  };

  // Handlers
  const handleAddPatient = (patient: Patient) => {
    setPatients([patient, ...patients]);
    triggerNotification({
      title: 'New Patient Intake',
      message: `Registered ${patient.name} (${patient.qrCodeId}) in ${patient.condition} ward.`,
      type: 'appointment',
      priority: 'medium'
    });
    handleAddActivity('Patient Intake', `Registered ${patient.name} (Room ${patient.roomNumber})`, 'success');
  };

  const handleAddAppointment = (apt: Appointment) => {
    setAppointments([apt, ...appointments]);
    triggerNotification({
      title: 'Appointment Scheduled',
      message: `Token #${apt.tokenNumber} issued for ${apt.patientName} with ${apt.doctorName}.`,
      type: 'appointment',
      priority: 'medium'
    });
    handleAddActivity('Appointment Booked', `Token #${apt.tokenNumber} issued for ${apt.patientName}`, 'success');
  };

  const handleAddMedicine = (med: Medicine) => {
    setMedicines([med, ...medicines]);
    triggerNotification({
      title: 'Pharmacy Stock Updated',
      message: `Added ${med.name} (${med.stock} units) to central pharmacy.`,
      type: 'medicine',
      priority: 'low'
    });
    handleAddActivity('Medicine Added', `Added ${med.name} to pharmacy inventory`, 'info');
  };

  const handleAddTest = (test: LabTest) => {
    setLabTests([test, ...labTests]);
    triggerNotification({
      title: 'Lab Test Ordered',
      message: `Diagnostic ${test.testName} requested for ${test.patientName}.`,
      type: 'lab',
      priority: 'medium'
    });
    handleAddActivity('Lab Test Ordered', `Ordered ${test.testName} for ${test.patientName}`, 'info');
  };

  const handleAddBill = (bill: BillingItem) => {
    setBillings([bill, ...billings]);
    triggerNotification({
      title: 'Invoice Generated',
      message: `Bill of ₹${bill.totalAmount} generated for ${bill.patientName}.`,
      type: 'billing',
      priority: 'medium'
    });
    handleAddActivity('Invoice Created', `Generated bill for ${bill.patientName}`, 'info');
  };

  const handlePayBill = (id: string) => {
    setBillings(billings.map(b => b.id === id ? { ...b, status: 'Paid' } : b));
    const bill = billings.find(b => b.id === id);
    triggerNotification({
      title: 'Payment Received',
      message: `Paid ₹${bill?.totalAmount || 0} invoice for ${bill?.patientName || 'Patient'}.`,
      type: 'billing',
      priority: 'low'
    });
    handleAddActivity('Payment Processed', `Received payment for Invoice #${id}`, 'success');
  };

  const handleAddBed = (bed: Bed) => setBeds([bed, ...beds]);

  const handleUpdateBedStatus = (id: string, status: 'Available' | 'Occupied' | 'Reserved', patientName?: string) => {
    setBeds(beds.map(b => b.id === id ? { ...b, status, patientName: status === 'Available' ? undefined : (patientName || 'Patient') } : b));
    handleAddActivity('Bed Status Updated', `Updated Bed ${id} to ${status}`, 'info');
  };

  const handleRequestAmbulance = (id: string) => {
    setAmbulances(ambulances.map(a => a.id === id ? { ...a, status: 'Dispatched', destination: 'Vitalora AI Emergency Bay' } : a));
    triggerNotification({
      title: 'Ambulance Dispatched',
      message: `Ambulance Unit ${id} dispatched to Emergency Bay.`,
      type: 'emergency',
      priority: 'high'
    });
    handleAddActivity('Ambulance Dispatched', `Unit ${id} en route to ER Bay`, 'warning');
  };

  const handleEmergencySOSConfirm = () => {
    setActiveSOSBanner(true);
    triggerNotification({
      title: '🚨 CRITICAL EMERGENCY SOS',
      message: 'Emergency SOS triggered! Ambulance TS-09-EA-4488 dispatched automatically.',
      type: 'emergency',
      priority: 'high'
    });
    handleAddActivity('EMERGENCY SOS', 'Triggered automated Trauma Ambulance & ER response', 'emergency');
  };

  const handleToggleReminderTaken = (id: string) => {
    setReminders(reminders.map(r => r.id === id ? { ...r, status: r.status === 'Taken' ? 'Pending' : 'Taken' } : r));
    const rem = reminders.find(r => r.id === id);
    if (rem) {
      handleAddActivity('Medicine Taken', `Marked ${rem.medicineName} dosage as taken`, 'success');
    }
  };

  const handleSendMessage = (msg: ChatMessage) => {
    setMessages([...messages, msg]);
    handleAddActivity('Chat Message Sent', `Message sent by ${msg.senderName}`, 'info');
  };

  const handleAddFeedback = (fb: Feedback) => {
    setFeedbacks([fb, ...feedbacks]);
    triggerNotification({
      title: 'Feedback Received',
      message: `Rating ${fb.overallRating}/5 submitted by ${fb.patientName}.`,
      type: 'appointment',
      priority: 'low'
    });
    handleAddActivity('Feedback Submitted', `Received ${fb.overallRating}/5 rating`, 'info');
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  const handleResetData = () => {
    localStorage.clear();
    setPatients(initialPatients);
    setDoctors(initialDoctors);
    setBeds(initialBeds);
    setMedicines(initialMedicines);
    setAppointments(initialAppointments);
    setLabTests(initialLabTests);
    setBillings(initialBillings);
    setAmbulances(initialAmbulances);
    setReminders(initialReminders);
    setNotifications(initialNotifications);
    soundManager.playSuccessSound();
    handleAddActivity('Reset State', 'Reset Vitalora AI to default state', 'info');
  };

  const appContextData = {
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
    queueItems,
    notifications,
    onAddAppointment: handleAddAppointment,
    setActiveTab,
    soundEnabled
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950 ${
      isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    } ${fontSize === 'large' ? 'text-lg' : fontSize === 'extra-large' ? 'text-xl' : 'text-base'} ${highContrast ? 'contrast-125' : ''}`}>

      {/* Active Emergency SOS Top Banner */}
      {activeSOSBanner && (
        <div className="bg-rose-600 text-white px-4 py-2.5 flex items-center justify-between text-xs font-bold animate-pulse shadow-lg z-50">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            <span>ACTIVE EMERGENCY SOS DISPATCH: Trauma Ambulance TS-09-EA-4488 is En Route to Emergency Bay.</span>
          </div>
          <button
            onClick={() => setActiveSOSBanner(false)}
            className="px-2 py-1 bg-black/30 hover:bg-black/50 rounded-lg text-white text-[10px] uppercase font-bold cursor-pointer"
          >
            Clear SOS Alert
          </button>
        </div>
      )}

      {/* Toast Notification Floating Banner */}
      {activeToast && (
        <div className="fixed top-24 right-6 z-50 w-80 sm:w-96 bg-slate-900 border-2 border-cyan-400 rounded-2xl shadow-2xl p-4 text-white animate-bounce">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <BellRing className="w-5 h-5 text-cyan-400 animate-pulse" />
              <h4 className="font-bold text-sm text-cyan-300">{activeToast.title}</h4>
            </div>
            <button onClick={() => setActiveToast(null)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-slate-200 mt-1.5">{activeToast.message}</p>
        </div>
      )}
      
      {/* Navbar */}
      <Navbar
        currentRole={currentRole}
        setCurrentRole={handleRoleChange}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
        onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
        onClearNotifications={handleClearNotifications}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenPersonalization={() => setPersonalizationModalOpen(true)}
        onOpenAccessibility={() => setAccessibilityModalOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenProfileMenu={() => setIsProfileMenuOpen(true)}
      />

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {/* Quick Actions Shortcuts Toolbar */}
          <QuickActionsBar
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenSOS={() => setIsSOSOpen(true)}
            onNavigate={(tab) => setActiveTab(tab)}
          />

          {/* Views */}
          {activeTab === 'role-dashboard' && (
            <RoleDashboard
              currentRole={currentRole}
              patients={patients}
              doctors={doctors}
              departments={departments}
              beds={beds}
              medicines={medicines}
              appointments={appointments}
              labTests={labTests}
              billings={billings}
              ambulances={ambulances}
              reminders={reminders}
              activities={activities}
              onAddPatient={handleAddPatient}
              onAddAppointment={handleAddAppointment}
              onAddMedicine={handleAddMedicine}
              onPayBill={handlePayBill}
              onUpdateBedStatus={handleUpdateBedStatus}
              onRequestAmbulance={handleRequestAmbulance}
              onEmergencySOS={() => setIsSOSOpen(true)}
              onToggleReminderTaken={handleToggleReminderTaken}
              onNavigate={(tab) => setActiveTab(tab)}
              onAddActivity={handleAddActivity}
            />
          )}

          {activeTab === 'digital-twin' && (
            <DashboardDigitalTwin
              departments={departments}
              beds={beds}
              doctors={doctors}
              ambulances={ambulances}
              medicines={medicines}
              onNavigate={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'patients' && (
            <PatientsModule patients={patients} onAddPatient={handleAddPatient} />
          )}

          {activeTab === 'doctors' && (
            <DoctorsModule
              doctors={doctors}
              onBookAppointmentWithDoctor={(doc) => {
                setPreselectedDoctor(doc);
                setActiveTab('appointments');
              }}
            />
          )}

          {activeTab === 'appointments' && (
            <AppointmentsModule
              appointments={appointments}
              doctors={doctors}
              departments={departments}
              onAddAppointment={handleAddAppointment}
              preselectedDoctor={preselectedDoctor}
            />
          )}

          {activeTab === 'departments' && (
            <DepartmentsModule departments={departments} />
          )}

          {activeTab === 'beds' && (
            <BedsModule
              beds={beds}
              onAddBed={handleAddBed}
              onUpdateBedStatus={handleUpdateBedStatus}
            />
          )}

          {activeTab === 'pharmacy' && (
            <PharmacyModule medicines={medicines} onAddMedicine={handleAddMedicine} />
          )}

          {activeTab === 'lab' && (
            <LaboratoryModule labTests={labTests} onAddTest={handleAddTest} />
          )}

          {activeTab === 'billing' && (
            <BillingModule
              billings={billings}
              onAddBill={handleAddBill}
              onPayBill={handlePayBill}
            />
          )}

          {activeTab === 'ambulance' && (
            <AmbulanceModule
              ambulances={ambulances}
              onRequestAmbulance={handleRequestAmbulance}
              onEmergencySOS={() => setIsSOSOpen(true)}
            />
          )}

          {activeTab === 'medicines' && (
            <MedicineCompanionModule
              reminders={reminders}
              onToggleTaken={handleToggleReminderTaken}
            />
          )}

          {activeTab === 'navigation' && <HospitalNavigationModule />}

          {activeTab === 'queue' && <QueuePredictorModule queueItems={queueItems} />}

          {activeTab === 'timeline' && <HealthTimelineModule timelineEvents={timelineEvents} />}

          {activeTab === 'chat' && (
            <DoctorChatModule messages={messages} onSendMessage={handleSendMessage} />
          )}

          {activeTab === 'feedback' && (
            <FeedbackModule feedbacks={feedbacks} onAddFeedback={handleAddFeedback} />
          )}
        </main>
      </div>

      {/* Floating Vitalora AI Assistant */}
      <VitaloraAIAssistant appContextData={appContextData} />

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        patients={patients}
        doctors={doctors}
        appointments={appointments}
        medicines={medicines}
        labTests={labTests}
        departments={departments}
        onNavigate={(tab) => setActiveTab(tab)}
      />

      {/* Emergency SOS Countdown Safety Modal */}
      <EmergencySOSModal
        isOpen={isSOSOpen}
        onClose={() => setIsSOSOpen(false)}
        onConfirmSOS={handleEmergencySOSConfirm}
      />

      {/* Profile & Role Menu Modal */}
      <ProfileMenuModal
        isOpen={isProfileMenuOpen}
        onClose={() => setIsProfileMenuOpen(false)}
        currentRole={currentRole}
        setCurrentRole={handleRoleChange}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onResetData={handleResetData}
        onOpenActivityLog={() => setIsActivityLogOpen(true)}
      />

      {/* Activity Log Audit Trail Modal */}
      <ActivityLogModal
        isOpen={isActivityLogOpen}
        onClose={() => setIsActivityLogOpen(false)}
        activities={activities}
      />

      {/* Accessibility Modal */}
      <AccessibilityModal
        isOpen={accessibilityModalOpen}
        onClose={() => setAccessibilityModalOpen(false)}
        fontSize={fontSize}
        setFontSize={setFontSize}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
      />

      {/* Personalization Modal */}
      <PersonalizationModal
        isOpen={personalizationModalOpen}
        onClose={() => setPersonalizationModalOpen(false)}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />
    </div>
  );
}
