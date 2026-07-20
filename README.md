<div align="center">

<img src="Picture/favicon.png" width="90" alt="logo" />

# elaine.portfolio

**A buildless React portfolio with an AI assistant, a synthesised lofi soundtrack, and a draggable SVG cat.**

[![Live](https://img.shields.io/badge/live-sillycookie.me-caa3e0?style=for-the-badge)](https://sillycookie.me)
[![Copyright](https://img.shields.io/badge/©_2026-all_rights_reserved-9fc6ee?style=for-the-badge)](#-copyright)

<br />

![React](https://img.shields.io/badge/React_18-20232a?style=flat-square&logo=react&logoColor=61dafb)
![Babel](https://img.shields.io/badge/Babel_Standalone-f9dc3e?style=flat-square&logo=babel&logoColor=black)
![CSS](https://img.shields.io/badge/Vanilla_CSS-1572b6?style=flat-square&logo=css3&logoColor=white)
![Web Audio](https://img.shields.io/badge/Web_Audio_API-ff5722?style=flat-square)
![SVG](https://img.shields.io/badge/Inline_SVG-ffb13b?style=flat-square&logo=svg&logoColor=black)
![n8n](https://img.shields.io/badge/n8n-ea4b71?style=flat-square&logo=n8n&logoColor=white)
![No Build](https://img.shields.io/badge/build_step-none-4caf50?style=flat-square)

</div>

---

## 🌙 About the project

The site is deliberately **buildless**. `index.html` pulls React 18, ReactDOM, and Babel Standalone from a CDN, then loads four `.jsx` files as `type="text/babel"` scripts that Babel transpiles in the browser at load time.

> No bundler. No `package.json`. No `node_modules`. No CI step.
> The repo **is** the deployable artifact — push and it's live.

That constraint drives the rest of the architecture. Scripts share one global scope instead of using ES modules, so components are plain globals and hooks are referenced as `React.useState` in files loaded after `cat.jsx` (which destructures the hooks into globals first). All state is client-side. The only backend dependency is a single webhook.

---

## ✨ Features

<table>
<tr>
<td width="50%" valign="top">

### 🧭 Hash routing
`app.jsx` owns a `route` string synced with `window.location.hash` in **both** directions — clicks call `go(id)`, and a `hashchange` listener catches back/forward. Routes matching `project-<slug>` render a detail view, keeping every project deep-linkable with zero router dependency.

</td>
<td width="50%" valign="top">

### 🗂 Data-driven project pages
Projects live as one array of objects in `pages.jsx` — copy, tags, features, stack, links, optional `images[]`, gradient `bg` fallback. Supply `images[]` and you get a carousel; omit it and it falls back to a logo lockup or a glyph on the gradient.

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 🖼 Image carousel
Cross-fade via absolutely-positioned stacked `<img>` toggling opacity — no transforms, no layout thrash. Autoplay on a 3.5s interval, pauses on hover, and pauses 4s after manual navigation. Arrows, dots, and the counter render only when `images.length > 1`.

</td>
<td width="50%" valign="top">

### 🤖 AI chatbot
`POST { sessionId, prompt }` to an n8n webhook. `sessionId` is minted once per browser and stored, so the workflow threads memory server-side. Falls through `output → reply → text → message → answer` since the key depends on which node ends the workflow. Network failures degrade to an in-chat message.

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 🎨 Themes
Five palettes applied by setting `data-theme` on `<body>`. Every colour is a CSS custom property, so a theme switch is **one attribute write and zero re-renders**. Persisted to localStorage.

</td>
<td width="50%" valign="top">

### 🎧 Procedural lofi engine
No audio files. A Web Audio graph is built at runtime — oscillator pads, lead, and drums through per-instrument gain buses into a shared lowpass, with an LFO on the pad bus for tremolo. A few hundred bytes of code instead of a multi-megabyte MP3.

</td>
</tr>
<tr>
<td colspan="2" valign="top">

### 🐱 Virtual cat
Hand-drawn SVG with mood-driven variants (`happy`, `eating`, `sleepy`). A behaviour interval drives idle states and walking; pointer handlers implement drag-and-drop with a captured offset so the cat doesn't snap to the cursor. Two placement modes — `footer` (walks along a bar) and `placed` (pinned anywhere in the viewport) — both persisted.

</td>
</tr>
</table>

---

## 🔀 Flow

**Load order**

```
index.html
  ├─ CDN: React 18 · ReactDOM · Babel Standalone
  ├─ config.js            → window.CHAT_WEBHOOK_URL   (gitignored)
  └─ text/babel scripts, in order:
       cat.jsx        → CatRoot        (destructures hooks into global scope)
       chatbot.jsx    → ChatBot
       settings.jsx   → SettingsGear
       pages.jsx      → page components + PROJECTS + ImageCarousel
       app.jsx        → App, mounts to #root
```

**Runtime**

```
hash change ──> App.route ──> project-<slug> ? ProjectDetailPage : PageComponent
chat send   ──> POST {sessionId, prompt} ──> n8n webhook ──> knowledge base ──> reply
theme pick  ──> body[data-theme] ──> CSS custom properties ──> localStorage
```

<details>
<summary><b>localStorage keys</b></summary>

<br />

| Key | Stores |
|---|---|
| `cozy.theme` | Active palette |
| `cozy.music` | Sound on/off |
| `cozy.volume` | Master volume |
| `cozy.chat.session` | Per-browser chat session ID |
| `cozy.cat.placement` | Cat mode + coordinates |
| `cozy.catbar.collapsed` | Footer cat bar state |

</details>

---

## 🧱 Tech stack

| Layer | What |
|---|---|
| **UI** | React 18 (UMD, CDN) |
| **Transpile** | Babel Standalone, in-browser |
| **Routing** | `window.location.hash` + `hashchange` |
| **Styling** | Vanilla CSS — custom properties, `aspect-ratio`, `color-mix`, `oklch` |
| **Audio** | Web Audio API, synthesised at runtime |
| **Graphics** | Inline SVG |
| **Chat backend** | n8n webhook |
| **State** | React hooks + localStorage |
| **Hosting** | Static — no server, no build |

---

## ⚙️ Configuration

`config.js` holds the webhook URL and is gitignored.

```bash
cp config.example.js config.js   # then fill in the webhook URL
```

The chatbot degrades to an error message if it's missing. Everything else works without it.

---

## ⚖️ Trade-offs

- **In-browser Babel** costs a transpile on every load and ships React's dev builds. Fine at this size; a build step is the answer when it stops being fine.
- **Shared global scope** makes script order in `index.html` load-bearing.
- **Manual cache busting** — `?v=N` query strings on script and stylesheet tags. Bump on deploy.

---

## 📄 Copyright

**© 2026 Elaine Pang Xin Yee. All rights reserved.**

This is a personal project and is **not** open source. No license is granted.

The source code, design, written copy, illustrations, and all other assets in this repository are my own work. You may view and read the code for reference or learning. You may **not** copy, reuse, modify, redistribute, republish, or use any part of it — in whole or in part, commercially or otherwise — without my written permission.

Third-party libraries loaded by this project (React, Babel, and any CDN dependencies) remain under their own respective licenses.

Want to use something here? [Ask me](https://sillycookie.me/#contact).

<div align="center">
<br />
<sub>Built by <b>Elaine Pang Xin Yee</b> · Cookie the cat supervised.</sub>
</div>
