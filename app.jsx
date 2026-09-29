const PAGES = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

function App() {
  const getInitialRoute = () => {
    const h = (typeof window !== 'undefined' && window.location.hash.replace('#', '')) || '';
    if (PAGES.find(p => p.id === h)) return h;
    if (h.startsWith('project-')) return h;
    return 'home';
  };
  const [route, setRoute] = React.useState(getInitialRoute());
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const go = (id) => {
    sfx('tick');
    setRoute(id);
    setMobileOpen(false);
    window.location.hash = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  React.useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace('#', '');
      if (PAGES.find(p => p.id === h)) {
        setRoute(h);
      } else if (h.startsWith('project-')) {
        setRoute(h);
      }
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // scroll reveal: fade/slide items up as they enter the viewport, staggered per sibling
  React.useEffect(() => {
    const els = document.querySelectorAll(
      '.page .section-head, .page .t-item, .page .about-bio, .page .proj-card, .page .skill-section, ' +
      '.page .contact-side, .page .contact-form, .page .proj-section, .page .marquee'
    );
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.12 });
    els.forEach((el) => {
      const i = Array.prototype.indexOf.call(el.parentNode.children, el);
      el.style.setProperty('--i', Math.min(i, 6));
      el.classList.add('reveal');
      io.observe(el);
    });
    return () => io.disconnect();
  }, [route]);

  // nav pill glides to the active link; ResizeObserver covers resize + late font load
  const linksRef = React.useRef(null);
  const [pill, setPill] = React.useState(null);
  React.useLayoutEffect(() => {
    const links = linksRef.current;
    if (!links) return;
    const measure = () => {
      const a = links.querySelector('.link.active');
      setPill(a && a.offsetWidth ? { left: a.offsetLeft, top: a.offsetTop, width: a.offsetWidth, height: a.offsetHeight } : null);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(links);
    return () => ro.disconnect();
  }, [route, mobileOpen]);

  let pageElement;
  if (route.startsWith('project-')) {
    const slug = route.slice('project-'.length);
    pageElement = <ProjectDetailPage slug={slug} go={go} />;
  } else {
    const Page = ({
      home: HomePage, about: AboutPage, projects: ProjectsPage,
      skills: SkillsPage, contact: ContactPage,
    })[route] || HomePage;
    pageElement = <Page go={go} />;
  }

  return (
    <>
      <div className="blob b1" />
      <div className="blob b2" />
      <div className="blob b3" />

      <nav className="nav" data-screen-label="nav">
        <div className="brand">
          <span className="dot" />
          elaine.portfolio
        </div>
        <div ref={linksRef} className={`links ${mobileOpen ? 'mobile-open' : ''}`}>
          {pill && <span className="nav-pill" style={pill} />}
          {PAGES.map(p => (
            <a
              key={p.id}
              className={`link ${
                route === p.id ||
                (p.id === 'projects' && route.startsWith('project-'))
                  ? 'active'
                  : ''
              }`}
              onClick={(e) => { e.preventDefault(); go(p.id); }}
            >
              {p.label}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <SettingsGear />
          <button className="menu-toggle" onClick={() => setMobileOpen(o => !o)} aria-label="menu">☰</button>
        </div>
      </nav>

      {pageElement}

      <CatRoot />
      <ChatBot />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
