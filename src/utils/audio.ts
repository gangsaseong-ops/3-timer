/**
 * Web Audio API synthesizer for realistic alarm sounds, vibration rumble, and interactive feedback.
 * No external media dependencies required.
 */

class SoundEffects {
  private ctx: AudioContext | null = null;
  private vibrationInterval: number | null = null;
  private vibrationEndTimeout: number | null = null;
  private audioCheckTimeout: number | null = null;
  private alarmInterval: number | null = null;

  private getContext(): AudioContext {
    if (!this.ctx || this.ctx.state === 'closed') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {
        // ignore resume rejection; handled by state inspection
      });
    }
    return this.ctx;
  }

  /**
   * Powerful stealth vibration rumble:
   * Triggers real hardware vibration on supported mobile devices + low-frequency Web Audio buzz,
   * and reports whether vibration or audio is muted/blocked.
   */
  startVibration(
    durationMs: number = 3000,
    onEnd?: () => void,
    onStatus?: (status: {
      vibrated: boolean;
      hasVibrateApi: boolean;
      isMobile: boolean;
      audioRunning: boolean;
      isSilent: boolean;
    }) => void
  ): { vibrated: boolean; hasVibrateApi: boolean; isMobile: boolean } {
    this.clearVibrationTimers();

    const isMobile =
      typeof navigator !== 'undefined' &&
      (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        (navigator.maxTouchPoints > 0 && typeof window !== 'undefined' && window.innerWidth < 1024));

    const hasVibrateApi = typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function';

    // Synchronously trigger full-duration haptic pattern inside the user gesture
    let vibrated = false;
    if (hasVibrateApi) {
      try {
        const pattern =
          durationMs >= 2500
            ? [240, 70, 240, 70, 320, 80, 240, 70, 240, 70, 320, 80, 240, 70, 360]
            : [220, 80, 220, 80, 300];
        vibrated = navigator.vibrate(pattern);
      } catch {
        vibrated = false;
      }
    }

    try {
      const ctx = this.getContext();
      const startTime = ctx.currentTime;
      const endTime = startTime + durationMs / 1000;

      // Primary low rumble
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Modulation LFO for rapid buzzing flutter
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();

      lfo.type = 'square';
      lfo.frequency.setValueAtTime(14, startTime); // 14Hz motor hum

      lfoGain.gain.setValueAtTime(0.5, startTime);
      lfo.connect(lfoGain);

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(75, startTime); // Deep low buzz
      osc.frequency.exponentialRampToValueAtTime(70, endTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(180, startTime);

      oscGain.gain.setValueAtTime(0.01, startTime);
      oscGain.gain.linearRampToValueAtTime(0.35, startTime + 0.1);
      oscGain.gain.setValueAtTime(0.35, endTime - 0.2);
      oscGain.gain.linearRampToValueAtTime(0.001, endTime);

      lfoGain.connect(oscGain.gain);
      osc.connect(filter);
      filter.connect(oscGain);
      oscGain.connect(ctx.destination);

      osc.start(startTime);
      lfo.start(startTime);
      osc.stop(endTime);
      lfo.stop(endTime);

      // Verify audio/vibration state shortly after resume settles
      this.audioCheckTimeout = window.setTimeout(() => {
        const currentAudioRunning = this.ctx?.state === 'running';
        const isSilent = !currentAudioRunning || (isMobile && hasVibrateApi && !vibrated);
        onStatus?.({
          vibrated,
          hasVibrateApi,
          isMobile,
          audioRunning: currentAudioRunning,
          isSilent,
        });
      }, 150);

      if (onEnd) {
        this.vibrationEndTimeout = window.setTimeout(onEnd, durationMs);
      }
    } catch {
      onStatus?.({
        vibrated,
        hasVibrateApi,
        isMobile,
        audioRunning: false,
        isSilent: true,
      });
      if (onEnd) {
        this.vibrationEndTimeout = window.setTimeout(onEnd, durationMs);
      }
    }

    return { vibrated, hasVibrateApi, isMobile };
  }

  private clearVibrationTimers() {
    if (this.vibrationInterval) {
      window.clearInterval(this.vibrationInterval);
      this.vibrationInterval = null;
    }
    if (this.vibrationEndTimeout) {
      window.clearTimeout(this.vibrationEndTimeout);
      this.vibrationEndTimeout = null;
    }
    if (this.audioCheckTimeout) {
      window.clearTimeout(this.audioCheckTimeout);
      this.audioCheckTimeout = null;
    }
  }

  stopVibration() {
    this.clearVibrationTimers();
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(0);
      } catch {
        // ignore
      }
    }
  }

  /**
   * Dumbbell shake click & rep counter beep
   */
  playShakeSound(repCount: number) {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      // Higher pitch as you get closer to 30
      const baseFreq = 380 + (30 - repCount) * 12;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.08);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);

      // Light haptic feedback
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        try {
          navigator.vibrate(30);
        } catch {
          // ignore
        }
      }
    } catch {
      // Audio not permitted or errored
    }
  }

  /**
   * Dumbbell 30-rep complete victory fanfare!
   */
  playVictoryFanfare() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const notes = [440, 554.37, 659.25, 880]; // A major arpeggio

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const noteStart = now + idx * 0.12;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.25, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 0.55);
      });
    } catch {
      // ignore
    }
  }

  /**
   * Loud Carpet Alarm Siren (850Hz / 1200Hz pulsing alert)
   */
  startCarpetAlarm() {
    this.stopCarpetAlarm();
    try {
      const ctx = this.getContext();
      let step = 0;

      const triggerBeep = () => {
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(step % 2 === 0 ? 880 : 1174, now);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.16);
        step++;
      };

      triggerBeep();
      this.alarmInterval = window.setInterval(triggerBeep, 240);
    } catch {
      // ignore
    }
  }

  stopCarpetAlarm() {
    if (this.alarmInterval) {
      window.clearInterval(this.alarmInterval);
      this.alarmInterval = null;
    }
  }

  /**
   * Peaceful chime played when carpet alarm is cleared by standing 3 seconds
   */
  playPeacefulChime() {
    this.stopCarpetAlarm();
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C major chime

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const noteStart = now + idx * 0.15;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.25, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 1.3);
      });
    } catch {
      // ignore
    }
  }

  /**
   * Standard UI click / tap pop
   */
  playPop() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(500, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.05);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // ignore
    }
  }
}

export const soundEffects = new SoundEffects();
