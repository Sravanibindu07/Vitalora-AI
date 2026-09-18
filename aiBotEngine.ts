import { Patient, Doctor, Department, Bed, Medicine, Appointment, LabTest, BillingItem, Ambulance, QueueItem, AppNotification, Prescription, MedicineReminder } from '../types';

export type AIActionCardType = 
  | 'appointment'
  | 'doctor'
  | 'bed'
  | 'bill'
  | 'report'
  | 'medicine'
  | 'ambulance'
  | 'navigation'
  | 'emergency'
  | 'symptom_interactive'
  | 'lab_test'
  | 'prescription'
  | 'reminder'
  | 'queue';

export interface AIActionCard {
  id: string;
  type: AIActionCardType;
  title: string;
  subtitle?: string;
  data: any;
  actionText?: string;
  actionType?: string;
  actionPayload?: any;
}

export interface ConversationContext {
  lastDiscussedPatient?: string | null;
  lastDiscussedDoctor?: string | null;
  lastDiscussedDepartment?: string | null;
  lastAppointment?: string | null;
  lastMedicine?: string | null;
  lastAmbulance?: string | null;
  lastLabTest?: string | null;
  lastDoctorList?: Doctor[];
  lastPatientList?: Patient[];
  currentIntent?: 'symptom_check' | 'appointment_booking' | 'doctor_search' | 'patient_search' | 'bed_search' | 'billing_search' | 'pharmacy_search' | 'ambulance_search' | 'navigation' | 'lab_search' | 'prescription_search' | 'reminder_search' | 'queue_search' | 'general' | null;
  symptomStep?: number; // 0: inactive, 1: asking symptoms, 2: asking duration, 3: asking severity, 4: asking associated, 5: complete
  symptomData?: {
    symptoms?: string;
    duration?: string;
    severity?: string;
    associated?: string;
    urgency?: 'Low' | 'Medium' | 'High' | 'Critical';
    recommendedDept?: string;
  };
}

export interface AppContextData {
  patients: Patient[];
  doctors: Doctor[];
  departments: Department[];
  beds: Bed[];
  medicines: Medicine[];
  appointments: Appointment[];
  labTests: LabTest[];
  billings: BillingItem[];
  ambulances: Ambulance[];
  reminders: any[];
  queueItems: QueueItem[];
  notifications: AppNotification[];
  prescriptions?: Prescription[];
  onAddAppointment?: (apt: Appointment) => void;
  setActiveTab?: (tab: string) => void;
  soundEnabled?: boolean;
}

// Detect query language (English, Telugu, Hindi)
export function detectLanguage(text: string, currentLangSetting: 'en' | 'te' | 'hi'): 'en' | 'te' | 'hi' {
  const lower = text.toLowerCase();
  
  // Telugu script or common Teluglish words
  if (/[\u0C00-\u0C7F]/.test(text) || /\b(eppudu|evaru|unnaru|undhi|unnaya|naaku|eeroju|chudandi|kosam|kavali|lona|yekkada|elaga|cheppandi)\b/i.test(lower)) {
    return 'te';
  }
  
  // Hindi script or common Hinglish words
  if (/[\u0900-\u097F]/.test(text) || /\b(kab|kaun|kaunse|hai|hain|aaj|meri|batao|kya|chahiye|kahan|dikhao|karo|bataiye|samjhao)\b/i.test(lower)) {
    return 'hi';
  }

  return currentLangSetting;
}

// Get dynamic contextual suggestions based on intent and context
export function getDynamicSuggestions(context: ConversationContext, lang: 'en' | 'te' | 'hi'): Array<{ icon: string; label: string; query: string }> {
  const intent = context.currentIntent;

  if (intent === 'symptom_check') {
    if (lang === 'te') {
      return [
        { icon: '🚨', label: 'తీవ్రమైన ఛాతీ నొప్పి', query: 'నాకు తీవ్రమైన ఛాతీ నొప్పి వస్తుంది' },
        { icon: '🤒', label: 'జ్వరం & తలనొప్పి', query: 'నాకు 2 రోజులుగా జ్వరం మరియు తలనొప్పి ఉంది' },
        { icon: '👨‍⚕️', label: 'స్పెషలిస్ట్ కలవాలి', query: 'నేను ఏ డాక్టర్‌ని సంప్రదించాలి?' },
        { icon: '🚑', label: 'Emergency SOS', query: 'అత్యవసర ఆంబులెన్స్ పంపండి' }
      ];
    }
    if (lang === 'hi') {
      return [
        { icon: '🚨', label: 'तेज सीने में दर्द', query: 'मुझे तेज सीने में दर्द हो रहा है' },
        { icon: '🤒', label: 'बुखार और सिरदर्द', query: 'मुझे 2 दिन से बुखार और सिरदर्द है' },
        { icon: '👨‍⚕️', label: 'विशेषज्ञ डॉक्टर', query: 'मुझे किस डॉक्टर को दिखाना चाहिए?' },
        { icon: '🚑', label: 'Emergency SOS', query: 'आपातकालीन एम्बुलेंस भेजें' }
      ];
    }
    return [
      { icon: '🚨', label: 'Severe Chest Pain', query: 'I have severe chest pain and breathing trouble' },
      { icon: '🤒', label: 'Fever & Dizziness', query: 'I have high fever and dizziness since yesterday' },
      { icon: '👨‍⚕️', label: 'Suggest Specialist', query: 'Which specialist department should I consult?' },
      { icon: '🚑', label: 'Dispatch Ambulance', query: 'Dispatch emergency ambulance now' }
    ];
  }

  if (intent === 'doctor_search' || context.lastDoctorList) {
    return [
      { icon: '🌆', label: 'Evening Slots', query: 'Which doctor is available in the evening?' },
      { icon: '📅', label: 'Book First Doctor', query: 'Book an appointment with the first doctor.' },
      { icon: '❤️', label: 'Cardiology Specialists', query: 'Show Cardiology doctors.' },
      { icon: '🧠', label: 'Neurology Doctors', query: 'Show Neurology doctors.' }
    ];
  }

  if (intent === 'bed_search') {
    return [
      { icon: '🚨', label: 'ICU Beds Only', query: 'Show available ICU beds only.' },
      { icon: '🏥', label: 'General Wards', query: 'How many general ward beds are free?' },
      { icon: '👑', label: 'Private Suites', query: 'Are private ward beds available?' },
      { icon: '👨‍⚕️', label: 'Assigned Doctors', query: 'Which doctors are assigned to ICU?' }
    ];
  }

  if (intent === 'billing_search') {
    return [
      { icon: '💳', label: 'Overdue Invoices', query: 'Show overdue invoices and unpaid bills.' },
      { icon: '👤', label: 'Bill for Rahul', query: 'What is the pending bill for Rahul?' },
      { icon: '📊', label: 'Total Outstanding', query: 'What is the total unpaid hospital amount?' }
    ];
  }

  if (intent === 'pharmacy_search') {
    return [
      { icon: '💊', label: 'Check Paracetamol', query: 'Is Paracetamol 500mg in stock?' },
      { icon: '⚠️', label: 'Low Stock Alert', query: 'Which medicines are running low in pharmacy?' },
      { icon: '⏰', label: 'Medicine Reminders', query: 'Show active medicine reminders.' }
    ];
  }

  if (intent === 'lab_search') {
    return [
      { icon: '🧪', label: 'Blood Sugar Report', query: 'Show Blood Sugar lab test results' },
      { icon: '📊', label: 'Pending Lab Tests', query: 'Are there any pending diagnostic lab tests?' },
      { icon: '📥', label: 'Download Lab Report', query: 'How do I download my lab reports?' }
    ];
  }

  if (intent === 'ambulance_search') {
    return [
      { icon: '🚑', label: 'Track Ambulance #101', query: 'What is the location and ETA of Ambulance 101?' },
      { icon: '📞', label: 'Driver Phone', query: 'Call emergency ambulance driver.' },
      { icon: '⚡', label: 'Emergency SOS', query: 'Request instant ambulance dispatch.' }
    ];
  }

  // Default contextual quick suggestions
  if (lang === 'te') {
    return [
      { icon: '📅', label: 'ఈరోజు అపాయింట్‌మెంట్లు', query: "Show me today's appointments and queue tokens." },
      { icon: '🛏️', label: 'అందుబాటులో ఉన్న బెడ్లు', query: "How many ICU and general hospital beds are currently available?" },
      { icon: '🩺', label: 'లక్షణాల పరీక్ష (Symptom Guidance)', query: "I have some symptoms but I don't know what they mean." },
      { icon: '🧪', label: 'ల్యాబ్ రిపోర్టులు', query: "Show lab test reports and results." },
      { icon: '👨‍⚕️', label: 'కార్డియాలజీ డాక్టర్లు', query: "Show Cardiology doctors." },
      { icon: '💳', label: 'బిల్లుల వివరాలు', query: "What are the pending bills and payment statuses?" }
    ];
  }

  if (lang === 'hi') {
    return [
      { icon: '📅', label: 'आज की अपॉइंटमेंट्स', query: "Show me today's appointments and queue tokens." },
      { icon: '🛏️', label: 'उपलब्ध अस्पताल बेड', query: "How many ICU and general hospital beds are currently available?" },
      { icon: '🩺', label: 'लक्षण मार्गदर्शन (Symptom Guidance)', query: "I have some symptoms but I don't know what they mean." },
      { icon: '🧪', label: 'लैब रिपोर्ट', query: "Show lab test reports and results." },
      { icon: '👨‍⚕️', label: 'कार्डियोलॉजी डॉक्टर्स', query: "Show Cardiology doctors." },
      { icon: '💳', label: 'बकाया बिल', query: "What are the pending bills and payment statuses?" }
    ];
  }

  return [
    { icon: '📅', label: "Today's Appointments", query: "Show me today's appointments and queue tokens." },
    { icon: '🛏️', label: "Available Hospital Beds", query: "How many ICU and general hospital beds are currently available?" },
    { icon: '🩺', label: "Symptom Assistant", query: "I have some symptoms but I don't know what they mean." },
    { icon: '🧪', label: "Lab Test Reports", query: "Show lab test reports and pending diagnostic results." },
    { icon: '👨‍⚕️', label: "Find Doctors", query: "Which doctors are currently available today?" },
    { icon: '💳', label: "Pending Bills", query: "What are the pending bills and payment statuses?" },
    { icon: '💊', label: "Pharmacy Stock", query: "Check Paracetamol stock and low inventory warnings." },
    { icon: '🚑', label: "Track Ambulance", query: "What is the status and ETA of emergency ambulances?" },
    { icon: '🧭', label: "Hospital Navigation", query: "Where is the central pharmacy and how do I reach cardiology?" }
  ];
}

