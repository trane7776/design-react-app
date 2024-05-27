import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';
import * as dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log('Server is running on port', process.env.PORT);
});
const MONGO_URL = process.env.DB_CONNECT;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (err: Error) => {
  console.log(err);
});

app.use('/', router());
