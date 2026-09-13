// Procedural Web Audio API sound engine for QEVN Town
// 100% asset-free, zero-latency, respectful of browser autoplay policies.

let audioCtx: AudioContext | null = null;
let ambientOscillator: OscillatorNode | null = null;
let ambientGain: GainNode | null = null;
let rainNode: AudioNode | null = null;
let rainGain: GainNode | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const soundManager = {
  playFootstep(enabled: boolean) {
    if (!enabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(160 + Math.random() * 40, ctx.currentTime);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(65 + Math.random() * 15, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // AudioContext silenced
    }
  },

  playClick(enabled: boolean) {
    if (!enabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Ignored
    }
  },

  playChime(enabled: boolean) {
    if (!enabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const notes = [440, 554.37, 659.25, 880]; // A major arpeggio
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);

        const startTime = ctx.currentTime + idx * 0.06;
        gain.gain.setValueAtTime(0.08, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.35);
      });
    } catch {
      // Ignored
    }
  },

  playTrainSound(enabled: boolean) {
    if (!enabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      // Low sub-bass whoosh + harmonic transit chime
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(80, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(260, ctx.currentTime + 0.4);
      osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.9);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.9);
    } catch {}
  },

  playSwitchSound(enabled: boolean) {
    if (!enabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      // Heavy mechanical click
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(220, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.12);
      gain1.gain.setValueAtTime(0.2, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start();
      osc1.stop(ctx.currentTime + 0.12);

      // Electric spark/buzz
      const bufferSize = ctx.sampleRate * 0.3;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2400, ctx.currentTime + 0.05);
      filter.Q.setValueAtTime(4, ctx.currentTime + 0.05);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.18, ctx.currentTime + 0.05);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      whiteNoise.start(ctx.currentTime + 0.05);
      whiteNoise.stop(ctx.currentTime + 0.35);
    } catch {
      // Ignored
    }
  },

  playBlackoutSound(enabled: boolean) {
    if (!enabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(25, ctx.currentTime + 0.8);

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    } catch {
      // Ignored
    }
  },

  playFanfare(enabled: boolean) {
    if (!enabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const chords = [523.25, 659.25, 783.99, 1046.5]; // C5 major
      chords.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        const startTime = ctx.currentTime + idx * 0.08;
        gain.gain.setValueAtTime(0.12, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.5);
      });
    } catch {
      // Ignored
    }
  },

  updateAmbience(enabled: boolean, isRain = false) {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (!enabled) {
      if (ambientGain) {
        ambientGain.gain.setTargetAtTime(0, ctx.currentTime, 0.2);
        setTimeout(() => {
          if (ambientOscillator) {
            try {
              ambientOscillator.stop();
              ambientOscillator.disconnect();
            } catch {}
            ambientOscillator = null;
          }
          ambientGain = null;
        }, 250);
      }
      return;
    }

    if (!ambientOscillator) {
      try {
        ambientOscillator = ctx.createOscillator();
        ambientGain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        ambientOscillator.type = 'sine';
        ambientOscillator.frequency.setValueAtTime(isRain ? 45 : 55, ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(isRain ? 200 : 120, ctx.currentTime);

        ambientGain.gain.setValueAtTime(0.001, ctx.currentTime);
        ambientGain.gain.exponentialRampToValueAtTime(0.03, ctx.currentTime + 1.5);

        ambientOscillator.connect(filter);
        filter.connect(ambientGain);
        ambientGain.connect(ctx.destination);

        ambientOscillator.start();
      } catch {
        // Ignored
      }
    }
  },
};
