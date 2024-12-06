const express = require('express');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const router = express.Router();

// load and encode data
const loadData = () => {
  const filePath = path.join(__dirname, process.env.GOOGLE_MAPS_KEY); // read file path from .env
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const encodedData = Buffer.from(jsonData).toString('base64'); // encode data in base64
  return encodedData;
};

// handle get requests to fetch data
router.get('/', (req, res) => {
  try {
    const encodedData = loadData();
    res.json({ data: encodedData }); // return the encoded data
  } catch (error) {
    console.error('error reading json data:', error);
    res.status(500).send({ error: 'failed to load data.' });
  }
});

module.exports = router;
