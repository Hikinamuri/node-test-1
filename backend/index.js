require('dotenv').config();
const { Client } = require('pg');
const cors = require('cors');
const express = require('express'),
    app = express(),
    PORT = process.env.PORT || 5172


const client = new Client({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
});

app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту: ${PORT}`);
})

client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

app.post('/api/v1/saveUser', (req, res) => {
    const { name, email, password } = req.body;
    const values = [name, email, password];

    const query = `
        INSERT INTO users (user_name, email, password)
        VALUES ($1, $2, $3)
        RETURNING id;
    `;

    client.query(query, values)
        .then(result => {
            console.log('User saved with ID:', result.rows[0].id);
            res.json({
                message: 'Success',
                userId: result.rows[0].id,
            });
        })
        .catch(err => {
            console.error('Error saving user:', err.stack);
            res.status(500).json({ message: 'Error saving user' });
        });
})