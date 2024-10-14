require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const app = express();
const surveyRoutes = require('./routes/surveyRoutes');

connectDB();

// Middleware to parse JSON
app.use(express.json());

// Use survey routes
app.use('/api/surveys', surveyRoutes);

// Default route for testing
app.get('/', (req, res) => {
  res.send('Survey Service is running');
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});