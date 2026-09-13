'use client';

import { useEffect } from 'react';
import { useTownStore } from '@/lib/store';
import { TOWN_LOCATIONS, DistrictCategory } from '@/data/locations';
import { soundManager } from '@/lib/audio';
import { trackEvent } from '@/lib/analytics';
import { X, MapPin, Zap, Filter } from 'lucide-react';

export function MiniMap() {
  const activeOverlay = useTownStore((s) => s.activeOverlay);
  const closeOverlay = useTownStore((s) => s.closeOverlay);
  const openOverlay = useTownStore((s) => s.openOverlay);
  const teleportTo = useTownStore((s) => s.teleportTo);
  const playerPos = useTownStore((s) => s.playerPos);
  const soundEnabled = useTownStore((s) => s.soundEnabled);
  const districtFilter = useTownStore((s) => s.selectedDistrictFilter);
  const setDistrictFilter = useTownStore((s) => s.setDistrictFilter);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }
      if (e.code === 'KeyM') {
        if (activeOverlay === 'map') {
          closeOverlay();
        } else if (activeOverlay === 'none') {
          soundManager.playClick(soundEnabled);
          openOverlay('map');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeOverlay, closeOverlay, openOverlay, soundEnabled]);

  if (activeOverlay !== 'map') return null;

  const handleTeleport = (pos: [number, number, number], name: string) => {
    soundManager.playChime(soundEnabled);
    trackEvent('teleport_used', { destination: name });
    teleportTo([pos[0], 0.08, pos[2] + 3.5]);
  };

  const categories: { id: DistrictCategory; label: string }[] = [
    { id: 'all', label: 'ALL' },
    { id: 'hq', label: 'HQ / PLAZA' },
    { id: 'campus', label: 'CAMPUS' },
    { id: 'commerce', label: 'COMMERCIAL' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'transit', label: 'TRANSIT' },
    { id: 'secrets', label: 'SECRETS' },
  ];

  const filteredLocations = TOWN_LOCATIONS.filter((loc) => {
    if (districtFilter === 'all') return true;
    return loc.districtGroup === districtFilter;
  });

  // Convert 3D world coordinates [-50 to 50, -50 to 50] to map percentage [0 to 100%]
  const getMapCoords = (x: number, z: number) => {
    const mapX = ((x + 45) / 90) * 100;
    const mapY = ((z + 45) / 90) * 100;
    return { left: `${mapX}%`, top: `${mapY}%` };
  };

  const playerMapPos = getMapCoords(playerPos[0], playerPos[2]);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-4xl brutalist-border-thick bg-[#F7F7F2] text-black p-5 sm:p-8 brutalist-shadow-lg max-h-[94vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b-4 border-black pb-3 mb-3">
          <div>
            <div className="font-mono text-xs font-bold text-[#FF4444] uppercase tracking-widest">
              METROPOLITAN TRANSIT SCHEMATIC
            </div>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
              QEVN TOWN MAP 2.0
            </h2>
          </div>
          <button
            onClick={closeOverlay}
            className="brutalist-btn bg-black text-[#F7F7F2] p-2 hover:bg-neutral-800"
            title="Close Map (ESC / M)"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* District Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3 border-b-2 border-black pb-2.5">
          <div className="flex items-center gap-1 font-mono text-[10px] font-bold text-neutral-500 mr-1">
            <Filter className="w-3 h-3" />
            <span>DISTRICT:</span>
          </div>
          {categories.map((cat) => {
            const isSelected = districtFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  soundManager.playClick(soundEnabled);
                  setDistrictFilter(cat.id);
                }}
                className={`brutalist-btn text-[10px] sm:text-xs py-1 px-2.5 font-bold uppercase transition-all ${
                  isSelected
                    ? 'bg-black text-[#B7FF00] brutalist-shadow-sm'
                    : 'bg-white text-black hover:bg-neutral-100'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Map Grid Canvas Area */}
        <div className="relative w-full aspect-16/10 bg-[#0A0A0A] border-4 border-black overflow-hidden p-2">
          <div className="absolute inset-0 bg-brutalist-grid-dark opacity-35 pointer-events-none" />

          {/* Central Plaza Footprint */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 border-2 border-white/40 bg-neutral-800/60"
            style={{
              ...getMapCoords(0, 0),
              width: '26%',
              height: '28%',
            }}
          >
            <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] sm:text-xs text-neutral-400 font-bold">
              CENTRAL PLAZA
            </span>
          </div>

          {/* Main Roads Grid */}
          <div
            className="absolute top-0 bottom-0 -translate-x-1/2 bg-neutral-900 border-x border-neutral-700/50"
            style={{ left: getMapCoords(0, 0).left, width: '8%' }}
          />
          <div
            className="absolute left-0 right-0 -translate-y-1/2 bg-neutral-900 border-y border-neutral-700/50"
            style={{ top: getMapCoords(0, -6).top, height: '8%' }}
          />
          <div
            className="absolute left-0 right-0 -translate-y-1/2 bg-neutral-900 border-y border-neutral-700/50"
            style={{ top: getMapCoords(0, 14).top, height: '8%' }}
          />

          {/* Location Pins */}
          {filteredLocations.map((loc) => {
            const pinCoords = getMapCoords(loc.position[0], loc.position[2]);
            return (
              <button
                key={loc.id}
                onClick={() => handleTeleport(loc.position, loc.name)}
                className="absolute -translate-x-1/2 -translate-y-1/2 group z-20 flex flex-col items-center cursor-pointer transition-transform hover:scale-115"
                style={pinCoords}
              >
                <div
                  className="w-4 h-4 sm:w-5 sm:h-5 rounded-xs border-2 border-black flex items-center justify-center shadow-md font-mono text-[9px] font-black"
                  style={{ backgroundColor: loc.accentColor, color: '#000000' }}
                >
                  <MapPin className="w-3 h-3" />
                </div>
                <span className="mt-0.5 font-mono text-[8px] sm:text-[10px] font-extrabold uppercase tracking-tight bg-black text-[#F7F7F2] px-1 py-0.2 border border-white/20 whitespace-nowrap">
                  {loc.name}
                </span>
              </button>
            );
          })}

          {/* Player Current Position Marker */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex flex-col items-center"
            style={playerMapPos}
          >
            <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#B7FF00] border-2 border-black animate-ping absolute" />
            <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#B7FF00] border-2 border-black shadow-md flex items-center justify-center font-mono text-[7px] text-black font-black">
              YOU
            </div>
          </div>
        </div>

        {/* Quick Travel District Directory */}
        <div className="mt-3 pt-2 border-t-2 border-black overflow-y-auto max-h-28">
          <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-neutral-600 mb-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>INSTANT TELEPORT // SELECT DESTINATION</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {filteredLocations.map((loc) => (
              <button
                key={loc.id}
                onClick={() => handleTeleport(loc.position, loc.name)}
                className="brutalist-btn bg-white text-black p-1.5 text-left text-[11px] font-bold hover:bg-[#B7FF00] border border-black justify-between"
              >
                <span className="truncate">{loc.name}</span>
                <Zap className="w-3 h-3 shrink-0 text-neutral-400" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
