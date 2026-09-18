export type Language = 'en' | 'te' | 'hi';

export interface TranslationDictionary {
  // Common / Navbar
  brandName: string;
  slogan: string;
  dashboardRole: string;
  admin: string;
  doctor: string;
  receptionist: string;
  patient: string;
  languageLabel: string;
  notificationsTitle: string;
  unread: string;
  noNotifications: string;
  accessibility: string;
  personalization: string;
  themeToggle: string;
  soundToggle: string;

  // Sidebar Menu
  coreHeader: string;
  navDigitalTwin: string;
  navPatients: string;
  navDoctors: string;
  navAppointments: string;
  navDepartments: string;
  navBeds: string;
  navPharmacy: string;
  navLab: string;
  navBilling: string;
  navAmbulance: string;
  navMedicines: string;
  navNavigation: string;
  navQueue: string;
  navTimeline: string;
  navChat: string;
  navDoctorChat: string;
  navFeedback: string;
  qrHealthCard: string;
  patientRecords: string;

  // Buttons & Common Actions
  add: string;
  edit: string;
  delete: string;
  save: string;
  cancel: string;
  close: string;
  search: string;
  filter: string;
  status: string;
  actions: string;
  viewDetails: string;
  download: string;
  confirm: string;
  pending: string;
  completed: string;
  available: string;
  occupied: string;
  paid: string;
  overdue: string;
  liveBadge: string;

  // Digital Twin
  dtTitle: string;
  dtSubtitle: string;
  totalBeds: string;
  activeQueues: string;
  doctorsOnDuty: string;
  lowStockAlerts: string;
  ambulanceUnits: string;
  emergencySosTitle: string;
  emergencySosDesc: string;
  dispatchSos: string;
  departmentCrowdTitle: string;
  bestVisitTime: string;

  // Patient Module
  patientTitle: string;
  patientSubtitle: string;
  registerPatient: string;
  searchPatientPlaceholder: string;
  patientId: string;
  patientName: string;
  ageGender: string;
  bloodGroup: string;
  condition: string;
  assignedDoctor: string;
  roomNumber: string;
  admissionDate: string;
  emergencyContact: string;
  digitalHealthCard: string;

  // Doctor Module
  doctorTitle: string;
  doctorSubtitle: string;
  searchDoctorPlaceholder: string;
  specialty: string;
  department: string;
  experience: string;
  rating: string;
  availability: string;
  bookAppointmentBtn: string;

  // Appointment Module
  aptTitle: string;
  aptSubtitle: string;
  bookNewToken: string;
  selectPatient: string;
  selectDoctor: string;
  selectDept: string;
  tokenNumber: string;
  scheduledTime: string;
  queueStatus: string;

  // Bed Module
  bedTitle: string;
  bedSubtitle: string;
  wardFilterAll: string;
  wardICU: string;
  wardGeneral: string;
  wardEmergency: string;
  wardPrivate: string;
  bedNumber: string;
  toggleStatus: string;
  allocateBed: string;

  // Pharmacy Module
  pharmacyTitle: string;
  pharmacySubtitle: string;
  addMedicine: string;
  medicineName: string;
  category: string;
  stockQty: string;
  lowThreshold: string;
  unitPrice: string;
  expiryDate: string;
  manufacturer: string;
  reorderAlert: string;

  // Lab Module
  labTitle: string;
  labSubtitle: string;
  orderLabTest: string;
  testName: string;
  requestedDate: string;
  downloadReport: string;

  // Billing Module
  billingTitle: string;
  billingSubtitle: string;
  createInvoice: string;
  invoiceId: string;
  totalAmount: string;
  dueDate: string;
  payInvoice: string;
  downloadReceipt: string;

  // Ambulance Module
  ambulanceTitle: string;
  ambulanceSubtitle: string;
  unitNumber: string;
  driverName: string;
  driverPhone: string;
  currentSpeed: string;
  etaMinutes: string;
  currentLocation: string;
  destination: string;

  // Medicine Companion
  companionTitle: string;
  companionSubtitle: string;
  addDosage: string;
  dosageTime: string;
  frequency: string;
  markTaken: string;
  undo: string;
  missedLogs: string;

  // Hospital Navigation
  navTitle: string;
  navSubtitle: string;
  selectDestination: string;
  stepDirections: string;

  // Queue Predictor
  queueTitle: string;
  queueSubtitle: string;
  currentToken: string;
  queuePosition: string;
  patientsAhead: string;
  estimatedWait: string;

  // Timeline
  timelineTitle: string;
  timelineSubtitle: string;
  healthJourney: string;

  // Chat
  chatTitle: string;
  chatSubtitle: string;
  typeMessagePlaceholder: string;
  send: string;

