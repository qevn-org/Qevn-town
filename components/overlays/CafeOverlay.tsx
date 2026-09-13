'use client';

import { useState } from 'react';
import { useTownStore } from '@/lib/store';
import { soundManager } from '@/lib/audio';
import { CAFE_DISPATCHES, CafeDispatch } from '@/data/cafeNews';
import { X, Coffee, BookOpen, Clock, Calendar, User } from 'lucide-react';

export function CafeOverlay() {
  const activeOverlay = useTownStore((s) => s.activeOverlay);
  const closeOverlay = useTownStore((s) => s.closeOverlay);
  const soundEnabled = useTownStore((s) => s.soundEnabled);

  const [selectedDispatch, setSelectedDispatch] = useState<CafeDispatch>(
    CAFE_DISPATCHES[0]
  );

  if (activeOverlay !== 'cafe') return null;

  const handleSelect = (dispatch: CafeDispatch) => {
    soundManager.playClick(soundEnabled);
    setSelectedDispatch(dispatch);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl brutalist-border-thick bg-[#F7F7F2] text-black p-6 sm:p-10 brutalist-shadow-lg max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b-4 border-black pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-black bg-[#FFD400] text-black px-2 py-0.5 uppercase">
                COMMUNITY & CULTURE
              </span>
              <span className="font-mono text-xs text-neutral-500 font-bold">
                QEVN CAFE // NEWS BULLETIN
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              NEWS FROM THE TOWN
            </h2>
            <p className="text-sm sm:text-base font-mono font-bold text-neutral-700 mt-1">
              DISPATCHES, PHILOSOPHY, ENGINEERING NOTES & TOWN DISCUSSIONS
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

        {/* 2-Column Layout: Dispatch List on Left, Reading Pane on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Dispatch Directory (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="font-mono text-xs font-bold text-neutral-600 uppercase mb-2">
              DISPATCH ARCHIVE
            </div>
            {CAFE_DISPATCHES.map((item) => {
              const isSelected = item.id === selectedDispatch.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className={`w-full text-left brutalist-border p-3.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-black text-[#F7F7F2] brutalist-shadow'
                      : 'bg-white text-black hover:bg-neutral-100'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[10px] mb-1">
                    <span
                      className={`font-black ${
                        isSelected ? 'text-[#FFD400]' : 'text-neutral-500'
                      }`}
                    >
                      {item.category}
                    </span>
                    <span className="text-neutral-400">{item.date}</span>
                  </div>
                  <h4 className="font-black text-xs sm:text-sm uppercase tracking-tight line-clamp-2">
                    {item.title}
                  </h4>
                </button>
              );
            })}
          </div>

          {/* Reading Pane (8 cols) */}
          <div className="lg:col-span-8 brutalist-border bg-white p-6 sm:p-8 brutalist-shadow">
            {/* Meta bar */}
            <div className="flex flex-wrap items-center gap-4 border-b-2 border-black pb-3 mb-4 font-mono text-xs text-neutral-600">
              <span className="flex items-center gap-1.5 font-bold">
                <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                {selectedDispatch.date}
              </span>
              <span className="flex items-center gap-1.5 font-bold">
                <Clock className="w-3.5 h-3.5 text-neutral-500" />
                {selectedDispatch.readTime}
              </span>
              <span className="flex items-center gap-1.5 font-bold">
                <User className="w-3.5 h-3.5 text-neutral-500" />
                {selectedDispatch.author}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-3xl font-black uppercase tracking-tight mb-4 text-black">
              {selectedDispatch.title}
            </h3>

            {/* Summary Quote */}
            <div className="border-l-4 border-[#FFD400] bg-[#FFFBEB] p-4 mb-6 font-mono text-xs sm:text-sm text-neutral-800 italic">
              {selectedDispatch.summary}
            </div>

            {/* Content Paragraphs */}
            <div className="space-y-4 font-mono text-xs sm:text-sm text-neutral-800 leading-relaxed">
              {selectedDispatch.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Signoff */}
            <div className="mt-8 pt-4 border-t-2 border-black font-mono text-xs text-neutral-500 flex items-center justify-between">
              <span>DISPATCH RECORDED AT QEVN CAFE</span>
              <Coffee className="w-4 h-4 text-amber-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
