// Real-time Web Audio API ambient snippet synthesizer for live stage preview
let audioCtx = null;
let activeNodes = [];

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playLiveSnippet(category = 'music_concert', onEnd = () => {}) {
  stopLiveSnippet();
  const ctx = getAudioContext();
  if (!ctx) return false;

  const now = ctx.currentTime;
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.01, now);
  masterGain.gain.exponentialRampToValueAtTime(0.35, now + 0.4);
  masterGain.connect(ctx.destination);
  activeNodes.push(masterGain);

  if (category === 'music_concert' || category === 'live_band') {
    // Stadium chord progression with stereo reverb & synth pads
    const notes = [220, 277.18, 329.63, 440, 554.37]; // A major chord
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = i % 2 === 0 ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      
      // Pitch bend & vibrato
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(4 + i, now);
      lfoGain.gain.setValueAtTime(3, now);
      lfo.connect(osc.frequency);
      lfo.start(now);
      activeNodes.push(lfo);

      gain.gain.setValueAtTime(0.08 / (i + 1), now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 4.5);
      
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(now);
      osc.stop(now + 4.8);
      activeNodes.push(osc);
    });

  } else if (category === 'comedy_show' || category === 'standup_comedy') {
    // Punchy rimshot / laugh track vibe + microphone resonance
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.3);
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(now);
    osc.stop(now + 0.4);
    activeNodes.push(osc);

    // Filtered noise for crowd applause
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.Q.setValueAtTime(1.5, now);
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.01, now);
    noiseGain.gain.linearRampToValueAtTime(0.18, now + 0.3);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 3.0);
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(masterGain);
    noise.start(now + 0.1);
    noise.stop(now + 3.2);
    activeNodes.push(noise);

  } else if (category === 'stage_program' || category === 'dance_program') {
    // Dramatic orchestral swell & strings
    const chord = [130.81, 196.00, 261.63, 329.63, 392.00]; // C Major
    chord.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 1.2);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 4.5);
      
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(now);
      osc.stop(now + 4.8);
      activeNodes.push(osc);
    });
  }

  // Auto clean up after 5s
  setTimeout(() => {
    stopLiveSnippet();
    onEnd();
  }, 4800);

  return true;
}

export function stopLiveSnippet() {
  activeNodes.forEach(node => {
    try {
      if (node.stop) node.stop();
      if (node.disconnect) node.disconnect();
    } catch (e) {
      // Node already stopped
    }
  });
  activeNodes = [];
}
