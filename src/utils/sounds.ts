/**
 * Zero-dependency Web Audio API synthesizer and high-performance HTML5 Audio player.
 * Manages zero-latency chimes and dynamic user-interaction unlocking to satisfy modern browser security sandboxing rules.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  // Resume context if suspended (browsers suspend AudioContext until user interaction)
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

// Global cached Audio instances for zero-latency playback and direct user gesture unlocking
let clickAudio: HTMLAudioElement | null = null;
let hoverAudio: HTMLAudioElement | null = null;
let skillMeterAudio: HTMLAudioElement | null = null;

if (typeof window !== "undefined") {
  clickAudio = new Audio("/audio/sidebar-select.wav");
  clickAudio.volume = 0.5;
  clickAudio.preload = "auto";

  hoverAudio = new Audio("/audio/hover-expand-navbar.wav");
  hoverAudio.volume = 0.7;
  hoverAudio.preload = "auto";

  skillMeterAudio = new Audio("/audio/skill-meter-buttons.wav");
  skillMeterAudio.volume = 0.5;
  skillMeterAudio.preload = "auto";
}

// Global browser user-interaction audio unlock listener.
// Unlocks both the Web Audio API context and the HTML5 Audio instances on the very first user gesture anywhere on the screen.
if (typeof window !== "undefined") {
  const unlock = () => {
    // 1. Resume Web Audio API context
    const ctx = getAudioContext();
    if (ctx && ctx.state === "suspended") {
      ctx.resume().catch((err) => console.log("Failed to resume ctx:", err));
    }
    
    // 2. Unlock HTML5 Audio playback by performing a silent play on our actual global instances.
    // This allows subsequent hover sound events to trigger successfully.
    let unlockCount = 0;
    const checkListeners = () => {
      unlockCount++;
      if (unlockCount >= 3) {
        window.removeEventListener("click", unlock);
        window.removeEventListener("keydown", unlock);
        window.removeEventListener("mousedown", unlock);
        window.removeEventListener("touchstart", unlock);
      }
    };

    if (clickAudio) {
      const origVolume = clickAudio.volume;
      clickAudio.volume = 0;
      clickAudio.play()
        .then(() => {
          clickAudio!.pause();
          clickAudio!.currentTime = 0;
          clickAudio!.volume = origVolume;
          checkListeners();
        })
        .catch((err) => {
          console.log("clickAudio auto-unlock pending user interaction:", err);
        });
    }

    if (hoverAudio) {
      const origVolume = hoverAudio.volume;
      hoverAudio.volume = 0;
      hoverAudio.play()
        .then(() => {
          hoverAudio!.pause();
          hoverAudio!.currentTime = 0;
          hoverAudio!.volume = origVolume;
          checkListeners();
        })
        .catch((err) => {
          console.log("hoverAudio auto-unlock pending user interaction:", err);
        });
    }

    if (skillMeterAudio) {
      const origVolume = skillMeterAudio.volume;
      skillMeterAudio.volume = 0;
      skillMeterAudio.play()
        .then(() => {
          skillMeterAudio!.pause();
          skillMeterAudio!.currentTime = 0;
          skillMeterAudio!.volume = origVolume;
          checkListeners();
        })
        .catch((err) => {
          console.log("skillMeterAudio auto-unlock pending user interaction:", err);
        });
    }
  };

  window.addEventListener("click", unlock, { passive: true });
  window.addEventListener("keydown", unlock, { passive: true });
  window.addEventListener("mousedown", unlock, { passive: true });
  window.addEventListener("touchstart", unlock, { passive: true });
}

/**
 * Synthesizes a futuristic upward-sweeping Cherenkov particle laser sound for the CV download trigger.
 */
export function playDownloadSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Upward laser chirp sweep
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();

  osc1.type = "sine";
  osc1.frequency.setValueAtTime(600, now);
  osc1.frequency.exponentialRampToValueAtTime(2400, now + 0.22); // upward pitch sweep

  gain1.gain.setValueAtTime(0.001, now);
  gain1.gain.linearRampToValueAtTime(0.12, now + 0.04); // ultra-fast attack
  gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.32); // smooth decay

  osc1.connect(gain1);
  gain1.connect(ctx.destination);

  // Digital bell chime overlay (high harmonic accent)
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();

  osc2.type = "triangle";
  osc2.frequency.setValueAtTime(1600, now);

  gain2.gain.setValueAtTime(0.001, now);
  gain2.gain.linearRampToValueAtTime(0.06, now + 0.02);
  gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

  osc2.connect(gain2);
  gain2.connect(ctx.destination);

  osc1.start(now);
  osc1.stop(now + 0.33);

  osc2.start(now);
  osc2.stop(now + 0.21);
}

/**
 * Plays the crisp audio asset for sidebar items selection.
 */
export function playClickSound() {
  if (!clickAudio) return;
  clickAudio.currentTime = 0;
  clickAudio.play().catch((err) => {
    console.log("Audio play blocked or failed:", err);
  });
}

/**
 * Plays the hover expand sound effect for the sidebar navigation.
 */
export function playNavbarExpandSound() {
  if (!hoverAudio) return;
  hoverAudio.currentTime = 0;
  hoverAudio.play().catch((err) => {
    console.log("Audio play blocked or failed:", err);
  });
}

/**
 * Plays the skill meter buttons click sound effect.
 */
export function playSkillMeterSound() {
  if (!skillMeterAudio) return;
  skillMeterAudio.currentTime = 0;
  skillMeterAudio.play().catch((err) => {
    console.log("Audio play blocked or failed:", err);
  });
}
