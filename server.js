const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Event Planner API - Team Project');
});

// TODO: Add swagger docs later
app.get('/api-docs', (req, res) => {
  res.send('API Documentation coming soon...');
});

// Connect to MongoDB 
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('DB connected'))
    .catch(err => console.log('DB error:', err));
}

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT);
});