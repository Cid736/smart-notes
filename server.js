require('dotenv').config();
const express = require('express');
const path    = require('path');
const app     = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/notes', require('./routes/notes'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Smart Notes → http://localhost:${PORT}`));
