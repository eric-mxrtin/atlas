// index.js
const express = require('express');
const cors = require('cors');
const buildingsRoute = require('./buildings');
const app = express();
require('dotenv').config();

const API_KEY = process.env.API_KEY;

// Middleware
app.use(express.json());
app.use(cors());

// API Key verification middleware
app.use((req, res, next) => {
  const apiKey = req.headers['authorization'];
  
  if (apiKey !== API_KEY) {
    return res.status(403).send({ error: 'Forbidden' });
  }

  next();
});

// Routes
app.use('/api/buildings', buildingsRoute);

// Default route
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

module.exports = app;