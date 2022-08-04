require('dotenv').config();
const express = require('express');
const timeout = require('connect-timeout');
const cors = require('cors');
const cards = require('./routes/cards.route');
const card = require('./routes/card.route');
const updates = require('./routes/updates.route');
const app = express();
app.use(express.json());
app.use(cors());
app.use('/cards', cards);
app.use('/card', card);
app.use('/updates', updates);
app.use(timeout(20 * 60 * 1000)); // 10 minutes
module.exports = app