const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// function to load and encode data
const loadData = () => {
  const filePath = path.join(__dirname, '../data.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const encodedData = Buffer.from(jsonData).toString('base64'); // encode data in base64
  return encodedData;
};

// GET route to fetch data
router.get('/', (req, res) => {
  try {
    const encodedData = loadData();
    res.json({ data: encodedData });  // return the encoded data
  } catch (error) {
    console.error('Error reading JSON data:', error);
    res.status(500).send({ error: 'Failed to load data.' });
  }
});

module.exports = router;