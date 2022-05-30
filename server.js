import 'dotenv/config';
import './src/database/config.js';
import express from 'express';
import {
    UserRoute,
    GroupRoute,
    CategoryRoute,
    AccountRoute,
    TransactionRoute
} from './src/routes/index.js'

const app = express();

app.use(express.json());
app.use('/api/v1/user', UserRoute);
app.use('/api/v1/group', GroupRoute);
app.use('/api/v1/category', CategoryRoute);
app.use('/api/v1/account', AccountRoute);
app.use('/api/v1/transaction', TransactionRoute);


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('server up'));