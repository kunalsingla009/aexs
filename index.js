
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Result = require('./models/Result');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

app.post('/api/results', async (req, res) => {
  try {
    const { game, result, day, month, year } = req.body;
    const newResult = new Result({ game, result, day, month, year });
    await newResult.save();
    res.status(201).json({ message: 'Result saved' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/results', async (req, res) => {
  try {
    const game = req.query.game;
    const data = await Result.find({ game }).sort({ year: -1, month: -1, day: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use(express.static('public'));

app.listen(5000, () => console.log('Server started on port 5000'));
