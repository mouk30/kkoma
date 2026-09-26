/**
 * Lightweight Web Audio API synthesizer for cozy Dabang cafe background atmosphere.
 * Plays soothing warm jazz chord progressions and gentle vinyl crackle warmth.
 */

let audioCtx: AudioContext | null = null;
let isPlaying = false;
let chordInterval: number | null = null;
let gainNode: GainNode | null = null;
let crackleSource: AudioBufferSourceNode | null = null;

const JAZZ_CHORDS = [
  // Fmaj7
  [174.61, 220.00, 261.63, 329.63],
  // Dm7
  [146.83, 174.61, 220.00, 261.63],
  // Gm7
  [196.00, 233.08, 293.66, 349.23],
  // C7
  [130.81, 164.81, 196.00, 233.08],
  // Am7
  [220.00, 261.63, 329.63, 392.00],
  // Bbmaj7
  [233.08, 293.66, 349.23, 440.00]
];

function createCrackleBuffer(ctx: AudioContext): AudioBuffer {
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    // gentle sparse vinyl static pops
    if (Math.random() < 0.001) {
      data[i] = (Math.random() * 2 - 1) * 0.15;
    } else {
      data[i] = (Math.random() * 2 - 1) * 0.008;
    }
  }
  return buffer;
}

export function toggleCafeAudio(
  volume = 0.25,
  onStateChange?: (playing: boolean) => void
): boolean {
  if (isPlaying) {
    stopCafeAudio();
    if (onStateChange) onStateChange(false);
    return false;
  }

  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return false;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
    gainNode.connect(audioCtx.destination);

    // Subtle vinyl warmth
    try {
      const crackleBuffer = createCrackleBuffer(audioCtx);
      crackleSource = audioCtx.createBufferSource();
      crackleSource.buffer = crackleBuffer;
      crackleSource.loop = true;

      const crackleGain = audioCtx.createGain();
      crackleGain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      crackleSource.connect(crackleGain);
      crackleGain.connect(gainNode);
      crackleSource.start();
    } catch {
      // ignore crackle errors
    }

    let chordIndex = 0;

    const playChord = () => {
      if (!audioCtx || !gainNode || !isPlaying) return;
      const frequencies = JAZZ_CHORDS[chordIndex % JAZZ_CHORDS.length];
      chordIndex++;

      frequencies.forEach((freq) => {
        if (!audioCtx || !gainNode) return;
        const osc = audioCtx.createOscillator();
        const noteGain = audioCtx.createGain();

        // Warm mellow sine wave with soft filter
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        const now = audioCtx.currentTime;
        noteGain.gain.setValueAtTime(0.001, now);
        // Soft swell attack
        noteGain.gain.exponentialRampToValueAtTime(0.05, now + 0.8);
        // Gentle decay
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + 3.8);

        osc.connect(noteGain);
        noteGain.connect(gainNode);

        osc.start(now);
        osc.stop(now + 4.0);
      });
    };

    isPlaying = true;
    playChord();
    chordInterval = window.setInterval(playChord, 3800);

    if (onStateChange) onStateChange(true);
    return true;
  } catch (e) {
    console.error("Audio error", e);
    isPlaying = false;
    if (onStateChange) onStateChange(false);
    return false;
  }
}

export function stopCafeAudio() {
  if (chordInterval) {
    clearInterval(chordInterval);
    chordInterval = null;
  }
  if (crackleSource) {
    try {
      crackleSource.stop();
      crackleSource.disconnect();
    } catch {
      // ignore
    }
    crackleSource = null;
  }
  if (audioCtx && audioCtx.state !== 'closed') {
    // keep ctx for reuse
  }
  isPlaying = false;
}

export function isAudioPlaying(): boolean {
  return isPlaying;
}

export function setCafeVolume(val: number) {
  if (gainNode && audioCtx) {
    gainNode.gain.setValueAtTime(Math.max(0, Math.min(1, val)), audioCtx.currentTime);
  }
}
