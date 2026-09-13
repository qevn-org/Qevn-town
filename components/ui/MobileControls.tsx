'use client';

import { useRef, useState, useEffect, TouchEvent } from 'react';
import { useTownStore } from '@/lib/store';
import { Sparkles } from 'lucide-react';

export function MobileControls() {
  const setJoystickVector = useTownStore((s) => s.setJoystickVector);
  const triggerInteract = useTownStore((s) => s.triggerInteract);
  const activeOverlay = useTownStore((s) => s.activeOverlay);

  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [knobPos, setKnobPos] = useState({ x: 0, y: 0 });

  const joystickBaseRef = useRef<HTMLDivElement>(null);
  const touchIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Detect touch capability
    if (typeof window !== 'undefined') {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(hasTouch);
    }
  }, []);

  if (!isTouchDevice || activeOverlay !== 'none') {
    return null;
  }

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    const touch = e.changedTouches[0];
    touchIdRef.current = touch.identifier;
    setIsDragging(true);
    updateJoystick(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      if (touch.identifier === touchIdRef.current) {
        updateJoystick(touch.clientX, touch.clientY);
        break;
      }
    }
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === touchIdRef.current) {
        touchIdRef.current = null;
        setIsDragging(false);
        setKnobPos({ x: 0, y: 0 });
        setJoystickVector({ x: 0, y: 0 });
        break;
      }
    }
  };

  const updateJoystick = (clientX: number, clientY: number) => {
    if (!joystickBaseRef.current) return;
    const rect = joystickBaseRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const maxRadius = rect.width / 2;
    let dx = clientX - centerX;
    let dy = clientY - centerY;

    const dist = Math.hypot(dx, dy);
    if (dist > maxRadius) {
      dx = (dx / dist) * maxRadius;
      dy = (dy / dist) * maxRadius;
    }

    setKnobPos({ x: dx, y: dy });

    // Normalized vector [-1, 1]
    const normX = dx / maxRadius;
    const normY = -dy / maxRadius; // Invert Y for forward/back
    setJoystickVector({ x: normX, y: normY });
  };

  return (
    <div className="fixed inset-0 z-30 pointer-events-none select-none">
      {/* Virtual Joystick (Bottom Left) */}
      <div
        ref={joystickBaseRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        className="pointer-events-auto absolute bottom-8 left-8 w-28 h-28 rounded-full border-4 border-black bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center brutalist-shadow"
      >
        <div
          className="w-12 h-12 rounded-full border-3 border-black bg-[#B7FF00] shadow-md transition-transform duration-75"
          style={{
            transform: `translate(${knobPos.x}px, ${knobPos.y}px)`,
          }}
        />
      </div>

      {/* Action Button (Bottom Right) */}
      <button
        onTouchStart={(e) => {
          e.preventDefault();
          triggerInteract();
        }}
        className="pointer-events-auto absolute bottom-8 right-8 w-20 h-20 rounded-full border-4 border-black bg-[#B7FF00] text-black font-black text-sm flex flex-col items-center justify-center brutalist-shadow active:scale-95 transition-transform"
      >
        <Sparkles className="w-5 h-5 mb-0.5" />
        ACTION
      </button>
    </div>
  );
}
