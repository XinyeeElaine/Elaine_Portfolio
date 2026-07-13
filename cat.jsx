/* Cozy Portfolio — virtual cat: walks the footer, draggable, places anywhere. */

const { useState, useEffect, useRef, useCallback, useMemo } = React;

/* -------- SVG cat (mood-aware) -------- */
function CatSVG({ mood }) {
  const happy = mood === 'happy';
  const eating = mood === 'eating';
  const sleepy = mood === 'sleepy';

  return (
    <svg className="cat-svg" width="76" height="74" viewBox="0 0 100 100" style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }}>
      {/* tail */}
      <g className="tail" style={{ transformOrigin: '78px 70px' }}>
        <path d="M 78 70 Q 92 60 88 44" stroke="#8a5f30" strokeWidth="7" fill="none" strokeLinecap="round" />
        <path d="M 78 70 Q 92 60 88 44" stroke="#5c3c1c" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeDasharray="3 5" />
      </g>

      {/* body */}
      <ellipse cx="48" cy="76" rx="26" ry="18" fill="#b8894e" />
      <ellipse cx="48" cy="74" rx="22" ry="14" fill="#cfa068" />
      {/* mackerel tabby body stripes */}
      <g stroke="#6e4a24" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.55">
        <path d="M 40 64 Q 42 73 40 83" />
        <path d="M 50 63 Q 52 73 50 84" />
        <path d="M 60 65 Q 61 73 60 83" />
      </g>

      {/* feet (used as walking legs) */}
      <ellipse className="leg-fl" cx="36" cy="90" rx="5.5" ry="4" fill="#8a5f30" />
      <ellipse className="leg-fr" cx="44" cy="90" rx="4.5" ry="3.5" fill="#8a5f30" />
      <ellipse className="leg-bl" cx="54" cy="90" rx="4.5" ry="3.5" fill="#8a5f30" />
      <ellipse className="leg-br" cx="62" cy="90" rx="5.5" ry="4" fill="#8a5f30" />

      {/* head */}
      <g style={{ transformOrigin: '48px 50px', transform: happy ? 'rotate(-4deg)' : 'rotate(0)', transition: 'transform 0.3s' }}>
        <path d="M 30 38 L 26 22 L 42 32 Z" fill="#8a5f30" />
        <path d="M 30 38 L 28 26 L 39 32 Z" fill="#cf9b7a" />
        <path d="M 66 38 L 70 22 L 54 32 Z" fill="#8a5f30" />
        <path d="M 66 38 L 68 26 L 57 32 Z" fill="#cf9b7a" />

        <ellipse cx="48" cy="50" rx="22" ry="20" fill="#cfa068" />
        <ellipse cx="48" cy="51" rx="20" ry="18" fill="#e6c893" />

        {/* forehead mackerel "M" mark */}
        <g stroke="#6e4a24" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7">
          <path d="M 40 34 L 42 41" />
          <path d="M 48 33 L 48 41" />
          <path d="M 56 34 L 54 41" />
        </g>

        <ellipse cx="34" cy="56" rx="5" ry="3" fill="#d9a76e" opacity="0.6" />
        <ellipse cx="62" cy="56" rx="5" ry="3" fill="#d9a76e" opacity="0.6" />

        {sleepy ?
        <g stroke="#4a3320" strokeWidth="2" fill="none" strokeLinecap="round">
            <path d="M 38 48 Q 42 51 46 48" />
            <path d="M 50 48 Q 54 51 58 48" />
          </g> :
        happy ?
        <g stroke="#4a3320" strokeWidth="2.4" fill="none" strokeLinecap="round">
            <path d="M 37 49 Q 42 44 47 49" />
            <path d="M 49 49 Q 54 44 59 49" />
          </g> :

        <>
            <ellipse className="eye l" cx="42" cy="49" rx="2.8" ry="3.4" fill="#4f7a3a" />
            <ellipse className="eye r" cx="54" cy="49" rx="2.8" ry="3.4" fill="#4f7a3a" />
            <ellipse cx="42" cy="49" rx="1.1" ry="3" fill="#26401c" />
            <ellipse cx="54" cy="49" rx="1.1" ry="3" fill="#26401c" />
            <circle cx="42.8" cy="48" r="0.9" fill="white" />
            <circle cx="54.8" cy="48" r="0.9" fill="white" />
          </>
        }

        <path d="M 47 55 L 49 55 L 48 57 Z" fill="#b0503a" />
        {eating ?
        <ellipse cx="48" cy="60" rx="3" ry="2" fill="#4a3320" /> :

        <path d="M 44 59 Q 48 62 52 59" stroke="#4a3320" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        }

        <g stroke="#efe0c2" strokeWidth="1" strokeLinecap="round" opacity="0.8">
          <path d="M 28 56 L 18 54" />
          <path d="M 28 58 L 18 60" />
          <path d="M 68 56 L 78 54" />
          <path d="M 68 58 L 78 60" />
        </g>
      </g>
    </svg>);

}

