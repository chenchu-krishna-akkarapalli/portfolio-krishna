/**
 * Zero-dependency Web Audio API synthesizer for futuristic UI click sound effects.
 * Avoids loading heavy audio asset files by synthesizing audio nodes on-demand inside the browser.
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
 * Synthesizes a short, crisp, glassmorphic click tap sound for navigation selectors.
 */
export function playClickSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(1200, now);
  osc.frequency.exponentialRampToValueAtTime(750, now + 0.035); // quick downward drop for punch

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.08, now + 0.003); // immediate trigger
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.075); // ultra-short decay for crisp clicks

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.08);
}
