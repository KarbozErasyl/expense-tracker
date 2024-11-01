// server/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Настройки подключения к базе данных
const pool = new Pool({
  user: 'ваш_пользователь',
  host: 'localhost',
  database: 'ваша_база_данных',
  password: 'ваш_пароль',
  port: 5432,
});

app.post('/api/transactions', async (req, res) => {
  const { dateTime, author, sum, category, comment } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO transactions (dateTime, author, sum, category, comment) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [dateTime, author, sum, category, comment]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.listen(5000, () => console.log('Server started on port 5000'));
