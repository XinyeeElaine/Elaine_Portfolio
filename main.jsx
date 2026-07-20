/* Entry point. Import order matters — see globals.js. */
import './globals.js';
import './styles.css';

import './cat.jsx';       // must be first: destructures the hooks into globals
import './chatbot.jsx';
import './settings.jsx';
import './pages.jsx';
import './app.jsx';       // mounts to #root
