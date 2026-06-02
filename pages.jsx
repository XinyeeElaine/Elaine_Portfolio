/* All 5 page components for the cozy portfolio. */

function HomePage({ go }) {
  return (
    <div className="page" data-screen-label="01 Home">
      <div className="hero">
        <div>
          <div className="eyebrow"><span className="pulse" /> open to new projects · 2026</div>
          <h1>
            Hi, I'm Elaine <span className="wave">👋</span><br />
            I make <em>cozy</em> things<br />
            for the web.
          </h1>
          <p className="lede">
            Bachelor in Data Science student at TARUMT. I enjoy building warm, playful interfaces for the web.
          </p>
          <div className="cta-row">
            <button className="btn primary" onClick={() => go('contact')}>
              Say hello →
            </button>
            <button className="btn ghost" onClick={() => go('projects')}>
              See my work
            </button>
          </div>
        </div>

        <div className="collage">
          <div className="card-tile t-avatar">
            <img src="Elaine_profile.jpg" alt="Elaine" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="card-tile t-card1">
            <div className="tile-label">currently</div>
            <div className="tile-body">undergoing internship 💻</div>
          </div>
          <div className="card-tile t-card2">
            <div className="tile-label">listening to</div>
            <div className="tile-body">lo-fi & rain sounds 🌧️</div>
          </div>
          <div className="card-tile t-card3">
            <div className="tile-label">playing</div>
            <div className="tile-body">Perler Beads ✨</div>
          </div>
        </div>
      </div>

      <div className="marquee">
        <div className="marquee-track">
          <span>
            data science <span className="star">✦</span>
            UI/UX design <span className="star">✦</span>
            front-end <span className="star">✦</span>
            Python <span className="star">✦</span>
            prototyping <span className="star">✦</span>
            illustration <span className="star">✦</span>
          </span>
          <span>
            data science <span className="star">✦</span>
            UI/UX design <span className="star">✦</span>
            front-end <span className="star">✦</span>
            Python <span className="star">✦</span>
            prototyping <span className="star">✦</span>
            illustration <span className="star">✦</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------- ABOUT ---------- */
const TIMELINE = [
  { year: '2024 — now', title: 'Senior Product Designer', org: 'Foxglove (remote)', kind: 'work',
    body: 'Leading design for a small-team productivity app. Owning the design system, shipping weekly, occasionally writing the front-end.' },
  { year: '2022 — 2024', title: 'Product Designer', org: 'Mellowtail Studio', kind: 'work',
    body: 'Shipped 6 client apps across fintech and wellness. Built the studio\'s component library used on every project.' },
  { year: '2020 — 2022', title: 'UI Designer & Illustrator', org: 'Freelance', kind: 'work',
    body: 'Brand systems and product illustrations for early-stage startups. Learned to draw with my left hand on a rainy Tuesday.' },
  { year: '2018 — 2020', title: 'MA in Interaction Design', org: 'Royal College of Art', kind: 'edu',
    body: 'Thesis on slow software & ambient interfaces. Built a desk lamp that visualizes your inbox.' },
  { year: '2014 — 2018', title: 'BSc in Computer Science', org: 'University of Porto', kind: 'edu',
    body: 'Coding by day, drawing by night. Co-founded the campus illustration zine.' },
];

const HOBBIES = [
  { icon: '☕', name: 'Specialty coffee', note: 'V60 weekdays, espresso weekends' },
  { icon: '🎮', name: 'Cozy games', note: 'Stardew, Animal Crossing, Spiritfarer' },
  { icon: '🎨', name: 'Watercolor', note: 'Mostly mushrooms & tiny houses' },
  { icon: '📖', name: 'Bookshop crawls', note: 'Currently rereading Le Guin' },
];

function AboutPage() {
  return (
    <div className="page" data-screen-label="02 About">
      <div className="section-head">
        <div className="kicker">about & experience</div>
        <h2>A little walk through<br />where I've been.</h2>
        <p>Six years bouncing between product design, illustration, and the occasional pull request. I like teams that ship often and care about small details.</p>
      </div>

      <div className="about-grid">
        <div>
          <div className="timeline">
            {TIMELINE.map((t, i) => (
              <div key={i} className={`t-item ${t.kind === 'edu' ? 'education' : ''}`}>
                <span className="dot-marker" />
                <span className="badge">{t.kind === 'edu' ? 'education' : 'work'}</span>
                <div className="year">{t.year}</div>
                <h3>{t.title}</h3>
                <div className="org">{t.org}</div>
                <p>{t.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="about-bio">
          <h3>Beyond the screen</h3>
          <p>Outside of pixels, I'm usually somewhere quiet with a notebook. I believe good design comes from a good life — long walks, slow mornings, and lots of curiosity.</p>
          <div className="beyond-grid" style={{ marginTop: 12, gridTemplateColumns: 'repeat(2, 1fr)' }}>
            {HOBBIES.map((h, i) => (
              <div key={i} className="hobby">
                <div className="icon">{h.icon}</div>
                <h4>{h.name}</h4>
                <p>{h.note}</p>
              </div>
            ))}
          </div>
          <div className="stats">
            <div><strong>6</strong><span>years designing</span></div>
            <div><strong>40+</strong><span>projects shipped</span></div>
            <div><strong>3</strong><span>cities lived in</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- PROJECTS ---------- */
const PROJECTS = [
  {
    title: 'Lantern',
    slug: 'lantern',
    summary: 'A calm reading app that tracks moods, not pages. Designed and prototyped end-to-end.',
    description: "Lantern started from a frustration with reading apps that gamify progress — streaks, page counts, daily goals. It strips all of that away and replaces it with a simple mood log: how did this chapter make you feel?\n\nDesigned end-to-end over three months: user research, wireframes, high-fidelity screens, and an interactive iOS prototype. I also illustrated the full set of mood icons used throughout the app.",
    tags: ['Product design', 'iOS', 'Illustration'],
    glyph: 'L',
    bg: 'linear-gradient(135deg, oklch(0.82 0.09 295) 0%, oklch(0.86 0.07 230) 100%)',
    image: null,
    github: null,
    deploy: null,
  },
  {
    title: 'Bramble Bank',
    slug: 'bramble-bank',
    summary: 'Reimagined onboarding for a community bank. 38% lift in first-week activation.',
    description: "A community bank asked us to redesign their new account onboarding after data showed most users dropped off before completing it. We ran six user interviews, mapped the pain points, and rebuilt the flow from scratch — cutting it from 11 steps to 5.\n\nThe redesign shipped in Q3 2023 and drove a 38% lift in first-week activation. I owned the end-to-end design and worked closely with the engineering team through implementation.",
    tags: ['Fintech', 'Research', 'Design system'],
    glyph: 'B',
    bg: 'linear-gradient(135deg, oklch(0.86 0.07 230) 0%, oklch(0.90 0.05 160) 100%)',
    image: null,
    github: null,
    deploy: null,
  },
  {
    title: 'Sprout Notes',
    slug: 'sprout-notes',
    summary: 'A note-taking tool for gardeners. Voice-first, weatherproof, lovingly low-tech.',
    description: "A weekend project that got out of hand. Sprout Notes is a voice-first note-taking app designed for gardeners who need to record observations while their hands are in the dirt.\n\nBuilt with React and the Web Speech API. The UI is deliberately lo-fi — large touch targets, high contrast, no unnecessary chrome. Works offline and syncs when back online.",
    tags: ['Web app', 'Branding', 'Frontend'],
    glyph: 'S',
    bg: 'linear-gradient(135deg, oklch(0.89 0.05 20) 0%, oklch(0.92 0.06 95) 100%)',
    image: null,
    github: null,
    deploy: null,
  },
  {
    title: 'Mellow Studio Site',
    slug: 'mellow-studio',
    summary: 'A handmade portfolio for a small design studio. Featured in CSS Design Awards.',
    description: "A fully bespoke portfolio site for Mellowtail Studio, a four-person design consultancy. The brief was \"handmade, warm, a little unexpected.\" I designed and built it from scratch — no templates, no frameworks, just vanilla CSS and a lot of scroll animations.\n\nFeatured in CSS Design Awards in the month of launch. The studio still uses it today.",
    tags: ['Branding', 'Web', 'Illustration'],
    glyph: 'M',
    bg: 'linear-gradient(135deg, oklch(0.90 0.05 160) 0%, oklch(0.86 0.07 230) 100%)',
    image: null,
    github: null,
    deploy: null,
  },
  {
    title: 'Tiny Towns',
    slug: 'tiny-towns',
    summary: 'A weekend project: cozy procedurally-generated villages drawn in pure CSS.',
    description: "Can you make a whole village using only CSS? Turns out: yes, mostly. Tiny Towns generates small isometric villages procedurally — every refresh gives you a new layout with different buildings, paths, and tiny trees.\n\nNo images, no canvas, no JavaScript drawing — just divs, transforms, and a lot of patience. A fun exercise in pushing CSS to places it probably shouldn't go.",
    tags: ['Side project', 'CSS art'],
    glyph: 'T',
    bg: 'linear-gradient(135deg, oklch(0.92 0.06 95) 0%, oklch(0.89 0.05 20) 100%)',
    image: null,
    github: null,
    deploy: null,
  },
  {
    title: 'Tide & Time',
    slug: 'tide-time',
    summary: 'A pocket tide chart for fishermen and tide-pool nerds. Designed with my grandfather.',
    description: "My grandfather has fished the same stretch of coast for fifty years and still uses a paper tide table he prints every January. Tide & Time is an attempt to build something he'd actually use on his phone.\n\nDesigned through dozens of sessions with him — testing paper prototypes at the kitchen table, refining the data visualization until it clicked. The final design uses a simple wave graph with large, readable type and zero clutter.",
    tags: ['iOS', 'Data viz', 'Research'],
    glyph: 'T',
    bg: 'linear-gradient(135deg, oklch(0.86 0.07 230) 0%, oklch(0.82 0.09 295) 100%)',
    image: null,
    github: null,
    deploy: null,
  },
];

function ProjectsPage({ go }) {
  return (
    <div className="page" data-screen-label="03 Projects">
      <div className="section-head">
        <div className="kicker">selected work</div>
        <h2>Projects, side quests<br />& happy accidents.</h2>
        <p>A small selection — mostly product design, with a sprinkle of illustration and CSS experiments. Click any card for a deeper look.</p>
      </div>

      <div className="proj-grid">
        {PROJECTS.map((p, i) => (
          <article key={i} className="proj-card" onClick={() => go(`project-${p.slug}`)} role="link" tabIndex={0}>
            <div className="thumb">
              <div className="thumb-shape" style={{ background: p.bg }}>
                <span className="glyph">{p.glyph}</span>
              </div>
            </div>
            <div className="body">
              <h3>{p.title}</h3>
              <p className="summary">{p.summary}</p>
              <div className="tag-row">
                {p.tags.map(t => <span key={t} className="chip">{t}</span>)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ---------- SKILLS ---------- */
const SKILLS = {
  Design: [
    { label: 'Product design', v: 'v-lav' },
    { label: 'Design systems', v: 'v-lav' },
    { label: 'Prototyping', v: 'v-sky' },
    { label: 'User research', v: 'v-sky' },
    { label: 'Information architecture', v: 'v-lav' },
    { label: 'Illustration', v: 'v-blush' },
    { label: 'Brand identity', v: 'v-blush' },
    { label: 'Motion & micro-interactions', v: 'v-mint' },
  ],
  Code: [
    { label: 'HTML & CSS', v: 'v-sky' },
    { label: 'React', v: 'v-sky' },
    { label: 'TypeScript', v: 'v-lav' },
    { label: 'Tailwind', v: 'v-mint' },
    { label: 'Framer Motion', v: 'v-blush' },
    { label: 'A little Three.js', v: 'v-butter' },
  ],
  'Soft & squishy': [
    { label: 'Workshop facilitation', v: 'v-blush' },
    { label: 'Writing & docs', v: 'v-mint' },
    { label: 'Cross-team collaboration', v: 'v-lav' },
    { label: 'Mentoring', v: 'v-butter' },
  ],
};

const TOOLS = [
  { glyph: 'F', name: 'Figma' },
  { glyph: 'N', name: 'Notion' },
  { glyph: 'L', name: 'Linear' },
  { glyph: 'V', name: 'VS Code' },
  { glyph: 'P', name: 'Procreate' },
  { glyph: 'G', name: 'GitHub' },
];

const SWATCHES = { Design: 'var(--lavender-deep)', Code: 'var(--sky-deep)', 'Soft & squishy': 'oklch(0.72 0.12 20)' };

function DraggableSticker({ baseRotate, className, children }) {
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const [dragging, setDragging] = React.useState(false);
  const ref = React.useRef(null);
  const start = React.useRef({ x: 0, y: 0, ox: 0, oy: 0 });

  const onPointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    e.preventDefault();
    setDragging(true);
    start.current = { x: e.clientX, y: e.clientY, ox: pos.x, oy: pos.y };
    try { ref.current.setPointerCapture(e.pointerId); } catch (err) {}
  };
  const onPointerMove = (e) => {
    if (!dragging) return;
    setPos({
      x: start.current.ox + (e.clientX - start.current.x),
      y: start.current.oy + (e.clientY - start.current.y),
    });
  };
  const onPointerUp = (e) => {
    if (!dragging) return;
    setDragging(false);
    try { ref.current.releasePointerCapture(e.pointerId); } catch (err) {}
  };

  const transform = `translate(${pos.x}px, ${pos.y}px) rotate(${baseRotate}deg)${dragging ? ' scale(1.08)' : ''}`;

  return (
    <span
      ref={ref}
      className={className}
      style={{
        transform,
        zIndex: dragging ? 50 : (pos.x || pos.y ? 10 : 1),
        transition: dragging ? 'none' : 'box-shadow 0.25s, transform 0.25s cubic-bezier(.2,.8,.2,1)',
        touchAction: 'none',
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {children}
    </span>
  );
}

function SkillsPage() {
  return (
    <div className="page" data-screen-label="04 Skills">
      <div className="section-head">
        <div className="kicker">skills & tools</div>
        <h2>Stickers on the<br />back of my laptop.</h2>
        <p>The things I do most often, and the tools I reach for on a Tuesday. Drag them around — they don't bite.</p>
      </div>

      <div className="skills-board">
        {Object.entries(SKILLS).map(([category, items]) => (
          <div key={category}>
            <div className="cluster-label">
              <span className="swatch" style={{ background: SWATCHES[category] }} />
              {category}
            </div>
            <div className="skill-cluster">
              {items.map((s, i) => (
                <DraggableSticker
                  key={s.label}
                  className={`sticker ${s.v}`}
                  baseRotate={(i % 3 - 1) * 1.5}
                >
                  <span className="dot" /> {s.label}
                </DraggableSticker>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="cluster-label" style={{ marginTop: 36 }}>
        <span className="swatch" style={{ background: 'var(--lavender-deep)' }} />
        Daily tools
      </div>
      <div className="tools-row">
        {TOOLS.map(t => (
          <div key={t.name} className="tool-card">
            <span className="glyph">{t.glyph}</span>
            {t.name}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- CONTACT ---------- */
function ContactPage() {
  const [form, setForm] = React.useState({ name: '', message: '' });
  const [errors, setErrors] = React.useState({});
  const [sent, setSent] = React.useState(false);

  const onChange = (k) => (e) => {
    setForm(f => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors(err => ({ ...err, [k]: undefined }));
  };

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = 'A name would be lovely.';
    if (form.message.trim().length < 8) next.message = 'A few more words, please?';
    setErrors(next);
    if (Object.keys(next).length === 0) {
      const subject = encodeURIComponent('Contacting from portfolio');
      const body = encodeURIComponent(`${form.message}\n\nFrom,\n${form.name}`);
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=xinyeeelaine@gmail.com&su=${subject}&body=${body}`, '_blank');
      setSent(true);
      setForm({ name: '', message: '' });
      setTimeout(() => setSent(false), 6000);
    }
  };

  return (
    <div className="page" data-screen-label="05 Contact">
      <div className="section-head">
        <div className="kicker">say hello</div>
        <h2>Let's make<br />something together.</h2>
        <p>I'm open to product design work, illustration commissions, and the occasional consulting chat. I reply within a day or two — usually with coffee in hand.</p>
      </div>

      <div className="contact-grid">
        <div className="contact-side">
          <h3>Find me here</h3>
          <p>Or drop a line directly — both work. I promise I'm a friendly inbox.</p>
          <div className="social">
            <a href="#" onClick={(e) => e.preventDefault()}>
              <span className="icon">in</span>
              <div>
                <div style={{ fontSize: 12, opacity: 0.85, fontWeight: 500 }}>LinkedIn</div>
                <div>/in/elaine</div>
              </div>
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              <span className="icon">gh</span>
              <div>
                <div style={{ fontSize: 12, opacity: 0.85, fontWeight: 500 }}>GitHub</div>
                <div>@elainemakes</div>
              </div>
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              <span className="icon">@</span>
              <div>
                <div style={{ fontSize: 12, opacity: 0.85, fontWeight: 500 }}>Email</div>
                <div>xinyeeelaine@gmail.com</div>
              </div>
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              <span className="icon">✦</span>
              <div>
                <div style={{ fontSize: 12, opacity: 0.85, fontWeight: 500 }}>Read.cv</div>
                <div>read.cv/elaine</div>
              </div>
            </a>
          </div>
        </div>

        <form className="contact-form" onSubmit={submit} noValidate>
          {sent && (
            <div className="success" style={{ marginBottom: 16 }}>
              ✨ Sent! I'll get back to you within a day or two.
            </div>
          )}
          <div className="field">
            <label>Your name</label>
            <input type="text" value={form.name} onChange={onChange('name')} placeholder="Sam from the studio" />
            {errors.name && <div className="err">{errors.name}</div>}
          </div>
          <div className="field">
            <label>What's on your mind?</label>
            <textarea value={form.message} onChange={onChange('message')} placeholder="Tell me about the project, the team, the timeline — or just say hi." />
            {errors.message && <div className="err">{errors.message}</div>}
          </div>
          <div className="submit-row">
            <button type="submit" className="btn primary">Send it →</button>
            <span style={{ fontSize: 13, color: 'var(--ink-faint)' }}>I read every message.</span>
          </div>
        </form>
      </div>
    </div>
  );
}

function ProjectDetailPage({ slug, go }) {
  const project = PROJECTS.find(p => p.slug === slug);

  React.useEffect(() => {
    if (!project) go('projects');
  }, [slug, go]);

  if (!project) return null;

  const idx = PROJECTS.indexOf(project);
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  return (
    <div className="page" data-screen-label="Project Detail">
      <button className="proj-detail-back btn ghost" onClick={() => go('projects')}>
        ← Projects
      </button>

      <div className="proj-detail-preview">
        <div
          className="proj-detail-preview-img"
          style={!project.image ? { background: project.bg } : {}}
        >
          {project.image
            ? <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            : <span className="glyph">{project.glyph}</span>
          }
        </div>
        <div className="proj-detail-body">
          <div className="proj-detail-kicker">selected work</div>
          <h1>{project.title}</h1>
          <div className="tag-row">
            {project.tags.map(t => <span key={t} className="chip">{t}</span>)}
          </div>
        </div>
      </div>

      <div className="proj-detail-cards">
        <div className="proj-detail-card">
          <div className="proj-detail-kicker">About this project</div>
          <p>{project.description}</p>
        </div>

        {(project.github || project.deploy) && (
          <div className="proj-detail-card">
            <div className="proj-detail-kicker">Links</div>
            <div className="proj-detail-links">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="proj-detail-link proj-detail-link-gh"
                >
                  <span>GitHub</span>
                  <span>→</span>
                </a>
              )}
              {project.deploy && (
                <a
                  href={project.deploy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="proj-detail-link proj-detail-link-live"
                >
                  <span>Live site</span>
                  <span>→</span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="proj-detail-nav">
        <button
          className="proj-detail-nav-btn"
          onClick={() => go(`project-${prev.slug}`)}
        >
          ← {prev.title}
        </button>
        <button
          className="proj-detail-nav-btn"
          onClick={() => go(`project-${next.slug}`)}
        >
          {next.title} →
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { HomePage, AboutPage, ProjectsPage, SkillsPage, ContactPage, ProjectDetailPage });
