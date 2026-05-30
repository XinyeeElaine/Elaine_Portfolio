/* Cozy Portfolio — floating settings gear with theme + music controls. */

const THEMES = [
  { id: 'lavender',   name: 'Lavender Sky',   a: '#caa3e0', b: '#9fc6ee' },
  { id: 'matcha',     name: 'Matcha Latte',   a: '#a8c79b', b: '#d4b78f' },
  { id: 'strawberry', name: 'Strawberry Cream', a: '#f5a8b5', b: '#f7c8a3' },
  { id: 'peach',      name: 'Peach Sunset',   a: '#f5b58a', b: '#f4d57a' },
  { id: 'midnight',   name: 'Midnight Pastel', a: '#5e4d8a', b: '#3a3b5a' },
];

function SettingsGear() {
  const [open, setOpen] = React.useState(false);
  const [theme, setTheme] = React.useState(() => {
    try { return localStorage.getItem('cozy.theme') || 'lavender'; }
    catch (e) { return 'lavender'; }
  });
  const [music, setMusic] = React.useState(() => {
    try { return localStorage.getItem('cozy.music') !== '0'; }  // ON by default
    catch (e) { return true; }
  });
  const [volume, setVolume] = React.useState(() => {
    try { const v = parseFloat(localStorage.getItem('cozy.volume')); return isNaN(v) ? 0.5 : v; }
    catch (e) { return 0.5; }
  });
  const [hovered, setHovered] = React.useState(null);
  const audioEngine = React.useRef(null);
  const panelRef = React.useRef(null);

  // apply theme to body
  React.useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    try { localStorage.setItem('cozy.theme', theme); } catch (e) {}
  }, [theme]);

  // ---- self-contained upbeat lofi engine (Web Audio, no external file) ----
  const buildEngine = () => {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    const ctx = new AC();
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    // brighter lowpass so the upbeat parts sparkle a bit more
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 2200;
    filter.Q.value = 0.7;
    filter.connect(master);

    // sub-buses
    const padBus = ctx.createGain();  padBus.gain.value = 0.5; padBus.connect(filter);
    const leadBus = ctx.createGain(); leadBus.gain.value = 0.6; leadBus.connect(filter);
    const drumBus = ctx.createGain(); drumBus.gain.value = 0.9; drumBus.connect(filter);

    // light tremolo shimmer on the pad
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 4.5;
    lfoGain.gain.value = 0.06;
    lfo.connect(lfoGain); lfoGain.connect(padBus.gain);
    lfo.start();

    // upbeat, bright progression — C major family, cheerful ii–V–I vibe
    // each entry: pad chord (Hz) + a bouncy 8-note arpeggio pattern (Hz)
    const A = (n) => n; // alias for readability
    const prog = [
      { pad: [261.63, 329.63, 392.00, 493.88], // Cmaj7
        arp: [523.25, 659.25, 783.99, 659.25, 587.33, 493.88, 659.25, 783.99] },
      { pad: [293.66, 349.23, 440.00, 523.25], // Dm7
        arp: [587.33, 698.46, 880.00, 698.46, 659.25, 523.25, 698.46, 880.00] },
      { pad: [329.63, 392.00, 493.88, 587.33], // Em7
        arp: [659.25, 783.99, 987.77, 783.99, 698.46, 587.33, 783.99, 987.77] },
      { pad: [392.00, 493.88, 587.33, 698.46], // G7
        arp: [783.99, 587.33, 698.46, 880.00, 783.99, 659.25, 587.33, 493.88] },
    ];

    // pad voices (soft triangle for warmth)
    const padVoices = [0, 1, 2, 3].map(() => {
      const o = ctx.createOscillator(); o.type = 'triangle';
      const g = ctx.createGain(); g.gain.value = 0;
      o.connect(g); g.connect(padBus); o.start();
      return { o, g };
    });

    // lead arpeggio voice (square-ish pluck)
    const leadOsc = ctx.createOscillator(); leadOsc.type = 'triangle';
    const leadGain = ctx.createGain(); leadGain.gain.value = 0;
    leadOsc.connect(leadGain); leadGain.connect(leadBus); leadOsc.start();

    // --- drum synths ---
    const kick = (t) => {
      const o = ctx.createOscillator(); o.type = 'sine';
      const g = ctx.createGain();
      o.frequency.setValueAtTime(140, t);
      o.frequency.exponentialRampToValueAtTime(45, t + 0.12);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.9, t + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
      o.connect(g); g.connect(drumBus);
      o.start(t); o.stop(t + 0.25);
    };
    const hat = (t, open) => {
      const bufSize = ctx.sampleRate * (open ? 0.12 : 0.04);
      const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1);
      const src = ctx.createBufferSource(); src.buffer = buf;
      const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 7000;
      const g = ctx.createGain();
      g.gain.setValueAtTime(open ? 0.18 : 0.12, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + (open ? 0.12 : 0.05));
      src.connect(hp); hp.connect(g); g.connect(drumBus);
      src.start(t); src.stop(t + (open ? 0.13 : 0.06));
    };

    // sequencer — 8 sixteenth-ish steps per bar, ~104 BPM feel
    let bar = 0;
    let timer = null;
    const bpm = 104;
    const stepDur = 60 / bpm / 2;      // eighth notes
    const barSteps = 8;
    const barDur = stepDur * barSteps;

    const playBar = () => {
      const now = ctx.currentTime + 0.05;
      const chord = prog[bar % prog.length];

      // pad swell across the bar
      chord.pad.forEach((freq, i) => {
        const v = padVoices[i];
        v.o.frequency.setTargetAtTime(freq, now, 0.05);
        v.g.gain.cancelScheduledValues(now);
        v.g.gain.setTargetAtTime(0.07, now, 0.08);
        v.g.gain.setTargetAtTime(0.04, now + barDur * 0.7, 0.2);
      });

      // arpeggio + drums per step
      for (let s = 0; s < barSteps; s++) {
        const t = now + s * stepDur;

        // lead pluck
        const f = chord.arp[s];
        leadOsc.frequency.setValueAtTime(f, t);
        leadGain.gain.cancelScheduledValues(t);
        leadGain.gain.setValueAtTime(0.0001, t);
        leadGain.gain.exponentialRampToValueAtTime(0.22, t + 0.01);
        leadGain.gain.exponentialRampToValueAtTime(0.0001, t + stepDur * 0.9);

        // drums: kick on 0 & 4, hats on every step (open on offbeats)
        if (s === 0 || s === 4) kick(t);
        hat(t, s % 2 === 1);
      }
      bar += 1;
    };

    return {
      ctx, master,
      start(vol) {
        const begin = () => {
          master.gain.cancelScheduledValues(ctx.currentTime);
          master.gain.setTargetAtTime((vol == null ? 0.20 : vol * 0.4), ctx.currentTime, 0.4);
          // only ever run ONE sequencer loop
          if (!timer) { playBar(); timer = setInterval(playBar, barDur * 1000); }
        };
        // never start the loop while suspended — the audio clock is frozen and
        // bars would pile up at the same time and play on top of each other.
        if (ctx.state === 'suspended') {
          ctx.resume().then(begin).catch(() => {});
        } else {
          begin();
        }
      },
      setVolume(vol) {
        master.gain.setTargetAtTime(vol * 0.4, ctx.currentTime, 0.15);
      },
      stop() {
        master.gain.setTargetAtTime(0.0, ctx.currentTime, 0.3);
        if (timer) { clearInterval(timer); timer = null; }
      },
    };
  };

  // music toggle
  React.useEffect(() => {
    try { localStorage.setItem('cozy.music', music ? '1' : '0'); } catch (e) {}
    if (music && !audioEngine.current) {
      audioEngine.current = buildEngine();
    }
    const eng = audioEngine.current;
    if (!eng) return;
    if (music) eng.start(volume);
    else eng.stop();
  }, [music]);

  // live volume changes
  React.useEffect(() => {
    try { localStorage.setItem('cozy.volume', String(volume)); } catch (e) {}
    const eng = audioEngine.current;
    if (eng && music) eng.setVolume(volume);
  }, [volume]);

  // Browsers block autoplay until a user gesture. Music defaults ON, so resume
  // the audio context on the very first interaction anywhere on the page.
  React.useEffect(() => {
    if (!music) return;
    const kick = () => {
      if (!audioEngine.current) audioEngine.current = buildEngine();
      const eng = audioEngine.current;
      if (eng) {
        if (eng.ctx.state === 'suspended') eng.ctx.resume();
        eng.start(volume);
      }
      window.removeEventListener('pointerdown', kick);
      window.removeEventListener('keydown', kick);
    };
    // try immediately (works if context already allowed), else wait for gesture
    const eng = audioEngine.current;
    if (eng && eng.ctx.state === 'running') { eng.start(volume); return; }
    window.addEventListener('pointerdown', kick);
    window.addEventListener('keydown', kick);
    return () => {
      window.removeEventListener('pointerdown', kick);
      window.removeEventListener('keydown', kick);
    };
  }, []);

  // tidy up on unmount
  React.useEffect(() => () => {
    if (audioEngine.current) {
      try { audioEngine.current.stop(); audioEngine.current.ctx.close(); } catch (e) {}
    }
  }, []);

  // close panel on outside click
  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        if (!e.target.closest('.gear-btn')) setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  const current = THEMES.find(t => t.id === theme) || THEMES[0];
  const labelTheme = hovered ? THEMES.find(t => t.id === hovered) : current;

  return (
    <>
      <button
        className="gear-btn"
        onClick={() => setOpen(o => !o)}
        title="Settings"
        aria-label="Open settings"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      </button>

      {open && (
        <div className="settings-panel" ref={panelRef}>
          <h4>Color theme</h4>
          <div className="theme-row" onMouseLeave={() => setHovered(null)}>
            {THEMES.map(t => (
              <button
                key={t.id}
                className={`theme-swatch ${theme === t.id ? 'active' : ''}`}
                onClick={() => setTheme(t.id)}
                onMouseEnter={() => setHovered(t.id)}
                title={t.name}
                aria-label={t.name}
              >
                <span className="half-a" style={{ background: t.a }} />
                <span className="half-b" style={{ background: t.b }} />
              </button>
            ))}
          </div>
          <div className="theme-label">{labelTheme.name}</div>

          <h4>Background music</h4>
          <div className="toggle-row">
            <div className="meta">
              <b>{music ? 'Bops playing' : 'Music muted'}</b>
              <small>{music ? 'upbeat lofi · cozy beats' : 'tap to vibe'}</small>
            </div>
            <button
              className={`switch ${music ? 'on' : ''}`}
              onClick={() => setMusic(m => !m)}
              aria-label="Toggle music"
            />
          </div>
          <div className={`vol-row ${music ? '' : 'disabled'}`}>
            <span className="vol-ico" aria-hidden="true">
              {volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}
            </span>
            <input
              type="range" min="0" max="1" step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="vol-slider"
              aria-label="Music volume"
              style={{ '--pct': `${Math.round(volume * 100)}%` }}
            />
            <span className="vol-pct">{Math.round(volume * 100)}</span>
          </div>

          <div className="settings-foot">
            <span className="pip" />
            Tweak anytime — your settings are saved.
          </div>
        </div>
      )}
    </>
  );
}

Object.assign(window, { SettingsGear });