/* -------- Cat host (the floating, draggable element) -------- */
const CAT_W = 84; // host width
const CAT_H = 80; // host height
const FOOTER_H = 56; // collapsed-aware footer height (thin bar)

function CatRoot() {
  /* ----- persistent stats ----- */
  const [hunger, setHunger] = useState(70);
  const [fun, setFun] = useState(60);
  const [collapsed, setCollapsed] = useState(() => {
    try {return localStorage.getItem('cozy.catbar.collapsed') === '1';}
    catch (e) {return false;}
  });
  useEffect(() => {
    try {localStorage.setItem('cozy.catbar.collapsed', collapsed ? '1' : '0');} catch (e) {}
    // adjust body padding so collapsed bar doesn't leave dead space
    document.body.style.paddingBottom = collapsed ? '0px' : FOOTER_H + 'px';
  }, [collapsed]);
  const collapsedRef = useRef(collapsed);
  useEffect(() => {collapsedRef.current = collapsed;}, [collapsed]);

  /* ----- cat state ----- */
  // placement: 'footer' (walking along catbar) | 'placed' (somewhere on page) | 'dragging'
  const [placement, setPlacement] = useState('footer');
  // behavior: walk | sit | groom | look | eat | happy | sleepy | dangle
  const [behavior, setBehavior] = useState('walk');
  const [facing, setFacing] = useState('right');

  // position: meaning depends on placement
  // footer: x (left in viewport px), y unused
  // dragging: clientX/Y in viewport px
  // placed: pageX/pageY (relative to document body)
  const [pos, setPos] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('cozy.cat.placement') || 'null');
      if (saved && saved.placement === 'placed') return { x: saved.x, y: saved.y };
    } catch (e) {}
    return { x: 200, y: 0 };
  });
  const [initialPlacement] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('cozy.cat.placement') || 'null');
      if (saved && saved.placement === 'placed') return 'placed';
    } catch (e) {}
    return 'footer';
  });

  useEffect(() => {
    if (initialPlacement === 'placed') setPlacement('placed');
  }, [initialPlacement]);

  // particles
  const [particles, setParticles] = useState([]);
  const idCounter = useRef(0);

  // drag offset
  const dragOffset = useRef({ x: 0, y: 0 });
  const hostRef = useRef(null);

  // refs to mutate behavior schedule without re-running timers
  const placementRef = useRef(placement);
  const behaviorRef = useRef(behavior);
  const facingRef = useRef(facing);
  const posRef = useRef(pos);
  useEffect(() => {placementRef.current = placement;}, [placement]);
  useEffect(() => {behaviorRef.current = behavior;}, [behavior]);
  useEffect(() => {facingRef.current = facing;}, [facing]);
  useEffect(() => {posRef.current = pos;}, [pos]);

  /* ----- walking loop ----- */
  useEffect(() => {
    const tick = setInterval(() => {
      const pl = placementRef.current;
      if (pl !== 'footer' && pl !== 'placed') return;
      const b = behaviorRef.current;
      if (b === 'eat' || b === 'happy' || b === 'sleepy') return;
      if (b !== 'walk') return; // sit/groom/look just pause

      // step
      setPos((p) => {
        const speed = 5;
        const dir = facingRef.current === 'right' ? 1 : -1;
        let nx = p.x + speed * dir;
        const minX = 16;
        const maxX = window.innerWidth - CAT_W - 16;
        if (nx <= minX) {nx = minX;setFacing('right');} else
        if (nx >= maxX) {nx = maxX;setFacing('left');}
        return { ...p, x: nx };
      });
    }, 90);
    return () => clearInterval(tick);
  }, []);

  /* ----- idle behavior scheduler (occasionally sit/groom/look) ----- */
  useEffect(() => {
    let timeout;
    const schedule = () => {
      const wait = 4000 + Math.random() * 6000;
      timeout = setTimeout(() => {
        const pl = placementRef.current;
        if ((pl === 'footer' || pl === 'placed') && behaviorRef.current === 'walk') {
          const opts = pl === 'placed' ? ['sit', 'groom', 'look', 'sleep', 'sleep'] : ['sit', 'groom', 'look'];
          const choice = opts[Math.floor(Math.random() * opts.length)];
          setBehavior(choice);
          const dur = choice === 'sleep' ? 4000 + Math.random() * 4000 : 1800 + Math.random() * 2000;
          setTimeout(() => {
            const p2 = placementRef.current;
            if ((p2 === 'footer' || p2 === 'placed') && behaviorRef.current === choice) {
              setBehavior('walk');
            }
            schedule();
          }, dur);
        } else {
          schedule();
        }
      }, wait);
    };
    schedule();
    return () => clearTimeout(timeout);
  }, []);

  /* ----- stat drift ----- */
  useEffect(() => {
    const t = setInterval(() => {
      setHunger((h) => Math.max(0, h - 0.7));
      setFun((f) => Math.max(0, f - 0.5));
    }, 3500);
    return () => clearInterval(t);
  }, []);

  /* ----- sleepy when both low ----- */
  useEffect(() => {
    if (['eat', 'happy', 'dangle', 'sleep'].includes(behavior)) return;
    if (hunger < 22 && fun < 22) setBehavior('sleepy');else
    if (behavior === 'sleepy') setBehavior('walk');
  }, [hunger, fun, behavior]);

  /* ----- keep footer-walking cat in bounds on resize ----- */
  useEffect(() => {
    const onResize = () => {
      if (placementRef.current === 'footer') {
        setPos((p) => ({ ...p, x: Math.min(p.x, window.innerWidth - CAT_W - 16) }));
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* ----- drag handlers ----- */
  const onPointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    e.preventDefault();
    const host = hostRef.current;
    if (!host) return;
    const rect = host.getBoundingClientRect();
    dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setPlacement('dragging');
    setBehavior('dangle');
    setPos({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y });
    try {host.setPointerCapture(e.pointerId);} catch (err) {}
  };

  const onPointerMove = (e) => {
    if (placementRef.current !== 'dragging') return;
    setPos({
      x: e.clientX - dragOffset.current.x,
      y: e.clientY - dragOffset.current.y
    });
  };

  const onPointerUp = (e) => {
    if (placementRef.current !== 'dragging') return;
    const host = hostRef.current;
    try {host && host.releasePointerCapture(e.pointerId);} catch (err) {}

    const clientY = e.clientY - dragOffset.current.y;
    const clientX = e.clientX - dragOffset.current.x;
    const winH = window.innerHeight;

    // if dropped near footer area → snap into walking on footer
    if (clientY + CAT_H >= winH - FOOTER_H - 10) {
      const x = Math.max(16, Math.min(window.innerWidth - CAT_W - 16, clientX));
      setPlacement('footer');
      setPos({ x, y: 0 });
      setBehavior('walk');
      try {localStorage.removeItem('cozy.cat.placement');} catch (err) {}
    } else {
      // place on page (page coords)
      const px = clientX + window.scrollX;
      const py = clientY + window.scrollY;
      setPlacement('placed');
      setPos({ x: px, y: py });
      setBehavior('walk');
      try {localStorage.setItem('cozy.cat.placement', JSON.stringify({ placement: 'placed', x: px, y: py }));} catch (err) {}
    }
  };

  /* ----- particles ----- */
  const emitParticles = (emojis, count = 6) => {
    const fresh = [];
    for (let i = 0; i < count; i++) {
      idCounter.current += 1;
      fresh.push({
        id: idCounter.current,
        emoji: emojis[i % emojis.length],
        left: 20 + Math.random() * 40,
        delay: Math.random() * 0.4
      });
    }
    setParticles((p) => [...p, ...fresh]);
    setTimeout(() => {
      setParticles((p) => p.filter((x) => !fresh.find((f) => f.id === x.id)));
    }, 1600);
  };

  /* ----- feed / play / pet ----- */
  const teleportToFooterIfNeeded = (cb) => {
    if (placementRef.current === 'placed') {
      // animate back to footer
      const x = Math.max(80, Math.min(window.innerWidth - CAT_W - 80, window.innerWidth / 2 - CAT_W / 2));
      setPlacement('footer');
      setPos({ x, y: 0 });
      try {localStorage.removeItem('cozy.cat.placement');} catch (err) {}
      setTimeout(cb, 350);
    } else {
      cb();
    }
  };

  const onFeed = () => {
    setHunger((h) => Math.min(100, h + 28));
    teleportToFooterIfNeeded(() => {
      setBehavior('eat');
      emitParticles(['🐟', '🥛', '🍪'], 5);
      setTimeout(() => setBehavior('walk'), 1700);
    });
  };
  const onPlay = () => {
    setFun((f) => Math.min(100, f + 32));
    teleportToFooterIfNeeded(() => {
      setBehavior('happy');
      emitParticles(['💜', '🧶', '✨', '💙'], 7);
      setTimeout(() => setBehavior('walk'), 2000);
    });
  };
  const onPet = () => {
    setFun((f) => Math.min(100, f + 10));
    setHunger((h) => Math.min(100, h + 4));
    if (placementRef.current === 'footer') {
      setBehavior('happy');
      emitParticles(['💕', '✨'], 4);
      setTimeout(() => setBehavior('walk'), 1200);
    } else {
      emitParticles(['💕', '✨'], 4);
    }
  };

  /* ----- compute style for host ----- */
  const hostStyle = useMemo(() => {
    if (placement === 'footer') {
      const bottom = collapsed ? 28 : FOOTER_H;
      return { left: pos.x + 'px', bottom: bottom + 'px', top: 'auto', position: 'fixed' };
    }
    if (placement === 'dragging') {
      return { left: pos.x + 'px', top: pos.y + 'px', bottom: 'auto', position: 'fixed' };
    }
    // placed (absolute = page coords)
    return { left: pos.x + 'px', top: pos.y + 'px', bottom: 'auto', position: 'absolute' };
  }, [placement, pos.x, pos.y, collapsed]);

  // class composition
  let cls = 'cat-host facing-' + facing;
  if (placement === 'dragging') cls += ' dragging';else
  if (placement === 'placed') cls += ' placed';else
  cls += ' walking-host';
  if ((placement === 'footer' || placement === 'placed') && behavior === 'walk') cls += ' walking';
  if (behavior === 'groom') cls += ' grooming';
  if (behavior === 'look') cls += ' looking';

  // mood for the SVG itself
  const svgMood = behavior === 'eat' ? 'eating' :
  behavior === 'happy' ? 'happy' :
  behavior === 'sleepy' || behavior === 'sleep' ? 'sleepy' :
  'idle';

  /* ----- mood label ----- */
  const moodLabel = (() => {
    if (behavior === 'eat') return 'nom nom...';
    if (behavior === 'happy') return 'purr purr ✨';
    if (behavior === 'sleepy') return 'zzz... feed me?';
    if (behavior === 'sleep') return 'napping... zzz';
    if (behavior === 'groom') return 'tidying up';
    if (behavior === 'look') return 'what was that?';
    if (placement === 'placed') return 'sitting here a while';
    if (placement === 'dragging') return 'wheeeee!';
    // hunger/fun-driven moods (lower bound wins)
    if (hunger < 20) return 'starving 🥲';
    if (fun < 20) return 'so very bored';
    if (hunger < 40) return 'a little hungry';
    if (fun < 40) return 'bored — play?';
    if (hunger > 80 && fun > 80) return 'happy as a clam 💜';
    if (hunger > 65) return 'well-fed';
    if (fun > 65) return 'in a good mood';
    return 'feeling cozy';
  })();

  return (
    <>
      {/* the floating, draggable cat */}
      <div
        ref={hostRef}
        className={cls}
        style={hostStyle}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}>
        
        <div className="scale-wrap">
          <div className="ground" />
          <CatSVG mood={svgMood} />
          {placement === 'placed' && <span className="pickup-hint">pick me up?</span>}
          {particles.map((p) =>
          <span
            key={p.id}
            className="particle"
            style={{ left: `${p.left}%`, bottom: '40px', animationDelay: `${p.delay}s` }}>
            
              {p.emoji}
            </span>
          )}
        </div>
      </div>

      {/* the footer bar */}
      <div className={`catbar ${collapsed ? 'collapsed' : ''}`} data-screen-label="cat-footer">
        {/* toggle handle — child of catbar so it stays attached when the bar slides */}
        <button
          className={`catbar-toggle ${collapsed ? 'collapsed' : ''}`}
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? 'Show cat bar' : 'Hide cat bar'}
          title={collapsed ? 'Show Miso' : 'Hide bar'} style={{ borderWidth: "2px 1px 0px" }}>
          
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        <div className="catbar-inner">
          <div className="info">
            <div className="name-row">
              <span className="name">Cookie</span>
              <span className="mood">· {moodLabel}</span>
            </div>
            <div className="bars">
              <div className="bar-wrap">
                <span className="bar-label">hunger</span>
                <div className="bar hunger"><i style={{ width: `${hunger}%` }} /></div>
                <span className="bar-pct">{Math.round(hunger)}%</span>
              </div>
              <div className="bar-wrap">
                <span className="bar-label">fun</span>
                <div className="bar fun"><i style={{ width: `${fun}%` }} /></div>
                <span className="bar-pct">{Math.round(fun)}%</span>
              </div>
            </div>
          </div>

          <div className="actions">
            <button className="feed" onClick={onFeed} title="Feed Miso">🐟 Feed</button>
            <button className="play" onClick={onPlay} title="Play with Miso">🧶 Play</button>
            <button className="pet" onClick={onPet} title="Give a pet">💜 Pet</button>
          </div>
        </div>
      </div>
    </>);

}

Object.assign(window, { CatRoot, CatSVG });