export function processLocalBotQuery(
  prompt: string,
  userLangSetting: 'en' | 'te' | 'hi',
  contextData: AppContextData,
  history: Array<{ role: 'user' | 'model'; content: string }>,
  context: ConversationContext
): { 
  reply: string; 
  updatedContext: ConversationContext; 
  actionTaken?: string;
  cards?: AIActionCard[];
} {
  const lowerPrompt = prompt.toLowerCase().trim();
  const lang = detectLanguage(prompt, userLangSetting);
  const newContext: ConversationContext = { ...context };
  const cards: AIActionCard[] = [];

  // 1. SYMPTOM GUIDANCE MODE FLOW (Multi-step interactive triage)
  if (
    newContext.symptomStep && newContext.symptomStep > 0 && newContext.symptomStep < 5
  ) {
    return handleSymptomStep(prompt, lang, newContext, contextData);
  }

  // Check if user starts symptom check or asks about a health concern
  if (
    lowerPrompt.includes('symptom') ||
    lowerPrompt.includes('feel sick') ||
    lowerPrompt.includes('unwell') ||
    lowerPrompt.includes('don\'t know what') ||
    lowerPrompt.includes('dont know what') ||
    lowerPrompt.includes('headache undhi') ||
    lowerPrompt.includes('mujhe headache') ||
    lowerPrompt.includes('fever and body pain') ||
    lowerPrompt.includes('chest pain') ||
    lowerPrompt.includes('stomach ache') ||
    lowerPrompt.includes('cough and cold') ||
    lowerPrompt.includes('dizziness') ||
    lowerPrompt.includes('joint pain') ||
    lowerPrompt.includes('rash') ||
    lowerPrompt.includes('vomiting') ||
    lowerPrompt.includes('breathless')
  ) {
    // If prompt already contains rich symptoms (e.g. "I have severe chest pain and dizziness")
    const isDirectEmergency = lowerPrompt.includes('severe chest') || lowerPrompt.includes('chest pain') || lowerPrompt.includes('breathless') || lowerPrompt.includes('shortness of breath') || lowerPrompt.includes('unconscious') || lowerPrompt.includes('stroke');
    
    if (isDirectEmergency) {
      newContext.currentIntent = 'symptom_check';
      let reply = `🚨 **EMERGENCY URGENCY ASSESSMENT: CRITICAL**\n\n`;
      reply += `The symptoms you described (**${prompt}**) suggest potential severe medical distress requiring immediate intervention.\n\n`;
      reply += `🚨 **Urgency Level**: **CRITICAL**\n`;
      reply += `🏥 **Recommended Action**: Proceed immediately to the **Vitalora Emergency Trauma Bay (ER)** or click below to trigger instant Emergency SOS Ambulance Dispatch.\n\n`;
      reply += `⚠️ **Notice**: *This is urgent general health guidance and not a confirmed medical diagnosis. Please consult a qualified emergency physician immediately.*`;

      cards.push({
        id: `card-emergency-direct-${Date.now()}`,
        type: 'emergency',
        title: 'Emergency Medical Alert',
        subtitle: 'Critical Urgency - Immediate ER Triage Recommended',
        data: { department: 'Emergency Medicine', action: 'DISPATCH_AMBULANCE' },
        actionText: 'Dispatch Emergency SOS 🚨',
        actionType: 'DISPATCH_AMBULANCE'
      });

      return { reply, updatedContext: newContext, cards };
    }

    newContext.currentIntent = 'symptom_check';
    newContext.symptomStep = 1;
    newContext.symptomData = { symptoms: prompt };

    let greeting = '';
    if (lang === 'te') {
      greeting = `🩺 **వైటలోరా సింప్టమ్ గైడెన్స్ అసిస్టెంట్ (Symptom Guidance)**:\n\nమీరు ఏ రకమైన లక్షణాలను (symptoms) అనుభవిస్తున్నారు? (ఉదాహరణకు: తలనొప్పి, జ్వరం, కళ్ళు తిరగడం, కడుపు నొప్పి, దగ్గు)`;
    } else if (lang === 'hi') {
      greeting = `🩺 **वाइटलोरा लक्षण मार्गदर्शन (Symptom Guidance Assistant)**:\n\nआप कौन से लक्षण महसूस कर रहे हैं? (जैसे: सिरदर्द, बुखार, चक्कर आना, पेट दर्द, खांसी)`;
    } else {
      greeting = `🩺 **Vitalora Symptom Guidance Assistant**:\n\nI am here to guide you step-by-step. What specific symptoms are you experiencing right now? (e.g. headache, fever, chest pain, dizziness, cough, stomach ache)`;
    }

    cards.push({
      id: `card-symptom-step-${Date.now()}`,
      type: 'symptom_interactive',
      title: 'Symptom Checker - Step 1 of 4',
      subtitle: 'Select or type primary symptoms',
      data: { step: 1, options: ['Headache & Dizziness', 'High Fever & Body Pain', 'Chest Pain & Tightness 🚨', 'Shortness of Breath 🚨', 'Cough & Cold', 'Stomach Pain & Nausea'] }
    });

    return { reply: greeting, updatedContext: newContext, cards };
  }

  // 2. FOLLOW-UP DOCTOR / APPOINTMENT CONTEXT RESOLUTION
  if (
    (lowerPrompt.includes('first one') || lowerPrompt.includes('first doctor') || lowerPrompt.includes('book with that') || lowerPrompt.includes('book an appointment with')) &&
    newContext.lastDoctorList && newContext.lastDoctorList.length > 0
  ) {
    const selectedDoc = newContext.lastDoctorList[0];
    newContext.lastDiscussedDoctor = selectedDoc.name;
    
    const tokenNo = Math.floor(100 + Math.random() * 800);
    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      patientName: newContext.lastDiscussedPatient || 'Self Consultation',
      doctorName: selectedDoc.name,
      department: selectedDoc.department,
      date: new Date().toISOString().split('T')[0],
      time: selectedDoc.availability.split(' ')[0] || '10:00 AM',
      status: 'Confirmed',
      tokenNumber: tokenNo
    };

    if (contextData.onAddAppointment) {
      contextData.onAddAppointment(newApt);
    }

    let reply = '';
    if (lang === 'te') {
      reply = `✅ **అపాయింట్‌మెంట్ విజయవంతంగా బుక్ చేయబడింది!**\n\n👨‍⚕️ **డాక్టర్**: ${selectedDoc.name} (${selectedDoc.specialty})\n🏥 **డిపార్ట్‌మెంట్**: ${selectedDoc.department}\n📍 **రూమ్ నంబర్**: ${selectedDoc.roomNumber}\n🎟️ **డిజిటల్ టోకెన్**: #${tokenNo}\n⏰ **సమయం**: ${newApt.time}\n\n*దయచేసి సమయానికి హాజరుకావలసిందిగా మనవి.*`;
    } else if (lang === 'hi') {
      reply = `✅ **अपॉइंटमेंट सफलतापूर्वक बुक हो गया है!**\n\n👨‍⚕️ **डॉक्टर**: ${selectedDoc.name} (${selectedDoc.specialty})\n🏥 **विभाग**: ${selectedDoc.department}\n📍 **कमरा नंबर**: ${selectedDoc.roomNumber}\n🎟️ **डिजिटल टोकन**: #${tokenNo}\n⏰ **समय**: ${newApt.time}\n\n*कृपया समय पर उपस्थित रहें।*`;
    } else {
      reply = `✅ **Appointment Successfully Booked!**\n\n👨‍⚕️ **Doctor**: ${selectedDoc.name} (${selectedDoc.specialty})\n🏥 **Department**: ${selectedDoc.department}\n📍 **Room Number**: ${selectedDoc.roomNumber}\n🎟️ **Digital Token**: #${tokenNo}\n⏰ **Scheduled Time**: ${newApt.time}\n\nYour token has been registered in the live hospital queue system.`;
    }

    cards.push({
      id: `card-apt-${newApt.id}`,
      type: 'appointment',
      title: `Confirmed Token #${tokenNo}`,
      subtitle: `${selectedDoc.name} (${selectedDoc.department})`,
      data: newApt,
      actionText: 'View Queue Token',
      actionType: 'NAVIGATE_APPOINTMENTS'
    });

    return { reply, updatedContext: newContext, actionTaken: 'APPOINTMENT_BOOKED', cards };
  }

  // "Which one is available in the evening?" or "evening slots"
  if (
    (lowerPrompt.includes('evening') || lowerPrompt.includes('available in the evening') || lowerPrompt.includes('night') || lowerPrompt.includes('afternoon')) &&
    (newContext.lastDoctorList || lowerPrompt.includes('doctor') || lowerPrompt.includes('who'))
  ) {
    newContext.currentIntent = 'doctor_search';
    const baseList = newContext.lastDoctorList || contextData.doctors;
    const eveningDocs = baseList.filter(d => 
      d.availability.toLowerCase().includes('evening') || 
      d.availability.toLowerCase().includes('pm') || 
      d.availability.toLowerCase().includes('5:') ||
      d.availability.toLowerCase().includes('4:') ||
      d.availability.toLowerCase().includes('6:')
    );

    if (eveningDocs.length === 0) {
      const msg = lang === 'te' 
        ? "సాటి విభాగంలో సాయంత్రం వేళల్లో ప్రస్తుతానికి డాక్టర్లు అందుబాటులో లేరు."
        : lang === 'hi'
        ? "सायंकाल के समय वर्तमान में कोई डॉक्टर उपलब्ध नहीं हैं।"
        : "I couldn't find any evening slots for the requested doctors in current hospital records.";
      return { reply: msg, updatedContext: newContext };
    }

    newContext.lastDoctorList = eveningDocs;
    let replyText = `🌆 **Doctors available in the evening / PM slots** (${eveningDocs.length}):\n\n`;
    if (lang === 'te') replyText = `🌆 **సాయంత్రం వేళల్లో అందుబాటులో ఉన్న డాక్టర్లు** (${eveningDocs.length}):\n\n`;
    if (lang === 'hi') replyText = `🌆 **शाम के समय उपलब्ध डॉक्टर्स** (${eveningDocs.length}):\n\n`;

    eveningDocs.forEach((doc, i) => {
      replyText += `${i + 1}. **${doc.name}** - ${doc.specialty} (${doc.department})\n   • Availability: ${doc.availability}\n   • Room: ${doc.roomNumber}\n\n`;
    });

    replyText += lang === 'te' ? '*"Book an appointment with the first one" అని చెప్పి బుక్ చేసుకోవచ్చు.*'
      : lang === 'hi' ? '*आप "Book an appointment with the first one" कहकर बुकिंग कर सकते हैं।*'
      : '*You can say "Book an appointment with the first one" to schedule immediately.*';

    cards.push({
      id: `card-docs-evening-${Date.now()}`,
      type: 'doctor',
      title: `Evening Doctors (${eveningDocs.length})`,
      subtitle: eveningDocs[0].department,
      data: eveningDocs
    });

    return { reply: replyText, updatedContext: newContext, cards };
  }

  // 3. LABORATORY TESTS & DIAGNOSTIC REPORTS
  if (
    lowerPrompt.includes('lab') ||
    lowerPrompt.includes('report') ||
    lowerPrompt.includes('test result') ||
    lowerPrompt.includes('blood sugar') ||
    lowerPrompt.includes('lipid profile') ||
    lowerPrompt.includes('mri') ||
    lowerPrompt.includes('x-ray') ||
    lowerPrompt.includes('cbc') ||
    lowerPrompt.includes('thyroid')
  ) {
    newContext.currentIntent = 'lab_search';
    const tests = contextData.labTests || [];
    
    let matchedTests = tests;
    if (lowerPrompt.includes('blood sugar') || lowerPrompt.includes('sugar')) {
      matchedTests = tests.filter(t => t.testName.toLowerCase().includes('sugar') || t.testName.toLowerCase().includes('glucose') || t.testName.toLowerCase().includes('hba1c'));
    } else if (lowerPrompt.includes('lipid')) {
      matchedTests = tests.filter(t => t.testName.toLowerCase().includes('lipid'));
    } else if (lowerPrompt.includes('mri')) {
      matchedTests = tests.filter(t => t.testName.toLowerCase().includes('mri'));
    } else if (lowerPrompt.includes('x-ray') || lowerPrompt.includes('xray')) {
      matchedTests = tests.filter(t => t.testName.toLowerCase().includes('x-ray') || t.testName.toLowerCase().includes('xray'));
    } else if (lowerPrompt.includes('cbc') || lowerPrompt.includes('blood count')) {
      matchedTests = tests.filter(t => t.testName.toLowerCase().includes('cbc') || t.testName.toLowerCase().includes('blood'));
    }

    if (matchedTests.length === 0) {
      matchedTests = tests;
    }

    if (matchedTests.length === 0) {
      return {
        reply: "🧪 **Laboratory Reports**: I couldn't find any lab test records in the current hospital database.",
        updatedContext: newContext
      };
    }

    let reply = `🧪 **Vitalora Diagnostic & Laboratory Test Records (${matchedTests.length})**:\n\n`;
    matchedTests.forEach((t, idx) => {
      reply += `${idx + 1}. **${t.testName}** - Patient: ${t.patientName}\n`;
      reply += `   • Status: **${t.status === 'Completed' ? '✅ Completed' : '⏳ Pending'}** | Date: ${t.date}\n`;
      reply += `   • Prescribing Doctor: ${t.doctorName}\n`;
      if (t.resultSummary) {
        reply += `   • Summary: *${t.resultSummary}*\n`;
      }
      reply += `\n`;
    });

    reply += `You can view or download official verified PDF lab reports from the Diagnostics tab.`;

    cards.push({
      id: `card-lab-${matchedTests[0].id}`,
      type: 'report',
      title: `Lab Report: ${matchedTests[0].testName}`,
      subtitle: `${matchedTests[0].patientName} • Status: ${matchedTests[0].status}`,
      data: matchedTests[0],
      actionText: 'Download Verified PDF Report 📄'
    });

    return { reply, updatedContext: newContext, cards };
  }

  // 4. PRESCRIPTIONS & MEDICINE DOSAGE
  if (
    lowerPrompt.includes('prescription') ||
    lowerPrompt.includes('dosage') ||
    lowerPrompt.includes('how to take') ||
    lowerPrompt.includes('side effect') ||
    lowerPrompt.includes('amoxicillin') ||
    lowerPrompt.includes('ibuprofen')
  ) {
    newContext.currentIntent = 'prescription_search';
    
    let reply = `💊 **Prescription & Medicine Usage Guidance**:\n\n`;
    if (lowerPrompt.includes('amoxicillin')) {
      reply += `• **Medicine**: Amoxicillin 500mg (Antibiotic)\n`;
      reply += `• **Standard Dosage**: 1 Capsule three times daily (Every 8 hours after food)\n`;
      reply += `• **Duration**: Complete full 5-day course as prescribed by doctor.\n`;
      reply += `• **Caution**: Do not skip doses even if symptoms improve.`;
    } else if (lowerPrompt.includes('ibuprofen')) {
      reply += `• **Medicine**: Ibuprofen 400mg (NSAID Pain Reliever)\n`;
      reply += `• **Standard Dosage**: 1 Tablet as needed after meals (Max 3 tablets/day)\n`;
      reply += `• **Caution**: Always take with food or milk to avoid stomach irritation.`;
    } else {
      reply += `• **Paracetamol 500mg**: Take 1 tablet after food every 6 hours for fever/body pain.\n`;
      reply += `• **Amoxicillin 500mg**: Take 1 capsule twice daily after food for bacterial infection.\n`;
      reply += `• **Pantoprazole 40mg**: Take 1 tablet daily 30 minutes before breakfast for acidity.\n\n`;
      reply += `For patient-specific digital prescriptions, please check the Pharmacy or Patient Medical Records tab.`;
    }

    cards.push({
      id: `card-rx-${Date.now()}`,
      type: 'medicine',
      title: 'Active Digital Prescriptions',
      subtitle: 'Issued by Vitalora OPD Specialists',
      data: contextData.medicines[0]
    });

    return { reply, updatedContext: newContext, cards };
  }

  // 5. LIVE QUEUE & TOKEN POSITION
  if (
    lowerPrompt.includes('queue') ||
    lowerPrompt.includes('token position') ||
    lowerPrompt.includes('wait time') ||
    lowerPrompt.includes('patients ahead') ||
    lowerPrompt.includes('crowd')
  ) {
    newContext.currentIntent = 'queue_search';
    const queueItems = contextData.queueItems || [];
    const apts = contextData.appointments || [];

    let reply = `⏱️ **Vitalora OPD Live Queue Status**:\n\n`;
    if (queueItems.length > 0) {
      const currentInConsult = queueItems.find(q => q.status === 'In Consultation') || queueItems[0];
      reply += `• **Currently in Consultation**: Token #${currentInConsult.tokenNumber} (${currentInConsult.patientName})\n`;
      reply += `• **Department**: ${currentInConsult.department}\n`;
      reply += `• **Patients Waiting Ahead**: ${currentInConsult.aheadCount} patients\n`;
      reply += `• **Estimated Wait Time**: ~${currentInConsult.estimatedWaitMinutes} minutes\n\n`;
    } else if (apts.length > 0) {
      reply += `• **Active Tokens Registered**: ${apts.length} appointments\n`;
      reply += `• **Next Token**: #${apts[0].tokenNumber} - ${apts[0].patientName} (${apts[0].doctorName})\n`;
      reply += `• **Average Doctor Consultation Time**: 10-12 minutes per patient.\n\n`;
    } else {
      reply += `• **Current OPD Queue**: Low crowd level. Immediate consultation available.\n\n`;
    }

    reply += `Track live digital queue updates in the Appointments tab.`;

    cards.push({
      id: `card-queue-${Date.now()}`,
      type: 'appointment',
      title: 'Live OPD Queue Token Status',
      subtitle: `Average wait: 10 mins per patient`,
      data: apts[0] || { tokenNumber: 104, patientName: 'Rahul Kumar' },
      actionText: 'Open Queue Dashboard',
      actionType: 'NAVIGATE_APPOINTMENTS'
    });

    return { reply, updatedContext: newContext, cards };
  }

  // 6. REMINDERS & MEDICATION ALERTS
  if (
    lowerPrompt.includes('reminder') ||
    lowerPrompt.includes('remind me') ||
    lowerPrompt.includes('medication alert')
  ) {
    newContext.currentIntent = 'reminder_search';
    const reminders = contextData.reminders || [];

    let reply = `⏰ **Vitalora Smart Reminders & Medication Alerts**:\n\n`;
    reply += `1. 💊 **Paracetamol 500mg** - Scheduled for 8:00 PM (After Dinner)\n`;
    reply += `2. 💊 **Pantoprazole 40mg** - Scheduled for 7:30 AM (Before Breakfast)\n`;
    reply += `3. 📅 **Cardiology Follow-Up Visit** - Dr. Rajesh Kumar on 30th Aug, 10:00 AM\n\n`;
    reply += `Notifications will sound on your device automatically.`;

    cards.push({
      id: `card-rem-${Date.now()}`,
      type: 'medicine',
      title: 'Active Reminders (3)',
      subtitle: 'Next: Paracetamol 500mg at 8:00 PM',
      data: { medicineName: 'Paracetamol 500mg', time: '8:00 PM', status: 'Pending' }
    });

    return { reply, updatedContext: newContext, cards };
  }

  // 7. SMART PATIENT SEARCH
  if (
    lowerPrompt.includes('patient') ||
    lowerPrompt.includes('search for') ||
    lowerPrompt.includes('find patient') ||
    lowerPrompt.includes('details of patient') ||
    lowerPrompt.includes('rahul') ||
    lowerPrompt.includes('sravani') ||
    lowerPrompt.includes('p10') ||
    lowerPrompt.includes('102') ||
    lowerPrompt.includes('101')
  ) {
    newContext.currentIntent = 'patient_search';
    let searchKey = '';
    const match = lowerPrompt.match(/(?:patient|search for|find patient|details of patient|patient id)\s+([a-z0-9\s]+)/i);
    if (match && match[1]) {
      searchKey = match[1].trim();
    } else if (lowerPrompt.includes('rahul')) {
      searchKey = 'rahul';
    } else if (lowerPrompt.includes('sravani')) {
      searchKey = 'sravani';
    } else if (lowerPrompt.includes('102')) {
      searchKey = '102';
    }

    if (searchKey) {
      const matches = contextData.patients.filter(p => 
        p.name.toLowerCase().includes(searchKey) ||
        p.id.toLowerCase().includes(searchKey) ||
        p.qrCodeId.toLowerCase().includes(searchKey)
      );

      if (matches.length > 1) {
        newContext.lastPatientList = matches;
        let reply = `🔍 **Found ${matches.length} patients matching "${searchKey}"**:\n\n`;
        matches.forEach((p, idx) => {
          reply += `${idx + 1}. **${p.name}** (ID: ${p.id}) - Age ${p.age}, ${p.gender} | Condition: ${p.condition}\n`;
        });
        reply += `\nPlease specify the full name or Patient ID to view full medical history and appointments.`;
        return { reply, updatedContext: newContext };
      }

      if (matches.length === 1) {
        const p = matches[0];
        newContext.lastDiscussedPatient = p.name;
        const patientApts = contextData.appointments.filter(a => a.patientName.toLowerCase().includes(p.name.toLowerCase()));
        
        let reply = `👤 **Patient Profile: ${p.name}**\n\n`;
        reply += `🆔 **Patient ID**: ${p.id} (${p.qrCodeId})\n`;
        reply += `🎂 **Age / Gender**: ${p.age} Yrs / ${p.gender}\n`;
        reply += `🩸 **Blood Group**: ${p.bloodGroup}\n`;
        reply += `🩺 **Condition**: ${p.condition}\n`;
        reply += `👨‍⚕️ **Assigned Doctor**: ${p.assignedDoctor}\n`;
        reply += `🚪 **Room Number**: ${p.roomNumber}\n`;
        reply += `📅 **Admission Date**: ${p.admissionDate}\n`;
        reply += `📞 **Emergency Contact**: ${p.emergencyContact}\n\n`;

        if (patientApts.length > 0) {
          reply += `📅 **Appointments (${patientApts.length})**:\n`;
          patientApts.forEach(apt => {
            reply += `• Token #${apt.tokenNumber}: ${apt.doctorName} (${apt.department}) - ${apt.status} at ${apt.time}\n`;
          });
        } else {
          reply += `📅 **Appointments**: No active appointments scheduled today.`;
        }

        return { reply, updatedContext: newContext };
      }

      return {
        reply: "I couldn't find this information in the current hospital records.",
        updatedContext: newContext
      };
    }
  }

  // 8. DOCTORS DIRECTORY & SPECIALTIES
  if (
    lowerPrompt.includes('doctor') ||
    lowerPrompt.includes('specialist') ||
    lowerPrompt.includes('cardiology') ||
    lowerPrompt.includes('neurology') ||
    lowerPrompt.includes('orthopedics') ||
    lowerPrompt.includes('pediatrics') ||
    lowerPrompt.includes('dermatology') ||
    lowerPrompt.includes('gastro') ||
    lowerPrompt.includes('eeroju doctors') ||
    lowerPrompt.includes('aaj kaunse doctors') ||
    lowerPrompt.includes('skin doctor') ||
    lowerPrompt.includes('heart doctor') ||
    lowerPrompt.includes('bone doctor')
  ) {
    newContext.currentIntent = 'doctor_search';
    let filterDept = '';
    if (lowerPrompt.includes('cardiology') || lowerPrompt.includes('heart')) filterDept = 'Cardiology';
    else if (lowerPrompt.includes('neurology') || lowerPrompt.includes('brain')) filterDept = 'Neurology';
    else if (lowerPrompt.includes('orthopedics') || lowerPrompt.includes('bone')) filterDept = 'Orthopedics';
    else if (lowerPrompt.includes('pediatrics') || lowerPrompt.includes('child')) filterDept = 'Pediatrics';
    else if (lowerPrompt.includes('dermatology') || lowerPrompt.includes('skin')) filterDept = 'Dermatology';
    else if (lowerPrompt.includes('emergency')) filterDept = 'Emergency Medicine';

    let docs = contextData.doctors;
    if (filterDept) {
      docs = docs.filter(d => d.department.toLowerCase() === filterDept.toLowerCase());
      newContext.lastDiscussedDepartment = filterDept;
    }
    newContext.lastDoctorList = docs;

    if (docs.length === 0) {
      return {
        reply: "I couldn't find this information in the current hospital records.",
        updatedContext: newContext
      };
    }

    let title = filterDept ? `👨‍⚕️ **${filterDept} Specialists (${docs.length})**:\n\n` : `👨‍⚕️ **Available Doctors Today (${docs.length})**:\n\n`;
    if (lang === 'te') title = filterDept ? `👨‍⚕️ **${filterDept} విభాగంలో డాక్టర్లు (${docs.length})**:\n\n` : `👨‍⚕️ **ఈరోజు అందుబాటులో ఉన్న డాక్టర్లు (${docs.length})**:\n\n`;
    if (lang === 'hi') title = filterDept ? `👨‍⚕️ **${filterDept} विभाग में डॉक्टर्स (${docs.length})**:\n\n` : `👨‍⚕️ **आज उपलब्ध डॉक्टर्स (${docs.length})**:\n\n`;

    let reply = title;
    docs.forEach((doc, idx) => {
      reply += `${idx + 1}. **${doc.name}** - ${doc.specialty} ⭐ ${doc.rating}\n   • Department: ${doc.department} | Room: ${doc.roomNumber}\n   • Availability: ${doc.availability}\n\n`;
    });

    reply += lang === 'te' ? '*ఏ డాక్టర్‌తో అపాయింట్‌మెంట్ కావాలో అడగవచ్చు, ఉదాహరణకి "Which one is available in the evening?" లేదా "Book an appointment with the first one".*'
      : lang === 'hi' ? '*आप पूछ सकते हैं "Which one is available in the evening?" या "Book an appointment with the first one".*'
      : '*Ask "Which one is available in the evening?" or "Book an appointment with the first one" to proceed.*';

    cards.push({
      id: `card-doc-list-${Date.now()}`,
      type: 'doctor',
      title: filterDept ? `${filterDept} Doctors` : 'Available Doctors',
      subtitle: `${docs.length} Doctors Listed`,
      data: docs
    });

    return { reply, updatedContext: newContext, cards };
  }

  // 9. BED & ICU AVAILABILITY
  if (
    lowerPrompt.includes('bed') ||
    lowerPrompt.includes('icu') ||
    lowerPrompt.includes('ward') ||
    lowerPrompt.includes('icu beds available')
  ) {
    newContext.currentIntent = 'bed_search';
    const totalBeds = contextData.beds.length;
    const availableBeds = contextData.beds.filter(b => b.status === 'Available');
    const icuAvailable = availableBeds.filter(b => b.ward === 'ICU');
    const genAvailable = availableBeds.filter(b => b.ward === 'General');
    const erAvailable = availableBeds.filter(b => b.ward === 'Emergency');
    const pvtAvailable = availableBeds.filter(b => b.ward === 'Private');

    let reply = '';
    if (lang === 'te') {
      reply = `🛏️ **వైటలోరా హాస్పిటల్ బెడ్స్ వివరాలు**:\n\n`;
      reply += `• **మొత్తం అందుబాటులో ఉన్న బెడ్లు**: ${availableBeds.length} / ${totalBeds}\n`;
      reply += `🚨 **ICU బెడ్లు**: ${icuAvailable.length} అందుబాటులో ఉన్నాయి (${icuAvailable.map(b => b.bedNumber).join(', ') || 'None'})\n`;
      reply += `🏥 **సాధారణ (General) బెడ్లు**: ${genAvailable.length}\n`;
      reply += `⚡ **ఎమర్జెన్సీ బెడ్లు**: ${erAvailable.length}\n`;
      reply += `👑 **ప్రైవేట్ వార్డు బెడ్లు**: ${pvtAvailable.length}\n\n`;
      reply += `బెడ్ అలోకేషన్ కోసం Live Digital Twin లేదా Beds Module చూడవచ్చు.`;
    } else if (lang === 'hi') {
      reply = `🛏️ **वाइटलोरा अस्पताल बेड की स्थिति**:\n\n`;
      reply += `• **कुल उपलब्ध बेड**: ${availableBeds.length} / ${totalBeds}\n`;
      reply += `🚨 **ICU बेड**: ${icuAvailable.length} उपलब्ध हैं (${icuAvailable.map(b => b.bedNumber).join(', ') || 'None'})\n`;
      reply += `🏥 **जनरल वार्ड बेड**: ${genAvailable.length}\n`;
      reply += `⚡ **इमरजेंसी बेड**: ${erAvailable.length}\n`;
      reply += `👑 **प्राइवेट वार्ड बेड**: ${pvtAvailable.length}\n\n`;
      reply += `बेड आवंटन के लिए Live Digital Twin देखें।`;
    } else {
      reply = `🛏️ **Vitalora Hospital Bed Inventory & Live Availability**:\n\n`;
      reply += `• **Total Available Beds**: ${availableBeds.length} out of ${totalBeds}\n`;
      reply += `🚨 **ICU Wards**: ${icuAvailable.length} Available (${icuAvailable.map(b => b.bedNumber).join(', ') || 'Occupied'})\n`;
      reply += `🏥 **General Wards**: ${genAvailable.length} Available\n`;
      reply += `⚡ **Emergency Wards**: ${erAvailable.length} Available\n`;
      reply += `👑 **Private Wards**: ${pvtAvailable.length} Available\n\n`;
      reply += `All beds are monitored with real-time digital twin sensors.`;
    }

    cards.push({
      id: `card-bed-${Date.now()}`,
      type: 'bed',
      title: `Bed Availability (${availableBeds.length}/${totalBeds})`,
      subtitle: `ICU: ${icuAvailable.length} free | General: ${genAvailable.length} free`,
      data: { availableBeds: availableBeds.length, totalBeds, icuCount: icuAvailable.length, genCount: genAvailable.length, erCount: erAvailable.length, pvtCount: pvtAvailable.length }
    });

    return { reply, updatedContext: newContext, cards };
  }

  // 10. PHARMACY & INVENTORY
  if (
    lowerPrompt.includes('pharmacy') ||
    lowerPrompt.includes('medicine') ||
    lowerPrompt.includes('paracetamol') ||
    lowerPrompt.includes('stock')
  ) {
    newContext.currentIntent = 'pharmacy_search';
    if (lowerPrompt.includes('paracetamol')) {
      const para = contextData.medicines.find(m => m.name.toLowerCase().includes('paracetamol'));
      if (para) {
        cards.push({
          id: `card-med-${para.id}`,
          type: 'medicine',
          title: para.name,
          subtitle: `Stock: ${para.stock} units | ₹${para.price}`,
          data: para
        });

        return {
          reply: `💊 **Paracetamol Stock Details**:\n\n• **Item**: ${para.name} (${para.category})\n• **Current Stock**: ${para.stock} units\n• **Price**: ₹${para.price}/unit\n• **Expiry Date**: ${para.expiryDate}\n• **Manufacturer**: ${para.manufacturer}\n• **Status**: ${para.stock <= para.lowStockThreshold ? '⚠️ LOW STOCK WARNING' : '✅ IN STOCK'}`,
          updatedContext: newContext,
          cards
        };
      }
    }

    const lowStockMeds = contextData.medicines.filter(m => m.stock <= m.lowStockThreshold);
    let reply = `💊 **Vitalora Central Pharmacy Live Inventory**:\n\n`;
    reply += `• **Total Medicines Registered**: ${contextData.medicines.length}\n`;
    reply += `⚠️ **Low Stock Alerts (${lowStockMeds.length})**:\n`;

    lowStockMeds.forEach(m => {
      reply += `   • ${m.name}: ${m.stock} units remaining (Threshold: ${m.lowStockThreshold})\n`;
    });

    reply += `\nNeed to order new supplies? Visit the Pharmacy Inventory module.`;

    cards.push({
      id: `card-med-alert-${Date.now()}`,
      type: 'medicine',
      title: `Pharmacy Stock Warning`,
      subtitle: `${lowStockMeds.length} items low in inventory`,
      data: lowStockMeds[0] || contextData.medicines[0]
    });

    return { reply, updatedContext: newContext, cards };
  }

  // 11. BILLING & INVOICES
  if (
    lowerPrompt.includes('bill') ||
    lowerPrompt.includes('payment') ||
    lowerPrompt.includes('pending bills') ||
    lowerPrompt.includes('overdue')
  ) {
    newContext.currentIntent = 'billing_search';
    const pendingBills = contextData.billings.filter(b => b.status === 'Pending' || b.status === 'Overdue');
    if (pendingBills.length === 0) {
      return {
        reply: "💳 **Billing Summary**: All patient invoices are paid and settled! There are no pending payments.",
        updatedContext: newContext
      };
    }

    let reply = `💳 **Pending & Overdue Billing Records (${pendingBills.length})**:\n\n`;
    pendingBills.forEach((b, idx) => {
      reply += `${idx + 1}. **Invoice #${b.id}** - ${b.patientName}\n   • Total: ₹${b.totalAmount.toLocaleString()} | Status: **${b.status}**\n   • Due Date: ${b.dueDate}\n\n`;
    });
    reply += `You can process payments directly via the Billing & Payments dashboard.`;

    cards.push({
      id: `card-bill-${pendingBills[0].id}`,
      type: 'bill',
      title: `Pending Bill #${pendingBills[0].id}`,
      subtitle: `${pendingBills[0].patientName} - ₹${pendingBills[0].totalAmount.toLocaleString()}`,
      data: pendingBills[0]
    });

    return { reply, updatedContext: newContext, cards };
  }

  // 12. AMBULANCE & EMERGENCY SOS
  if (
    lowerPrompt.includes('ambulance') ||
    lowerPrompt.includes('emergency') ||
    lowerPrompt.includes('eta') ||
    lowerPrompt.includes('sos')
  ) {
    newContext.currentIntent = 'ambulance_search';
    const activeAmbulances = contextData.ambulances;
    let reply = `🚑 **Vitalora Emergency Ambulance Fleet Status**:\n\n`;
    activeAmbulances.forEach(a => {
      reply += `• **Unit ${a.ambulanceNumber}** (${a.status})\n   • Driver: ${a.driverName} (${a.driverPhone})\n   • Speed: ${a.currentSpeed} km/h | ETA: ${a.etaMinutes} mins\n   • Location: ${a.currentLocation} ➔ ${a.destination}\n\n`;
    });
    reply += `🚨 **Emergency Hotline**: Call 108 or tap the Ambulance SOS button in the top bar for instant dispatch.`;

    cards.push({
      id: `card-amb-${Date.now()}`,
      type: 'ambulance',
      title: `Emergency Fleet (${activeAmbulances.length} Active)`,
      subtitle: `Unit #${activeAmbulances[0]?.ambulanceNumber || '101'} - ETA ${activeAmbulances[0]?.etaMinutes || 6} mins`,
      data: activeAmbulances[0]
    });

    return { reply, updatedContext: newContext, cards };
  }

  // 13. HOSPITAL NAVIGATION
  if (
    lowerPrompt.includes('where is') ||
    lowerPrompt.includes('how do i reach') ||
    lowerPrompt.includes('guide me') ||
    lowerPrompt.includes('navigation') ||
    lowerPrompt.includes('wayfinding')
  ) {
    newContext.currentIntent = 'navigation';
    let dest = 'General';
    if (lowerPrompt.includes('pharmacy')) dest = 'Pharmacy';
    else if (lowerPrompt.includes('lab') || lowerPrompt.includes('diagnostic')) dest = 'Diagnostics';
    else if (lowerPrompt.includes('cardiology')) dest = 'Cardiology';
    else if (lowerPrompt.includes('emergency') || lowerPrompt.includes('er')) dest = 'Emergency';
    else if (lowerPrompt.includes('billing')) dest = 'Billing';

    let directions = '';
    if (dest === 'Pharmacy') {
      directions = `🧭 **Navigation to Central Pharmacy**:\n1. Start from Main Hospital Entrance.\n2. Proceed straight down the Central Atrium.\n3. Turn Right past Reception Counter 1.\n4. Central Pharmacy is located at **Ground Floor, Bay 04**.`;
    } else if (dest === 'Diagnostics') {
      directions = `🧭 **Navigation to Diagnostic & Radiology Lab**:\n1. Head towards Elevator Bank A.\n2. Take Elevator to 1st Floor.\n3. Turn Left following blue floor markers.\n4. Diagnostic Hub is in **Room 112, West Wing**.`;
    } else if (dest === 'Cardiology') {
      directions = `🧭 **Navigation to Cardiology OPD**:\n1. Take Elevator Bank B to 2nd Floor.\n2. Follow green Heart-Care signage.\n3. Cardiology OPD is in **Suite 204**.`;
    } else if (dest === 'Emergency') {
      directions = `🧭 **Navigation to Emergency Bay (ER)**:\n1. Proceed immediately to Ground Floor, West Gate Entrance.\n2. Follow red flashing LED directional markers.\n3. ER Trauma Center is located at **Ground Floor, Gate 2**.`;
    } else {
      directions = `🧭 **Vitalora Smart Wayfinding System**:\n• Ground Floor: Reception, Emergency ER, Central Pharmacy, Billing\n• 1st Floor: Diagnostics Lab, Radiology, ICU Ward A\n• 2nd Floor: Cardiology, Neurology, Orthopedics OPD Suites\n• 3rd Floor: Private Wards & Surgical Suites`;
    }

    cards.push({
      id: `card-nav-${Date.now()}`,
      type: 'navigation',
      title: `Wayfinding: ${dest}`,
      subtitle: 'Indoor Step-by-Step Navigation',
      data: { destination: dest, directions }
    });

    return { reply: directions, updatedContext: newContext, cards };
  }

  // 14. APPOINTMENTS TODAY
  if (
    lowerPrompt.includes('appointment') ||
    lowerPrompt.includes('meri appointment') ||
    lowerPrompt.includes('na appointment')
  ) {
    newContext.currentIntent = 'appointment_booking';
    const apts = contextData.appointments;
    let reply = `📅 **Today's Scheduled Appointments & Queue Tokens (${apts.length})**:\n\n`;
    apts.forEach(a => {
      reply += `• **Token #${a.tokenNumber}** - ${a.patientName}\n   • Doctor: ${a.doctorName} (${a.department})\n   • Time: ${a.time} | Status: **${a.status}**\n\n`;
    });
    reply += `Current Live Queue Position: Token #104 in consultation. Estimated wait per patient: 8-12 minutes.`;

    if (apts.length > 0) {
      cards.push({
        id: `card-apt-list-${Date.now()}`,
        type: 'appointment',
        title: `Today's Appointments (${apts.length})`,
        subtitle: `Next token #${apts[0].tokenNumber}`,
        data: apts[0]
      });
    }

    return { reply, updatedContext: newContext, cards };
  }

  // 15. GENERAL / UNKNOWN QUERY FALLBACK WITH HELPFUL CLARIFICATION
  let fallbackReply = '';
  if (lang === 'te') {
    fallbackReply = `నమస్తే! నేను వైటలోరా ఏఐ స్మార్ట్ హెల్త్‌కేర్ అసిస్టెంట్‌ని. మీ ప్రశ్నపై ఖచ్చితమైన రికార్డు పొందలేకపోయాను. \n\nమీరు వీటిలో దేని గురించి తెలుసుకోవాలనుకుంటున్నారు?\n• 🩺 **లక్షణాల పరీక్ష** (Symptom Guidance)\n• 👨‍⚕️ **డాక్టర్ల వివరాలు & అపాయింట్‌మెంట్‌లు**\n• 🛏️ **ICU బెడ్స్ & వార్డులు**\n• 🧪 **ల్యాబ్ రిపోర్టులు & ఫార్మసీ**\n• 🚑 **అత్యవసర ఆంబులెన్స్ SOS**`;
  } else if (lang === 'hi') {
    fallbackReply = `नमस्ते! मैं वाइटलोरा एआई स्वास्थ्य सहायक हूँ। आपकी क्वेरी के लिए सटीक रिकॉर्ड नहीं मिल सका।\n\nआप इनमें से क्या खोजना चाहते हैं?\n• 🩺 **लक्षण मार्गदर्शन (Symptom Guidance)**\n• 👨‍⚕️ **डॉक्टर की जानकारी और अपॉइंटमेंट**\n• 🛏️ **ICU और वार्ड बेड उपलब्धता**\n• 🧪 **लैब टेस्ट और दवाइयां**\n• 🚑 **इमरजेंसी एम्बुलेंस SOS**`;
  } else {
    fallbackReply = `Namaste! I am Vitalora AI, your smart hospital healthcare assistant. I couldn't find an exact matching record for your query in current records.\n\nHow can I help you right now?\n• 🩺 **Symptom Guidance & Urgency Check**\n• 👨‍⚕️ **Doctor Availability & Appointment Tokens**\n• 🛏️ **ICU Beds & Ward Availability**\n• 🧪 **Diagnostic Lab Reports & Prescriptions**\n• 💳 **Pending Invoices & Payments**\n• 🚑 **Emergency SOS & Ambulance Dispatch**`;
  }

  return { reply: fallbackReply, updatedContext: newContext };
}

