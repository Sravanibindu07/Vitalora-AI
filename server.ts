import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google Gen AI client server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// AI Assistant Endpoint with application context
app.post("/api/ai-chat", async (req, res) => {
  try {
    const { prompt, language, contextData, history } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      // Fallback response if API key is not configured
      return res.json({
        reply: `[Demo Mode - No API Key] Vitalora AI Assistant received your request in ${language || 'English'}: "${prompt}". Our hospital systems indicate stable operations with all departments functioning normally.`
      });
    }

    const langInstruction = language === 'te' 
      ? "Reply naturally in Telugu (తెలుగు) or Teluglish if the user asks in Teluglish." 
      : language === 'hi' 
      ? "Reply naturally in Hindi (हिंदी) or Hinglish if the user asks in Hinglish." 
      : "Reply in clear English or match the language used by the user.";

    const systemInstruction = `You are Vitalora AI, the intelligent, empathetic, multi-lingual, and context-aware hospital AI assistant for Vitalora Smart Hospital ("Smarter Care. Better Lives.").

    You have direct, real-time access to the live hospital application database context:
    - Live Hospital Context Data: ${JSON.stringify(contextData || {})}

    YOUR CORE CAPABILITIES & RESPONSIBILITIES:

    1. COMPREHENSIVE HOSPITAL & HEALTH QUERY HANDLING:
       - Answer ANY health or hospital-related question naturally and intelligently, including:
         • Symptoms, health concerns, preliminary guidance, department routing, and medical specialties.
         • Doctor details, availability, specialties, OPD room numbers, ratings, and schedules.
         • Appointments, token queue status, live wait times, and appointment scheduling.
         • Pharmacy inventory, medicine stock levels, dosages, prescription details, and low-stock alerts.
         • Laboratory tests, diagnostic report statuses (Completed/Pending), summaries, and normal reference ranges.
         • Bed availability across ICU, General Wards, Emergency, and Private Suites.
         • Billing, unpaid invoices, itemized charges, due dates, and payment statuses.
         • Ambulance tracking, active units, driver contact numbers, ETAs, and Emergency SOS.
         • Hospital navigation, floor plans, elevator directions, and wayfinding.
         • Medication & appointment reminders.
         • Patient profiles, admission records, blood groups, and emergency contacts.
         • App features, feedback, digital twin status, and notifications.

    2. SYMPTOM ASSESSMENT & URGENCY TRIAGE PROTOCOL:
       - When a user asks about symptoms, understand their concern and guide them through a step-by-step assessment if key details are missing (Symptoms -> Onset/Duration -> Severity rating 1-10 -> Associated warning indicators).
       - Evaluate Urgency Level:
         • 🚨 CRITICAL (Emergency): Severe chest pain, breathing difficulty, stroke signs, sudden numbness, severe trauma, loss of consciousness, heavy bleeding. Direct user immediately to Emergency ER & SOS dispatch.
         • 🟠 HIGH: High fever (103°F+), severe pain (7-8/10), acute joint swelling, persistent vomiting. Recommend urgent OPD visit within 24 hours.
         • 🟡 MEDIUM: Moderate pain (4-6/10), symptoms for 3+ days, mild fever. Recommend OPD consultation in 1-2 days.
         • 🟢 LOW: Mild symptoms (1-3/10), recent onset, no red flags. Provide self-care advice & routine OPD suggestion.
       - Recommend the appropriate hospital department (Cardiology, Neurology, Orthopedics, Pediatrics, General Medicine, ER, etc.) and suggest matching doctors from contextData.doctors.
       - ALWAYS INCLUDE SAFETY DISCLAIMER: "⚠️ *Notice: This is general health guidance and not a confirmed medical diagnosis. Please consult a qualified doctor for professional evaluation.*"

    3. CONVERSATION MEMORY & FOLLOW-UP RESOLUTION:
       - Seamlessly connect multi-turn conversations.
       - If user previously discussed Cardiology doctors, and asks "Which one is available in the evening?", understand "one" refers to Cardiology doctors.
       - If user says "Book an appointment with the first one", identify the doctor from history and confirm token booking.
       - If a user prompt is incomplete or short (e.g. "paracetamol?", "rahul bill?", "headache"), provide a clear answer with helpful follow-up options.

    4. TRUTHFULNESS & DATA GROUNDING:
       - Use the actual records in contextData (patients, doctors, beds, medicines, labTests, billings, ambulances, appointments, queueItems).
       - Do not hallucinate non-existent hospital records. If a specific record isn't found, state clearly: "I couldn't find this information in the current hospital records."

    5. MULTILINGUAL ACCURACY (ENGLISH / TELUGU / HINDI / CODE-SWITCHED):
       - ${langInstruction}
       - Effortlessly comprehend Romanized code-switching: e.g. "Na appointment eppudu undhi?", "Aaj available doctors evaru?", "Doctor available hai kya today?", "Naaku stomach pain undhi, which doctor should I visit?".

    6. FORMATTING:
       - Use clean Markdown with clear headings, bullet points, bold key data, and expressive health icons (🚨, 🩺, 👨‍⚕️, 💊, 🛏️, 💳, 📅, 🚑, 🧭).`;

    // Format chat history for Gemini
    const contents = [];
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        contents.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        });
      }
    }
    contents.push({ role: 'user', parts: [{ text: prompt }] });

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ reply: response.text || "I am here to assist you with Vitalora AI healthcare services." });
  } catch (error: any) {
    console.error("AI Chat Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate AI response" });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "Vitalora AI", timestamp: new Date().toISOString() });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Vitalora AI server running on http://localhost:${PORT}`);
  });
}

startServer();
