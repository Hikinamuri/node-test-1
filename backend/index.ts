import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { router } from './routes/route';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5172

const swaggerFilePath = path.join(__dirname, 'swagger.json');
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, 'utf-8'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use('/api/v1', router)

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту: ${PORT}`);
})