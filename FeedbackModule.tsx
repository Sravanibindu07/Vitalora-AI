import React, { useState } from 'react';
import { Smile, Star, Sparkles, Send } from 'lucide-react';
import { Feedback } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface FeedbackModuleProps {
  feedbacks: Feedback[];
  onAddFeedback: (fb: Feedback) => void;
}

export const FeedbackModule: React.FC<FeedbackModuleProps> = ({ feedbacks, onAddFeedback }) => {
  const { t } = useLanguage();
  const [patientName, setPatientName] = useState('');
  const [waitingTime, setWaitingTime] = useState(5);
  const [doctorInteraction, setDoctorInteraction] = useState(5);
  const [cleanliness, setCleanliness] = useState(5);
  const [staffBehavior, setStaffBehavior] = useState(5);
  const [overall, setOverall] = useState(5);
  const [comments, setComments] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName) return;

    const newFb: Feedback = {
      id: `fb-${Date.now()}`,
      patientName,
      waitingTimeRating: waitingTime,
      doctorInteractionRating: doctorInteraction,
      cleanlinessRating: cleanliness,
      staffBehaviorRating: staffBehavior,
      overallRating: overall,
      comments,
      date: new Date().toISOString().split('T')[0]
    };

    onAddFeedback(newFb);
    setPatientName('');
    setComments('');
    alert('Thank you for your valuable feedback! Vitalora AI has processed your review.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 border border-cyan-500/20 p-6 rounded-2xl shadow-xl">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Smile className="w-5 h-5 text-cyan-400" />
          {t.navFeedback}
        </h2>
        <p className="text-xs text-slate-400 mt-1">{t.navFeedback}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Feedback Form */}
        <div className="bg-slate-900/80 border border-cyan-500/20 rounded-2xl p-6 shadow-xl">
          <h3 className="text-base font-bold text-white mb-4">Submit Visit Feedback</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 font-medium">Your Full Name *</label>
              <input
                type="text"
                required
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Enter patient name"
                className="w-full mt-1 bg-slate-950 border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 font-medium">Waiting Time (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={waitingTime}
                  onChange={(e) => setWaitingTime(parseInt(e.target.value) || 5)}
                  className="w-full mt-1 bg-slate-950 border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-medium">Doctor Interaction (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={doctorInteraction}
                  onChange={(e) => setDoctorInteraction(parseInt(e.target.value) || 5)}
                  className="w-full mt-1 bg-slate-950 border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 font-medium">Cleanliness (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={cleanliness}
                  onChange={(e) => setCleanliness(parseInt(e.target.value) || 5)}
                  className="w-full mt-1 bg-slate-950 border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-medium">Overall Experience (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={overall}
                  onChange={(e) => setOverall(parseInt(e.target.value) || 5)}
                  className="w-full mt-1 bg-slate-950 border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 font-medium">Additional Comments</label>
              <textarea
                rows={3}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Share your suggestions or appreciation..."
                className="w-full mt-1 bg-slate-950 border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              Submit Feedback
            </button>
          </form>
        </div>

        {/* Feedback Insights */}
        <div className="bg-slate-900/80 border border-cyan-500/20 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white mb-2">Smart Insights & Reviews</h3>
          <div className="space-y-3">
            {feedbacks.map((fb) => (
              <div key={fb.id} className="bg-slate-950/70 border border-cyan-500/10 p-4 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span>{fb.patientName}</span>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{fb.overallRating}.0 / 5.0</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 italic">"{fb.comments}"</p>
                <p className="text-[10px] text-slate-400">{fb.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
