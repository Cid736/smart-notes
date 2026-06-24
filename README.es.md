# Smart Notes

App de notas inspirada en Obsidian con renderizado Markdown, [[WikiLinks]], vista de grafo, backlinks y resumen IA local — sin APIs externas, funciona 100% en local.

## Stack
Node.js · Express · SQLite (better-sqlite3) · Vanilla JS · marked.js

## Funcionalidades
- **Editor dividido / vista previa** — escribe Markdown a la izquierda, ve el resultado renderizado en tiempo real a la derecha
- **[[WikiLinks]]** — enlaza notas por nombre; aparecen como chips morados en la vista previa, clicables para abrir la nota destino
- **Vista de grafo** — grafo de fuerzas en canvas con todas las notas y sus conexiones
- **Panel de backlinks** — muestra todas las notas que enlazan a la nota actual
- **Barra de formato** — H1/H2/H3, Negrita, Cursiva, Codigo, Bloque de codigo, Cita, Listas, Lista de tareas, Divisor
- **Auto-guardado** — guardado automatico con 1 segundo de espera tras escribir; Ctrl+S para guardar al instante
- **Resumen IA** — NLP extractivo (TF-IDF), sin API key necesaria
- **Etiquetas** — añade y elimina etiquetas por nota; la IA las sugiere automaticamente
- **Busqueda en tiempo real** — filtra la lista de notas mientras escribes
- **Barra de estado** — contador de palabras, caracteres y lineas en vivo
- **Paneles colapsables** — oculta los paneles lateral y derecho para enfocarte en escribir

## Instalacion
```bash
npm install
npm start
# Abre http://localhost:3001
```

## Como funciona la IA
Usa puntuacion de frases estilo TF-IDF para clasificar y extraer las frases mas relevantes — sin servicio externo, sin API key, sin coste.

## Como funcionan los WikiLinks
Escribe `[[Titulo de la nota]]` en cualquier parte de tu nota. En la vista previa se renderiza como un enlace clicable a esa nota. La pestana Grafo muestra todas las conexiones visualmente. La pestana Backlinks muestra que notas apuntan a la actual.

## Historial de versiones

**v0.1.1** — 2026-06-24
- Fix: POST /notes devuelve 400 si falta el titulo en lugar de fallar con 500
- Novedades: banner de version alfa

**v0.1.0** — 2026-05-01
- Publicacion inicial: editor Markdown, WikiLinks, vista de grafo, backlinks, resumen IA, etiquetas