  // Feedback
  feedbackTitle: string;
  feedbackSubtitle: string;
  rateExperience: string;
  submitFeedback: string;
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    brandName: "Vitalora AI",
    slogan: "“Smarter Care. Better Lives.”",
    dashboardRole: "Dashboard Role:",
    admin: "Admin",
    doctor: "Doctor",
    receptionist: "Receptionist",
    patient: "Patient",
    languageLabel: "Language",
    notificationsTitle: "Centralized Notifications",
    unread: "Unread",
    noNotifications: "No notifications right now.",
    accessibility: "Accessibility",
    personalization: "Personalization",
    themeToggle: "Theme Mode",
    soundToggle: "Notification Sound",

    coreHeader: "Intelligent Healthcare Core",
    navDigitalTwin: "Hospital Live Overview",
    navPatients: "Patient Management",
    navDoctors: "Doctor Management",
    navAppointments: "Appointment Booking",
    navDepartments: "Departments",
    navBeds: "Bed Availability",
    navPharmacy: "Pharmacy & Stock",
    navLab: "Laboratory Management",
    navBilling: "Billing & Payments",
    navAmbulance: "Ambulance & SOS",
    navMedicines: "Medicine Companion",
    navNavigation: "Hospital Navigation",
    navQueue: "Queue & Crowd Predictor",
    navTimeline: "AI Health Timeline",
    navChat: "Doctor Follow-up Chat",
    navDoctorChat: "Doctor Follow-up & Consultation Chat",
    navFeedback: "Patient Feedback",
    qrHealthCard: "Digital QR Health Card",
    patientRecords: "Patient Medical Records & History",

    add: "Add New",
    edit: "Edit",
    delete: "Delete",
    save: "Save Changes",
    cancel: "Cancel",
    close: "Close",
    search: "Search...",
    filter: "Filter",
    status: "Status",
    actions: "Actions",
    viewDetails: "View Details",
    download: "Download",
    confirm: "Confirm",
    pending: "Pending",
    completed: "Completed",
    available: "Available",
    occupied: "Occupied",
    paid: "Paid",
    overdue: "Overdue",
    liveBadge: "Live",

    dtTitle: "Hospital Digital Twin (Live Telemetry)",
    dtSubtitle: "Real-time monitoring of beds, departments, queue wait times, ambulance fleet, and pharmacy stock.",
    totalBeds: "Total Bed Occupancy",
    activeQueues: "Active Patient Queue",
    doctorsOnDuty: "Doctors On Duty",
    lowStockAlerts: "Low Stock Items",
    ambulanceUnits: "Active Ambulances",
    emergencySosTitle: "Emergency SOS One-Touch Dispatch",
    emergencySosDesc: "Instantly trigger high-priority ambulance dispatch & alert trauma surgical team.",
    dispatchSos: "DISPATCH EMERGENCY SOS",
    departmentCrowdTitle: "Department Crowding & Crowd Predictor",
    bestVisitTime: "Best Recommended Visit Hours:",

    patientTitle: "Patient Management Registry",
    patientSubtitle: "Comprehensive patient records, medical condition tracking, and QR digital ID health cards.",
    registerPatient: "Intake New Patient",
    searchPatientPlaceholder: "Search patient by name, ID, or condition...",
    patientId: "Patient ID",
    patientName: "Patient Name",
    ageGender: "Age / Gender",
    bloodGroup: "Blood Group",
    condition: "Condition",
    assignedDoctor: "Assigned Doctor",
    roomNumber: "Room No.",
    admissionDate: "Admission Date",
    emergencyContact: "Emergency Contact",
    digitalHealthCard: "Digital Emergency ID Card",

    doctorTitle: "Doctor & Specialist Directory",
    doctorSubtitle: "Real-time schedules, room allocations, consultation ratings, and instant booking.",
    searchDoctorPlaceholder: "Search doctor by name, specialty, or department...",
    specialty: "Specialty",
    department: "Department",
    experience: "Experience",
    rating: "Rating",
    availability: "Availability",
    bookAppointmentBtn: "Book Appointment",

    aptTitle: "Appointment Booking & Digital Token Generator",
    aptSubtitle: "Schedule consultations, generate digital queue tokens, and track real-time queue positions.",
    bookNewToken: "Schedule New Appointment",
    selectPatient: "Select Patient",
    selectDoctor: "Select Doctor",
    selectDept: "Select Department",
    tokenNumber: "Digital Token No.",
    scheduledTime: "Scheduled Time",
    queueStatus: "Queue Status",

    bedTitle: "Bed Inventory & Ward Management",
    bedSubtitle: "Live bed availability tracking across ICU, General, Emergency, and Private Wards.",
    wardFilterAll: "All Wards",
    wardICU: "ICU Ward",
    wardGeneral: "General Ward",
    wardEmergency: "Emergency Ward",
    wardPrivate: "Private Ward",
    bedNumber: "Bed Number",
    toggleStatus: "Toggle Availability",
    allocateBed: "Allocate Bed",

