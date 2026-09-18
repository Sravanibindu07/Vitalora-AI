export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  bloodGroup: string;
  condition: string;
  admissionDate: string;
  assignedDoctor: string;
  roomNumber: string;
  qrCodeId: string;
  emergencyContact: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  department: string;
  qualification: string;
  availability: string;
  rating: number;
  roomNumber: string;
  image: string;
  phone: string;
  email: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  department: string;
  date: string;
  time: string;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  tokenNumber: number;
}

export interface Department {
  id: string;
  name: string;
  head: string;
  description: string;
  doctorsCount: number;
  availableBeds: number;
  totalBeds: number;
  crowdLevel: 'Low' | 'Moderate' | 'High';
  bestTimeToVisit: string;
  iconName: string;
}

export interface Bed {
  id: string;
  ward: 'ICU' | 'General' | 'Emergency' | 'Private';
  bedNumber: string;
  status: 'Available' | 'Occupied' | 'Reserved';
  patientName?: string;
  assignedDate?: string;
}

export interface Medicine {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  expiryDate: string;
  lowStockThreshold: number;
  manufacturer: string;
}

export interface LabTest {
  id: string;
  testName: string;
  patientName: string;
  doctorName: string;
  date: string;
  status: 'Pending' | 'Completed';
  resultSummary?: string;
  reportUrl?: string;
}

export interface BillingItem {
  id: string;
  patientName: string;
  items: { description: string; amount: number }[];
  totalAmount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  date: string;
  dueDate: string;
}

export interface Ambulance {
  id: string;
  ambulanceNumber: string;
  driverName: string;
  driverPhone: string;
  status: 'Available' | 'Dispatched' | 'Maintenance';
  currentSpeed: number;
  etaMinutes: number;
  currentLocation: string;
  destination: string;
}

export interface Prescription {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  medicines: { name: string; dosage: string; frequency: string; duration: string }[];
  notes: string;
}

export interface MedicineReminder {
  id: string;
  medicineName: string;
  dosage: string;
  time: string;
  status: 'Pending' | 'Taken' | 'Missed';
  date: string;
}

export interface Feedback {
  id: string;
  patientName: string;
  waitingTimeRating: number;
  doctorInteractionRating: number;
  cleanlinessRating: number;
  staffBehaviorRating: number;
  overallRating: number;
  comments: string;
  date: string;
}

export interface QueueItem {
  id: string;
  tokenNumber: number;
  patientName: string;
  department: string;
  position: number;
  aheadCount: number;
  estimatedWaitMinutes: number;
  status: 'Waiting' | 'In Consultation' | 'Completed';
}

export interface HealthJourneyEvent {
  id: string;
  patientId: string;
  type: 'Appointment' | 'Diagnosis' | 'Prescription' | 'LabTest' | 'Report' | 'Medicine' | 'FollowUp';
  title: string;
  description: string;
  date: string;
  doctorName: string;
}

export interface ChatMessage {
  id: string;
  sender: 'patient' | 'doctor';
  senderName: string;
  receiverName: string;
  content: string;
  timestamp: string;
  unread: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'appointment' | 'medicine' | 'emergency' | 'message' | 'lab' | 'billing';
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface ActivityItem {
  id: string;
  userRole: UserRole;
  userName: string;
  action: string;
  details: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'emergency';
}

export interface UserProfile {
  name: string;
  role: UserRole;
  email: string;
  avatar: string;
  department?: string;
  hospitalId: string;
}

export type UserRole = 'Admin' | 'Doctor' | 'Receptionist' | 'Patient';
export type AppTheme = 'cyan-futuristic' | 'emerald-clean' | 'violet-dark' | 'amber-warm';
