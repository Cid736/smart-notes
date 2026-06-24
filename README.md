# Smart Notes

Obsidian-inspired note-taking app with Markdown rendering, [[WikiLinks]], graph view, backlinks, and local AI summarization — no external APIs, runs 100% locally.

## Stack
Node.js · Express · SQLite (better-sqlite3) · Vanilla JS · marked.js

## Features
- **Split editor / preview** — write Markdown on the left, see it rendered live on the right
- **[[WikiLinks]]** — link notes by name; purple chips in preview, clickable to open the target note
- **Graph view** — canvas force-directed graph of all notes and their connections
- **Backlinks panel** — see every note that links to the current one
- **Formatting toolbar** — H1/H2/H3, Bold, Italic, Code, Code block, Quote, Lists, Task list, Divider
- **Auto-save** — debounced 1-second auto-save while typing; Ctrl+S for instant save
- **AI summarization** — extractive NLP (TF-IDF), no API key needed
- **Tags** — add and remove tags per note; AI suggests them automatically
- **Real-time search** — filters the note list as you type
- **Status bar** — live word / char / line count
- **Collapsible sidebars** — toggle left and right panels to focus on writing

## Setup
```bash
npm install
npm start
# Open http://localhost:3001
```

## How the AI works
Uses TF-IDF style sentence scoring to rank and extract the most relevant sentences — no external service, no API key, no cost.

## How WikiLinks work
Type `[[Note Title]]` anywhere in your note. In preview mode it renders as a clickable link to that note. The Graph tab shows all connections visually. The Backlinks tab shows which notes point to the current one.

## Changelog

**v0.1.1** — 2026-06-24
- Fix: POST /notes now returns 400 if title is missing instead of crashing with 500
- Fix: remove unused `totalWords` parameter in `sentenceScore`
- Feat: alpha version banner

**v0.1.0** — 2026-05-01
- Initial release: Markdown editor, WikiLinks, graph view, backlinks, AI summarization, tags
