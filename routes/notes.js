const router = require('express').Router();
const db     = require('../db');
const { summarize } = require('../services/ai');

const MAX_CONTENT_BYTES = 500 * 1024;

const _summarizeCalls = new Map();
const SUMMARIZE_LIMIT = 10;
const SUMMARIZE_WINDOW = 60 * 1000;
function _summarizeRateOk(ip) {
  const now = Date.now();
  const hits = (_summarizeCalls.get(ip) || []).filter(t => now - t < SUMMARIZE_WINDOW);
  if (hits.length >= SUMMARIZE_LIMIT) return false;
  hits.push(now);
  _summarizeCalls.set(ip, hits);
  return true;
}

router.get('/graph',      (req, res) => res.json(db.getGraph()));
router.get('/', (req, res) => {
  const q = req.query.q;
  if (q !== undefined) {
    if (typeof q !== 'string' || q.length > 200)
      return res.status(400).json({ error: 'Query too long (max 200 chars)' });
    return res.json(db.search(q));
  }
  res.json(db.getAll());
});
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
  const { title, content, tags } = req.body;
  const updates = {};
  if (title    !== undefined) updates.title   = title;
  if (content  !== undefined) updates.content = content;
  if (tags     !== undefined) updates.tags    = tags;
  db.update(req.params.id, { ...existing, ...updates });
  res.json(db.getOne(req.params.id));
});

router.post('/:id/summarize', (req, res) => {
  const ip = req.ip || req.socket?.remoteAddress || 'unknown';
  if (!_summarizeRateOk(ip)) return res.status(429).json({ error: 'Too many summarize requests' });
  const note = db.getOne(req.params.id);
  if (!note) return res.status(404).json({ error: 'Not found' });
  if (!note.content.trim()) return res.status(400).json({ error: 'Empty note' });
  const result = summarize(note.title, note.content);
  db.update(req.params.id, { ...note, ...result });
  res.json(result);
});

module.exports = router;
