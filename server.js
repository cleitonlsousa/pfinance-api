import 'dotenv/config';
import './src/database/config.js';
import express from 'express';
import authRouter from './src/routes/auth.route.js'


const app = express();

app.use(express.json());
app.use('/api/v1', authRouter);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('server up'));