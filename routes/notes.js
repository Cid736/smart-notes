const router = require('express').Router();
const db     = require('../db');
const { summarize } = require('../services/ai');

const MAX_CONTENT_BYTES = 500 * 1024;

router.get('/graph',      (req, res) => res.json(db.getGraph()));
router.get('/',           (req, res) => res.json(req.query.q ? db.search(req.query.q) : db.getAll()));
router.post('/', (req, res) => {
  if (!req.body.title?.trim()) return res.status(400).json({ error: 'title is required' });
  if (req.body.content && Buffer.byteLength(req.body.content, 'utf8') > MAX_CONTENT_BYTES)
    return res.status(413).json({ error: 'Content too large (max 500KB)' });
  const r = db.create(req.body);
  res.status(201).json(db.getOne(r.lastInsertRowid));
});
router.get('/:id',        (req, res) => { const n = db.getOne(req.params.id); n ? res.json(n) : res.status(404).json({ error: 'Not found' }); });
router.delete('/:id',     (req, res) => { db.delete(req.params.id); res.status(204).end(); });
router.get('/:id/backlinks', (req, res) => res.json(db.getBacklinks(req.params.id)));

router.put('/:id', (req, res) => {
  const existing = db.getOne(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Not found' });
  if (req.body.content && Buffer.byteLength(req.body.content, 'utf8') > MAX_CONTENT_BYTES)
    return res.status(413).json({ error: 'Content too large (max 500KB)' });
  db.update(req.params.id, { ...existing, ...req.body });
  res.json(db.getOne(req.params.id));
});

router.post('/:id/summarize', (req, res) => {
  const note = db.getOne(req.params.id);
  if (!note) return res.status(404).json({ error: 'Not found' });
  if (!note.content.trim()) return res.status(400).json({ error: 'Empty note' });
  const result = summarize(note.title, note.content);
  db.update(req.params.id, { ...note, ...result });
  res.json(result);
});

module.exports = router;
