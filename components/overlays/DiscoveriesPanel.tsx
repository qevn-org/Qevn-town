'use client';

import { useTownStore } from '@/lib/store';
import { SECRETS } from '@/data/secrets';
import { X, KeyRound, CheckCircle, Lock } from 'lucide-react';

export function DiscoveriesPanel() {
  const activeOverlay = useTownStore((s) => s.activeOverlay);
  const closeOverlay = useTownStore((s) => s.closeOverlay);
  const discoveredSecrets = useTownStore((s) => s.discoveredSecrets);

  if (activeOverlay !== 'discoveries') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl brutalist-border-thick bg-[#F7F7F2] text-black p-6 sm:p-10 brutalist-shadow-lg max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b-4 border-black pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-black bg-black text-[#FFD400] px-2 py-0.5 uppercase">
                EXPLORATION LOG
              </span>
              <span className="font-mono text-xs text-neutral-500 font-bold">
                {discoveredSecrets.length} / {SECRETS.length} UNLOCKED
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              TOWN DISCOVERIES
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

        {/* Secrets Checklist */}
        <div className="space-y-4 mb-6">
          {SECRETS.map((secret, idx) => {
            const isFound = discoveredSecrets.includes(secret.id);
            return (
              <div
                key={secret.id}
                className={`brutalist-border p-5 transition-all ${
                  isFound ? 'bg-white brutalist-shadow' : 'bg-[#ECEAE2] opacity-85'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-black bg-black text-[#F7F7F2] px-2 py-0.5">
                      #{idx + 1}
                    </span>
                    <h3 className="font-black text-sm sm:text-base uppercase">
                      {isFound ? secret.name : 'ENCRYPTED EASTER EGG'}
                    </h3>
                  </div>
                  {isFound ? (
                    <div className="flex items-center gap-1 font-mono text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 border border-emerald-500">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>FOUND</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 font-mono text-xs font-bold text-neutral-500 bg-neutral-200 px-2 py-0.5 border border-neutral-400">
                      <Lock className="w-3.5 h-3.5" />
                      <span>LOCKED</span>
                    </div>
                  )}
                </div>

                {isFound ? (
                  <p className="font-mono text-xs sm:text-sm text-neutral-700 leading-relaxed">
                    {secret.unlockedDescription}
                  </p>
                ) : (
                  <p className="font-mono text-xs text-neutral-600 italic">
                    HINT: {secret.hint}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Close button */}
        <button
          onClick={closeOverlay}
          className="w-full brutalist-btn bg-[#B7FF00] text-black py-3 px-6 text-sm font-black hover:bg-[#a5ea00]"
        >
          CONTINUE EXPLORING
        </button>
      </div>
    </div>
  );
}
