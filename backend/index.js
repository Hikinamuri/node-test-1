const { Client } = require('pg');
require('dotenv').config();
const express = require('express'),
    app = express(),
    PORT = process.env.PORT || 3001


const client = new Client({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту: ${PORT}`);
})

client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

app.get('/api/v1/getUser/', (req, res) => {
    res.json({
        message: process.env.PGHOST
    })
})