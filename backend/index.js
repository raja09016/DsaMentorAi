require('dotenv').config();
const express = require('express');
const cors = require('cors');
const chatRoute = require('./routes/chat');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:5174', 'http://127.0.0.1:5174', 'http://localhost:3000'] }));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'DSA Mentor AI backend is running' });
});

app.use('/api/chat', chatRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong. Please try again.' });
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`🚀 DSA Mentor AI backend running on http://127.0.0.1:${PORT}`);
});
