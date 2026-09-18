import React, { useState } from 'react';
import { MessageSquare, Send, User, Stethoscope } from 'lucide-react';
import { ChatMessage } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface DoctorChatModuleProps {
  messages: ChatMessage[];
  onSendMessage: (msg: ChatMessage) => void;
}

export const DoctorChatModule: React.FC<DoctorChatModuleProps> = ({ messages, onSendMessage }) => {
  const { t } = useLanguage();
  const [inputContent, setInputContent] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputContent.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'patient',
      senderName: 'Aarav Sharma',
      receiverName: 'Dr. Ananya Roy',
      content: inputContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      unread: false
    };

    onSendMessage(newMsg);
    setInputContent('');
  };

  return (
    <div className="space-y-6 h-[calc(100vh-12rem)] flex flex-col">
      {/* Header */}
      <div className="bg-slate-900/80 border border-cyan-500/20 p-6 rounded-2xl shadow-xl shrink-0">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-cyan-400" />
          {t.navDoctorChat}
        </h2>
        <p className="text-xs text-slate-400 mt-1">{t.navDoctorChat}</p>
      </div>

      {/* Chat Box */}
      <div className="bg-slate-900/80 border border-cyan-500/20 rounded-2xl p-6 shadow-xl flex-1 flex flex-col justify-between overflow-hidden">
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((m) => {
            const isPatient = m.sender === 'patient';
            return (
              <div key={m.id} className={`flex gap-3 ${isPatient ? 'justify-end' : 'justify-start'}`}>
                {!isPatient && (
                  <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shrink-0">
                    <Stethoscope className="w-4 h-4" />
                  </div>
                )}
                <div className={`max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed ${
                  isPatient ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white rounded-br-none shadow-lg' : 'bg-slate-800 border border-cyan-500/20 text-slate-200 rounded-bl-none shadow-lg'
                }`}>
                  <div className="flex items-center justify-between gap-4 text-[10px] text-cyan-200/80 mb-1">
                    <span className="font-bold">{m.senderName}</span>
                    <span>{m.timestamp}</span>
                  </div>
                  <p>{m.content}</p>
                </div>
              </div>
            );
          })}
        </div>

        <form onSubmit={handleSend} className="mt-4 pt-4 border-t border-slate-800 flex gap-3 shrink-0">
          <input
            type="text"
            value={inputContent}
            onChange={(e) => setInputContent(e.target.value)}
            placeholder="Type your follow-up message to Dr. Ananya Roy..."
            className="flex-1 bg-slate-950 border border-cyan-500/30 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
