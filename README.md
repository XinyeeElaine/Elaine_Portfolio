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

A portfolio that behaves less like a résumé and more like a room you can wander around in. Every project gets its own page, plus things to fiddle with: five colour themes, a lofi soundtrack the browser makes up as it goes, an AI assistant that answers questions about the work, and Cookie, a cat you can pick up and drop wherever you like.

Under the cuteness: a **single-page React app bundled with Vite and served as static files from Cloudflare Pages**. Routing runs on the URL hash, styling is **vanilla CSS driven by custom properties**, the soundtrack is **synthesised at runtime with the Web Audio API**, and Cookie is hand-drawn inline SVG. A Cloudflare Pages Function fields the chatbot's requests and keeps its backend URL server-side. **Everything here is built from scratch and tuned by hand.**

---

## ✨ Features

<table>
<tr>
<td width="50%" valign="top">

### 🧭 Hash routing
Hash-synced routes, both ways. `project-<slug>` renders a deep-linkable detail page.

</td>
<td width="50%" valign="top">

### 🗂 Data-driven project pages
One array of objects in `pages.jsx`. Add `images[]` for a carousel, or skip it.

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 🖼 Image carousel
Opacity cross-fade, no transforms. Autoplays every 3.5s, pauses on hover and manual nav.

</td>
<td width="50%" valign="top">

### 🤖 AI chatbot
Chats via a Pages Function proxy to n8n. Per-browser session threads memory server-side.

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 🎨 Themes
Five palettes via `data-theme` — **one attribute write, zero re-renders**. Persisted.

</td>
<td width="50%" valign="top">

### 🎧 Procedural lofi engine
Soundtrack synthesised live in the browser. A few hundred bytes replace a multi-MB MP3.

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 🍰 Tamagotchi cat care
Feed, play, pet — raises hunger and fun stats and bursts floating emoji.

</td>
<td width="50%" valign="top">

### 🧲 Draggable skill stickers
Every skill sticker is pointer-draggable around its card.

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 🎚 Full audio controls
Volume slider, on/off toggle, autoplay unlocked on first gesture. All persisted.

</td>
<td width="50%" valign="top">

### ✉️ Contact form
Validates, then opens a prefilled Gmail compose window.

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 🌫 Ambient motion
Drifting gradient blobs, glassmorphism nav, an infinite marquee, page-enter transitions.

</td>
<td width="50%" valign="top">

### 📱 Responsive & nav
Mobile hamburger menu, wrap-around prev/next links, smooth scroll-to-top.

</td>
</tr>
<tr>
<td colspan="2" valign="top">

### 🐱 Virtual cat
Hand-drawn SVG with mood variants and procedural tail wag, blink, and walk cycle. Drag-and-drop between two modes — `footer` (walks a bar) and `placed` (pinned anywhere) — both persisted.

</td>
</tr>
</table>

---

## 🏗 Architecture

**Module load order** — `main.jsx` imports for side effects; the sequence is load-bearing.

```
index.html
  └─ main.jsx
       ├─ globals.js     window.React · window.ReactDOM   (must run first)
       ├─ styles.css
       ├─ cat.jsx        CatRoot     (destructures hooks into globals)
       ├─ chatbot.jsx    ChatBot
       ├─ settings.jsx   SettingsGear
       ├─ pages.jsx      page components · PROJECTS · ImageCarousel
       └─ app.jsx        App, mounts to #root
```

**Runtime data flow**

```
hash change   App.route  ·  project-<slug> ? ProjectDetailPage : PageComponent
chat send     POST /api/chat  ·  Pages Function  ·  n8n  ·  knowledge base  ·  reply
theme pick    body[data-theme]  ·  CSS custom properties  ·  localStorage
```

**Project structure**

```
main.jsx        entry — imports every module in order, then mounts
globals.js      pins React + hooks onto window (no bundler-side imports)
app.jsx         App shell, nav, routing, background motion
pages.jsx       page components + PROJECTS data + ImageCarousel
cat.jsx         Cookie — SVG, behaviour loop, drag-and-drop
chatbot.jsx     chat widget + client-side session handling
settings.jsx    theme, music, and volume controls
styles.css      all styling — one vanilla CSS file

functions/api/chat.js   server-side chat proxy (Cloudflare)
public/Picture/         images, copied to dist/ as-is
.env                    N8N_WEBHOOK_URL, gitignored
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

Personal project, **not** open source — no license granted. Code and assets are my own; view them for reference, but no copying, reuse, or redistribution without written permission. Third-party dependencies keep their own licenses. Want to use something? [Ask me](https://sillycookie.me/#contact).

<div align="center">
<br />
<sub>Built by <b>Elaine Pang Xin Yee</b> · Cookie the cat supervised.</sub>
</div>
