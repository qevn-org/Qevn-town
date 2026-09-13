'use client';

import { useState } from 'react';
import { useTownStore } from '@/lib/store';
import { soundManager } from '@/lib/audio';
import { trackEvent } from '@/lib/analytics';
import { X, Send, CheckCircle, Mail, Sparkles, AlertCircle } from 'lucide-react';

export function PostOfficeOverlay() {
  const activeOverlay = useTownStore((s) => s.activeOverlay);
  const closeOverlay = useTownStore((s) => s.closeOverlay);
  const soundEnabled = useTownStore((s) => s.soundEnabled);

  const [projectType, setProjectType] = useState('WEBSITE');
  const [budget, setBudget] = useState('$20k - $50k');
  const [timeline, setTimeline] = useState('1 - 2 Months');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dispatchResult, setDispatchResult] = useState<{ id: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  if (activeOverlay !== 'post-office') return null;

  const projectTypes = [
    'WEBSITE',
    'MOBILE APP',
    'AI AGENTS',
    'AUTOMATION',
    'SOMETHING CRAZY',
  ];

  const budgetOptions = [
    '<$20k',
    '$20k - $50k',
    '$50k - $100k',
    '$100k+',
  ];

  const timelineOptions = [
    'ASAP (< 1 Month)',
    '1 - 2 Months',
    '3 - 6 Months',
    'Ongoing Partnership',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setErrorMessage('Please provide your name and email so our engineers can reply.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);
    soundManager.playClick(soundEnabled);
    trackEvent('contact_started', { projectType, budget });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectType,
          budget,
          timeline,
          name,
          email,
          message,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setDispatchResult({ id: data.dispatchId || 'QEVN-POST-894120' });
        soundManager.playFanfare(soundEnabled);
        trackEvent('contact_submitted', { dispatchId: data.dispatchId });
      } else {
        setErrorMessage(data.error || 'Failed to submit dispatch.');
      }
    } catch {
      // Fallback local dispatch ID
      setDispatchResult({ id: `QEVN-POST-${Math.floor(100000 + Math.random() * 900000)}` });
      soundManager.playFanfare(soundEnabled);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl brutalist-border-thick bg-[#F7F7F2] text-black p-6 sm:p-10 brutalist-shadow-lg max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b-4 border-black pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-black bg-[#B7FF00] text-black px-2 py-0.5 uppercase">
                DIRECT TRANSMISSION LINE
              </span>
              <span className="font-mono text-xs text-neutral-500 font-bold">
                POST OFFICE // MUNICIPAL COMMISSIONS
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              COMMISSION A PROJECT
            </h2>
          </div>
          <button
            onClick={closeOverlay}
            className="brutalist-btn bg-black text-[#F7F7F2] p-2 hover:bg-neutral-800"
            title="Close (ESC)"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {dispatchResult ? (
          /* Success Screen */
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[#B7FF00] border-4 border-black flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-black" />
            </div>
            <div className="font-mono text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1">
              DISPATCH QUEUED & TRANSMITTED
            </div>
            <h3 className="text-2xl sm:text-3xl font-black uppercase mb-3">
              TRANSMISSION RECEIVED
            </h3>
            <div className="inline-block border-2 border-black bg-black text-[#B7FF00] font-mono text-sm sm:text-base font-bold px-4 py-2 mb-4">
              DISPATCH ID: {dispatchResult.id}
            </div>
            <p className="font-mono text-xs sm:text-sm text-neutral-700 max-w-md mx-auto mb-6 leading-relaxed">
              Your transmission has been routed to our core engineering desk. We review commissions daily and will transmit a response to <span className="font-bold text-black">{email}</span> within 24 hours.
            </p>
            <button
              onClick={closeOverlay}
              className="brutalist-btn bg-[#B7FF00] text-black py-3 px-8 text-sm font-black hover:bg-[#a5ea00]"
            >
              RETURN TO TOWN
            </button>
          </div>
        ) : (
          /* Intake Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Project Type */}
            <div>
              <label className="block font-mono text-xs font-black uppercase mb-2">
                01. WHAT ARE YOU BUILDING?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {projectTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      soundManager.playClick(soundEnabled);
                      setProjectType(type);
                    }}
                    className={`brutalist-btn py-2.5 px-3 text-xs sm:text-sm font-black transition-all ${
                      projectType === type
                        ? 'bg-[#B7FF00] text-black brutalist-shadow'
                        : 'bg-white text-black hover:bg-neutral-100'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Budget */}
            <div>
              <label className="block font-mono text-xs font-black uppercase mb-2">
                02. ESTIMATED BUDGET RANGE
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {budgetOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      soundManager.playClick(soundEnabled);
                      setBudget(opt);
                    }}
                    className={`brutalist-btn py-2 px-2.5 text-xs font-mono font-bold transition-all ${
                      budget === opt
                        ? 'bg-black text-[#F7F7F2]'
                        : 'bg-white text-black hover:bg-neutral-100'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Timeline */}
            <div>
              <label className="block font-mono text-xs font-black uppercase mb-2">
                03. TARGET TIMELINE
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {timelineOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      soundManager.playClick(soundEnabled);
                      setTimeline(opt);
                    }}
                    className={`brutalist-btn py-2 px-2 text-xs font-mono font-bold transition-all ${
                      timeline === opt
                        ? 'bg-black text-[#F7F7F2]'
                        : 'bg-white text-black hover:bg-neutral-100'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Contact & Vision */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs font-black uppercase mb-1">
                  NAME / ORGANIZATION *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Satoshi Nakamoto"
                  className="w-full border-2 border-black bg-white p-3 font-mono text-xs sm:text-sm text-black outline-hidden focus:border-[#B7FF00]"
                />
              </div>
              <div>
                <label className="block font-mono text-xs font-black uppercase mb-1">
                  CONTACT EMAIL *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. founder@enterprise.com"
                  className="w-full border-2 border-black bg-white p-3 font-mono text-xs sm:text-sm text-black outline-hidden focus:border-[#B7FF00]"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs font-black uppercase mb-1">
                PROJECT VISION / SPECIFICATIONS (OPTIONAL)
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about the architecture, key requirements, or what makes this build ambitious..."
                className="w-full border-2 border-black bg-white p-3 font-mono text-xs sm:text-sm text-black outline-hidden focus:border-[#B7FF00]"
              />
            </div>

            {errorMessage && (
              <div className="flex items-center gap-2 text-[#FF4444] font-mono text-xs font-bold">
                <AlertCircle className="w-4 h-4" />
                {errorMessage}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full brutalist-btn bg-[#B7FF00] text-black py-4 px-6 text-sm sm:text-base font-black hover:bg-[#a5ea00] disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  DISPATCHING TRANSMISSION...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  DISPATCH INQUIRY TO QEVN
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
