import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { Client, QueryResult } from 'pg';

interface PostgreSQLError extends Error {
    code?: string;
}

const router = Router();

const client = new Client({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT ? parseInt(process.env.PGPORT) : undefined,
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((err: Error) => console.error('Connection error', err.stack));

  router.post('/registration', (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const values = [name, email, password];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Неправильный формат почты' });
    }

    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: 'Неправильный формат пароля' });
    }

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
});

router.post('/authorization', (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const values = [email, password];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Неправильный формат почты' });
    }

    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: 'Неправильный формат пароля' });
    }

    const query = `
        SELECT id, user_name
        FROM users
        WHERE email = $1 AND password = $2;
    `;

    client.query(query, values)
        .then(async (result: QueryResult) => {
            if (result.rows.length === 0) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            const user = result.rows[0];

            const token = jwt.sign(
                { userId: user.id, userName: user.user_name },
                process.env.JWT_SECRET as string,
                { expiresIn: '1h' }
            );

            const updateQuery = `
                UPDATE users
                SET access_token = $1
                WHERE id = $2;
            `;

            await client.query(updateQuery, [token, user.id]);

            res.json({
                message: 'Authorization successful',
                userName: user.user_name,
                token: token
            });
        })
        .catch((err: PostgreSQLError) => {
            console.error('Error saving user:', err.message, err.code);
            res.status(500).json({ message: 'Error saving user' });
        });
});

export { router };