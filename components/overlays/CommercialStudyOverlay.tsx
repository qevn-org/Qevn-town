'use client';

import { useState } from 'react';
import { useTownStore } from '@/lib/store';
import { soundManager } from '@/lib/audio';
import { COMMERCIAL_STUDIES, CommercialCaseStudy } from '@/data/commercialStudies';
import {
  X,
  Store,
  CheckCircle2,
  BarChart3,
  ArrowRight,
  Sparkles,
  Zap,
} from 'lucide-react';

export function CommercialStudyOverlay() {
  const activeOverlay = useTownStore((s) => s.activeOverlay);
  const closeOverlay = useTownStore((s) => s.closeOverlay);
  const openOverlay = useTownStore((s) => s.openOverlay);
  const selectedCommercialId = useTownStore((s) => s.selectedCommercialId);
  const soundEnabled = useTownStore((s) => s.soundEnabled);

  const [demoState, setDemoState] = useState<'idle' | 'running' | 'success'>('idle');

  if (activeOverlay !== 'commercial-study') return null;

  const currentStudy: CommercialCaseStudy =
    COMMERCIAL_STUDIES.find((s) => s.id === selectedCommercialId) ||
    COMMERCIAL_STUDIES[0];

  const handleRunDemo = () => {
    soundManager.playClick(soundEnabled);
    setDemoState('running');
    setTimeout(() => {
      setDemoState('success');
      soundManager.playFanfare(soundEnabled);
    }, 900);
  };

  const handleCommissionClick = () => {
    soundManager.playClick(soundEnabled);
    openOverlay('post-office');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl brutalist-border-thick bg-[#F7F7F2] text-black p-6 sm:p-10 brutalist-shadow-lg max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b-4 border-black pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="font-mono text-xs font-black px-2 py-0.5 uppercase border-2 border-black"
                style={{ backgroundColor: currentStudy.accentColor, color: '#000000' }}
              >
                INTERACTIVE CASE STUDY
              </span>
              <span className="font-mono text-xs text-neutral-500 font-bold">
                {currentStudy.district}
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              {currentStudy.name}
            </h2>
            <p className="text-sm sm:text-base font-mono font-bold text-neutral-700 mt-1">
              {currentStudy.tagline}
            </p>
          </div>
          <button
            onClick={closeOverlay}
            className="brutalist-btn bg-black text-[#F7F7F2] p-2 hover:bg-neutral-800"
            title="Close (ESC)"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Narrative & QEVN Solution */}
        <div className="space-y-6 mb-8">
          <div className="brutalist-border bg-white p-5 brutalist-shadow-sm">
            <div className="font-mono text-xs font-black uppercase mb-1 flex items-center gap-2 text-neutral-600">
              <Store className="w-4 h-4 text-black" />
              <span>THE PHYSICAL ESTABLISHMENT</span>
            </div>
            <p className="text-sm font-mono text-neutral-800 leading-relaxed">
              {currentStudy.description}
            </p>
          </div>

          <div className="brutalist-border bg-[#0A0A0A] text-white p-5 sm:p-6 brutalist-shadow">
            <div className="flex items-center gap-2 font-mono text-xs font-black text-[#B7FF00] uppercase mb-2">
              <Zap className="w-4 h-4" />
              <span>THE QEVN DIGITAL SOLUTION</span>
            </div>
            <p className="text-sm sm:text-base font-mono leading-relaxed text-neutral-300">
              {currentStudy.qevnSolution}
            </p>
          </div>
        </div>

        {/* Verified Metrics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {currentStudy.metrics.map((m, i) => (
            <div key={i} className="brutalist-border bg-white p-4">
              <div className="flex items-center gap-2 font-mono text-[10px] text-neutral-500 uppercase mb-1">
                <BarChart3 className="w-3.5 h-3.5" style={{ color: currentStudy.accentColor }} />
                <span>{m.label}</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-black">
                {m.value}
              </div>
            </div>
          ))}
        </div>

        {/* System Capabilities List */}
        <div className="brutalist-border bg-white p-5 mb-8">
          <div className="font-mono text-xs font-black uppercase mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>DEPLOYED ARCHITECTURE & CAPABILITIES</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {currentStudy.features.map((feat, idx) => (
              <div
                key={idx}
                className="border border-neutral-300 bg-[#F7F7F2] p-2.5 font-mono text-xs text-neutral-800"
              >
                &gt; {feat}
              </div>
            ))}
          </div>
        </div>

        {/* Live Interactive Digital Demo Simulator */}
        <div className="brutalist-border-thick bg-[#141414] text-white p-5 sm:p-6 mb-8">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B7FF00]" />
              <span className="font-mono text-xs font-black text-[#B7FF00] uppercase">
                LIVE PROTOCOL SIMULATION
              </span>
            </div>
            <span className="font-mono text-[10px] text-neutral-500">EDGE WORKER // 0ms TTFB</span>
          </div>

          {demoState === 'idle' && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="font-mono text-xs text-neutral-400">
                Trigger real-time edge transaction dispatch for {currentStudy.name}.
              </div>
              <button
                onClick={handleRunDemo}
                className="brutalist-btn py-3 px-6 text-xs font-black uppercase"
                style={{ backgroundColor: currentStudy.accentColor, color: '#000000' }}
              >
                TEST SIMULATION DISPATCH
              </button>
            </div>
          )}

          {demoState === 'running' && (
            <div className="flex items-center gap-3 py-2 font-mono text-xs text-[#B7FF00]">
              <div className="w-4 h-4 border-2 border-[#B7FF00] border-t-transparent rounded-full animate-spin" />
              <span>DISPATCHING EVENT TO EDGE WORKERS (42ms)...</span>
            </div>
          )}

          {demoState === 'success' && (
            <div className="bg-black border border-[#B7FF00] p-4 font-mono text-xs space-y-1">
              <div className="text-[#B7FF00] font-black">
                ✓ SIMULATION COMPLETED IN 124ms
              </div>
              <div className="text-neutral-300">
                &gt; PAYLOAD ROUTED VIA NEXT.JS EDGE COMPUTATION
              </div>
              <div className="text-neutral-400">
                &gt; SYSTEM STATE COMMITTED WITH ZERO LATENCY SPIKES
              </div>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t-2 border-black">
          <div className="font-mono text-xs text-neutral-600 text-center sm:text-left">
            WANT QEVN TO ENGINEER A SYSTEM LIKE THIS FOR YOUR BUSINESS?
          </div>
          <button
            onClick={handleCommissionClick}
            className="w-full sm:w-auto brutalist-btn bg-[#B7FF00] text-black py-3 px-6 text-sm font-black hover:bg-[#a5ea00]"
          >
            COMMISSION A DIGITAL SYSTEM
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
