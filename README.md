<div align="center">

<img src="public/Picture/favicon.png" width="90" alt="logo" />

# elaine.portfolio

**A personal portfolio — a cozy corner of the internet you can repaint, listen to, and play with.**

[![Live](https://img.shields.io/badge/live-sillycookie.me-caa3e0?style=for-the-badge)](https://sillycookie.me)
[![Copyright](https://img.shields.io/badge/©_2026-all_rights_reserved-9fc6ee?style=for-the-badge)](#-copyright)

<br />

![React](https://img.shields.io/badge/React_18-20232a?style=flat-square&logo=react&logoColor=61dafb)
![Vite](https://img.shields.io/badge/Vite_6-646cff?style=flat-square&logo=vite&logoColor=white)
![CSS](https://img.shields.io/badge/Vanilla_CSS-1572b6?style=flat-square&logo=css3&logoColor=white)
![Web Audio](https://img.shields.io/badge/Web_Audio_API-ff5722?style=flat-square)
![SVG](https://img.shields.io/badge/Inline_SVG-ffb13b?style=flat-square&logo=svg&logoColor=black)
![n8n](https://img.shields.io/badge/n8n-ea4b71?style=flat-square&logo=n8n&logoColor=white)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-f38020?style=flat-square&logo=cloudflare&logoColor=white)

</div>

---

## 🌙 About the project

A portfolio that behaves less like a résumé and more like a room you can wander around in. Every project gets its own page, and the place comes with things to fiddle with: five colour themes to repaint it, a lofi soundtrack the browser makes up as it goes, an AI assistant happy to answer questions about the work, and Cookie, a cat who patrols the bottom of the page and can be picked up and dropped wherever you like.

Under the cuteness: a single-page React app bundled with Vite and served as static files from Cloudflare Pages. Routing runs on the URL hash, styling is vanilla CSS driven by custom properties, the soundtrack is synthesised at runtime with the Web Audio API, and Cookie is hand-drawn inline SVG. A Cloudflare Pages Function fields the chatbot's requests and keeps its backend URL safely server-side. Everything here is built from scratch and tuned by hand.

---

## ✨ Features

<table>
<tr>
<td width="50%" valign="top">

### 🧭 Hash routing
`app.jsx` owns a `route` string synced with `window.location.hash` in **both** directions — clicks call `go(id)`, and a `hashchange` listener catches back/forward. Routes matching `project-<slug>` render a detail view, so every project stays deep-linkable and shareable.

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
The browser `POST`s `{ sessionId, prompt }` to a same-origin `/api/chat`; a Pages Function validates it and forwards to n8n. `sessionId` is minted once per browser and stored, so the workflow threads memory server-side. The reply parser falls through `output → reply → text → message → answer`, since the key depends on which node ends the workflow. Network failures degrade to an in-chat message.

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 🎨 Themes
Five palettes applied by setting `data-theme` on `<body>`. Every colour is a CSS custom property, so a theme switch is **one attribute write and zero re-renders**. Persisted to localStorage.

</td>
<td width="50%" valign="top">

### 🎧 Procedural lofi engine
The whole soundtrack is generated in the browser. A Web Audio graph is built at runtime — oscillator pads, lead, and drums through per-instrument gain buses into a shared lowpass, with an LFO on the pad bus for tremolo. A few hundred bytes of code stands in for a multi-megabyte MP3.

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

**Load order** — `main.jsx` imports for side effects, and the sequence matters

```
index.html
  └─ main.jsx
       ├─ globals.js     → window.React · window.ReactDOM   (must be first)
       ├─ styles.css
       ├─ cat.jsx        → CatRoot   (destructures the hooks into globals)
       ├─ chatbot.jsx    → ChatBot
       ├─ settings.jsx   → SettingsGear
       ├─ pages.jsx      → page components + PROJECTS + ImageCarousel
       └─ app.jsx        → App, mounts to #root
```

**Runtime**

```
hash change ──> App.route ──> project-<slug> ? ProjectDetailPage : PageComponent
chat send   ──> POST /api/chat ──> Pages Function ──> n8n ──> knowledge base ──> reply
theme pick  ──> body[data-theme] ──> CSS custom properties ──> localStorage
```

**Repo layout**

```
main.jsx · globals.js · app.jsx · cat.jsx · chatbot.jsx · pages.jsx · settings.jsx · styles.css
functions/api/chat.js     server-side chat proxy (Cloudflare)
public/Picture/           images, copied to dist/ as-is
.env                      N8N_WEBHOOK_URL, gitignored
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
| **UI** | React 18 |
| **Build** | Vite 6 — `npm run dev` / `npm run build` |
| **Routing** | `window.location.hash` + `hashchange` |
| **Styling** | Vanilla CSS — custom properties, `aspect-ratio`, `color-mix`, `oklch` |
| **Audio** | Web Audio API, synthesised at runtime |
| **Graphics** | Inline SVG |
| **Chat backend** | Cloudflare Pages Function → n8n webhook |
| **State** | React hooks + localStorage |
| **Hosting** | Cloudflare Pages — static output, built on push |

---

## 🚀 Installation

**Prerequisites:** [Node.js](https://nodejs.org) 20 or newer (built on 22) and npm.

**1. Clone the repository**

```bash
git clone https://github.com/XinyeeElaine/Elaine_Portfolio.git
cd Elaine_Portfolio
```

**2. Install dependencies**

```bash
npm install
```

**3. Start the dev server**

```bash
npm run dev
```

Open **http://localhost:5173**. Edits hot-reload on save.

### npm scripts

| Command | What it does |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Dev server with hot reload, on port 5173 |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the built `dist/` locally to check it before deploying |

---

## ☁️ Deployment

Hosted on **Cloudflare Pages**. Pushing to `main` triggers a build automatically.

Project settings:

| Setting | Value |
|---|---|
| Framework preset | `Vite` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | *(empty)* |
| `NODE_VERSION` | `22` |

The `functions/` directory is picked up automatically; nothing to configure for it.

Check a build locally before pushing with `npm run build && npm run preview`.

---

## 📄 Copyright

**© 2026 Elaine Pang Xin Yee. All rights reserved.**

This is a personal project and is **not** open source. No license is granted.

The source code, design, written copy, illustrations, and all other assets in this repository are my own work. You may view and read the code for reference or learning. You may **not** copy, reuse, modify, redistribute, republish, or use any part of it — in whole or in part, commercially or otherwise — without my written permission.

Third-party dependencies (React, Vite, and anything in `package.json`) remain under their own respective licenses.

Want to use something here? [Ask me](https://sillycookie.me/#contact).

<div align="center">
<br />
<sub>Built by <b>Elaine Pang Xin Yee</b> · Cookie the cat supervised.</sub>
</div>
