# Elaine's Portfolio

A cozy personal portfolio site — part résumé, part small toy world. It shows my work, but it also gives you something to poke at while you read.

**Live:** https://sillycookie.me

---

## What it does

### Shows the work
Five pages — Home, About, Projects, Skills, Contact — each reachable from the top nav and from a shareable URL hash. Every project on the Projects page opens into its own detail page with a screenshot carousel, a written breakdown, feature list, tech stack, and links to the repo and live deploy.

Projects currently on the site:

| Project | What it is |
|---|---|
| **LoafLand Bakery** | Android bakery app — customer ordering plus an admin management dashboard |
| **Meow-ney Maker** | Pixel-art salary timer that counts your earnings up second-by-second |
| **FYP Predictive API** | ML API that predicts EV charger faults before they happen |
| **H&Maybe** | Full-stack fashion store — browse, cart, Stripe checkout, admin panel |
| **FoodTrust** | Browser extension that flags fake Google Maps reviews using Amazon Bedrock |

### Answers questions about me
A floating chatbot sits in the corner. Ask it about my projects, my skills, my background — or about my cat. Questions go to an n8n workflow that answers from a knowledge base I wrote, so it stays on topic instead of making things up. Each visitor keeps their own conversation thread.

### Lets you make the place yours
A settings gear opens theme and sound controls:

- **Five themes** — Lavender Sky, Matcha Latte, Strawberry Cream, Peach Sunset, Midnight Pastel. The whole palette shifts, background blobs included.
- **Lofi music** — generated live in the browser with Web Audio. No audio file is downloaded; the melody, pads, and drums are synthesised on the spot. Volume slider included, and you can turn it off.

Your choices are remembered for next visit.

### Has a cat
Cookie lives at the bottom of the page. He walks around, naps, and reacts when you interact with him. You can pick him up and drop him anywhere on the screen. He is not load-bearing. He is just there.

---

## The idea behind it

Most portfolios are a list. This one is a place. The themes, the music, the cat, and the chatbot all exist because a portfolio that only lists things tells you what someone *made* — while one you can play with tells you how they *think*.

Everything is hand-built: the cat is hand-drawn SVG, the music is synthesised note by note, the layout uses no UI framework or template.

---

## Credits

Design, code, illustrations, and the cat — all mine.
Fonts: Caprasimo and Quicksand via Google Fonts.
