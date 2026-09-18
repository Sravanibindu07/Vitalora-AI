import {
  Patient,
  Doctor,
  Appointment,
  Department,
  Bed,
  Medicine,
  LabTest,
  BillingItem,
  Ambulance,
  Prescription,
  MedicineReminder,
  Feedback,
  QueueItem,
  HealthJourneyEvent,
  ChatMessage,
  AppNotification
} from '../types';

export const initialPatients: Patient[] = [
  {
    id: 'p-1',
    name: 'Aarav Sharma',
    age: 34,
    gender: 'Male',
    phone: '+91 98765 43210',
    email: 'aarav.sharma@example.com',
    bloodGroup: 'B+',
    condition: 'Post-Cardiology Observation',
    admissionDate: '2026-08-25',
    assignedDoctor: 'Dr. Ananya Roy',
    roomNumber: 'ICU-302',
    qrCodeId: 'VITALORA-QR-88910',
    emergencyContact: 'Priya Sharma (+91 98765 43211)'
  },
  {
    id: 'p-2',
    name: 'Ananya Verma',
    age: 28,
    gender: 'Female',
    phone: '+91 91234 56789',
    email: 'ananya.v@example.com',
    bloodGroup: 'O+',
    condition: 'Acute Migraine & Neuralgia',
    admissionDate: '2026-08-26',
    assignedDoctor: 'Dr. Vikramaditya Sen',
    roomNumber: 'GEN-104',
    qrCodeId: 'VITALORA-QR-77421',
    emergencyContact: 'Rajesh Verma (+91 91234 56788)'
  },
  {
    id: 'p-3',
    name: 'Rohan Mehta',
    age: 45,
    gender: 'Male',
    phone: '+91 99887 76655',
    email: 'rohan.mehta@example.com',
    bloodGroup: 'A-',
    condition: 'Orthopedic Fracture Recovery',
    admissionDate: '2026-08-24',
    assignedDoctor: 'Dr. Rajesh Nair',
    roomNumber: 'PVT-201',
    qrCodeId: 'VITALORA-QR-55632',
    emergencyContact: 'Sunita Mehta (+91 99887 76654)'
  },
  {
    id: 'p-4',
    name: 'Neha Kapoor',
    age: 31,
    gender: 'Female',
    phone: '+91 98111 22334',
    email: 'neha.kapoor@example.com',
    bloodGroup: 'AB+',
    condition: 'Pediatric Follow-up / Routine',
    admissionDate: '2026-08-27',
    assignedDoctor: 'Dr. Sneha Pillai',
    roomNumber: 'GEN-112',
    qrCodeId: 'VITALORA-QR-33219',
    emergencyContact: 'Karan Kapoor (+91 98111 22335)'
  }
];

export const initialDoctors: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Ananya Roy',
    specialty: 'Senior Cardiologist',
    department: 'Cardiology',
    qualification: 'MD, DM (AIIMS), FACC',
    availability: 'Mon - Sat (09:00 AM - 02:00 PM)',
    rating: 4.9,
    roomNumber: 'Room 401, Level 4',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80',
    phone: '+91 98000 11122',
    email: 'ananya.roy@vitalora.ai'
  },
  {
    id: 'doc-2',
    name: 'Dr. Vikramaditya Sen',
    specialty: 'Chief Neurologist',
    department: 'Neurology',
    qualification: 'MBBS, MS, M.Ch (Neurosurgery)',
    availability: 'Tue - Sun (10:00 AM - 04:00 PM)',
    rating: 4.8,
    roomNumber: 'Room 305, Level 3',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80',
    phone: '+91 98000 22233',
    email: 'vikram.sen@vitalora.ai'
  },
  {
    id: 'doc-3',
    name: 'Dr. Rajesh Nair',
    specialty: 'Orthopedic Surgeon',
    department: 'Orthopedics',
    qualification: 'MS (Orthopedics), FRCS',
    availability: 'Mon - Fri (08:30 AM - 01:30 PM)',
    rating: 4.7,
    roomNumber: 'Room 202, Level 2',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop&q=80',
    phone: '+91 98000 33344',
    email: 'rajesh.nair@vitalora.ai'
  },
  {
    id: 'doc-4',
    name: 'Dr. Sneha Pillai',
    specialty: 'Pediatric Specialist',
    department: 'Pediatrics',
    qualification: 'MD (Pediatrics), DCH',
    availability: 'Mon - Sat (09:00 AM - 05:00 PM)',
    rating: 4.9,
    roomNumber: 'Room 108, Level 1',
    image: 'https://images.unsplash.com/photo-1594824813575-2965a3d76e33?w=400&auto=format&fit=crop&q=80',
    phone: '+91 98000 44455',
    email: 'sneha.pillai@vitalora.ai'
  },
  {
    id: 'doc-5',
    name: 'Dr. Arjun Kapoor',
    specialty: 'Emergency Medicine Director',
    department: 'Emergency Room',
    qualification: 'MBBS, MEM, FACEP',
    availability: '24/7 On-Duty Rotation',
    rating: 4.9,
    roomNumber: 'ER Bay 1, Ground Floor',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=80',
    phone: '+91 98000 55566',
    email: 'arjun.kapoor@vitalora.ai'
  }
];

