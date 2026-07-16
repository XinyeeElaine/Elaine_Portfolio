/* All 5 page components for the cozy portfolio. */

function HomePage({ go }) {
  return (
    <div className="page" data-screen-label="01 Home">
      <div className="hero">
        <div>
          <div className="eyebrow"><span className="pulse" /> open to new projects · 2026</div>
          <h1>
            Hi, I'm <span className="wave">🐱</span><br />
            <em>Elaine Pang Xin Yee -⩊-</em>
          </h1>
          <p className="lede">
            Data Science graduate from TARUMT. I turn messy data into clear, playful things people actually want to use — dashboards, apps, and the automations that keep them fed.
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
            <img src="Picture/Elaine_profile.jpg?v=2" alt="Elaine" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="card-tile t-card1">
            <div className="tile-label">currently</div>
            <div className="tile-body">job hunting & building side projects 💻</div>
          </div>
          <div className="card-tile t-card2">
            <div className="tile-label">learning</div>
            <div className="tile-body">n8n automations 🔧</div>
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
            Automation <span className="star">✦</span>
            Machine Learning <span className="star">✦</span>
          </span>
          <span>
            data science <span className="star">✦</span>
            UI/UX design <span className="star">✦</span>
            front-end <span className="star">✦</span>
            Python <span className="star">✦</span>
            Automation <span className="star">✦</span>
            Machine Learning <span className="star">✦</span>
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
            <div><strong>10+</strong><span>projects shipped</span></div>
            <div><strong>3</strong><span>languages spoken</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- PROJECTS ---------- */
/* What each tool actually did on these projects — shown under the name in "Built with",
   so the list reads as roles rather than a pile of nouns. */
const TECH_ROLE = {
  // LoafLand
  'Kotlin': 'Language',
  'Jetpack Compose': 'UI toolkit',
  'MVVM': 'Architecture',
  'Room (SQLite)': 'Local database',
  'Material 3': 'Design system',
  'Android SDK': 'Platform',
  // Meow-ney Maker
  'HTML': 'Markup',
  'CSS': 'Styling',
  'Vanilla JavaScript': 'Language',
  'localStorage': 'Client storage',
  // FYP Predictive API
  'Python': 'Language',
  'Flask': 'Web framework',
  'scikit-learn': 'Machine learning',
  'pandas': 'Data wrangling',
  'Waitress': 'WSGI server',
  'Render': 'Hosting',
  // H&Maybe
  'PHP': 'Backend',
  'MySQL': 'Database',
  'MariaDB': 'Database',
  'PDO': 'Database access',
  'Stripe': 'Payments',
  'PHPMailer': 'Transactional email',
  'jQuery': 'Frontend',
  // FoodTrust
  'Amazon Bedrock': 'LLM inference',
  'AWS Lambda': 'Serverless compute',
  'Amazon API Gateway': 'API routing',
  'Amazon S3': 'Object storage',
  'Amazon SageMaker Studio': 'ML prototyping',
  'JavaScript': 'Extension frontend',
};

const PROJECTS = [
  {
    title: 'LoafLand Bakery',
    slug: 'loafland-bakery',
    summary: 'Full-featured Android bakery app — online ordering for customers, management dashboard for admins.',
    description: "A complete Android mobile app built for a bakery shop, delivering \"fresh from the oven, straight to your phone.\" Developed as part of a mobile application development course.\n\nBuilt with Kotlin and Jetpack Compose using MVVM architecture. The app has two modules — a customer-facing side (menu browsing, cart with 6% service tax, in-app wallet, order tracking, custom combo sets, reviews) and an admin panel (CRUD for menu items, review management, order status updates).\n\nFeatures Room (SQLite) with 8 entity tables, multi-language support (English, Bahasa Melayu, Chinese), and Material 3 design throughout.",
    tags: ['Android', 'Kotlin', 'Jetpack Compose', 'MVVM', 'Room DB'],
    features: [
      'Menu browsing with cart and 6% service tax',
      'In-app wallet and live order tracking',
      'Build-your-own combo sets',
      'Customer reviews and ratings',
      'Admin panel — menu CRUD, review moderation, order status',
      'Multi-language: English, Bahasa Melayu, Chinese',
    ],
    techStack: ['Kotlin', 'Jetpack Compose', 'MVVM', 'Room (SQLite)', 'Material 3', 'Android SDK'],
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
    features: [
      'Earnings counter that ticks up second-by-second',
      'Set your monthly salary and working hours',
      'Bouncing cat companion while you work',
      'DJ Cat clock-out celebration',
      'Session history — shifts, hours, earnings over time',
      'Glass-morphism UI with a floating glitter background',
    ],
    techStack: ['HTML', 'CSS', 'Vanilla JavaScript', 'localStorage'],
    glyph: 'M',
    bg: 'linear-gradient(135deg, oklch(0.84 0.08 85) 0%, oklch(0.78 0.10 55) 100%)',
    thumb: 'Picture/meow-ney_logo.png',
    image: null,
    github: 'https://github.com/XinyeeElaine/Meow-ney-Maker',
    deploy: 'https://meow-ney.sillycookie.me/',
  },
  {
    title: 'FYP Predictive API',
    slug: 'fyp-predictive-api',
    summary: 'EV charger predictive diagnostics API: ML-powered fault detection for charging infrastructure.',
            description: "EV Predictive Maintenance API — a Flask REST API that detects charger faults before they happen using a trained scikit-learn pipeline.\n\nThe POST /predict endpoint accepts charger telemetry and returns a failure probability, risk level, failure category (Overheating, Power Quality, Software Error), and a root cause explanation. Designed to handle messy real-world data with input key mapping (Laravel/PHP integration), rolling-feature backfilling, and sensible fallback defaults.\n\nServed via Waitress, deployed on Render, and tested against 20 edge-case scenarios.",
    tags: ['Python', 'Flask', 'scikit-learn', 'ML', 'REST API', 'EV'],
    features: [
      'POST /predict returns a failure probability from charger telemetry',
      'Risk level and failure category — Overheating, Power Quality, Software Error',
      'Root cause explanation with every prediction',
      'Input key mapping for Laravel/PHP integration',
      'Rolling-feature backfilling and fallback defaults for messy data',
      'Tested against 20 edge-case scenarios',
    ],
    techStack: ['Python', 'Flask', 'scikit-learn', 'pandas', 'Waitress', 'Render'],
    glyph: 'E',
    thumb: 'Picture/ev_logo.png',
    bg: 'linear-gradient(135deg, oklch(0.80 0.10 160) 0%, oklch(0.76 0.12 200) 100%)',
    image: null,
    github: 'https://github.com/XinyeeElaine/FYP_Predictive_api',
    deploy: null,
    images: [
      'Picture/ev_predictive_maintenance.png',
      'Picture/ev_usage_analysis.png',
    ],
  },
  {
    title: 'H&Maybe',
    slug: 'h-and-maybe',
    summary: 'Full-stack fashion e-commerce web app — browse, cart, Stripe checkout, and admin panel.',
    description: "A full-stack fashion e-commerce web application built from the ground up with plain PHP — no frameworks, just clean architecture.\n\nUsers can browse clothing by category, manage a shopping cart, pay via Stripe, and track orders. An admin panel lets store operators manage products (with variations), orders, and members. The database spans 12 tables covering users, products, variations, cart, orders, addresses, and auth tokens.\n\nFeatures PDO-based MySQL/MariaDB queries, PHPMailer for SMTP emails, Stripe integration via stripe-php, jQuery for interactivity, and custom CSS styling with .avif product images served through a thumbnail library.",
    tags: ['PHP', 'MySQL', 'E-commerce', 'Stripe', 'Full-stack'],
    collaborators: [{ name: 'MingLi', role: 'Teammate', href: 'https://exoticpengy.me', avatar: 'Picture/exoticpengy.png' }],
    features: [
      'Browse clothing by category',
      'Shopping cart with product variations',
      'Stripe checkout',
      'Order history and tracking',
      'Admin panel — products, orders, members',
      'Transactional email over SMTP',
      '12-table schema: users, products, variations, cart, orders, addresses, auth tokens',
    ],
    techStack: ['PHP', 'MySQL', 'MariaDB', 'PDO', 'Stripe', 'PHPMailer', 'jQuery', 'CSS'],
    glyph: 'H',
    bg: 'linear-gradient(135deg, oklch(0.75 0.10 10) 0%, oklch(0.68 0.12 30) 100%)',
    thumb: 'Picture/HAndMaybe.png?v=2',
    image: null,
    github: 'https://github.com/XinyeeElaine/HAndMaybe',
    deploy: null,
    images: [
      'Picture/H&Maybe_product.png',
      'Picture/H&Maybe_cart.png',
      'Picture/H&Maybe_order.png',
    ],
  },
  {
    title: 'FoodTrust',
    slug: 'foodtrust',
    summary: 'AI-powered browser extension that detects fake reviews on Google Maps using Amazon Bedrock.',
    description: "We built this during the Great AI Hackathon 2025 - Team Penguining, my first hackathon project =´∇｀= FoodTrust is a browser extension that brings transparency back to online food reviews.\n\nIt analyzes Google Maps restaurant reviews in real time using Amazon Bedrock's language models, flagging suspicious reviews with reasoning and probability scores. An overall trust score (e.g. 85%) is displayed directly on the page.\n\nThe architecture uses a serverless AWS backend — Lambda functions process review text through Bedrock, with API Gateway routing and S3 for storage. The extension frontend is vanilla JavaScript, HTML, and CSS, while the ML pipeline was prototyped in Jupyter Notebooks via SageMaker Studio.",
    tags: ['AI/ML', 'Browser Extension', 'Amazon Bedrock', 'JavaScript', 'Python'],
    collaborators: [{ name: 'MingLi', role: 'Teammate · Team Penguining', href: 'https://exoticpengy.me', avatar: 'Picture/exoticpengy.png' }],
    features: [
      'Analyzes Google Maps restaurant reviews in real time',
      'Flags suspicious reviews with reasoning and a probability score',
      'Overall trust score shown directly on the page',
      'Serverless backend — no server to babysit',
    ],
    techStack: ['Amazon Bedrock', 'AWS Lambda', 'Amazon API Gateway', 'Amazon S3', 'Amazon SageMaker Studio', 'JavaScript', 'Python'],
    glyph: 'F',
    bg: 'linear-gradient(135deg, oklch(0.72 0.08 260) 0%, oklch(0.62 0.12 290) 100%)',
    thumb: 'Picture/FoodTrust.png?v=1',
    image: null,
    github: 'https://github.com/XinyeeElaine/fake-food-review-detector',
    deploy: null,
    images: [
      'Picture/FoodTrust_extension.png',
      'Picture/FoodTrust_analysis.png',
    ],
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
const ICON = (name) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}.svg`;

const SKILLS = {
  LANGUAGES: [
    { label: 'Python', v: 'v-sky', icon: ICON('python/python-original') },
    { label: 'SQL', v: 'v-sky', icon: ICON('azuresqldatabase/azuresqldatabase-original') },
    { label: 'C#', v: 'v-lav', icon: ICON('csharp/csharp-original') },
    { label: 'HTML & CSS', v: 'v-butter', icon: ICON('html5/html5-original') },
    { label: 'JavaScript', v: 'v-lav', icon: ICON('javascript/javascript-original') },
    { label: 'PHP', v: 'v-sky', icon: ICON('php/php-original') },
    { label: 'Java', v: 'v-blush', icon: ICON('java/java-original') },
    { label: 'Kotlin', v: 'v-sky', icon: ICON('kotlin/kotlin-original') },
  ],
  FRAMEWORKS: [
    { label: 'Flask', v: 'v-lav', icon: ICON('flask/flask-original') },
    { label: 'Jetpack Compose', v: 'v-sky', icon: ICON('jetpackcompose/jetpackcompose-original') },
    { label: 'Vue', v: 'v-mint', icon: ICON('vuejs/vuejs-original') },
  ],
  LIBRARIES: [
    { label: 'pandas', v: 'v-mint', icon: ICON('pandas/pandas-original') },
    { label: 'scikit-learn', v: 'v-lav', icon: ICON('scikitlearn/scikitlearn-original') },
  ],
  INFRASTRUCTURE: [
    { label: 'MySQL', v: 'v-butter', icon: ICON('mysql/mysql-original') },
    { label: 'Supabase', v: 'v-mint', icon: ICON('supabase/supabase-original') },
    { label: 'AWS', v: 'v-lav', icon: ICON('amazonwebservices/amazonwebservices-original-wordmark') },
  ],
  TOOLS: [
    { label: 'Git', v: 'v-lav', icon: ICON('git/git-original') },
    { label: 'n8n', v: 'v-blush', icon: 'https://cdn.simpleicons.org/n8n' },
  ],
  'Soft skills': [
    { label: 'Adaptable & curious', v: 'v-blush' },
    { label: 'Clear communicator', v: 'v-mint' },
    { label: 'Team player', v: 'v-lav' },
    { label: 'Detail-oriented', v: 'v-butter' },
    { label: 'Process driven', v: 'v-sky' },
  ],
};

function DraggableSticker({ baseRotate, className, icon, children }) {
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
      {icon ? <img src={icon} className="sticker-icon" alt="" onError={(e) => { e.target.style.display = 'none'; }} /> : null}
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

      <div className="skills-grid">
        {Object.entries(SKILLS).map(([category, items]) => (
          <div key={category}>
            <div className="cluster-label"><span className={`swatch swatch-${category.toLowerCase().replace(/[^a-z]/g, '')}`}></span> {category}</div>
            <div className="skill-section">
              <div className="skill-cluster">
                {items.map((s, i) => (
                  <DraggableSticker
                    key={s.label}
                    className={`sticker ${s.v}`}
                    icon={s.icon}
                    baseRotate={(i % 3 - 1) * 1.5}
                  >
                    {s.label}
                  </DraggableSticker>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- CONTACT ---------- */
/* Brand marks: devicon carries LinkedIn but not Instagram/WhatsApp; simple-icons is the
   reverse (it dropped LinkedIn), so each one comes from whichever CDN actually has it.
   CSS recolours them white — the source colours here don't survive the filter. */
const SOCIALS = [
  {
    label: 'LinkedIn',
    value: '/in/elaine-pang-xin-yee',
    href: 'https://www.linkedin.com/in/elaine-pang-xin-yee-313b4b211/',
    // devicon's LinkedIn is a filled badge — recolouring it white erases the "in".
    // This is devicon's own path with the outer badge subpath dropped, leaving the glyph.
    icon: "data:image/svg+xml," + encodeURIComponent(
      "<svg xmlns='http://www.w3.org/2000/svg' viewBox='18 27 92 82'><path d='M39.17 107H21.06V48.73h18.11zm-9-66.21a10.5 10.5 0 1110.49-10.5 10.5 10.5 0 01-10.54 10.48zM107 107H88.89V78.65c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15V107H50.53V48.73h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41C103.6 47.28 107 59.35 107 75z'/></svg>"
    ),
  },
  {
    label: 'GitHub',
    value: '@XinyeeElaine',
    href: 'https://github.com/XinyeeElaine',
    icon: 'https://cdn.simpleicons.org/github/181717',
  },
  {
    label: 'Instagram',
    value: '@xinyee_elaine',
    href: 'https://www.instagram.com/xinyee_elaine/',
    icon: 'https://cdn.simpleicons.org/instagram/E4405F',
  },
  {
    label: 'WhatsApp',
    value: '016-286 4168',
    href: 'https://wa.me/60162864168?text=Hi%20Elaine%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect.',
    icon: 'https://cdn.simpleicons.org/whatsapp/25D366',
  },
];

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
            {SOCIALS.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                <span className="icon">
                  <img src={s.icon} alt="" onError={(e) => { e.target.style.display = 'none'; }} />
                </span>
                <div>
                  <div className="social-label">{s.label}</div>
                  <div className="social-value">{s.value}</div>
                </div>
              </a>
            ))}
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
  const resumeTimer = React.useRef(null);

  const clearTimers = () => {
    if (timer.current) { clearInterval(timer.current); timer.current = null; }
    if (resumeTimer.current) { clearTimeout(resumeTimer.current); resumeTimer.current = null; }
  };

  const startAuto = () => {
    clearTimers();
    if (images.length > 1) {
      timer.current = setInterval(() => setActive(a => (a + 1) % images.length), 3500);
    }
  };

  React.useEffect(() => {
    if (!paused) startAuto();
    else clearTimers();
    return clearTimers;
  }, [paused, images.length]);

  const goTo = (i) => {
    clearTimers();
    setActive(i);
    setPaused(true);
    resumeTimer.current = setTimeout(() => setPaused(false), 4000);
  };

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
        {images.length > 1 && (
          <React.Fragment>
            <button
              className="carousel-arrow carousel-arrow-prev"
              onClick={() => goTo((active - 1 + images.length) % images.length)}
              aria-label="Previous image"
            >
              ←
            </button>
            <button
              className="carousel-arrow carousel-arrow-next"
              onClick={() => goTo((active + 1) % images.length)}
              aria-label="Next image"
            >
              →
            </button>
          </React.Fragment>
        )}
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
          <span className="carousel-count">{active + 1} / {images.length}</span>
        </div>
      )}
    </div>
  );
}

// inline so it picks up the link's colour in every theme — a devicon PNG would stay black on midnight
function GitHubMark() {
  return (
    <svg className="proj-detail-link-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
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
  // no screenshots? fall back to the project's own artwork before the bare glyph
  const hero = project.image || project.thumb;

  return (
    <article className="page" data-screen-label="Project Detail">
      <button className="proj-detail-back btn ghost" onClick={() => go('projects')}>
        ← Projects
      </button>

      <div className="proj-detail-hero">
        <header className="proj-detail-head">
          <div className="proj-detail-kicker">selected work</div>
          <h1>{project.title}</h1>
          <p className="proj-detail-summary">{project.summary}</p>
          <div className="tag-row">
            {project.tags.map(t => <span key={t} className="chip">{t}</span>)}
          </div>
        </header>

        <figure className="proj-gallery">
          {project.images && project.images.length > 0 ? (
            <ImageCarousel images={project.images} title={project.title} />
          ) : (
            <div
              className="proj-detail-preview-img"
              style={hero ? {} : { background: project.bg }}
            >
              {hero
                ? <img src={hero} alt={`${project.title} logo`} />
                : <span className="glyph">{project.glyph}</span>
              }
            </div>
          )}
        </figure>
      </div>

      <section className="proj-section">
        <h2 className="proj-section-title">Overview</h2>
        {project.description.split('\n\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </section>

      {(project.github || project.deploy) && (
        <section className="proj-section">
          <h2 className="proj-section-title">Deployment Links</h2>
          <div className="proj-detail-links-row">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="proj-detail-link proj-detail-link-gh"
              >
                <GitHubMark />
                <span>Source Code</span>
                <span className="proj-detail-link-arrow">→</span>
              </a>
            )}
            {project.deploy && (
              <a
                href={project.deploy}
                target="_blank"
                rel="noopener noreferrer"
                className="proj-detail-link proj-detail-link-live"
              >
                <svg className="proj-detail-link-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="8" cy="8" r="6.5" />
                  <path d="M1.5 8h13M8 1.5a10 10 0 0 1 0 13a10 10 0 0 1 0-13Z" />
                </svg>
                <span>Live Site</span>
                <span className="proj-detail-link-arrow">→</span>
              </a>
            )}
          </div>
        </section>
      )}

      {project.techStack && (
        <section className="proj-section">
          <h2 className="proj-section-title">Tech Stack</h2>
          <div className="tech-grid">
            {project.techStack.map(t => (
              <span key={t} className="tech-item">
                <span className="tech-item-name">{t}</span>
                {TECH_ROLE[t] && <span className="tech-item-role">{TECH_ROLE[t]}</span>}
              </span>
            ))}
          </div>
        </section>
      )}

      {project.features && (
        <section className="proj-section">
          <h2 className="proj-section-title">Features</h2>
          <ul className="proj-detail-features">
            {project.features.map(f => <li key={f}>{f}</li>)}
          </ul>
        </section>
      )}

      {project.collaborators && (
        <section className="proj-section">
          <h2 className="proj-section-title">Built with the help of</h2>
          <div className="collab-row">
            {project.collaborators.map(c => (
              <a
                key={c.href}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="collab-card"
              >
                <span className="collab-avatar" aria-hidden="true">
                  {c.avatar
                    ? <img src={c.avatar} alt="" onError={(e) => { e.target.style.display = 'none'; }} />
                    : c.name.charAt(0).toUpperCase()}
                </span>
                <span className="collab-text">
                  <span className="collab-name">{c.name}</span>
                  {c.role && <span className="collab-role">{c.role}</span>}
                </span>
              </a>
            ))}
          </div>
        </section>
      )}

      <nav className="proj-detail-nav">
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
      </nav>
    </article>
  );
}

Object.assign(window, { HomePage, AboutPage, ProjectsPage, SkillsPage, ContactPage, ProjectDetailPage });
