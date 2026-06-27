require('dotenv').config();
const express   = require('express');
const path      = require('path');
const fs        = require('fs');
const helmet    = require('helmet');
const rateLimit = require('express-rate-limit');
const app       = express();

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  console.error('FATAL: API_KEY is not set in .env. Refusing to start.');
  process.exit(1);
}

app.set('trust proxy', 1);
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc:  ["'self'", "https://cdn.jsdelivr.net", "'unsafe-inline'"],
      styleSrc:   ["'self'", "'unsafe-inline'"],
      imgSrc:     ["'self'", "data:"],
      connectSrc: ["'self'"],
      frameAncestors: ["'none'"],
    },
  },
}));
app.use(express.json());

// Serve index.html with the API key injected as a meta tag (avoids hardcoding in source)
app.get('/', (req, res) => {
  const html = fs.readFileSync(path.join(__dirname, 'public', 'index.html'), 'utf8');
  const injected = html.replace(
    '<meta charset="UTF-8">',
    `<meta charset="UTF-8">\n<meta name="x-api-key" content="${API_KEY}">`
  );
  res.setHeader('Content-Type', 'text/html');
  res.send(injected);
});

app.use(express.static(path.join(__dirname, 'public')));

const _writeLimiter = rateLimit({
  windowMs: 60_000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please wait a minute.' }
});

app.use('/api/notes', (req, res, next) => {
  if (req.headers['x-api-key'] !== API_KEY)
    return res.status(401).json({ error: 'Unauthorized' });
  next();
}, _writeLimiter, require('./routes/notes'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Smart Notes → http://localhost:${PORT}`));
