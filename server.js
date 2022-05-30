import 'dotenv/config';
import './src/database/config.js';
import express from 'express';
import {
    UserRoute,
    GroupRoute,
    CategoryRoute,
    AccountRoute
} from './src/routes/index.js'

const app = express();

app.use(express.json());
app.use('/api/v1/user', UserRoute);
app.use('/api/v1/group', GroupRoute);
app.use('/api/v1/category', CategoryRoute);
app.use('/api/v1/account', AccountRoute);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('server up'));