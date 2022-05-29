import 'dotenv/config';
import './src/database/config.js';
import express from 'express';
import userRouter from './src/routes/user.route.js';
import groupRouter from './src/routes/group.route.js';

const app = express();

app.use(express.json());
app.use('/api/v1/user', userRouter);
app.use('/api/v1/group', groupRouter);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('server up'));