    pharmacyTitle: "Central Pharmacy Inventory",
    pharmacySubtitle: "Track medicine stock, low-inventory alerts, manufacturers, and expiry dates.",
    addMedicine: "Add New Medicine",
    medicineName: "Medicine Name",
    category: "Category",
    stockQty: "Stock Quantity",
    lowThreshold: "Reorder Threshold",
    unitPrice: "Unit Price (₹)",
    expiryDate: "Expiry Date",
    manufacturer: "Manufacturer",
    reorderAlert: "Reorder Warning",

    labTitle: "Laboratory Diagnostics Hub",
    labSubtitle: "Order diagnostic tests, track processing status, and download digital lab reports.",
    orderLabTest: "Order New Test",
    testName: "Test Name",
    requestedDate: "Requested Date",
    downloadReport: "Download Lab Report",

    billingTitle: "Billing & Patient Financial Invoices",
    billingSubtitle: "Generate itemized invoices, monitor pending dues, and process instant online payments.",
    createInvoice: "Create New Invoice",
    invoiceId: "Invoice ID",
    totalAmount: "Total Amount (₹)",
    dueDate: "Due Date",
    payInvoice: "Process Payment",
    downloadReceipt: "Download Receipt",

    ambulanceTitle: "Ambulance Fleet & Emergency SOS Dispatch",
    ambulanceSubtitle: "GPS fleet tracking, driver contact details, speed telemetry, and estimated arrival times.",
    unitNumber: "Ambulance Unit",
    driverName: "Driver Name",
    driverPhone: "Driver Phone",
    currentSpeed: "Speed (km/h)",
    etaMinutes: "ETA (Mins)",
    currentLocation: "Current Location",
    destination: "Destination",

    companionTitle: "Smart Medicine Companion",
    companionSubtitle: "Schedule dosages, set sound alerts, mark doses taken, and review adherence history.",
    addDosage: "Add Schedule",
    dosageTime: "Dose Time",
    frequency: "Frequency",
    markTaken: "Mark as Taken",
    undo: "Undo Action",
    missedLogs: "Adherence History",

    navTitle: "Hospital Navigation & Wayfinding",
    navSubtitle: "Step-by-step visual directions to key hospital wings, labs, pharmacy, and OPD rooms.",
    selectDestination: "Select Destination Wing",
    stepDirections: "Step-by-Step Directions",

    queueTitle: "Queue & Crowd Index Predictor",
    queueSubtitle: "Live queue token counter, estimated waiting time calculator, and crowd density insights.",
    currentToken: "Current Token Serving",
    queuePosition: "Your Queue Position",
    patientsAhead: "Patients Ahead",
    estimatedWait: "Estimated Wait Time",

    timelineTitle: "AI Health Journey Timeline",
    timelineSubtitle: "Unified chronological record of diagnoses, prescriptions, lab reports, and appointments.",
    healthJourney: "Patient Health Journey",

    chatTitle: "Encrypted Doctor Follow-up Chat",
    chatSubtitle: "Direct secure messaging between patient and attending specialist with medical notes.",
    typeMessagePlaceholder: "Type your query or follow-up question...",
    send: "Send",

