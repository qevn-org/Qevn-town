'use client';

import { useState, useEffect } from 'react';
import { useTownStore } from '@/lib/store';
import { soundManager } from '@/lib/audio';
import { trackEvent } from '@/lib/analytics';
import { Terminal, Volume2, ArrowRight } from 'lucide-react';

export function BootScreen() {
  const [progress, setProgress] = useState(0);
  const [bootStep, setBootStep] = useState(0);
  const setGameState = useTownStore((s) => s.setGameState);
  const setSoundEnabled = useTownStore((s) => s.setSoundEnabled);

  const bootLogs = [
    'SYS.INIT // QEVN CITY SYSTEM V1.0.4',
    'ALLOCATING SPATIAL MEMORY MATRICES...',
    'COMPILING BRUTALIST SHADER PIPELINES...',
    'CONNECTING AI RESEARCH AGENT NETWORKS...',
    'SYNCING TOWN INFRASTRUCTURE & MUNICIPAL GRIDS...',
    'CITY STATUS: ONLINE. READY FOR ENTRY.',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 18 + 8);
        return next > 100 ? 100 : next;
      });
    }, 180);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const step = Math.min(
      Math.floor((progress / 100) * bootLogs.length),
      bootLogs.length - 1
    );
    setBootStep(step);
  }, [progress, bootLogs.length]);

  const handleEnterTown = (withSound: boolean) => {
    setSoundEnabled(withSound);
    if (withSound) {
      soundManager.playChime(true);
      soundManager.updateAmbience(true);
    }
    setGameState('playing');
    trackEvent('town_loaded', { withSound });
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0A0A] p-4 text-[#F7F7F2]">
      {/* Background brutalist grid */}
      <div className="absolute inset-0 bg-brutalist-grid-dark opacity-30 pointer-events-none" />

      <div className="relative w-full max-w-2xl brutalist-border-thick bg-[#141414] p-6 sm:p-10 brutalist-shadow-lg">
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between border-b-2 border-[#2A2A2A] pb-4 mb-6">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-[#B7FF00]" />
            <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-[#B7FF00]">
              QEVN TOWN // SYSTEM BOOT
            </span>
          </div>
          <span className="font-mono text-xs text-neutral-400">BUILD.2025.10</span>
        </div>

        {/* Hero Title */}
        <div className="mb-6">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-none text-[#F7F7F2]">
            QEVN <span className="text-[#B7FF00]">TOWN</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base font-mono text-neutral-300">
            DON&apos;T BROWSE QEVN. ENTER QEVN.
          </p>
        </div>

        {/* Boot Terminal Log Box */}
        <div className="bg-[#0A0A0A] border-2 border-black p-4 mb-6 font-mono text-xs sm:text-sm space-y-1.5 h-36 overflow-hidden">
          {bootLogs.slice(0, bootStep + 1).map((log, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 ${
                index === bootStep ? 'text-[#B7FF00]' : 'text-neutral-400'
              }`}
            >
              <span className="text-neutral-600">&gt;</span>
              <span>{log}</span>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between font-mono text-xs mb-2">
            <span className="text-neutral-400">INITIALIZATION PROGRESS</span>
            <span className="font-bold text-[#B7FF00]">{progress}%</span>
          </div>
          <div className="w-full h-4 border-2 border-black bg-[#0A0A0A] p-0.5">
            <div
              className="h-full bg-[#B7FF00] transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Enter Actions */}
        {progress >= 100 ? (
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => handleEnterTown(true)}
              className="flex-1 brutalist-btn bg-[#B7FF00] text-black py-4 px-6 text-sm sm:text-base font-black hover:bg-[#a5ea00]"
            >
              <Volume2 className="w-5 h-5" />
              ENTER TOWN (AUDIO ON)
            </button>
            <button
              onClick={() => handleEnterTown(false)}
              className="brutalist-btn bg-[#F7F7F2] text-black py-4 px-6 text-sm sm:text-base font-bold hover:bg-[#E5E5DF]"
            >
              ENTER MUTED
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="text-center py-4 font-mono text-xs text-neutral-400 animate-pulse">
            INITIALIZING CITY WORLD MATRICES...
          </div>
        )}
      </div>

      <div className="mt-4 font-mono text-xs text-neutral-500">
        POWERED BY NEXT.JS // REACT THREE FIBER // BRUTALIST ARCHITECTURE
      </div>
    </div>
  );
}
