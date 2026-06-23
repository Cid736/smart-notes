# Smart Notes

Note-taking app with automatic AI summarization — no external APIs, runs 100% locally.

## Stack
Node.js · Express · SQLite · Vanilla JS

## Features
- Create, edit and delete notes
- Real-time search
- Auto-summarize any note (extractive NLP, no API key needed)
- Extracts key points and suggests tags automatically
- Click suggested tags to add them to the note
- Clean dark UI

## Setup
```bash
npm install
npm start
# Open http://localhost:3001
```

## How the AI works
Uses TF-IDF style sentence scoring to rank and extract the most relevant sentences from the note — no external service, no API key, no cost.
