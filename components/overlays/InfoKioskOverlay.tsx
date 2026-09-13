'use client';

import { useTownStore } from '@/lib/store';
import { soundManager } from '@/lib/audio';
import { X, Compass, Info, Building2, Cpu, Coffee, Train, ShieldAlert } from 'lucide-react';

export function InfoKioskOverlay() {
  const activeOverlay = useTownStore((s) => s.activeOverlay);
  const closeOverlay = useTownStore((s) => s.closeOverlay);
  const openOverlay = useTownStore((s) => s.openOverlay);
  const soundEnabled = useTownStore((s) => s.soundEnabled);

  if (activeOverlay !== 'kiosk') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl brutalist-border-thick bg-[#F7F7F2] text-black p-6 sm:p-10 brutalist-shadow-lg max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b-4 border-black pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-black bg-[#FFD400] text-black px-2 py-0.5 uppercase">
                CIVIC INFORMATION DIRECTORY
              </span>
              <span className="font-mono text-xs text-neutral-500 font-bold">
                CENTRAL PLAZA // KIOSK 01
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              TOWN GUIDE
            </h2>
            <p className="text-sm sm:text-base font-mono font-bold text-neutral-700 mt-1">
              WELCOME TO QEVN TOWN. NAVIGATE DISTRICTS, DISCOVER SECRETS & COMMISSION BUILDS.
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

        {/* District Overview Cards */}
        <div className="space-y-3 mb-8">
          <div className="brutalist-border bg-white p-4 flex items-start gap-3">
            <Building2 className="w-5 h-5 text-black shrink-0 mt-0.5" />
            <div>
              <div className="font-black text-sm uppercase">CENTRAL PLAZA & QEVN HQ (NORTH)</div>
              <div className="font-mono text-xs text-neutral-600">
                The anchor of the town. Monumental architecture, engineering manifesto, verified telemetry, and studio culture.
              </div>
            </div>
          </div>

          <div className="brutalist-border bg-white p-4 flex items-start gap-3">
            <Cpu className="w-5 h-5 text-[#3A7DFF] shrink-0 mt-0.5" />
            <div>
              <div className="font-black text-sm uppercase">INNOVATION QUAD & AI LAB (WEST)</div>
              <div className="font-mono text-xs text-neutral-600">
                Frontier technology research: AI Research Lab with live agent swarm simulator, Automation Factory, and secure Tier-IV Data Center.
              </div>
            </div>
          </div>

          <div className="brutalist-border bg-white p-4 flex items-start gap-3">
            <Coffee className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-black text-sm uppercase">COMMERCIAL SECTOR (EAST)</div>
              <div className="font-mono text-xs text-neutral-600">
                Real businesses as interactive case studies: Pixel Coffee, Null Hotel, Loop Market, and QEVN Cafe dispatches.
              </div>
            </div>
          </div>

          <div className="brutalist-border bg-white p-4 flex items-start gap-3">
            <Train className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-black text-sm uppercase">RAPID TRANSIT TERMINAL (SOUTH)</div>
              <div className="font-mono text-xs text-neutral-600">
                QEVN Central Station running high-speed Green, Blue, Red, Yellow, and Black rail lines for rapid district hopping.
              </div>
            </div>
          </div>

          <div className="brutalist-border bg-amber-50 p-4 flex items-start gap-3 border-amber-400">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-black text-sm uppercase text-amber-900">5 HIDDEN EASTER EGGS</div>
              <div className="font-mono text-xs text-amber-800">
                The town holds 5 hidden discoveries. Check the high voltage breaker behind HQ, the Data Center vent, the station spur, or rest on a quiet park bench.
              </div>
            </div>
          </div>
        </div>

        {/* Quick Map Button */}
        <div className="pt-4 border-t-2 border-black flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => {
              soundManager.playClick(soundEnabled);
              openOverlay('map');
            }}
            className="w-full sm:w-auto brutalist-btn bg-[#FFD400] text-black py-2.5 px-5 text-xs font-black uppercase hover:bg-[#e6be00]"
          >
            <Compass className="w-4 h-4" />
            OPEN TOWN SCHEMATIC MAP [M]
          </button>
          <button
            onClick={closeOverlay}
            className="w-full sm:w-auto brutalist-btn bg-black text-[#F7F7F2] py-2.5 px-5 text-xs font-bold hover:bg-neutral-800"
          >
            RESUME EXPLORING
          </button>
        </div>
      </div>
    </div>
  );
}
