import http from 'http';
import express, { Application } from "express";
import { createHttpTerminator } from 'http-terminator';

import appConfig from './config';
import AppRoute from "./routes/app.route";

const app: Application = express();
const serverPort = Number(appConfig.server.port);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

AppRoute(app);

export const server = http.createServer(app);
export const httpTerminator = createHttpTerminator({ server });

server.listen(serverPort, () => {
  console.log(`App listening port : ${serverPort}`);
  console.log(`App listening environment : ${process.env.ENV_NAME}`);
});