    feedbackTitle: "Patient Comfort & Feedback Rating",
    feedbackSubtitle: "Rate hospital cleanliness, doctor interaction, wait time, and staff helpfulness.",
    rateExperience: "Rate Hospital Experience",
    submitFeedback: "Submit Feedback"
  },
  te: {
    brandName: "వైటలోరా ఏఐ",
    slogan: "“అత్యుత్తమ సంరక్షణ. మెరుగైన జీవనం.”",
    dashboardRole: "డాష్‌బోర్డ్ పాత్ర:",
    admin: "అడ్మిన్",
    doctor: "డాక్టర్",
    receptionist: "రిసెప్షనిస్ట్",
    patient: "పేషెంట్",
    languageLabel: "భాష",
    notificationsTitle: "కేంద్రీకృత నోటిఫికేషన్లు",
    unread: "చదవనివి",
    noNotifications: "ప్రస్తుతానికి నోటిఫికేషన్లు లేవు.",
    accessibility: "యాక్సెసిబిలిటీ",
    personalization: "పర్సనలైజేషన్",
    themeToggle: "థీమ్ మోడ్",
    soundToggle: "నోటిఫికేషన్ సౌండ్",

    coreHeader: "ఇంటెలిజెంట్ హెల్త్‌కేర్ కోర్",
    navDigitalTwin: "హాస్పిటల్ లైవ్ ఓవర్‌వ్యూ",
    navPatients: "పేషెంట్ మేనేజ్‌మెంట్",
    navDoctors: "డాక్టర్ మేనేజ్‌మెంట్",
    navAppointments: "అపాయింట్‌మెంట్ బుకింగ్",
    navDepartments: "విభాగాలు (Departments)",
    navBeds: "బెడ్ల అందుబాటు",
    navPharmacy: "ఫార్మసీ & స్టాక్",
    navLab: "ల్యాబొరేటరీ మేనేజ్‌మెంట్",
    navBilling: "బిల్లింగ్ & చెల్లింపులు",
    navAmbulance: "అంబులెన్స్ & SOS",
    navMedicines: "మెడిసిన్ కంపానియన్",
    navNavigation: "హాస్పిటల్ నావిగేషన్",
    navQueue: "క్యూ & క్రౌడ్ ప్రెడిక్టర్",
    navTimeline: "ఏఐ హెల్త్ టైమ్‌లైన్",
    navChat: "డాక్టర్ చాట్ ఫాలో-అప్",
    navDoctorChat: "డాక్టర్ ఫాలో-అప్ సలహాల చాట్",
    navFeedback: "పేషెంట్ ఫీడ్‌బ్యాక్",
    qrHealthCard: "డిజిటల్ QR హెల్త్ కార్డ్",
    patientRecords: "పేషెంట్ మెడికల్ రికార్డులు",

    add: "కొత్తది జోడించు",
    edit: "సవరించు",
    delete: "తొలగించు",
    save: "మార్పులను సేవ్ చేయి",
    cancel: "రద్దు చేయి",
    close: "మూసివేయి",
    search: "వెతకండి...",
    filter: "ఫిల్టర్",
    status: "స్థితి",
    actions: "చర్యలు",
    viewDetails: "వివరాలు చూడు",
    download: "డౌన్‌లోడ్",
    confirm: "స్థిరీకరించు",
    pending: "పెండింగ్‌లో ఉంది",
    completed: "పూర్తయింది",
    available: "అందుబాటులో ఉంది",
    occupied: "ఆక్రమించబడింది",
    paid: "చెల్లించబడింది",
    overdue: "గడువు ముగిసింది",
    liveBadge: "లైవ్",

    dtTitle: "హాస్పిటల్ డిజిటల్ ట్విన్ (లైవ్ డ్యాష్‌బోర్డ్)",
    dtSubtitle: "బెడ్ల అందుబాటు, విభాగాలు, క్యూ సమయం, అంబులెన్స్ మరియు ఫార్మసీ స్టాక్ యొక్క ప్రత్యక్ష పర్యవేక్షణ.",
    totalBeds: "మొత్తం బెడ్ల వినియోగం",
    activeQueues: "ప్రస్తుత పేషెంట్ క్యూ",
    doctorsOnDuty: "విధుల్లో ఉన్న డాక్టర్లు",
    lowStockAlerts: "తక్కువ స్టాక్ హెచ్చరికలు",
    ambulanceUnits: "యాక్టివ్ అంబులెన్సులు",
    emergencySosTitle: "ఎమర్జెన్సీ SOS ఒన్-టచ్ డిస్పాచ్",
    emergencySosDesc: "అత్యవసర అంబులెన్స్ మరియు ట్రామా మెడికల్ టీమ్‌ను తక్షణమే పంపండి.",
    dispatchSos: "ఎమర్జెన్సీ SOS పంపండి",
    departmentCrowdTitle: "డిపార్ట్‌మెంట్ రద్దీ మరియు అంచనా",
    bestVisitTime: "సందర్శించడానికి ఉత్తమ సమయం:",

    patientTitle: "పేషెంట్ రిజిస్ట్రీ & మేనేజ్‌మెంట్",
    patientSubtitle: "పేషెంట్ల సమగ్ర రికార్డులు, ఆరోగ్య స్థితి మరియు QR డిజిటల్ ID కార్డ్‌లు.",
    registerPatient: "కొత్త పేషెంట్ చేరిక",
    searchPatientPlaceholder: "పేరు, ID లేదా వ్యాధి ద్వారా పేషెంట్‌ను వెతకండి...",
    patientId: "పేషెంట్ ID",
    patientName: "పేషెంట్ పేరు",
    ageGender: "వయస్సు / లింగం",
    bloodGroup: "బ్లడ్ గ్రూప్",
    condition: "ఆరోగ్య పరిస్థితి",
    assignedDoctor: "కేటాయించిన డాక్టర్",
    roomNumber: "రూమ్ నంబర్",
    admissionDate: "చేరిన తేదీ",
    emergencyContact: "అత్యవసర ఫోన్ నంబర్",
    digitalHealthCard: "డిజిటల్ ఎమర్జెన్సీ ID కార్డ్",

    doctorTitle: "డాక్టర్లు & స్పెషలిస్ట్ల డైరెక్టరీ",
    doctorSubtitle: "లైవ్ షెడ్యూల్‌లు, రూమ్ కేటాయింపులు, రేటింగ్‌లు మరియు అపాయింట్‌మెంట్ బుకింగ్.",
    searchDoctorPlaceholder: "పేరు, స్పెషాలిటీ లేదా విభాగం ద్వారా డాక్టర్‌ను వెతకండి...",
    specialty: "స్పెషాలిటీ",
    department: "విభాగం (Department)",
    experience: "అనుభవం",
    rating: "రేటింగ్",
    availability: "అందుబాటు సమయం",
    bookAppointmentBtn: "అపాయింట్‌మెంట్ బుక్ చేయి",

    aptTitle: "అపాయింట్‌మెంట్ బుకింగ్ & డిజిటల్ టోకెన్",
    aptSubtitle: "సంప్రదింపుల సమయాన్ని కేటాయించడం, డిజిటల్ టోకెన్ మరియు లైవ్ క్యూ పొజిషన్.",
    bookNewToken: "కొత్త అపాయింట్‌మెంట్ షెడ్యూల్ చేయి",
    selectPatient: "పేషెంట్‌ను ఎంచుకోండి",
    selectDoctor: "డాక్టర్‌ను ఎంచుకోండి",
    selectDept: "విభాగాన్ని ఎంచుకోండి",
    tokenNumber: "డిజిటల్ టోకెన్ నంబర్",
    scheduledTime: "నిర్ణీత సమయం",
    queueStatus: "క్యూ పరిస్థితి",

    bedTitle: "బెడ్ల నిర్వహణ & వార్డుల అందుబాటు",
    bedSubtitle: "ICU, జనరల్, ఎమర్జెన్సీ మరియు ప్రైవేట్ వార్డులలో బెడ్ల ప్రత్యక్ష స్థితి.",
    wardFilterAll: "అన్ని వార్డులు",
    wardICU: "ICU వార్డు",
    wardGeneral: "జనరల్ వార్డు",
    wardEmergency: "ఎమర్జెన్సీ వార్డు",
    wardPrivate: "ప్రైవేట్ వార్డు",
    bedNumber: "బెడ్ నంబర్",
    toggleStatus: "స్థితిని మార్చండి",
    allocateBed: "బెడ్ కేటాయించు",

    pharmacyTitle: "సెంట్రల్ ఫార్మసీ & మెడిసిన్ స్టాక్",
    pharmacySubtitle: "మందుల నిల్వ, తక్కువ స్టాక్ హెచ్చరికలు మరియు గడువు తేదీల నిర్వహణ.",
    addMedicine: "కొత్త మందును జోడించు",
    medicineName: "మందు పేరు",
    category: "వర్గం (Category)",
    stockQty: "ప్రస్తుత స్టాక్",
    lowThreshold: "రీఆర్డర్ పరిమితి",
    unitPrice: "ధర (₹)",
    expiryDate: "గడువు తేదీ",
    manufacturer: "తయారీదారు",
    reorderAlert: "రీఆర్డర్ హెచ్చరిక",

    labTitle: "ల్యాబొరేటరీ & డయాగ్నోస్టిక్స్",
    labSubtitle: "వైద్య పరీక్షల ఆర్డర్‌లు, ప్రాసెసింగ్ స్థితి మరియు డిజిటల్ రిపోర్ట్‌లు.",
    orderLabTest: "కొత్త పరీక్ష నమోదు చేయి",
    testName: "పరీక్ష పేరు",
    requestedDate: "కోరిన తేదీ",
    downloadReport: "రిపోర్ట్ డౌన్‌లోడ్ చేయి",

    billingTitle: "బిల్లింగ్ & పేమెంట్స్",
    billingSubtitle: "ఇన్‌వాయిస్‌లు, పెండింగ్ బిల్లుల పరిశీలన మరియు ఆన్‌లైన్ చెల్లింపులు.",
    createInvoice: "కొత్త ఇన్‌వాయిస్ సృష్టించు",
    invoiceId: "ఇన్‌వాయిస్ ID",
    totalAmount: "మొత్తం సొమ్ము (₹)",
    dueDate: "చెల్లించాల్సిన చివరి తేదీ",
    payInvoice: "చెల్లింపు చేయండి",
    downloadReceipt: "రసీదు డౌన్‌లోడ్ చేయి",

    ambulanceTitle: "అంబులెన్స్ ఫ్లీట్ & ఎమర్జెన్సీ SOS",
    ambulanceSubtitle: "GPS ట్రాకింగ్, డ్రైవర్ వివరాలు, వేగం మరియు చేరుకునే సమయం (ETA).",
    unitNumber: "అంబులెన్స్ యూనిట్",
    driverName: "డ్రైవర్ పేరు",
    driverPhone: "డ్రైవర్ ఫోన్ నంబర్",
    currentSpeed: "వేగం (km/h)",
    etaMinutes: "చేరుకునే సమయం (నిమిషాలు)",
    currentLocation: "ప్రస్తుత ప్రదేశం",
    destination: "గమ్యస్థానం",

    companionTitle: "స్మార్ట్ మెడిసిన్ కంపానియన్",
    companionSubtitle: "మందుల వేళలు, సౌండ్ అలారమ్‌లు మరియు రోజువారీ చరిత్ర ట్రాకర్.",
    addDosage: "షెడ్యూల్ జోడించు",
    dosageTime: "మందుల సమయం",
    frequency: "ఫ్రీక్వెన్సీ",
    markTaken: "వేసుకున్నాను (Taken)",
    undo: "రద్దు చేయి",
    missedLogs: "వాడిన మందుల చరిత్ర",

    navTitle: "హాస్పిటల్ నావిగేషన్ & దారి దిశలు",
    navSubtitle: "విభాగాలు, ల్యాబ్‌లు మరియు ఫార్మసీకి చేరుకోవడానికి స్పష్టమైన దారి సూచికలు.",
    selectDestination: "వెళ్లవలసిన విభాగాన్ని ఎంచుకోండి",
    stepDirections: "దశలవారీ దారి సూచికలు",

    queueTitle: "క్యూ & వెయిటింగ్ సమయం అంచనా",
    queueSubtitle: "ప్రస్తుత టోకెన్, మీ క్యూ స్థానం మరియు అంచనా వేసిన వేచి ఉండే సమయం.",
    currentToken: "ప్రస్తుతం చూస్తున్న టోకెన్",
    queuePosition: "మీ క్యూ స్థానం",
    patientsAhead: "మీ కంటే ముందు ఉన్నవారు",
    estimatedWait: "అంచనా సమయం",

    timelineTitle: "ఏఐ హెల్త్ జర్నీ టైమ్‌లైన్",
    timelineSubtitle: "పేషెంట్ వైద్య పరీక్షలు, అపాయింట్‌మెంట్లు మరియు రిపోర్ట్‌ల వరుస క్రమం.",
    healthJourney: "పేషెంట్ హెల్త్ జర్నీ",

    chatTitle: "డాక్టర్ ఫాలో-అప్ చాట్",
    chatSubtitle: "డాక్టర్ మరియు పేషెంట్ మధ్య సురక్షితమైన సంభాషణ మరియు సలహాలు.",
    typeMessagePlaceholder: "మీ సందేశాన్ని టైప్ చేయండి...",
    send: "పంపు",

    feedbackTitle: "పేషెంట్ ఫీడ్‌బ్యాక్ & రేటింగ్",
    feedbackSubtitle: "హాస్పిటల్ పరిశుభ్రత, వెయిటింగ్ సమయం మరియు వైద్యుల సేవలకు రేటింగ్ ఇవ్వండి.",
    rateExperience: "మీ అనుభవానికి రేటింగ్ ఇవ్వండి",
    submitFeedback: "ఫీడ్‌బ్యాక్ సమర్పించండి"
  },
  hi: {
    brandName: "वाइटलोरा एआई",
    slogan: "“बेहतर देखभाल। बेहतर जीवन।”",
    dashboardRole: "डैशबोर्ड भूमिका:",
    admin: "एडमिन",
    doctor: "डॉक्टर",
    receptionist: "रिसेप्शनिस्ट",
    patient: "मरीज़",
    languageLabel: "भाषा",
    notificationsTitle: "केंद्रीय सूचनाएं",
    unread: "अपठित",
    noNotifications: "फिलहाल कोई सूचना नहीं है।",
    accessibility: "एक्सेसिबिलिटी",
    personalization: "पर्सनलाइजेशन",
    themeToggle: "थीम मोड",
    soundToggle: "नोटीफिकेशन साउंड",

    coreHeader: "इंटेलिजेंट हेल्थकेयर कोर",
    navDigitalTwin: "अस्पताल लाइव अवलोकन",
    navPatients: "मरीज़ प्रबंधन",
    navDoctors: "डॉक्टर प्रबंधन",
    navAppointments: "अपॉइंटमेंट बुकिंग",
    navDepartments: "विभाग (Departments)",
    navBeds: "बेड उपलब्धता",
    navPharmacy: "फार्मेसी और स्टॉक",
    navLab: "प्रयोगशाला प्रबंधन",
    navBilling: "बिलिंग और भुगतान",
    navAmbulance: "एम्बुलेंस और SOS",
    navMedicines: "दवा साथी (Companion)",
    navNavigation: "अस्पताल नेविगेशन",
    navQueue: "कतार और भीड़ का अनुमान",
    navTimeline: "एआई स्वास्थ्य टाइमलाइन",
    navChat: "डॉक्टर फॉलो-अप चैट",
    navDoctorChat: "डॉक्टर परामर्श एवं फॉलो-अप चैट",
    navFeedback: "मरीज़ की प्रतिक्रिया",
    qrHealthCard: "डिजिटल क्यूआर हेल्थ कार्ड",
    patientRecords: "मरीज़ चिकित्सा रिकॉर्ड एवं इतिहास",

    add: "नया जोड़ें",
    edit: "संशोधित करें",
    delete: "हटाएं",
    save: "सहेजें",
    cancel: "रद्द करें",
    close: "बंद करें",
    search: "खोजें...",
    filter: "फ़िल्टर",
    status: "स्थिति",
    actions: "कार्रवाई",
    viewDetails: "विवरण देखें",
    download: "डाउनलोड",
    confirm: "पुष्टि करें",
    pending: "लंबित (Pending)",
    completed: "पूर्ण (Completed)",
    available: "उपलब्ध",
    occupied: "आरक्षित",
    paid: "भुगतान किया गया",
    overdue: "बकाया",
    liveBadge: "लाइव",

    dtTitle: "अस्पताल डिजिटल ट्विन (लाइव डैशबोर्ड)",
    dtSubtitle: "बेड, विभाग, कतार का समय, एम्बुलेंस और फार्मेसी स्टॉक की वास्तविक समय निगरानी।",
    totalBeds: "कुल बेड उपयोग",
    activeQueues: "सक्रिय मरीज़ कतार",
    doctorsOnDuty: "ड्यूटी पर मौजूद डॉक्टर",
    lowStockAlerts: "कम स्टॉक चेतावनी",
    ambulanceUnits: "सक्रिय एम्बुलेंस",
    emergencySosTitle: "इमरजेंसी SOS वन-टच डिस्पैच",
    emergencySosDesc: "आपातकालीन एम्बुलेंस और ट्रॉमा मेडिकल टीम को तुरंत भेजें।",
    dispatchSos: "इमरजेंसी SOS भेजें",
    departmentCrowdTitle: "विभाग में भीड़ और अनुमान",
    bestVisitTime: "आगमन का सबसे अच्छा समय:",

    patientTitle: "मरीज़ प्रबंधन और रजिस्ट्री",
    patientSubtitle: "मरीजों के व्यापक रिकॉर्ड, स्वास्थ्य स्थिति और क्यूआर डिजिटल आईडी कार्ड।",
    registerPatient: "नया मरीज़ पंजीकृत करें",
    searchPatientPlaceholder: "नाम, आईडी या बीमारी द्वारा मरीज़ खोजें...",
    patientId: "मरीज़ ID",
    patientName: "मरीज़ का नाम",
    ageGender: "आयु / लिंग",
    bloodGroup: "ब्लड ग्रुप",
    condition: "स्वास्थ्य स्थिति",
    assignedDoctor: "आवंटित डॉक्टर",
    roomNumber: "कमरा नंबर",
    admissionDate: "भर्ती तिथि",
    emergencyContact: "आपातकालीन संपर्क",
    digitalHealthCard: "डिजिटल इमरजेंसी ID कार्ड",

    doctorTitle: "डॉक्टर और विशेषज्ञ निर्देशिका",
    doctorSubtitle: "लाइव शेड्यूल, कमरा आवंटन, रेटिंग और तुरंत अपॉइंटमेंट बुकिंग।",
    searchDoctorPlaceholder: "नाम, विशेषज्ञता या विभाग द्वारा डॉक्टर खोजें...",
    specialty: "विशेषज्ञता",
    department: "विभाग (Department)",
    experience: "अनुभव",
    rating: "रेटिंग",
    availability: "उपलब्धता",
    bookAppointmentBtn: "अपॉइंटमेंट बुक करें",

    aptTitle: "अपॉइंटमेंट बुकिंग और डिजिटल टोकन",
    aptSubtitle: "परामर्श समय का निर्धारण, डिजिटल टोकन और लाइव कतार स्थिति।",
    bookNewToken: "नया अपॉइंटमेंट शेड्यूल करें",
    selectPatient: "मरीज़ चुनें",
    selectDoctor: "डॉक्टर चुनें",
    selectDept: "विभाग चुनें",
    tokenNumber: "डिजिटल टोकन नंबर",
    scheduledTime: "निर्धारित समय",
    queueStatus: "कतार स्थिति",

    bedTitle: "बेड सूची और वार्ड प्रबंधन",
    bedSubtitle: "ICU, जनरल, इमरजेंसी और प्राइवेट वार्ड में बेड की लाइव उपलब्धता।",
    wardFilterAll: "सभी वार्ड",
    wardICU: "ICU वार्ड",
    wardGeneral: "जनरल वार्ड",
    wardEmergency: "इमरजेंसी वार्ड",
    wardPrivate: "प्राइवेट वार्ड",
    bedNumber: "बेड नंबर",
    toggleStatus: "स्थिति बदलें",
    allocateBed: "बेड आवंटित करें",

    pharmacyTitle: "सेंट्रल फार्मेसी और दवा स्टॉक",
    pharmacySubtitle: "दवाओं का स्टॉक, कम इन्वेंट्री चेतावनी और समाप्ति तिथियों का प्रबंधन।",
    addMedicine: "नई दवा जोड़ें",
    medicineName: "दवा का नाम",
    category: "श्रेणी (Category)",
    stockQty: "वर्तमान स्टॉक",
    lowThreshold: "पुनः ऑर्डर सीमा",
    unitPrice: "मूल्य (₹)",
    expiryDate: "समाप्ति तिथि",
    manufacturer: "निर्माता",
    reorderAlert: "पुनः ऑर्डर चेतावनी",

    labTitle: "प्रयोगशाला और निदान हब",
    labSubtitle: "नैदानिक परीक्षण ऑर्डर, प्रोसेसिंग स्थिति और डिजिटल रिपोर्ट डाउनलोड।",
    orderLabTest: "नया टेस्ट ऑर्डर करें",
    testName: "परीक्षण नाम",
    requestedDate: "अनुरोधित तिथि",
    downloadReport: "रिपोर्ट डाउनलोड करें",

    billingTitle: "बिलिंग और भुगतान",
    billingSubtitle: "चालान, बकाया राशि की जांच और ऑनलाइन त्वरित भुगतान।",
    createInvoice: "नया चालान बनाएं",
    invoiceId: "चालान ID",
    totalAmount: "कुल राशि (₹)",
    dueDate: "देय तिथि",
    payInvoice: "भुगतान करें",
    downloadReceipt: "रसीद डाउनलोड करें",

    ambulanceTitle: "एम्बुलेंस बेड़ा और इमरजेंसी SOS",
    ambulanceSubtitle: "जीपीएस ट्रैकिंग, ड्राइवर विवरण, गति और आगमन का अनुमानित समय (ETA)।",
    unitNumber: "एम्बुलेंस यूनिट",
    driverName: "चालक का नाम",
    driverPhone: "चालक फोन नंबर",
    currentSpeed: "गति (km/h)",
    etaMinutes: "आगमन समय (मिनट)",
    currentLocation: "वर्तमान स्थान",
    destination: "गंतव्य",

    companionTitle: "स्मार्ट दवा साथी (Companion)",
    companionSubtitle: "दवाओं का समय, ध्वनि अलर्ट और दैनिक खुराक का इतिहास।",
    addDosage: "शेड्यूल जोड़ें",
    dosageTime: "दवा का समय",
    frequency: "आवृत्ति (Frequency)",
    markTaken: "दवा ली (Mark Taken)",
    undo: "रद्द करें",
    missedLogs: "दवा का इतिहास",

    navTitle: "अस्पताल नेविगेशन और मार्ग मार्गदर्शन",
    navSubtitle: "विभिन्न विभागों, लैब और फार्मेसी तक पहुँचने के लिए स्पष्ट दिशा-निर्देश।",
    selectDestination: "गंतव्य विभाग चुनें",
    stepDirections: "चरण-दर-चरण मार्ग निर्देश",

    queueTitle: "कतार और प्रतीक्षा समय का अनुमान",
    queueSubtitle: "वर्तमान टोकन, आपकी कतार स्थिति और अनुमानित प्रतीक्षा समय।",
    currentToken: "वर्तमान में सेवारत टोकन",
    queuePosition: "आपकी कतार स्थिति",
    patientsAhead: "आपसे आगे के मरीज़",
    estimatedWait: "अनुमानित प्रतीक्षा समय",

    timelineTitle: "एआई स्वास्थ्य टाइमलाइन",
    timelineSubtitle: "मरीज़ के निदान, नुस्खे, लैब रिपोर्ट और अपॉइंटमेंट का कालानुक्रमिक रिकॉर्ड।",
    healthJourney: "मरीज़ की स्वास्थ्य यात्रा",

    chatTitle: "डॉक्टर फॉलो-अप चैट",
    chatSubtitle: "डॉक्टर और मरीज़ के बीच सुरक्षित संदेश सेवा और चिकित्सीय सलाह।",
    typeMessagePlaceholder: "अपना प्रश्न या संदेश लिखें...",
    send: "भेजें",

    feedbackTitle: "मरीज़ की प्रतिक्रिया और रेटिंग",
    feedbackSubtitle: "अस्पताल की स्वच्छता, प्रतीक्षा समय और डॉक्टरों के व्यवहार को रेटिंग दें।",
    rateExperience: "अपने अनुभव को रेटिंग दें",
    submitFeedback: "प्रतिक्रिया जमा करें"
  }
};
