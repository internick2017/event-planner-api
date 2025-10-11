const express = require('express');
const app = express();
const cors = require('cors');
const mongodb = require('./data/database.js');
const bodyParser = require('body-parser');
require('dotenv').config();

const port = process.env.PORT || 8080;

app
   .use(bodyParser.json())
   .use(cors())
   .use(express.json())
   .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  .use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
  console.log(`Caught exception: ${err}\nException origin: ${origin}`);
});

// Basic route
app.get('/', (req, res) => {
  res.send('Event Planner API - Team Project');
});

// TODO: Add swagger docs later
app.get('/api-docs', (req, res) => {
  res.send('API Documentation coming soon...');
});

// Connect to MongoDB 
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database connected — server running on port ${port}`);
    });
  }
});