export const initialDepartments: Department[] = [
  {
    id: 'dept-1',
    name: 'Cardiology',
    head: 'Dr. Ananya Roy',
    description: 'Advanced AI-monitored cardiac care unit with robotic catheterization and real-time telemetry.',
    doctorsCount: 8,
    availableBeds: 12,
    totalBeds: 40,
    crowdLevel: 'Moderate',
    bestTimeToVisit: '11:00 AM - 01:00 PM',
    iconName: 'HeartPulse'
  },
  {
    id: 'dept-2',
    name: 'Neurology',
    head: 'Dr. Vikramaditya Sen',
    description: 'Cutting-edge brain mapping, neural rehabilitation, and stroke care center.',
    doctorsCount: 6,
    availableBeds: 8,
    totalBeds: 30,
    crowdLevel: 'Low',
    bestTimeToVisit: '02:00 PM - 04:00 PM',
    iconName: 'Brain'
  },
  {
    id: 'dept-3',
    name: 'Emergency Room (ER)',
    head: 'Dr. Arjun Kapoor',
    description: '24/7 Trauma care with automated triage, smart ambulance dispatch, and rapid diagnostics.',
    doctorsCount: 15,
    availableBeds: 5,
    totalBeds: 25,
    crowdLevel: 'High',
    bestTimeToVisit: '04:00 AM - 07:00 AM',
    iconName: 'Activity'
  },
  {
    id: 'dept-4',
    name: 'Orthopedics',
    head: 'Dr. Rajesh Nair',
    description: 'Joint replacement, spine surgery, and robotic exoskeleton physical therapy labs.',
    doctorsCount: 7,
    availableBeds: 14,
    totalBeds: 35,
    crowdLevel: 'Moderate',
    bestTimeToVisit: '10:00 AM - 12:00 PM',
    iconName: 'Bone'
  },
  {
    id: 'dept-5',
    name: 'Pediatrics',
    head: 'Dr. Sneha Pillai',
    description: 'Child-friendly holistic care, neonatal intensive care units, and developmental immunology.',
    doctorsCount: 9,
    availableBeds: 18,
    totalBeds: 45,
    crowdLevel: 'Low',
    bestTimeToVisit: '09:00 AM - 11:00 AM',
    iconName: 'Smile'
  }
];

export const initialBeds: Bed[] = [
  { id: 'b-1', ward: 'ICU', bedNumber: 'ICU-301', status: 'Occupied', patientName: 'Suresh Rao', assignedDate: '2026-08-23' },
  { id: 'b-2', ward: 'ICU', bedNumber: 'ICU-302', status: 'Occupied', patientName: 'Aarav Sharma', assignedDate: '2026-08-25' },
  { id: 'b-3', ward: 'ICU', bedNumber: 'ICU-303', status: 'Available' },
  { id: 'b-4', ward: 'ICU', bedNumber: 'ICU-304', status: 'Available' },
  { id: 'b-5', ward: 'General', bedNumber: 'GEN-104', status: 'Occupied', patientName: 'Ananya Verma', assignedDate: '2026-08-26' },
  { id: 'b-6', ward: 'General', bedNumber: 'GEN-105', status: 'Available' },
  { id: 'b-7', ward: 'General', bedNumber: 'GEN-106', status: 'Available' },
  { id: 'b-8', ward: 'Emergency', bedNumber: 'ER-01', status: 'Occupied', patientName: 'Kiran Kumar', assignedDate: '2026-08-27' },
  { id: 'b-9', ward: 'Emergency', bedNumber: 'ER-02', status: 'Available' },
  { id: 'b-10', ward: 'Private', bedNumber: 'PVT-201', status: 'Occupied', patientName: 'Rohan Mehta', assignedDate: '2026-08-24' }
];

