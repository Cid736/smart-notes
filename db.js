const Database = require('better-sqlite3');
const db = new Database('notes.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS notes (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    title      TEXT NOT NULL,
    content    TEXT NOT NULL DEFAULT '',
    tags       TEXT NOT NULL DEFAULT '[]',
    summary    TEXT,
    key_points TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );
`);

function parse(n) {
  return {
    ...n,
    tags:       JSON.parse(n.tags       || '[]'),
    key_points: JSON.parse(n.key_points || '[]'),
  };
}

module.exports = {
  create: ({ title, content = '', tags = [] }) =>
    db.prepare("INSERT INTO notes(title,content,tags) VALUES(?,?,?)").run(title, content, JSON.stringify(tags)),

  getAll: () =>
    db.prepare("SELECT * FROM notes ORDER BY updated_at DESC").all().map(parse),

  getOne: (id) => {
    const n = db.prepare("SELECT * FROM notes WHERE id=?").get(id);
    return n ? parse(n) : null;
  },

  update: (id, { title, content, tags, summary, key_points }) =>
    db.prepare(`UPDATE notes SET title=?,content=?,tags=?,summary=?,key_points=?,updated_at=datetime('now') WHERE id=?`)
      .run(title, content, JSON.stringify(tags ?? []), summary ?? null, JSON.stringify(key_points ?? []), id),

  delete: (id) =>
    db.prepare("DELETE FROM notes WHERE id=?").run(id),

  search: (q) =>
    db.prepare("SELECT * FROM notes WHERE title LIKE ? OR content LIKE ? ORDER BY updated_at DESC").all(`%${q}%`, `%${q}%`).map(parse),
};
