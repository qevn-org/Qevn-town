'use client';

import { useTownStore } from '@/lib/store';
import { soundManager } from '@/lib/audio';
import { X, Building2, Code2, Cpu, Zap, ArrowRight } from 'lucide-react';

export function HqOverlay() {
  const activeOverlay = useTownStore((s) => s.activeOverlay);
  const closeOverlay = useTownStore((s) => s.closeOverlay);
  const openOverlay = useTownStore((s) => s.openOverlay);
  const soundEnabled = useTownStore((s) => s.soundEnabled);

  if (activeOverlay !== 'hq') return null;

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
              <span className="font-mono text-xs font-black bg-black text-[#B7FF00] px-2 py-0.5 uppercase">
                GLOBAL HEADQUARTERS
              </span>
              <span className="font-mono text-xs text-neutral-500 font-bold">
                EST. 2024 // ENG.01
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              QEVN HQ
            </h2>
            <p className="text-sm sm:text-base font-mono font-bold text-neutral-700 mt-1">
              DON&apos;T BROWSE QEVN. ENTER QEVN.
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

        {/* Hero Manifesto Box */}
        <div className="brutalist-border bg-black text-[#F7F7F2] p-5 sm:p-6 mb-8 brutalist-shadow">
          <h3 className="text-xl sm:text-2xl font-black text-[#B7FF00] uppercase mb-2">
            WE ENGINEER LIVING DIGITAL WORLDS.
          </h3>
          <p className="text-sm sm:text-base font-mono leading-relaxed text-neutral-300">
            QEVN is an unconventional creative technology studio and engineering lab. We don’t assemble standard SaaS websites with cookie-cutter components. We build spatial experiences, high-throughput autonomous AI systems, and rock-solid software infrastructure designed to dominate modern digital attention.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="brutalist-border bg-white p-5 brutalist-shadow-sm">
            <div className="w-10 h-10 border-2 border-black bg-[#B7FF00] flex items-center justify-center mb-3">
              <Code2 className="w-6 h-6 text-black" />
            </div>
            <h4 className="font-black text-lg uppercase mb-1">FRONT-TIER CODE</h4>
            <p className="text-xs font-mono text-neutral-700 leading-relaxed">
              Next.js App Router, real-time Three.js WebGL graphics, sub-100ms Core Web Vitals, and zero-compromise responsive polish.
            </p>
          </div>

          <div className="brutalist-border bg-white p-5 brutalist-shadow-sm">
            <div className="w-10 h-10 border-2 border-black bg-[#3A7DFF] flex items-center justify-center mb-3">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-black text-lg uppercase mb-1">AUTONOMOUS AI</h4>
            <p className="text-xs font-mono text-neutral-700 leading-relaxed">
              Multi-agent swarms, self-healing memory pools, high-throughput RAG search, and custom neural reasoning pipelines.
            </p>
          </div>

          <div className="brutalist-border bg-white p-5 brutalist-shadow-sm">
            <div className="w-10 h-10 border-2 border-black bg-[#FFD400] flex items-center justify-center mb-3">
              <Zap className="w-6 h-6 text-black" />
            </div>
            <h4 className="font-black text-lg uppercase mb-1">BRUTALIST DESIGN</h4>
            <p className="text-xs font-mono text-neutral-700 leading-relaxed">
              Heavy typography, hard-edge tactile interfaces, and unapologetic brand experiences that people screenshot and talk about.
            </p>
          </div>
        </div>

        {/* Studio Telemetry Stats */}
        <div className="border-4 border-black bg-[#ECEAE2] p-5 mb-8">
          <div className="font-mono text-xs font-bold text-neutral-600 uppercase mb-3">
            VERIFIED PRODUCTION TELEMETRY
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white border-2 border-black p-3">
              <div className="text-2xl sm:text-3xl font-black text-black">99.99%</div>
              <div className="font-mono text-[10px] text-neutral-600 uppercase font-bold">UPTIME SLA</div>
            </div>
            <div className="bg-white border-2 border-black p-3">
              <div className="text-2xl sm:text-3xl font-black text-[#3A7DFF]">1.4M+</div>
              <div className="font-mono text-[10px] text-neutral-600 uppercase font-bold">DAILY AGENT RUNS</div>
            </div>
            <div className="bg-white border-2 border-black p-3">
              <div className="text-2xl sm:text-3xl font-black text-[#FF4444]">&lt;150ms</div>
              <div className="font-mono text-[10px] text-neutral-600 uppercase font-bold">TOOL EXECUTION</div>
            </div>
            <div className="bg-white border-2 border-black p-3">
              <div className="text-2xl sm:text-3xl font-black text-[#B7FF00] bg-black">60 FPS</div>
              <div className="font-mono text-[10px] text-neutral-600 uppercase font-bold">SPATIAL RENDER</div>
            </div>
          </div>
        </div>

        {/* CTA Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t-2 border-black">
          <div className="font-mono text-xs text-neutral-600 text-center sm:text-left">
            READY TO BUILD SOMETHING UNFORGETTABLE?
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleCommissionClick}
              className="w-full sm:w-auto brutalist-btn bg-[#B7FF00] text-black py-3 px-6 text-sm font-black hover:bg-[#a5ea00]"
            >
              COMMISSION A PROJECT
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
