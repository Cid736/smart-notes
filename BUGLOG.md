# Bug Log — smart-notes

## 2026-06-25

### [LOW] Sin límite de tamaño en el contenido de las notas
- **Archivo:** `routes/notes.js`
- **Fix:** Añadido límite de 500 KB en los endpoints `POST /` y `PUT /:id`. Si el contenido supera el límite, se devuelve HTTP 413.
