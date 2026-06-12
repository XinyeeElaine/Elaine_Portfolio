/* All 5 page components for the cozy portfolio. */

function HomePage({ go }) {
  return (
    <div className="page" data-screen-label="01 Home">
      <div className="hero">
        <div>
          <div className="eyebrow"><span className="pulse" /> open to new projects · 2026</div>
          <h1>
            Hi, I'm Elaine <span className="wave">🐱</span><br />
            I turn data into <em>cozy</em> things -⩊-
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
            <img src="Picture/Elaine_profile.jpg" alt="Elaine" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
  { year: 'June 2022 — June 2024', title: 'Diploma in Computer Science', org: 'Tunku Abdul Rahman University of Management and Technology (TARUMT)', kind: 'edu',
    body: 'Built a solid foundation in programming fundamentals, algorithms, and software design.' },
  { year: 'November 2023 — January 2024', title: 'Data Analyst Intern', org: 'ADEV Ventures Sdn Bhd', kind: 'work',
    body: 'Led the design, testing, and deployment of conversational AI chatbot workflows (miu.ai, WATI), while also programming custom JavaScript tracking scripts and managing HubSpot and Airtable CRM databases.' },
  { year: 'July 2024 — July 2026', title: 'Degree in Data Science', org: 'Tunku Abdul Rahman University of Management and Technology (TARUMT)', kind: 'edu',
    body: 'Exploring data analytics, machine learning, and statistical modelling to turn raw numbers into meaningful stories.' },
  { year: 'January 2026 — July 2026', title: 'Software Support Executive Intern', org: 'Ideo Soft Sdn Bhd', kind: 'work',
    body: 'Delivered full-cycle infrastructure management and data solutions for the AutoCount enterprise ecosystem, leveraging Python, SQL, and C# for database customization and data cleansing while leading technical consultations and onboarding training for corporate clients.' },
];

const HOBBIES = [
  { icon: '🍵', name: 'Matcha & cocoa', note: 'Iced matcha, cold cocoa — I like my drinks chilly, not steamy' },
  { icon: '🎮', name: 'Games', note: 'Screaming in REPO, drifting in Mario, and chaos in Roblox' },
  { icon: '🎨', name: 'Art & DIY', note: 'One crochet project at a time — also hoarding perler beads I definitely need' },
  { icon: '🌟', name: 'Exploring', note: 'Chasing new experiences, saying yes to random adventures' },
];

function AboutPage() {
	  const [order, setOrder] = React.useState('asc');
	  const sorted = order === 'asc' ? TIMELINE : [...TIMELINE].reverse();
  return (
    <div className="page" data-screen-label="02 About">
      <div className="section-head">
        <div className="kicker">about & experience</div>
        <h2>A little walk through<br />where I've been.</h2>
        <p>Four years bouncing between data science, coding, and the occasional dive into AI. I like teams that ship often and care about small details.</p>
      </div>

      <div className="about-grid">
        <div>
          <div className="timeline-sort">
                <button className="btn ghost" onClick={() => setOrder(o => o === 'asc' ? 'desc' : 'asc')}>
                  {order === 'asc' ? '↑ Earliest first' : '↓ Latest first'}
                </button>
              </div>
              <div className="timeline">
            {sorted.map((t, i) => (
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
            <div><strong>4</strong><span>years in tech</span></div>
            <div><strong>20+</strong><span>projects shipped</span></div>
            <div><strong>3</strong><span>languages spoken</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- PROJECTS ---------- */
const PROJECTS = [
  {
    title: 'LoafLand Bakery',
    slug: 'loafland-bakery',
    summary: 'Full-featured Android bakery app — online ordering for customers, management dashboard for admins.',
    description: "A complete Android mobile app built for a bakery shop, delivering \"fresh from the oven, straight to your phone.\" Developed as part of a mobile application development course.\n\nBuilt with Kotlin and Jetpack Compose using MVVM architecture. The app has two modules — a customer-facing side (menu browsing, cart with 6% service tax, in-app wallet, order tracking, custom combo sets, reviews) and an admin panel (CRUD for menu items, review management, order status updates).\n\nFeatures Room (SQLite) with 8 entity tables, multi-language support (English, Bahasa Melayu, Chinese), and Material 3 design throughout.",
    tags: ['Android', 'Kotlin', 'Jetpack Compose', 'MVVM', 'Room DB'],
    glyph: 'L',
    thumb: 'Picture/LoafLand-Bakery_logo.jpg',
    bg: 'linear-gradient(135deg, oklch(0.78 0.10 55) 0%, oklch(0.84 0.08 85) 100%)',
    image: null,
    github: 'https://github.com/XinyeeElaine/LoafLand-Bakery',
    deploy: null,
    images: [
      'Picture/LoafLand-Bakery1.png',
      'Picture/LoafLand-Bakery2.png',
      'Picture/LoafLand-Bakery3.png',
      'Picture/LoafLand-Bakery4.png',
      'Picture/LoafLand-Bakery5.png',
      'Picture/LoafLand-Bakery6.png',
    ],
  },
  {
    title: 'Meow-ney Maker',
    slug: 'meow-ney-maker',
    summary: 'Real-time salary tracker with a bouncing DJ cat. Watch your earnings grow second-by-second.',
    description: "Work is boring, but getting paid isn't. A playful real-time working timer that calculates your earnings down to the second based on your monthly salary and working hours — complete with a bouncing hard-working cat companion and a DJ Cat for clock-out celebrations.\n\nBuilt with pure HTML, CSS, and vanilla JavaScript — no frameworks, just feline motivation. Session history is saved via local storage so you can track shifts, hours, and earnings over time. The UI uses clean glass-morphism cards with a custom floating glitter background.",
    tags: ['Web app', 'Vanilla JS', 'Productivity', 'Fun'],
    glyph: 'M',
    bg: 'linear-gradient(135deg, oklch(0.84 0.08 85) 0%, oklch(0.78 0.10 55) 100%)',
    image: null,
    github: 'https://github.com/XinyeeElaine/Meow-ney-Maker',
    deploy: 'https://meow-ney.sillycookie.me/',
  },
  {
    title: 'FYP Predictive API',
    slug: 'fyp-predictive-api',
    summary: 'EV charger predictive diagnostics API — ML-powered fault detection for charging infrastructure.',
    description: "My final year project: a predictive diagnostics API for electric vehicle charging stations. Built to detect potential faults before they happen, using a trained machine learning model on synthetic charger data.\n\nThe system ingests charger telemetry, runs it through a diagnostic engine, and returns predictive maintenance alerts via API. Includes a serialized ML model (ev_charger_model.pkl), a diagnostic engine, and full test coverage.",
    tags: ['Python', 'Machine Learning', 'API', 'EV'],
    glyph: 'E',
    bg: 'linear-gradient(135deg, oklch(0.80 0.10 160) 0%, oklch(0.76 0.12 200) 100%)',
    image: null,
    github: 'https://github.com/XinyeeElaine/FYP_Predictive_api',
    deploy: null,
  },
  {
    title: 'H&Maybe',
    slug: 'h-and-maybe',
    summary: 'Full-stack fashion e-commerce web app — browse, cart, Stripe checkout, and admin panel.',
    description: "A full-stack fashion e-commerce web application built from the ground up with plain PHP — no frameworks, just clean architecture.\n\nUsers can browse clothing by category, manage a shopping cart, pay via Stripe, and track orders. An admin panel lets store operators manage products (with variations), orders, and members. The database spans 10 tables covering users, products, variations, cart, orders, addresses, and auth tokens.\n\nFeatures PDO-based MySQL/MariaDB queries, PHPMailer for SMTP emails, Stripe integration via stripe-php, jQuery for interactivity, and custom CSS styling with .avif product images served through a thumbnail library.",
    tags: ['PHP', 'MySQL', 'E-commerce', 'Stripe', 'Full-stack'],
    glyph: 'H',
    bg: 'linear-gradient(135deg, oklch(0.75 0.10 10) 0%, oklch(0.68 0.12 30) 100%)',
    image: null,
    github: 'https://github.com/XinyeeElaine/HAndMaybe',
    deploy: null,
  },
  {
    title: 'FoodTrust',
    slug: 'foodtrust',
    summary: 'AI-powered browser extension that detects fake reviews on Google Maps using AWS Bedrock.',
    description: "We built this during the Great AI Hackathon 2025 - Team Penguining, my first hackathon project🤩 FoodTrust is a browser extension that brings transparency back to online food reviews.\n\nIt analyzes Google Maps restaurant reviews in real time using AWS Bedrock's language models, flagging suspicious reviews with reasoning and probability scores. An overall trust score (e.g. 85%) is displayed directly on the page.\n\nThe architecture uses a serverless AWS backend — Lambda functions process review text through Bedrock, with API Gateway routing and S3 for storage. The extension frontend is vanilla JavaScript, HTML, and CSS, while the ML pipeline was prototyped in Jupyter Notebooks via SageMaker Studio.",
    tags: ['AI/ML', 'Browser Extension', 'AWS Bedrock', 'JavaScript', 'Python'],
    glyph: 'F',
    bg: 'linear-gradient(135deg, oklch(0.72 0.08 260) 0%, oklch(0.62 0.12 290) 100%)',
    image: null,
    github: 'https://github.com/XinyeeElaine/fake-food-review-detector',
    deploy: null,
  },
];

function ProjectsPage({ go }) {
  return (
    <div className="page" data-screen-label="03 Projects">
      <div className="section-head">
        <div className="kicker">selected work</div>
        <h2>Projects, side quests<br />& happy accidents.</h2>
        <p>A small selection — apps, side quests, and whatever curiosity coughs up. Click any card for a deeper look.</p>
      </div>

      <div className="proj-grid">
        {PROJECTS.map((p, i) => (
          <article key={i} className="proj-card" onClick={() => go(`project-${p.slug}`)} role="link" tabIndex={0}>
            <div className="thumb">
              <div className="thumb-shape" style={p.thumb ? { background: 'var(--paper)' } : { background: p.bg }}>
                {p.thumb ? (
                  <img src={p.thumb} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
                ) : (
                  <span className="glyph">{p.glyph}</span>
                )}
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
  Code: [
    { label: 'Python', v: 'v-sky' },
    { label: 'SQL', v: 'v-sky' },
    { label: 'C#', v: 'v-lav' },
    { label: 'HTML & CSS', v: 'v-sky' },
    { label: 'JavaScript', v: 'v-lav' },
    { label: 'php', v: 'v-sky' },
    { label: 'Data Analytics', v: 'v-mint' },
    { label: 'Machine Learning', v: 'v-lav' },
    { label: 'Java', v: 'v-blush' },
    { label: 'Pandas & NumPy', v: 'v-mint' },
    { label: 'REST APIs', v: 'v-butter' },
  ],
  Languages: [
    { label: 'English', v: 'v-lav' },
    { label: 'Chinese', v: 'v-blush' },
    { label: 'Malay', v: 'v-mint' },
  ],
  'Soft & squishy': [
    { label: 'Adaptable & curious', v: 'v-blush' },
    { label: 'Clear communicator', v: 'v-mint' },
    { label: 'Team player', v: 'v-lav' },
    { label: 'Detail-oriented', v: 'v-butter' },
  ],
};

const TOOLS = [
  { glyph: '💻', name: 'VS Code' },
  { glyph: '🐙', name: 'GitHub' },
  { glyph: '📓', name: 'Jupyter' },
  { glyph: '☁️', name: 'Google Colab' },
  { glyph: '📊', name: 'Power BI / Tableau' },
  { glyph: '🗄️', name: 'MySQL / SSMS' },
];

const SWATCHES = { Code: 'var(--sky-deep)', Languages: 'var(--lavender-deep)', 'Soft & squishy': 'oklch(0.72 0.12 20)' };

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
        <p>I'm open to design work, AI projects, and the occasional collaboration. I reply within a day or two — usually with matcha in hand.</p>
      </div>

      <div className="contact-grid">
        <div className="contact-side">
          <h3>Find me here</h3>
          <p>Or drop a line directly — both work. I promise I'm a friendly inbox.</p>
          <div className="social">
            <a href="https://www.linkedin.com/in/elaine-pang-xin-yee-313b4b211/" target="_blank" rel="noopener noreferrer">
              <span className="icon">in</span>
              <div>
                <div style={{ fontSize: 12, opacity: 0.85, fontWeight: 500 }}>LinkedIn</div>
                <div>/in/elaine-pang-xin-yee</div>
              </div>
            </a>
            <a href="https://github.com/XinyeeElaine" target="_blank" rel="noopener noreferrer">
              <span className="icon">gh</span>
              <div>
                <div style={{ fontSize: 12, opacity: 0.85, fontWeight: 500 }}>GitHub</div>
                <div>@XinyeeElaine</div>
              </div>
            </a>
            <a href="https://www.instagram.com/xinyee_elaine/" target="_blank" rel="noopener noreferrer">
              <span className="icon">ig</span>
              <div>
                <div style={{ fontSize: 12, opacity: 0.85, fontWeight: 500 }}>Instagram</div>
                <div>@xinyee_elaine</div>
              </div>
            </a>
            <a href="https://wa.me/60162864168" target="_blank" rel="noopener noreferrer">
              <span className="icon">wa</span>
              <div>
                <div style={{ fontSize: 12, opacity: 0.85, fontWeight: 500 }}>WhatsApp</div>
                <div>016-286 4168</div>
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
            <input type="text" value={form.name} onChange={onChange('name')} placeholder="Elaine from the studio" />
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

function ImageCarousel({ images, title }) {
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const timer = React.useRef(null);

  React.useEffect(() => {
    if (!paused && images.length > 1) {
      timer.current = setInterval(() => setActive(a => (a + 1) % images.length), 3500);
    }
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [paused, images.length]);

  const goTo = (i) => { setActive(i); setPaused(true); };

  return (
    <div
      className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="carousel-viewport">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${title} — screenshot ${i + 1}`}
            className={`carousel-img ${i === active ? 'carousel-img-active' : ''}`}
          />
        ))}
      </div>
      {images.length > 1 && (
        <div className="carousel-dots">
          {images.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot ${i === active ? 'carousel-dot-active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Image ${i + 1}`}
            />
          ))}
        </div>
      )}
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
        {project.images && project.images.length > 0 ? (
          <ImageCarousel images={project.images} title={project.title} />
        ) : (
          <div
            className="proj-detail-preview-img"
            style={!project.image ? { background: project.bg } : {}}
          >
            {project.image
              ? <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              : <span className="glyph">{project.glyph}</span>
            }
          </div>
        )}
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
          {(project.github || project.deploy) && (
            <div className="proj-detail-links-row">
              <div className="proj-detail-kicker">Links</div>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="proj-detail-link proj-detail-link-gh"
                >
                  GitHub →
                </a>
              )}
              {project.deploy && (
                <a
                  href={project.deploy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="proj-detail-link proj-detail-link-live"
                >
                  Live site →
                </a>
              )}
            </div>
          )}
        </div>

        {project.techStack && (
          <div className="proj-detail-card">
            <div className="proj-detail-kicker">Tech stack</div>
            <div className="tech-stack-grid">
              {project.techStack.map(t => (
                <span key={t} className="tech-chip">{t}</span>
              ))}
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
