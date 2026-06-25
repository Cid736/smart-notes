require('dotenv').config();
const express = require('express');
const path    = require('path');
const app     = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const API_KEY = process.env.API_KEY;
app.use('/api/notes', (req, res, next) => {
  if (API_KEY && req.headers['x-api-key'] !== API_KEY)
    return res.status(401).json({ error: 'Unauthorized' });
  next();
}, require('./routes/notes'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Smart Notes → http://localhost:${PORT}`));
