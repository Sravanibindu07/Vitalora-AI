import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, X, Send, Mic, MicOff, Volume2, VolumeX, Sparkles, RefreshCw, 
  PlusCircle, Copy, Check, Play, Square, FlaskConical, Calendar, Bed, 
  User, Stethoscope, CreditCard, Pill, Ambulance as AmbulanceIcon, Compass, Clock, HelpCircle,
  ThumbsUp, ThumbsDown, History, AlertTriangle, ArrowRight, PhoneCall, ExternalLink, ShieldAlert, ChevronRight
} from 'lucide-react';
import { AppContextData, ConversationContext, processLocalBotQuery, getDynamicSuggestions, AIActionCard } from '../utils/aiBotEngine';
import { useLanguage } from '../context/LanguageContext';

interface VitaloraAIAssistantProps {
  appContextData: AppContextData;
}

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  cards?: AIActionCard[];
  feedback?: 'up' | 'down';
}

interface ChatSession {
  id: string;
  title: string;
  timestamp: string;
  messages: Message[];
}

export const VitaloraAIAssistant: React.FC<VitaloraAIAssistantProps> = ({ appContextData }) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [voiceOutputEnabled, setVoiceOutputEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showTestPanel, setShowTestPanel] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Chat History & Saved Sessions from LocalStorage
  const [chatSessions, setChatSessions] = useState<ChatSession[]>(() => {
    try {
      const saved = localStorage.getItem('vitalora_ai_chat_sessions');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [currentSessionId, setCurrentSessionId] = useState<string>(`session-${Date.now()}`);

  // Initial Welcome Message
  const initialWelcomeMessage: Message = {
    id: 'msg-welcome',
    role: 'model',
    content: `Namaste! I am **Vitalora AI**, your smart hospital assistant ("Smarter Care. Better Lives.").\n\nHow can I assist you today? You can search patients, check doctor schedules, available beds, pharmacy stock, billing, or launch our **Symptom Guidance Assistant**.`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  const [messages, setMessages] = useState<Message[]>([initialWelcomeMessage]);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  // Conversation Memory Context
  const conversationContextRef = useRef<ConversationContext>({
    symptomStep: 0,
    symptomData: {}
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Persist sessions to LocalStorage
  useEffect(() => {
    if (messages.length > 1) {
      const firstUserMsg = messages.find(m => m.role === 'user')?.content || 'Hospital Query';
      const updatedTitle = firstUserMsg.slice(0, 30) + (firstUserMsg.length > 30 ? '...' : '');

      setChatSessions(prev => {
        const existingIdx = prev.findIndex(s => s.id === currentSessionId);
        const currentSessionObj: ChatSession = {
          id: currentSessionId,
          title: updatedTitle,
          timestamp: new Date().toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
          messages
        };

        let newSessions: ChatSession[];
        if (existingIdx >= 0) {
          newSessions = [...prev];
          newSessions[existingIdx] = currentSessionObj;
        } else {
          newSessions = [currentSessionObj, ...prev];
        }

        try {
          localStorage.setItem('vitalora_ai_chat_sessions', JSON.stringify(newSessions.slice(0, 25)));
        } catch (e) {
          console.warn('LocalStorage save error:', e);
        }
        return newSessions;
      });
    }
  }, [messages, currentSessionId]);

  // Sound chime synthesizer using Web Audio API
  const playChimeSound = () => {
    if (appContextData.soundEnabled === false) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch (e) {
      console.warn('Audio chime warning:', e);
    }
  };

  // Speech Recognition setup (Voice Input)
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser environment. You can type your message.');
      return;
    }
    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'te' ? 'te-IN' : language === 'hi' ? 'hi-IN' : 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
        handleSendMessage(transcript);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } catch (err) {
      console.error('Speech recognition error:', err);
      setIsListening(false);
    }
  };

  // Text to Speech Output
  const speakText = (text: string, messageId?: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    if (isPlayingAudio === messageId) {
      setIsPlayingAudio(null);
      return;
    }

    const plainText = text
      .replace(/\*\*/g, '')
      .replace(/#/g, '')
      .replace(/•/g, '')
      .replace(/🚨|🛏️|👨‍⚕️|💊|💳|🚑|🧭|📅|👤|🎟️|⏰|📍|✅|⚠️|🩺|📊|💡/g, '');

    const utterance = new SpeechSynthesisUtterance(plainText);
    utterance.lang = language === 'te' ? 'te-IN' : language === 'hi' ? 'hi-IN' : 'en-US';
    utterance.rate = 1.0;
    
    utterance.onstart = () => setIsPlayingAudio(messageId || 'global');
    utterance.onend = () => setIsPlayingAudio(null);
    utterance.onerror = () => setIsPlayingAudio(null);

    window.speechSynthesis.speak(utterance);
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFeedback = (messageId: string, type: 'up' | 'down') => {
    setMessages(prev => prev.map(m => m.id === messageId ? { ...m, feedback: type } : m));
    setFeedbackToast(type === 'up' ? 'Thank you for your feedback! 👍' : 'Feedback recorded. We are continuously refining Vitalora AI. 👎');
    setTimeout(() => setFeedbackToast(null), 3000);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsgText = text.trim();
    if (!textToSend) setInputMessage('');

    const userMessage: Message = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      content: userMsgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    const historyPayload = messages.map(m => ({ role: m.role, content: m.content }));

    let assistantReply = '';
    let cardsResult: AIActionCard[] | undefined = undefined;

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userMsgText,
          language,
          contextData: {
            patients: appContextData.patients,
            doctors: appContextData.doctors,
            departments: appContextData.departments,
            beds: appContextData.beds,
            medicines: appContextData.medicines,
            appointments: appContextData.appointments,
            labTests: appContextData.labTests,
            billings: appContextData.billings,
            ambulances: appContextData.ambulances,
            queueItems: appContextData.queueItems
          },
          history: historyPayload
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.reply && !data.reply.includes('[Demo Mode - No API Key]')) {
          assistantReply = data.reply;
        }
      }
    } catch (error) {
      console.warn('Backend Gemini API call failed or in demo mode, executing local AI engine:', error);
    }

    if (!assistantReply) {
      const localResult = processLocalBotQuery(
        userMsgText,
        language,
        appContextData,
        historyPayload,
        conversationContextRef.current
      );
      assistantReply = localResult.reply;
      cardsResult = localResult.cards;
      conversationContextRef.current = localResult.updatedContext;
    } else {
      // Also generate smart cards from local context matching
      const localResult = processLocalBotQuery(
        userMsgText,
        language,
        appContextData,
        historyPayload,
        conversationContextRef.current
      );
      cardsResult = localResult.cards;
      conversationContextRef.current = localResult.updatedContext;
    }

    const botMessage: Message = {
      id: `msg-${Date.now()}-bot`,
      role: 'model',
      content: assistantReply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      cards: cardsResult
    };

    setMessages([...newMessages, botMessage]);
    setIsLoading(false);
    playChimeSound();

    if (voiceOutputEnabled) {
      speakText(assistantReply, botMessage.id);
    }
  };

  const handleNewChat = () => {
    window.speechSynthesis.cancel();
    setIsPlayingAudio(null);
    conversationContextRef.current = { symptomStep: 0, symptomData: {} };
    const newSessionId = `session-${Date.now()}`;
    setCurrentSessionId(newSessionId);

    const welcome: Message = {
      id: `msg-welcome-${Date.now()}`,
      role: 'model',
      content: `Namaste! New chat session initialized.\n\nI am **Vitalora AI** ("Smarter Care. Better Lives."). How can I assist you with hospital operations, patient lookup, or symptom guidance?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([welcome]);
  };

  const handleSelectSession = (session: ChatSession) => {
    setCurrentSessionId(session.id);
    setMessages(session.messages);
    setShowHistoryModal(false);
  };

  const handleClearChat = () => {
    window.speechSynthesis.cancel();
    setIsPlayingAudio(null);
    conversationContextRef.current = { symptomStep: 0, symptomData: {} };
    setMessages([]);
  };

  // Proactive Reminders calculation
  const pendingBillsCount = appContextData.billings.filter(b => b.status === 'Pending' || b.status === 'Overdue').length;
  const lowStockMedsCount = appContextData.medicines.filter(m => m.stock <= m.lowStockThreshold).length;
  const todayAptsCount = appContextData.appointments.length;
  const activeAmbulanceCount = appContextData.ambulances.filter(a => a.status === 'Dispatched').length;

  const dynamicSuggestions = getDynamicSuggestions(conversationContextRef.current, language);

  const testPanelQuestions = [
    {
      category: "🏥 Hospital Data & Cards",
      items: [
        "Who are the available doctors today?",
        "How many ICU beds are available?",
        "Show pending bills.",
        "Is Paracetamol in stock?",
        "Track active ambulances."
      ]
    },
    {
      category: "🧠 Natural Conversation Memory",
      items: [
        "Show Cardiology doctors.",
        "Which one is available in the evening?",
        "Book an appointment with the first one."
      ]
    },
    {
      category: "🩺 Interactive Symptom Guidance",
      items: [
        "I have some symptoms but I don't know what they mean.",
        "I have severe chest pain and dizziness.",
        "I have fever and body pain."
      ]
    },
    {
      category: "🇮🇳 Telugu / Teluglish",
      items: [
        "Na appointment eppudu undhi?",
        "Eeroju doctors evaru available unnaru?",
        "ICU beds available unnaya?"
      ]
    },
    {
      category: "🇮🇳 Hindi / Hinglish",
      items: [
        "Meri appointment kab hai?",
        "Aaj kaunse doctors available hain?",
        "Ambulance available hai kya?"
      ]
    }
  ];

  // Action Card Click Handlers
  const handleCardAction = (card: AIActionCard) => {
    if (card.type === 'emergency' || card.actionType === 'DISPATCH_AMBULANCE') {
      const sosBtn = document.getElementById('emergency-sos-trigger');
      if (sosBtn) sosBtn.click();
      else if (appContextData.setActiveTab) appContextData.setActiveTab('ambulance');
    } else if (card.type === 'appointment' || card.actionType === 'NAVIGATE_APPOINTMENTS') {
      if (appContextData.setActiveTab) appContextData.setActiveTab('appointments');
    } else if (card.type === 'doctor') {
      if (appContextData.setActiveTab) appContextData.setActiveTab('doctors');
    } else if (card.type === 'bed') {
      if (appContextData.setActiveTab) appContextData.setActiveTab('beds');
    } else if (card.type === 'bill') {
      if (appContextData.setActiveTab) appContextData.setActiveTab('billing');
    } else if (card.type === 'medicine') {
      if (appContextData.setActiveTab) appContextData.setActiveTab('pharmacy');
    } else if (card.type === 'ambulance') {
      if (appContextData.setActiveTab) appContextData.setActiveTab('ambulance');
    } else if (card.type === 'report' || card.type === 'lab_test') {
      if (appContextData.setActiveTab) appContextData.setActiveTab('diagnostics');
    } else if (card.type === 'navigation') {
      handleSendMessage(`Guide me to ${card.data.destination}`);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 bg-gradient-to-r from-cyan-600 via-indigo-600 to-blue-700 text-white px-5 py-4 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 border border-cyan-400/40 cursor-pointer"
          id="vitalora-ai-trigger"
        >
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-ping" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full" />
          <Bot className="w-7 h-7 text-cyan-200 animate-pulse" />
          <div className="text-left">
            <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-200 flex items-center gap-1">
              Vitalora AI <span className="bg-cyan-500/30 text-cyan-200 px-1.5 py-0.2 rounded-full text-[9px]">v2.0</span>
            </div>
            <div className="text-sm font-extrabold flex items-center gap-1">
              Smart Healthcare <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </div>
          </div>
        </button>
      ) : (
        <div className="w-[390px] sm:w-[480px] h-[680px] bg-slate-900/95 backdrop-blur-2xl border border-cyan-500/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100 transition-all duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 px-4 py-3 border-b border-cyan-500/20 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/40 rounded-2xl shadow-inner">
                <Bot className="w-5 h-5 text-cyan-300" />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-wide text-cyan-200 flex items-center gap-1.5">
                  Vitalora AI Assistant <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </h3>
                <p className="text-[10px] text-slate-400 font-medium">“Smarter Care. Better Lives.”</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Language Selector */}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="bg-slate-800/90 border border-cyan-500/30 text-[11px] font-semibold rounded-xl px-2 py-1 text-cyan-300 focus:outline-none cursor-pointer"
                title="Select Language"
              >
                <option value="en">🇬🇧 English</option>
                <option value="te">🇮🇳 తెలుగు</option>
                <option value="hi">🇮🇳 हिंदी</option>
              </select>

              {/* Chat History Sessions Toggle */}
              <button
                onClick={() => setShowHistoryModal(!showHistoryModal)}
                className={`p-1.5 rounded-xl border transition-all ${
                  showHistoryModal ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200' : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-cyan-500/40'
                }`}
                title="View Past Chat Sessions"
              >
                <History className="w-4 h-4" />
              </button>

              {/* Voice toggle */}
              <button
                onClick={() => {
                  setVoiceOutputEnabled(!voiceOutputEnabled);
                  if (isPlayingAudio) {
                    window.speechSynthesis.cancel();
                    setIsPlayingAudio(null);
                  }
                }}
                className={`p-1.5 rounded-xl border transition-all ${
                  voiceOutputEnabled ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300' : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
                title={voiceOutputEnabled ? "Voice Output Enabled" : "Voice Output Disabled"}
              >
                {voiceOutputEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Test Mode Toggle */}
              <button
                onClick={() => setShowTestPanel(!showTestPanel)}
                className={`px-2 py-1 rounded-xl text-[11px] font-semibold border transition-all flex items-center gap-1 ${
                  showTestPanel ? 'bg-amber-500/20 border-amber-500/50 text-amber-300' : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-cyan-500/40'
                }`}
                title="Toggle Developer Chatbot Test Mode"
              >
                <FlaskConical className="w-3.5 h-3.5" />
                <span>Test Mode</span>
              </button>

              {/* New Chat */}
              <button
                onClick={handleNewChat}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/40 rounded-xl text-cyan-300 transition-all"
                title="New Chat Session"
              >
                <PlusCircle className="w-4 h-4" />
              </button>

              {/* Close */}
              <button
                onClick={() => {
                  window.speechSynthesis.cancel();
                  setIsPlayingAudio(null);
                  setIsOpen(false);
                }}
                className="p-1.5 bg-slate-800 hover:bg-rose-500/20 border border-slate-700 hover:border-rose-500/40 rounded-xl text-slate-300 hover:text-rose-300 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Feedback Toast Banner */}
          {feedbackToast && (
            <div className="bg-cyan-950/90 text-cyan-200 border-b border-cyan-500/40 px-3 py-1.5 text-xs text-center font-medium animate-pulse">
              {feedbackToast}
            </div>
          )}

          {/* Past Chat Sessions Drawer Overlay */}
          {showHistoryModal && (
            <div className="bg-slate-950 p-3 border-b border-cyan-500/30 max-h-56 overflow-y-auto space-y-2 text-xs z-20">
              <div className="flex items-center justify-between text-cyan-300 font-bold border-b border-cyan-500/20 pb-1">
                <span className="flex items-center gap-1.5"><History className="w-3.5 h-3.5" /> Saved Chat Sessions</span>
                <span className="text-[10px] text-slate-400 font-normal">{chatSessions.length} sessions saved</span>
              </div>
              {chatSessions.length === 0 ? (
                <div className="text-slate-500 py-3 text-center text-xs">No previous chat sessions recorded yet.</div>
              ) : (
                <div className="space-y-1">
                  {chatSessions.map((session) => (
                    <button
                      key={session.id}
                      onClick={() => handleSelectSession(session)}
                      className={`w-full text-left p-2 rounded-xl border text-xs transition-all flex items-center justify-between ${
                        session.id === currentSessionId
                          ? 'bg-cyan-950/80 border-cyan-500/60 text-cyan-200 font-semibold'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-cyan-500/30'
                      }`}
                    >
                      <div className="truncate pr-2">
                        <div className="truncate">{session.title}</div>
                        <div className="text-[10px] text-slate-500">{session.timestamp}</div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Developer Test Panel Overlay */}
          {showTestPanel && (
            <div className="bg-slate-950 p-3 border-b border-amber-500/30 max-h-48 overflow-y-auto space-y-2 text-xs z-20">
              <div className="flex items-center justify-between text-amber-400 font-bold border-b border-amber-500/20 pb-1">
                <span>🧪 Developer Chatbot Test Questions</span>
                <span className="text-[10px] text-slate-400 font-normal">Click any pill to test instantly</span>
              </div>
              {testPanelQuestions.map((group, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-[11px] font-semibold text-cyan-400">{group.category}</div>
                  <div className="flex flex-wrap gap-1">
                    {group.items.map((item, itemIdx) => (
                      <button
                        key={itemIdx}
                        onClick={() => {
                          handleSendMessage(item);
                        }}
                        className="text-[10px] bg-slate-900 hover:bg-amber-950/60 border border-amber-500/30 text-amber-200 px-2 py-1 rounded-lg text-left transition-all"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Proactive Smart Alerts Header */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 px-3 py-1.5 border-b border-cyan-500/10 flex items-center justify-between gap-2 overflow-x-auto text-[11px] shrink-0">
            <span className="text-cyan-400 font-bold uppercase tracking-wider text-[10px] shrink-0 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-amber-400" /> Smart Alerts:
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              {pendingBillsCount > 0 && (
                <button
                  onClick={() => handleSendMessage('Show pending bills and payment statuses')}
                  className="bg-amber-500/10 border border-amber-500/30 text-amber-300 px-2 py-0.5 rounded-full hover:bg-amber-500/20 transition-all whitespace-nowrap flex items-center gap-1"
                >
                  <CreditCard className="w-3 h-3" /> {pendingBillsCount} Pending Bills
                </button>
              )}
              {lowStockMedsCount > 0 && (
                <button
                  onClick={() => handleSendMessage('Which medicines are running low in pharmacy?')}
                  className="bg-rose-500/10 border border-rose-500/30 text-rose-300 px-2 py-0.5 rounded-full hover:bg-rose-500/20 transition-all whitespace-nowrap flex items-center gap-1"
                >
                  <Pill className="w-3 h-3" /> {lowStockMedsCount} Low Stock Meds
                </button>
              )}
              {todayAptsCount > 0 && (
                <button
                  onClick={() => handleSendMessage('Show today\'s scheduled appointments')}
                  className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 px-2 py-0.5 rounded-full hover:bg-cyan-500/20 transition-all whitespace-nowrap flex items-center gap-1"
                >
                  <Calendar className="w-3 h-3" /> {todayAptsCount} Appointments Today
                </button>
              )}
              {activeAmbulanceCount > 0 && (
                <button
                  onClick={() => handleSendMessage('What is the status of active emergency ambulances?')}
                  className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded-full hover:bg-emerald-500/20 transition-all whitespace-nowrap flex items-center gap-1"
                >
                  <AmbulanceIcon className="w-3 h-3" /> {activeAmbulanceCount} Active Ambulance
                </button>
              )}
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-slate-900/80 via-slate-950 to-slate-950">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                <Bot className="w-12 h-12 text-cyan-500/30 mb-2" />
                <p className="text-sm font-semibold text-slate-400">Chat history cleared.</p>
                <p className="text-xs text-slate-500 mt-1">Type a prompt or select a quick action to begin.</p>
              </div>
            ) : (
              messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.role === 'model' && (
                    <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0 mt-1 shadow-md">
                      <Bot className="w-4 h-4 text-cyan-300" />
                    </div>
                  )}

                  <div className="group relative max-w-[86%] flex flex-col space-y-2">
                    <div
                      className={`px-4 py-3 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                        m.role === 'user'
                          ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white rounded-br-none shadow-lg'
                          : 'bg-slate-800/95 border border-cyan-500/20 text-slate-100 rounded-bl-none shadow-lg'
                      }`}
                    >
                      {m.content}
                    </div>

                    {/* AI Action Cards Container */}
                    {m.cards && m.cards.length > 0 && (
                      <div className="space-y-2.5 mt-2">
                        {m.cards.map((card) => (
                          <div
                            key={card.id}
                            className={`p-3.5 rounded-2xl border transition-all ${
                              card.type === 'emergency'
                                ? 'bg-gradient-to-r from-rose-950/90 to-red-900/80 border-rose-500/60 text-rose-100 animate-pulse'
                                : 'bg-slate-900/90 border-cyan-500/30 text-slate-100 hover:border-cyan-400/60'
                            }`}
                          >
                            {/* Card Header */}
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                {card.type === 'appointment' && <Calendar className="w-4 h-4 text-cyan-400" />}
                                {card.type === 'doctor' && <Stethoscope className="w-4 h-4 text-cyan-400" />}
                                {card.type === 'bed' && <Bed className="w-4 h-4 text-emerald-400" />}
                                {card.type === 'bill' && <CreditCard className="w-4 h-4 text-amber-400" />}
                                {card.type === 'medicine' && <Pill className="w-4 h-4 text-purple-400" />}
                                {card.type === 'ambulance' && <AmbulanceIcon className="w-4 h-4 text-rose-400" />}
                                {(card.type === 'report' || card.type === 'lab_test') && <FlaskConical className="w-4 h-4 text-cyan-400" />}
                                {card.type === 'navigation' && <Compass className="w-4 h-4 text-blue-400" />}
                                {card.type === 'emergency' && <ShieldAlert className="w-4 h-4 text-rose-400" />}
                                {card.type === 'symptom_interactive' && <HelpCircle className="w-4 h-4 text-cyan-400" />}
                                <span className="font-bold text-xs text-cyan-200">{card.title}</span>
                              </div>
                              {card.subtitle && (
                                <span className="text-[10px] text-slate-400">{card.subtitle}</span>
                              )}
                            </div>

                            {/* Card Content Renderers */}
                            {card.type === 'symptom_interactive' && card.data?.options && (
                              <div className="space-y-2">
                                <p className="text-[11px] text-slate-300">Tap an option to answer step-by-step:</p>
                                <div className="flex flex-wrap gap-1.5">
                                  {card.data.options.map((opt: string, optIdx: number) => (
                                    <button
                                      key={optIdx}
                                      onClick={() => handleSendMessage(opt)}
                                      className="text-xs bg-slate-800 hover:bg-cyan-950 border border-cyan-500/40 text-cyan-200 px-2.5 py-1.5 rounded-xl transition-all"
                                    >
                                      {opt}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}

                            {(card.type === 'report' || card.type === 'lab_test') && card.data && (
                              <div className="bg-slate-950/60 p-2.5 rounded-xl text-xs space-y-1">
                                <div className="flex justify-between items-center">
                                  <span className="font-semibold text-slate-200">{card.data.testName || 'Diagnostic Test'}</span>
                                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${card.data.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                                    {card.data.status || 'Verified'}
                                  </span>
                                </div>
                                <div className="text-[11px] text-slate-400">Patient: {card.data.patientName} • Prescribing: {card.data.doctorName}</div>
                                {card.data.resultSummary && (
                                  <div className="text-[11px] text-cyan-300 italic">Result: {card.data.resultSummary}</div>
                                )}
                              </div>
                            )}

                            {card.type === 'navigation' && card.data && (
                              <div className="bg-slate-950/60 p-2.5 rounded-xl text-xs space-y-1 border border-blue-500/20">
                                <div className="font-semibold text-blue-300">Destination: {card.data.destination}</div>
                                <div className="text-[11px] text-slate-300 whitespace-pre-wrap">{card.data.directions}</div>
                              </div>
                            )}

                            {card.type === 'doctor' && Array.isArray(card.data) && (
                              <div className="space-y-2">
                                {card.data.slice(0, 3).map((doc: any, dIdx: number) => (
                                  <div key={dIdx} className="bg-slate-950/60 p-2 rounded-xl flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2">
                                      <div className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-300 font-bold flex items-center justify-center border border-cyan-500/30">
                                        {doc.name.charAt(4) || 'D'}
                                      </div>
                                      <div>
                                        <div className="font-semibold text-slate-200">{doc.name}</div>
                                        <div className="text-[10px] text-slate-400">{doc.specialty} • Room {doc.roomNumber}</div>
                                      </div>
                                    </div>
                                    <button
                                      onClick={() => handleSendMessage(`Book an appointment with ${doc.name}`)}
                                      className="text-[10px] bg-cyan-600 hover:bg-cyan-500 text-white px-2 py-1 rounded-lg font-semibold transition-all"
                                    >
                                      Book
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}

                            {card.type === 'bed' && card.data && (
                              <div className="space-y-2 text-xs">
                                <div className="grid grid-cols-2 gap-2 text-[11px]">
                                  <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800">
                                    <div className="text-slate-400">Total ICU Free</div>
                                    <div className="text-cyan-300 font-bold text-sm">{card.data.icuCount} Beds</div>
                                  </div>
                                  <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800">
                                    <div className="text-slate-400">General Ward Free</div>
                                    <div className="text-emerald-300 font-bold text-sm">{card.data.genCount} Beds</div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {card.type === 'bill' && card.data && (
                              <div className="bg-slate-950/60 p-2.5 rounded-xl flex items-center justify-between text-xs">
                                <div>
                                  <div className="font-semibold text-slate-200">Invoice #{card.data.id}</div>
                                  <div className="text-[10px] text-slate-400">Patient: {card.data.patientName} • Due: {card.data.dueDate}</div>
                                </div>
                                <div className="text-right">
                                  <div className="text-amber-300 font-bold">₹{card.data.totalAmount?.toLocaleString()}</div>
                                  <div className="text-[10px] text-rose-400 font-semibold">{card.data.status}</div>
                                </div>
                              </div>
                            )}

                            {card.type === 'ambulance' && card.data && (
                              <div className="bg-slate-950/60 p-2.5 rounded-xl text-xs space-y-1">
                                <div className="flex justify-between items-center">
                                  <span className="font-semibold text-slate-200">Unit #{card.data.ambulanceNumber}</span>
                                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-full font-bold">ETA {card.data.etaMinutes} mins</span>
                                </div>
                                <div className="text-[11px] text-slate-400">Driver: {card.data.driverName} ({card.data.driverPhone})</div>
                              </div>
                            )}

                            {/* Card Action Button */}
                            <button
                              onClick={() => handleCardAction(card)}
                              className={`w-full mt-2.5 py-1.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                                card.type === 'emergency'
                                  ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg'
                                  : 'bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white'
                              }`}
                            >
                              <span>{card.actionText || (card.type === 'emergency' ? 'Dispatch Emergency SOS 🚨' : 'Open Hospital Module')}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Message Actions, Feedback & Timestamp */}
                    <div className={`flex items-center gap-2 mt-1 px-1 text-[10px] text-slate-500 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <span>{m.timestamp}</span>

                      {m.role === 'model' && (
                        <div className="opacity-70 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                          {/* Speak message */}
                          <button
                            onClick={() => speakText(m.content, m.id)}
                            className="p-1 hover:text-cyan-400 transition-colors"
                            title="Listen to response"
                          >
                            {isPlayingAudio === m.id ? (
                              <Square className="w-3 h-3 text-rose-400 fill-rose-400" />
                            ) : (
                              <Play className="w-3 h-3" />
                            )}
                          </button>

                          {/* Copy text */}
                          <button
                            onClick={() => handleCopyMessage(m.id, m.content)}
                            className="p-1 hover:text-cyan-400 transition-colors"
                            title="Copy message"
                          >
                            {copiedId === m.id ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>

                          {/* Feedback Thumbs Up */}
                          <button
                            onClick={() => handleFeedback(m.id, 'up')}
                            className={`p-1 transition-colors ${m.feedback === 'up' ? 'text-emerald-400' : 'hover:text-emerald-400'}`}
                            title="Helpful response"
                          >
                            <ThumbsUp className="w-3 h-3" />
                          </button>

                          {/* Feedback Thumbs Down */}
                          <button
                            onClick={() => handleFeedback(m.id, 'down')}
                            className={`p-1 transition-colors ${m.feedback === 'down' ? 'text-rose-400' : 'hover:text-rose-400'}`}
                            title="Needs improvement"
                          >
                            <ThumbsDown className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}

            {isLoading && (
              <div className="flex gap-2.5 items-center">
                <div className="w-7 h-7 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-cyan-400 animate-spin" />
                </div>
                <div className="bg-slate-800/90 border border-cyan-500/30 px-4 py-2.5 rounded-2xl text-xs text-cyan-300 flex items-center gap-2 shadow-md">
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
                  </span>
                  <span>Vitalora AI is analyzing hospital neural records...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Contextual Smart Suggestions Bar */}
          <div className="bg-slate-950 px-3 py-2 border-t border-cyan-500/10 overflow-x-auto flex gap-1.5 scrollbar-thin scrollbar-thumb-cyan-500/20 shrink-0">
            {dynamicSuggestions.map((qa, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(qa.query)}
                className="whitespace-nowrap px-2.5 py-1 bg-gradient-to-r from-cyan-950/60 to-indigo-950/60 hover:from-cyan-900/80 hover:to-indigo-900/80 border border-cyan-500/30 rounded-full text-[11px] text-cyan-200 hover:text-white transition-all flex items-center gap-1.5 shadow-sm"
              >
                <span>{qa.icon}</span>
                <span>{qa.label}</span>
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-slate-950 border-t border-cyan-500/20 flex items-center gap-2 shrink-0">
            <button
              onClick={startListening}
              className={`p-2.5 rounded-xl border transition-all ${
                isListening
                  ? 'bg-rose-500/20 border-rose-500/60 text-rose-400 animate-pulse'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300'
              }`}
              title={isListening ? "Listening... Speak now" : "Voice Input"}
            >
              {isListening ? <MicOff className="w-4 h-4 animate-ping" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={
                isListening
                  ? "Listening to your voice..."
                  : language === 'te'
                  ? "ఏదైనా ఆసుపత్రి సమాచారం అడగండి..."
                  : language === 'hi'
                  ? "कोई भी अस्पताल संबंधी प्रश्न पूछें..."
                  : "Ask Vitalora AI about patients, doctors, beds..."
              }
              className="flex-1 bg-slate-900 border border-cyan-500/30 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-all"
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputMessage.trim()}
              className="p-2.5 bg-gradient-to-r from-cyan-600 via-indigo-600 to-blue-600 text-white rounded-xl shadow-lg hover:opacity-90 disabled:opacity-40 transition-all cursor-pointer border border-cyan-400/30"
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
