import { create } from 'zustand';
import { TownLocation, DistrictCategory } from '@/data/locations';

export type GameState = 'boot' | 'intro' | 'playing' | 'fallback';
export type TimeOfDay = 'day' | 'dusk' | 'night';
export type WeatherState = 'clear' | 'rain';

export type OverlayType =
  | 'none'
  | 'hq'
  | 'ai-lab'
  | 'project'
  | 'cafe'
  | 'post-office'
  | 'secret-bunker'
  | 'discoveries'
  | 'menu'
  | 'map'
  | 'commercial-study'
  | 'station'
  | 'kiosk';

interface TownStore {
  // State
  gameState: GameState;
  playerPos: [number, number, number];
  playerRotation: number;
  activeLocation: TownLocation | null;
  activeOverlay: OverlayType;
  selectedProjectId: string | null;
  selectedCommercialId: string | null;
  timeOfDay: TimeOfDay;
  weather: WeatherState;
  soundEnabled: boolean;
  discoveredSecrets: string[];
  selectedDistrictFilter: DistrictCategory;
  fastTravelTarget: [number, number, number] | null;
  isBlackout: boolean;
  joystickVector: { x: number; y: number };
  interactRequested: boolean;
  isCinematicFocus: boolean;

  // Actions
  setGameState: (state: GameState) => void;
  setPlayerPos: (pos: [number, number, number], rot?: number) => void;
  setActiveLocation: (loc: TownLocation | null) => void;
  openOverlay: (overlay: OverlayType, extraId?: string) => void;
  closeOverlay: () => void;
  setSelectedProject: (id: string | null) => void;
  setSelectedCommercial: (id: string | null) => void;
  setTimeOfDay: (time: TimeOfDay) => void;
  cycleTimeOfDay: () => void;
  toggleWeather: () => void;
  setWeather: (weather: WeatherState) => void;
  toggleSound: () => void;
  setSoundEnabled: (enabled: boolean) => void;
  setDistrictFilter: (filter: DistrictCategory) => void;
  unlockSecret: (secretId: string) => boolean; // returns true if newly unlocked
  teleportTo: (pos: [number, number, number]) => void;
  clearTeleport: () => void;
  triggerBlackout: (durationMs?: number) => void;
  setJoystickVector: (vec: { x: number; y: number }) => void;
  triggerInteract: () => void;
  clearInteract: () => void;
}

// Initial state from localStorage if available
function getInitialSecrets(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem('qevn_secrets');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export const useTownStore = create<TownStore>((set, get) => ({
  gameState: 'boot',
  playerPos: [0, 0, 8],
  playerRotation: 0,
  activeLocation: null,
  activeOverlay: 'none',
  selectedProjectId: null,
  selectedCommercialId: null,
  timeOfDay: 'day',
  weather: 'clear',
  soundEnabled: false,
  discoveredSecrets: getInitialSecrets(),
  selectedDistrictFilter: 'all',
  fastTravelTarget: null,
  isBlackout: false,
  joystickVector: { x: 0, y: 0 },
  interactRequested: false,
  isCinematicFocus: false,

  setGameState: (gameState) => set({ gameState }),

  setPlayerPos: (playerPos, rot) =>
    set((state) => ({
      playerPos,
      playerRotation: rot !== undefined ? rot : state.playerRotation,
    })),

  setActiveLocation: (activeLocation) => set({ activeLocation }),

  openOverlay: (overlay, extraId) => {
    set({
      activeOverlay: overlay,
      selectedProjectId:
        overlay === 'project' && extraId ? extraId : get().selectedProjectId,
      selectedCommercialId:
        overlay === 'commercial-study' && extraId
          ? extraId
          : get().selectedCommercialId,
    });
  },

  closeOverlay: () => {
    set({ activeOverlay: 'none' });
  },

  setSelectedProject: (id) => set({ selectedProjectId: id }),
  setSelectedCommercial: (id) => set({ selectedCommercialId: id }),

  setTimeOfDay: (timeOfDay) => set({ timeOfDay }),

  cycleTimeOfDay: () => {
    const current = get().timeOfDay;
    const next: TimeOfDay = current === 'day' ? 'dusk' : current === 'dusk' ? 'night' : 'day';
    set({ timeOfDay: next });
  },

  toggleWeather: () =>
    set((state) => ({
      weather: state.weather === 'clear' ? 'rain' : 'clear',
    })),

  setWeather: (weather) => set({ weather }),

  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),

  setSoundEnabled: (soundEnabled) => set({ soundEnabled }),

  setDistrictFilter: (filter) => set({ selectedDistrictFilter: filter }),

  unlockSecret: (secretId: string) => {
    const current = get().discoveredSecrets;
    if (!current.includes(secretId)) {
      const updated = [...current, secretId];
      set({ discoveredSecrets: updated });
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem('qevn_secrets', JSON.stringify(updated));
        }
      } catch {}
      return true;
    }
    return false;
  },

  teleportTo: (pos) => {
    set({
      fastTravelTarget: pos,
      playerPos: pos,
      activeOverlay: 'none',
    });
  },

  clearTeleport: () => set({ fastTravelTarget: null }),

  triggerBlackout: (durationMs = 2800) => {
    set({ isBlackout: true });
    setTimeout(() => {
      set({ isBlackout: false });
    }, durationMs);
  },

  setJoystickVector: (vec) => set({ joystickVector: vec }),

  triggerInteract: () => set({ interactRequested: true }),

  clearInteract: () => set({ interactRequested: false }),
}));
