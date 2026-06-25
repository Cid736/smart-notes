<p align="center">
  <a href="#english">🇬🇧 English</a> &nbsp;·&nbsp; <a href="#español">🇪🇸 Español</a>
</p>

---

<a name="english"></a>

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
- Security: `marked.parse()` output sanitized with DOMPurify before rendering — prevents XSS from note content
- Fix: `POST /notes` now returns 400 if title is missing instead of crashing with 500
- Feat: alpha version banner

**v0.1.0** — 2026-05-01
- Initial release: Markdown editor, WikiLinks, graph view, backlinks, AI summarization, tags

## Security

Automated security reviews are powered by [Claude](https://claude.ai) (Anthropic AI) and run on every significant change to detect vulnerabilities, insecure patterns and dependency risks. Findings are tracked in [`BUGLOG.md`](BUGLOG.md).

**Last review:** 2026-06-25 — 3 issues found (1 medium, 2 low) — all patched. Set API_KEY in .env to enable auth.

Found a vulnerability? Open an issue or contact directly.

---

<a name="español"></a>

# Smart Notes

Aplicación de toma de notas inspirada en Obsidian con renderizado Markdown, [[WikiLinks]], vista de grafo, backlinks y resumen con IA local — sin APIs externas, 100% local.

## Stack
Node.js · Express · SQLite (better-sqlite3) · Vanilla JS · marked.js

## Características
- **Editor dividido / vista previa** — escribe Markdown a la izquierda, ve el resultado en tiempo real a la derecha
- **[[WikiLinks]]** — enlaza notas por nombre; chips morados en la vista previa, clicables para abrir la nota
- **Vista de grafo** — grafo de fuerzas en canvas con todas las notas y sus conexiones
- **Panel de backlinks** — ve todas las notas que enlazan a la actual
- **Barra de herramientas** — H1/H2/H3, Negrita, Cursiva, Código, Bloque de código, Cita, Listas, Lista de tareas, Separador
- **Guardado automático** — autoguardado con rebote de 1 segundo mientras escribes; Ctrl+S para guardado instantáneo
- **Resumen con IA** — NLP extractivo (TF-IDF), sin clave de API
- **Etiquetas** — añade y elimina etiquetas por nota; la IA las sugiere automáticamente
- **Búsqueda en tiempo real** — filtra la lista de notas mientras escribes
- **Barra de estado** — contador en vivo de palabras / caracteres / líneas
- **Barras laterales colapsables** — oculta los paneles para centrarte en escribir

## Instalación
```bash
npm install
npm start
# Abre http://localhost:3001
```

## Seguridad

Las revisiones de seguridad automatizadas utilizan [Claude](https://claude.ai) (Anthropic AI) y se ejecutan en cada cambio significativo para detectar vulnerabilidades, patrones inseguros y riesgos en dependencias. Los hallazgos se registran en [`BUGLOG.md`](BUGLOG.md).

**Última revisión:** 2026-06-25 (rev 3) — 4 vulnerabilidades totales (1 media, 3 bajas) — todas parcheadas. Revisión 3: rate limiter de `/summarize` corregido para entornos con reverse proxy. Configurar API_KEY en .env para activar la autenticación.

¿Encontraste una vulnerabilidad? Abre un issue o contacta directamente.
## Licencia

MIT
