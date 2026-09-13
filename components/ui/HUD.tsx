'use client';

import { useTownStore } from '@/lib/store';
import { soundManager } from '@/lib/audio';
import { trackEvent } from '@/lib/analytics';
import {
  Volume2,
  VolumeX,
  Sun,
  Sunset,
  Moon,
  CloudRain,
  CloudSun,
  Compass,
  Menu as MenuIcon,
  Navigation,
} from 'lucide-react';

export function HUD() {
  const soundEnabled = useTownStore((s) => s.soundEnabled);
  const toggleSound = useTownStore((s) => s.toggleSound);
  const timeOfDay = useTownStore((s) => s.timeOfDay);
  const cycleTimeOfDay = useTownStore((s) => s.cycleTimeOfDay);
  const weather = useTownStore((s) => s.weather);
  const toggleWeather = useTownStore((s) => s.toggleWeather);
  const activeLocation = useTownStore((s) => s.activeLocation);
  const openOverlay = useTownStore((s) => s.openOverlay);
  const triggerInteract = useTownStore((s) => s.triggerInteract);

  const handleSoundToggle = () => {
    toggleSound();
    const nextSound = !soundEnabled;
    soundManager.playClick(nextSound);
    soundManager.updateAmbience(nextSound, weather === 'rain');
  };

  const handleTimeCycle = () => {
    cycleTimeOfDay();
    soundManager.playClick(soundEnabled);
    trackEvent('time_toggled', { time: timeOfDay });
  };

  const handleWeatherToggle = () => {
    toggleWeather();
    const nextWeather = weather === 'clear' ? 'rain' : 'clear';
    soundManager.playClick(soundEnabled);
    soundManager.updateAmbience(soundEnabled, nextWeather === 'rain');
  };

  const handleOpenMap = () => {
    soundManager.playClick(soundEnabled);
    openOverlay('map');
  };

  const handleOpenMenu = () => {
    soundManager.playClick(soundEnabled);
    openOverlay('menu');
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-20 flex flex-col justify-between p-3 sm:p-5 select-none">
      {/* ================= TOP STATUS BAR ================= */}
      <div className="flex items-start justify-between gap-2 sm:gap-3">
        {/* Top Left: Logo & System Indicator */}
        <div className="pointer-events-auto flex flex-col items-start gap-1">
          <div className="brutalist-border bg-[#0A0A0A] text-[#F7F7F2] px-3.5 py-1.5 brutalist-shadow-sm flex items-center gap-2.5">
            <span className="font-extrabold text-sm sm:text-base tracking-wider">
              QEVN <span className="text-[#B7FF00]">TOWN</span>
            </span>
            <div className="flex items-center gap-1.5 pl-2 border-l border-neutral-700">
              <div className="w-2 h-2 rounded-full bg-[#B7FF00] animate-ping" />
              <span className="font-mono text-[10px] sm:text-xs text-[#B7FF00] font-bold">
                ONLINE
              </span>
            </div>
          </div>
          <div className="hidden sm:block font-mono text-[10px] text-neutral-400 pl-1">
            SYS.VER 1.5.0 // LIVING DIGITAL CITY
          </div>
        </div>

        {/* Top Right: System Control Toggles */}
        <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2">
          {/* Weather Toggle */}
          <button
            onClick={handleWeatherToggle}
            title={`Weather: ${weather.toUpperCase()} (Click to toggle)`}
            className={`brutalist-btn px-2 sm:px-3 py-1.5 text-xs font-mono font-bold ${
              weather === 'rain' ? 'bg-[#0284C7] text-white' : 'bg-[#F7F7F2] text-black'
            }`}
          >
            {weather === 'rain' ? (
              <CloudRain className="w-4 h-4 text-cyan-300" />
            ) : (
              <CloudSun className="w-4 h-4 text-amber-500" />
            )}
            <span className="hidden sm:inline uppercase">{weather}</span>
          </button>

          {/* Time Cycle Toggle */}
          <button
            onClick={handleTimeCycle}
            title={`Time: ${timeOfDay.toUpperCase()} (Click to toggle)`}
            className="brutalist-btn bg-[#F7F7F2] text-black px-2 sm:px-3 py-1.5 text-xs font-mono font-bold"
          >
            {timeOfDay === 'day' && <Sun className="w-4 h-4 text-amber-500" />}
            {timeOfDay === 'dusk' && <Sunset className="w-4 h-4 text-orange-500" />}
            {timeOfDay === 'night' && <Moon className="w-4 h-4 text-indigo-600" />}
            <span className="hidden sm:inline uppercase">{timeOfDay}</span>
          </button>

          {/* Audio Toggle */}
          <button
            onClick={handleSoundToggle}
            title="Toggle Town Audio"
            className={`brutalist-btn px-2 sm:px-3 py-1.5 text-xs font-mono font-bold ${
              soundEnabled ? 'bg-[#B7FF00] text-black' : 'bg-[#1E1E1E] text-neutral-300'
            }`}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4 text-neutral-400" />
            )}
            <span className="hidden sm:inline">{soundEnabled ? 'AUDIO ON' : 'MUTED'}</span>
          </button>

          {/* Mini-Map Button */}
          <button
            onClick={handleOpenMap}
            className="brutalist-btn bg-[#FFD400] text-black px-2.5 sm:px-3 py-1.5 text-xs font-mono font-bold"
          >
            <Compass className="w-4 h-4" />
            <span className="hidden sm:inline">MAP [M]</span>
          </button>

          {/* Main Menu Button */}
          <button
            onClick={handleOpenMenu}
            className="brutalist-btn bg-[#F7F7F2] text-black px-2.5 sm:px-3 py-1.5 text-xs font-mono font-bold"
          >
            <MenuIcon className="w-4 h-4" />
            <span className="hidden sm:inline">MENU [ESC]</span>
          </button>
        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="flex items-end justify-between gap-3">
        {/* Bottom Left: Controls Helper (Desktop) */}
        <div className="hidden md:flex pointer-events-auto flex-col gap-1">
          <div className="brutalist-border bg-[#0A0A0A]/90 backdrop-blur-xs text-[#F7F7F2] px-3 py-2 brutalist-shadow-sm font-mono text-xs">
            <div className="flex items-center gap-3 text-neutral-300">
              <span>
                <kbd className="bg-neutral-800 text-[#B7FF00] px-1 py-0.5 rounded-xs font-bold">
                  WASD
                </kbd>{' '}
                MOVE
              </span>
              <span>
                <kbd className="bg-neutral-800 text-[#B7FF00] px-1 py-0.5 rounded-xs font-bold">
                  SHIFT
                </kbd>{' '}
                SPRINT
              </span>
              <span>
                <kbd className="bg-neutral-800 text-[#B7FF00] px-1 py-0.5 rounded-xs font-bold">
                  E
                </kbd>{' '}
                INTERACT
              </span>
              <span>
                <kbd className="bg-neutral-800 text-[#B7FF00] px-1 py-0.5 rounded-xs font-bold">
                  M
                </kbd>{' '}
                MAP
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Right: District & Proximity Radar Card */}
        <div className="pointer-events-auto flex flex-col items-end gap-2 ml-auto">
          {activeLocation ? (
            <div className="brutalist-border-thick bg-[#F7F7F2] text-black p-3 sm:p-4 brutalist-shadow-lg max-w-xs sm:max-w-sm">
              <div className="flex items-center justify-between gap-2 border-b-2 border-black pb-1 mb-2">
                <span className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-[#FF4444]">
                  PROXIMITY RADAR
                </span>
                <span className="font-mono text-[10px] font-bold text-neutral-600 uppercase">
                  {activeLocation.district}
                </span>
              </div>
              <div className="font-black text-lg sm:text-xl leading-none uppercase tracking-tight">
                {activeLocation.name}
              </div>
              <p className="text-xs font-mono text-neutral-700 mt-1 line-clamp-2">
                {activeLocation.tagline}
              </p>
              <button
                onClick={triggerInteract}
                className="mt-3 w-full brutalist-btn bg-[#B7FF00] text-black py-2 px-3 text-xs sm:text-sm font-black hover:bg-[#a5ea00]"
              >
                <Navigation className="w-3.5 h-3.5" />
                [ E ] {activeLocation.promptLabel}
              </button>
            </div>
          ) : (
            <div className="brutalist-border bg-[#0A0A0A]/90 text-[#F7F7F2] px-3.5 py-2 brutalist-shadow-sm font-mono text-xs flex items-center gap-2">
              <Navigation className="w-3.5 h-3.5 text-[#B7FF00]" />
              <div>
                <span className="text-neutral-400">DISTRICT:</span>{' '}
                <span className="font-bold text-[#F7F7F2]">CENTRAL METROPOLIS</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