export const initialMedicines: Medicine[] = [
  { id: 'med-1', name: 'Vital-Paracetamol 650mg', category: 'Analgesic', stock: 1240, price: 25.00, expiryDate: '2028-05-12', lowStockThreshold: 150, manufacturer: 'BioGen Pharma' },
  { id: 'med-2', name: 'CardioGuard 10mg', category: 'Cardiovascular', stock: 420, price: 180.50, expiryDate: '2027-11-20', lowStockThreshold: 100, manufacturer: 'AstraTech Labs' },
  { id: 'med-3', name: 'NeuroCalm 50mg', category: 'Neurology', stock: 85, price: 340.00, expiryDate: '2027-04-15', lowStockThreshold: 100, manufacturer: 'Synapse Healthcare' },
  { id: 'med-4', name: 'Amoxicillin 500mg', category: 'Antibiotic', stock: 920, price: 120.00, expiryDate: '2028-01-10', lowStockThreshold: 200, manufacturer: 'Pfizer India' },
  { id: 'med-5', name: 'Insulin Glargine Pen', category: 'Diabetes', stock: 45, price: 850.00, expiryDate: '2026-12-01', lowStockThreshold: 50, manufacturer: 'Novo Nordisk' }
];

export const initialAppointments: Appointment[] = [
  { id: 'apt-1', patientName: 'Aarav Sharma', doctorName: 'Dr. Ananya Roy', department: 'Cardiology', date: '2026-08-28', time: '10:00 AM', status: 'Confirmed', tokenNumber: 14 },
  { id: 'apt-2', patientName: 'Ananya Verma', doctorName: 'Dr. Vikramaditya Sen', department: 'Neurology', date: '2026-08-28', time: '11:30 AM', status: 'Confirmed', tokenNumber: 15 },
  { id: 'apt-3', patientName: 'Rohan Mehta', doctorName: 'Dr. Rajesh Nair', department: 'Orthopedics', date: '2026-08-29', time: '09:15 AM', status: 'Pending', tokenNumber: 22 },
  { id: 'apt-4', patientName: 'Neha Kapoor', doctorName: 'Dr. Sneha Pillai', department: 'Pediatrics', date: '2026-08-29', time: '02:00 PM', status: 'Confirmed', tokenNumber: 28 }
];

export const initialLabTests: LabTest[] = [
  { id: 'lab-1', testName: 'Advanced Cardiac Panel', patientName: 'Aarav Sharma', doctorName: 'Dr. Ananya Roy', date: '2026-08-26', status: 'Completed', resultSummary: 'Troponin normal. Lipid profile within target range.', reportUrl: '#' },
  { id: 'lab-2', testName: 'MRI Brain Scan & EEG', patientName: 'Ananya Verma', doctorName: 'Dr. Vikramaditya Sen', date: '2026-08-26', status: 'Completed', resultSummary: 'Mild vascular asymmetry detected. No acute hemorrhage.', reportUrl: '#' },
  { id: 'lab-3', testName: 'Complete Blood Count (CBC)', patientName: 'Rohan Mehta', doctorName: 'Dr. Rajesh Nair', date: '2026-08-27', status: 'Pending' }
];

export const initialBillings: BillingItem[] = [
  { id: 'bill-1', patientName: 'Aarav Sharma', items: [{ description: 'ICU Monitoring (2 days)', amount: 15000 }, { description: 'Cardiology Consult', amount: 2500 }, { description: 'ECG & Diagnostics', amount: 1800 }], totalAmount: 19300, status: 'Pending', date: '2026-08-27', dueDate: '2026-09-05' },
  { id: 'bill-2', patientName: 'Ananya Verma', items: [{ description: 'General Ward Stay', amount: 6000 }, { description: 'Neurology Consult', amount: 3000 }, { description: 'MRI Brain', amount: 8500 }], totalAmount: 17500, status: 'Paid', date: '2026-08-26', dueDate: '2026-09-02' }
];

export const initialAmbulances: Ambulance[] = [
  { id: 'amb-1', ambulanceNumber: 'TS-09-EA-9911', driverName: 'Ramesh Kumar', driverPhone: '+91 99001 12233', status: 'Available', currentSpeed: 0, etaMinutes: 0, currentLocation: 'Hospital Bay 1', destination: 'Standby' },
  { id: 'amb-2', ambulanceNumber: 'TS-09-EA-4488', driverName: 'Sanjay Reddy', driverPhone: '+91 99002 23344', status: 'Dispatched', currentSpeed: 65, etaMinutes: 4, currentLocation: 'Banjara Hills, Road No. 12', destination: 'Vitalora AI Main ER' },
  { id: 'amb-3', ambulanceNumber: 'TS-09-EA-7722', driverName: 'Venkat Rao', driverPhone: '+91 99003 34455', status: 'Available', currentSpeed: 0, etaMinutes: 0, currentLocation: 'Hospital Bay 2', destination: 'Standby' }
];

