require('dotenv').config();
const express = require('express');
const cors = require('cors');
const chatRoute = require('./routes/chat');

const app = express();
const PORT = process.env.PORT || 5000;

// Allow all origins so Vercel can connect seamlessly
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'DSA Mentor AI backend is running' });
});

app.use('/api/chat', chatRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong. Please try again.' });
});

// Bind to 0.0.0.0 for external access in production (Railway/Render)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 DSA Mentor AI backend running on port ${PORT}`);
});
