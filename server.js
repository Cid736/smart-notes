require('dotenv').config();
const express   = require('express');
const path      = require('path');
const helmet    = require('helmet');
const rateLimit = require('express-rate-limit');
const app       = express();

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  console.error('FATAL: API_KEY is not set in .env. Refusing to start.');
  process.exit(1);
}

app.set('trust proxy', 1);
app.use(helmet());
app.use(express.json());
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
