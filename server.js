import 'dotenv/config';
import './src/database/config.js';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger/swagger_output.json';
import routes from './src/routes/index.js'

const app = express();

app.use(express.json());

app.use(routes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('server up'));