export const initialPrescriptions: Prescription[] = [
  {
    id: 'rx-1',
    patientName: 'Aarav Sharma',
    doctorName: 'Dr. Ananya Roy',
    date: '2026-08-26',
    medicines: [
      { name: 'CardioGuard 10mg', dosage: '1 tablet', frequency: 'Once daily after breakfast', duration: '30 days' },
      { name: 'Vital-Paracetamol 650mg', dosage: '1 tablet', frequency: 'As needed for fever/pain', duration: '5 days' }
    ],
    notes: 'Keep blood pressure monitored twice daily. Avoid high sodium intake.'
  },
  {
    id: 'rx-2',
    patientName: 'Ananya Verma',
    doctorName: 'Dr. Vikramaditya Sen',
    date: '2026-08-26',
    medicines: [
      { name: 'NeuroCalm 50mg', dosage: '1 tablet', frequency: 'Before bedtime', duration: '14 days' }
    ],
    notes: 'Ensure 8 hours of uninterrupted sleep. Avoid bright screen exposure.'
  }
];

export const initialReminders: MedicineReminder[] = [
  { id: 'rem-1', medicineName: 'CardioGuard 10mg', dosage: '1 tablet', time: '09:00 AM', status: 'Taken', date: '2026-08-27' },
  { id: 'rem-2', medicineName: 'NeuroCalm 50mg', dosage: '1 tablet', time: '09:00 PM', status: 'Pending', date: '2026-08-27' }
];

export const initialFeedbacks: Feedback[] = [
  { id: 'fb-1', patientName: 'Ananya Verma', waitingTimeRating: 5, doctorInteractionRating: 5, cleanlinessRating: 5, staffBehaviorRating: 4, overallRating: 5, comments: 'Extremely prompt service and futuristic AI diagnostic scanning!', date: '2026-08-26' },
  { id: 'fb-2', patientName: 'Rohan Mehta', waitingTimeRating: 4, doctorInteractionRating: 5, cleanlinessRating: 4, staffBehaviorRating: 5, overallRating: 4, comments: 'Great orthopedic care. The smart queue predictor was spot on.', date: '2026-08-25' }
];

export const initialQueueItems: QueueItem[] = [
  { id: 'q-1', tokenNumber: 14, patientName: 'Aarav Sharma', department: 'Cardiology', position: 1, aheadCount: 0, estimatedWaitMinutes: 3, status: 'In Consultation' },
  { id: 'q-2', tokenNumber: 15, patientName: 'Ananya Verma', department: 'Neurology', position: 2, aheadCount: 1, estimatedWaitMinutes: 12, status: 'Waiting' },
  { id: 'q-3', tokenNumber: 16, patientName: 'Kiran Patel', department: 'Cardiology', position: 3, aheadCount: 2, estimatedWaitMinutes: 25, status: 'Waiting' }
];

export const initialHealthJourney: HealthJourneyEvent[] = [
  { id: 'hj-1', patientId: 'p-1', type: 'Appointment', title: 'Cardiology Initial Screening', description: 'Consulted Dr. Ananya Roy for chest discomfort evaluation.', date: '2026-08-25', doctorName: 'Dr. Ananya Roy' },
  { id: 'hj-2', patientId: 'p-1', type: 'LabTest', title: 'Advanced Cardiac Panel', description: 'ECG and biomarker tests performed.', date: '2026-08-26', doctorName: 'Dr. Ananya Roy' },
  { id: 'hj-3', patientId: 'p-1', type: 'Prescription', title: 'Medication Issued', description: 'Prescribed CardioGuard 10mg daily.', date: '2026-08-26', doctorName: 'Dr. Ananya Roy' },
  { id: 'hj-4', patientId: 'p-1', type: 'FollowUp', title: 'Post-Observation Check', description: 'Vitals stable, scheduled for follow-up in 2 weeks.', date: '2026-08-27', doctorName: 'Dr. Ananya Roy' }
];

export const initialMessages: ChatMessage[] = [
  { id: 'msg-1', sender: 'doctor', senderName: 'Dr. Ananya Roy', receiverName: 'Aarav Sharma', content: 'Hello Aarav, your cardiac panel results are normal. Please continue taking CardioGuard as prescribed.', timestamp: '10:30 AM', unread: false },
  { id: 'msg-2', sender: 'patient', senderName: 'Aarav Sharma', receiverName: 'Dr. Ananya Roy', content: 'Thank you Dr. Roy, my heart rate has stabilized significantly.', timestamp: '10:35 AM', unread: true }
];

export const initialNotifications: AppNotification[] = [
  { id: 'notif-1', title: 'Appointment Confirmed', message: 'Your cardiology appointment with Dr. Ananya Roy is confirmed for tomorrow at 10:00 AM.', type: 'appointment', timestamp: '10 mins ago', read: false, priority: 'medium' },
  { id: 'notif-2', title: 'Medicine Reminder', message: 'Time to take CardioGuard 10mg.', type: 'medicine', timestamp: '1 hour ago', read: false, priority: 'high' },
  { id: 'notif-3', title: 'Emergency SOS Alert', message: 'Ambulance TS-09-EA-4488 dispatched for emergency pickup.', type: 'emergency', timestamp: '2 hours ago', read: true, priority: 'high' }
];
