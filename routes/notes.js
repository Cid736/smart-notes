const router = require('express').Router();
const db     = require('../db');
const { summarize } = require('../services/ai');

router.get('/',       (req, res) => res.json(req.query.q ? db.search(req.query.q) : db.getAll()));
router.post('/',      (req, res) => { const r = db.create(req.body); res.status(201).json(db.getOne(r.lastInsertRowid)); });
router.get('/:id',    (req, res) => { const n = db.getOne(req.params.id); n ? res.json(n) : res.status(404).json({ error: 'Nota no encontrada' }); });
router.delete('/:id', (req, res) => { db.delete(req.params.id); res.status(204).end(); });

router.put('/:id', (req, res) => {
  const existing = db.getOne(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Nota no encontrada' });
  db.update(req.params.id, { ...existing, ...req.body });
  res.json(db.getOne(req.params.id));
});

router.post('/:id/summarize', (req, res) => {
  const note = db.getOne(req.params.id);
  if (!note) return res.status(404).json({ error: 'Nota no encontrada' });
  if (!note.content.trim()) return res.status(400).json({ error: 'La nota está vacía' });
  const result = summarize(note.title, note.content);
  db.update(req.params.id, { ...note, ...result });
  res.json(result);
});

module.exports = router;
