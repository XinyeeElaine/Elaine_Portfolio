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
        <div className={`links ${mobileOpen ? 'mobile-open' : ''}`}>
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
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
