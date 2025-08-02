const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const logger = require('../logging-middleware/logger');
dotenv.config();
const app = express();
const PORT = 5000;
const MONGO_URI = 'mongodb://127.0.0.1:27017';
const DB_NAME = 'urlshortener';
let collection;
app.use(cors());
app.use(express.json());
app.use(logger);
MongoClient.connect(MONGO_URI)
  .then(client => {
    const db = client.db(DB_NAME);
    collection = db.collection('shorturls');
    app.listen(PORT, () => {
      console.log(`✅ Backend running at http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('❌ MongoDB connection failed:', err));
const generateShortcode = () => Math.random().toString(36).substring(2, 8);
app.post('/shorturls', async (req, res) => {
  const { url, validity = 30, shortcode } = req.body;
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ message: 'Invalid or missing URL' });
  }
  const finalShortcode = shortcode || generateShortcode();
  const expiry = new Date(Date.now() + validity * 60 * 1000);
  try {
    const exists = await collection.findOne({ shortcode: finalShortcode });
    if (exists) {
      return res.status(409).json({ message: 'Shortcode already exists' });
    }
    await collection.insertOne({
      url,
      shortcode: finalShortcode,
      expiry,
      createdAt: new Date(),
      clicks: 0,
      clickDetails: []
    });
    res.status(201).json({
      shortLink: `http://localhost:${PORT}/${finalShortcode}`,
      expiry: expiry.toISOString()
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.get('/shorturls', async (req, res) => {
  try {
    const allLinks = await collection.find().sort({ createdAt: -1 }).toArray();
    res.status(200).json(allLinks);
  } catch (err) {
    console.error('Error fetching URLs:', err);
    res.status(500).json({ message: 'Failed to fetch URLs' });
  }
});
app.get('/shorturls/:shortcode', async (req, res) => {
  const { shortcode } = req.params;
  try {
    const entry = await collection.findOne({ shortcode });
    if (!entry) return res.status(404).json({ message: 'Short URL not found' });
    res.status(200).json({
      url: entry.url,
      shortcode: entry.shortcode,
      createdAt: entry.createdAt,
      expiry: entry.expiry,
      clicks: entry.clicks,
      clickDetails: entry.clickDetails
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch stats' });
  }
});
app.get('/:shortcode', async (req, res) => {
  const { shortcode } = req.params;
  try {
    const entry = await collection.findOne({ shortcode });
    if (!entry) return res.status(404).json({ message: 'Short URL not found' });
    if (new Date() > new Date(entry.expiry)) {
      return res.status(410).json({ message: 'Short URL has expired' });
    }
    await collection.updateOne(
      { shortcode },
      {
        $inc: { clicks: 1 },
        $push: {
          clickDetails: {
            timestamp: new Date(),
            referrer: req.get('Referrer') || 'direct',
            ip: req.ip
          }
        }
      }
    );
    res.redirect(entry.url);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
