import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config();

import './database/connection';

import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT_APP || 3333);
