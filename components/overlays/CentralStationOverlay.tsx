'use client';

import { useTownStore } from '@/lib/store';
import { soundManager } from '@/lib/audio';
import { trackEvent } from '@/lib/analytics';
import { X, Train, Zap, ArrowRight } from 'lucide-react';

export function CentralStationOverlay() {
  const activeOverlay = useTownStore((s) => s.activeOverlay);
  const closeOverlay = useTownStore((s) => s.closeOverlay);
  const teleportTo = useTownStore((s) => s.teleportTo);
  const soundEnabled = useTownStore((s) => s.soundEnabled);

  if (activeOverlay !== 'station') return null;

  const trainLines = [
    {
      id: 'green',
      name: 'GREEN LINE // PRODUCTS & SAAS',
      destName: 'Project Street & Software Strip',
      destCoords: [-12, 0.08, 14] as [number, number, number],
      color: '#B7FF00',
      textColor: '#000000',
    },
    {
      id: 'blue',
      name: 'BLUE LINE // AI & AGENTS',
      destName: 'Innovation Quad & AI Research Lab',
      destCoords: [-22, 0.08, -4] as [number, number, number],
      color: '#3A7DFF',
      textColor: '#FFFFFF',
    },
    {
      id: 'red',
      name: 'RED LINE // CENTRAL PLAZA & HQ',
      destName: 'Global Headquarters & Civic Heart',
      destCoords: [0, 0.08, 6] as [number, number, number],
      color: '#FF4444',
      textColor: '#FFFFFF',
    },
    {
      id: 'yellow',
      name: 'YELLOW LINE // COMMERCIAL SECTOR',
      destName: 'Pixel Coffee & Market Street',
      destCoords: [22, 0.08, 6] as [number, number, number],
      color: '#FFD400',
      textColor: '#000000',
    },
    {
      id: 'black',
      name: 'BLACK LINE // EXPERIMENTAL BACK ALLEY',
      destName: 'Alleyway 01 & Restricted Utility Switch',
      destCoords: [-7, 0.08, -26] as [number, number, number],
      color: '#18181B',
      textColor: '#B7FF00',
    },
  ];

  const handleBoardTrain = (line: (typeof trainLines)[0]) => {
    soundManager.playTrainSound(soundEnabled);
    trackEvent('teleport_used', { transitLine: line.name });
    teleportTo(line.destCoords);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl brutalist-border-thick bg-[#F7F7F2] text-black p-6 sm:p-10 brutalist-shadow-lg max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b-4 border-black pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-black bg-[#B7FF00] text-black px-2 py-0.5 uppercase">
                RAPID TRANSIT TERMINAL
              </span>
              <span className="font-mono text-xs text-neutral-500 font-bold">
                QEVN CENTRAL // DEPARTURE BOARD
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              SELECT TRANSIT LINE
            </h2>
            <p className="text-sm sm:text-base font-mono font-bold text-neutral-700 mt-1">
              BOARD A HIGH-SPEED TRANSIT LINE TO TELEPORT ACROSS DISTRICTS
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

        {/* Departure Lines List */}
        <div className="space-y-3 mb-8">
          {trainLines.map((line) => (
            <button
              key={line.id}
              onClick={() => handleBoardTrain(line)}
              className="w-full brutalist-border p-4 text-left transition-all hover:translate-x-1 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white hover:bg-neutral-50"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center shrink-0"
                  style={{ backgroundColor: line.color, color: line.textColor }}
                >
                  <Train className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-black text-sm sm:text-base uppercase tracking-tight">
                    {line.name}
                  </div>
                  <div className="font-mono text-xs text-neutral-600">
                    DESTINATION: {line.destName}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs font-black shrink-0 text-black">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>BOARD TRAIN</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t-2 border-black flex items-center justify-between font-mono text-xs text-neutral-600">
          <span>QEVN MUNICIPAL RAPID TRANSIT AUTHORITY</span>
          <button
            onClick={closeOverlay}
            className="brutalist-btn bg-black text-[#F7F7F2] py-2 px-4 text-xs font-bold hover:bg-neutral-800"
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}
