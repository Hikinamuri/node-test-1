import express, { Request, Response } from 'express';
import 'dotenv/config';
import { Client, QueryResult } from 'pg';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5172


interface PostgreSQLError extends Error {
    code?: string;
}


const client = new Client({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT ? parseInt(process.env.PGPORT) : undefined,
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
  .catch((err: Error) => console.error('Connection error', err.stack));

app.post('/api/v1/saveUser', (req, res) => {
    const { name, email, password } = req.body;
    const values = [name, email, password];

    const query = `
        INSERT INTO users (user_name, email, password)
        VALUES ($1, $2, $3)
        RETURNING id;
    `;

    client.query(query, values)
        .then((result: QueryResult) => {
            console.log('User saved with ID:', result.rows[0].id);
            res.json({
                message: 'Success',
                userId: result.rows[0].id,
            });
        })
        .catch((err: PostgreSQLError) => {
            console.error('Error saving user:', err.code);
            if (err.code === '23505') {
                res.status(409).json({ message: 'Duplicate key value' });
            } else {
                res.status(500).json({ message: 'Error saving user' });
            }
        });
})