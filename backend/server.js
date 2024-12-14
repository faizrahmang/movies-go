require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Ensure `path` is imported

const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);

// Serve static files from the "frontend" folder
app.use(express.static(path.join(__dirname, '../frontend')));

// Redirect to main.html for /main.html path
app.get('/main.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/main.html'));
});

// Handle fallback for SPA routing (if applicable)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/main.html'));
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