function handleSymptomStep(
  prompt: string,
  lang: 'en' | 'te' | 'hi',
  context: ConversationContext,
  contextData: AppContextData
): { reply: string; updatedContext: ConversationContext; cards?: AIActionCard[] } {
  const step = context.symptomStep || 1;
  const data = context.symptomData || {};
  const cards: AIActionCard[] = [];

  if (step === 1) {
    data.symptoms = prompt;
    context.symptomStep = 2;
    context.symptomData = data;

    let reply = lang === 'te' 
      ? `ధన్యవాదాలు. ఈ లక్షణాలు ఎప్పుడు ప్రారంభమయ్యాయి? (ఉదాహరణకు: ఈరోజే, 2 రోజుల క్రితం, ఒక వారంగా)`
      : lang === 'hi'
      ? `धन्यवाद। ये लक्षण कब शुरू हुए थे? (जैसे: आज ही, 2 दिन पहले, 1 सप्ताह से)`
      : `Thank you. When did these symptoms start? (e.g. today, 2 days ago, a week ago)`;

    cards.push({
      id: `card-symptom-step-${Date.now()}`,
      type: 'symptom_interactive',
      title: 'Symptom Checker - Step 2 of 4',
      subtitle: 'Select onset duration',
      data: { step: 2, options: ['Started Today', '2 Days Ago', '1 Week Ago', 'Chronic / Ongoing'] }
    });

    return { reply, updatedContext: context, cards };
  }

  if (step === 2) {
    data.duration = prompt;
    context.symptomStep = 3;
    context.symptomData = data;

    let reply = lang === 'te'
      ? `లక్షణాల తీవ్రత (Severity) ఎంత ఉంది? (ఉదాహరణకు: స్వల్పంగా / మోస్తరుగా / తీవ్రంగా లేదా 1 నుండి 10 స్కేలులో)`
      : lang === 'hi'
      ? `लक्षणों की गंभीरता (Severity) कैसी है? (जैसे: हल्की / मध्यम / गंभीर या 1 से 10 के पैमाने पर)`
      : `How severe are the symptoms? (e.g. mild, moderate, severe, or on a scale of 1 to 10)`;

    cards.push({
      id: `card-symptom-step-${Date.now()}`,
      type: 'symptom_interactive',
      title: 'Symptom Checker - Step 3 of 4',
      subtitle: 'Select severity level',
      data: { step: 3, options: ['Mild (1-3)', 'Moderate (4-6)', 'Severe (7-8)', 'Critical (9-10)'] }
    });

    return { reply, updatedContext: context, cards };
  }

  if (step === 3) {
    data.severity = prompt;
    context.symptomStep = 4;
    context.symptomData = data;

    let reply = lang === 'te'
      ? `మీకు జ్వరం, ఛాతీ నొప్పి, కళ్ళు తిరగడం, శ్వాస తీసుకోవడంలో ఇబ్బంది లేదా ఇతర అనుబంధ లక్షణాలు ఉన్నాయా?`
      : lang === 'hi'
      ? `क्या आपको तेज बुखार, सीने में दर्द, चक्कर आना, सांस लेने में तकलीफ या अन्य संबंधित लक्षण हैं?`
      : `Do you have fever, chest pain, dizziness, breathing difficulty, or other associated symptoms?`;

    cards.push({
      id: `card-symptom-step-${Date.now()}`,
      type: 'symptom_interactive',
      title: 'Symptom Checker - Step 4 of 4',
      subtitle: 'Select associated indicators',
      data: { step: 4, options: ['Chest Pain / Pressure 🚨', 'Breathing Difficulty 🚨', 'High Fever (102°F+)', 'Dizziness & Nausea', 'No Other Symptoms'] }
    });

    return { reply, updatedContext: context, cards };
  }

  if (step === 4) {
    data.associated = prompt;
    context.symptomStep = 5; // Completed
    context.symptomData = data;

    const fullText = `${data.symptoms} ${data.duration} ${data.severity} ${data.associated} ${prompt}`.toLowerCase();

    let urgencyLevel: 'Low' | 'Medium' | 'High' | 'Critical' = 'Medium';
    let isEmergency = false;

    if (
      fullText.includes('chest pain') ||
      fullText.includes('breathing difficulty') ||
      fullText.includes('shortness of breath') ||
      fullText.includes('unconscious') ||
      fullText.includes('heavy bleed') ||
      fullText.includes('stroke') ||
      fullText.includes('severe chest') ||
      fullText.includes('critical') ||
      fullText.includes('9-10') ||
      fullText.includes('9') ||
      fullText.includes('10')
    ) {
      urgencyLevel = 'Critical';
      isEmergency = true;
    } else if (
      fullText.includes('severe') ||
      fullText.includes('7-8') ||
      fullText.includes('high fever') ||
      fullText.includes('102') ||
      fullText.includes('103')
    ) {
      urgencyLevel = 'High';
    } else if (
      fullText.includes('mild') ||
      fullText.includes('1-3')
    ) {
      urgencyLevel = 'Low';
    }

    let recommendedDept = 'General Medicine';
    if (fullText.includes('headache') || fullText.includes('dizziness') || fullText.includes('seizure') || fullText.includes('brain')) recommendedDept = 'Neurology';
    else if (fullText.includes('heart') || fullText.includes('chest') || fullText.includes('palpitations')) recommendedDept = 'Cardiology';
    else if (fullText.includes('bone') || fullText.includes('joint') || fullText.includes('fracture')) recommendedDept = 'Orthopedics';
    else if (fullText.includes('child') || fullText.includes('baby') || fullText.includes('pediatric')) recommendedDept = 'Pediatrics';
    else if (fullText.includes('skin') || fullText.includes('rash') || fullText.includes('itching')) recommendedDept = 'Dermatology';

    const deptDocs = contextData.doctors.filter(d => d.department.toLowerCase() === recommendedDept.toLowerCase());
    const matchedDoc = deptDocs[0] || contextData.doctors[0];

    let reply = '';
    if (isEmergency) {
      reply = `🚨 **EMERGENCY WARNING (अत्यवश्यक హెచ్చరిక)**:\n\nThe symptoms you described indicate potential severe emergency distress requiring immediate medical attention.\n\n`;
      reply += `🚨 **Assessed Urgency Level**: **CRITICAL**\n`;
      reply += `🏥 **Action Plan**: Proceed immediately to the **Vitalora Emergency Trauma Bay (ER)** or click below to trigger instant Emergency SOS Ambulance Dispatch.\n\n`;
      reply += `⚠️ **Notice**: *This is general health guidance and not a confirmed medical diagnosis. Please consult a qualified emergency physician immediately.*`;
      
      cards.push({
        id: `card-emergency-${Date.now()}`,
        type: 'emergency',
        title: 'Emergency Medical Alert',
        subtitle: 'Critical Urgency - Immediate ER Triage Recommended',
        data: { department: 'Emergency Medicine', action: 'DISPATCH_AMBULANCE' },
        actionText: 'Dispatch Emergency SOS 🚨',
        actionType: 'DISPATCH_AMBULANCE'
      });
    } else {
      reply = `📊 **Vitalora Symptom Guidance Triage Summary**:\n\n`;
      reply += `• **Reported Symptoms**: ${data.symptoms}\n`;
      reply += `• **Onset Duration**: ${data.duration}\n`;
      reply += `• **Severity Level**: ${data.severity}\n`;
      reply += `• **Associated Indicators**: ${data.associated}\n\n`;
      reply += `⚡ **Assessed Urgency**: **${urgencyLevel === 'High' ? '🟠 HIGH' : urgencyLevel === 'Medium' ? '🟡 MEDIUM' : '🟢 LOW'}**\n`;
      reply += `💡 **Recommended Department**: **${recommendedDept}**\n`;
      reply += `👨‍⚕️ **Suggested Specialist**: Dr. ${matchedDoc.name} (${matchedDoc.specialty}) - Room ${matchedDoc.roomNumber}\n\n`;
      reply += `⚠️ **Medical Disclaimer**: *This is general health guidance and not a confirmed medical diagnosis. Please consult a qualified healthcare professional for medical diagnosis.*`;

      cards.push({
        id: `card-doc-symptom-${matchedDoc.id}`,
        type: 'doctor',
        title: `Recommended: Dr. ${matchedDoc.name}`,
        subtitle: `${matchedDoc.department} (${urgencyLevel} Urgency)`,
        data: [matchedDoc]
      });
    }

    context.symptomStep = 0;
    return { reply, updatedContext: context, cards };
  }

  return { reply: 'Thank you for providing your symptom information.', updatedContext: context };
}
