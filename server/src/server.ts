import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import routes from './routes';
import database from './database';
import runningTasks from './runningTasks';
import { errorHandler } from './middlewares/error';
declare module 'express-session' {
  interface SessionData {
    userId?: number;
    username?: string;
    accessToken?: string;
  }
}

dotenv.config();

const main = async () => {
  const app = express();
  const PORT = process.env.PORT || 3000;
  const db = await database.initialize();
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    })
  );

  app.use(
    session({
      secret: process.env.SESSION_SECRET!,
      store: new MongoStore({
        client: db.connection.getClient(),
        stringify: false,
      }),
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(routes);
  app.use(errorHandler);

  runningTasks.startAll();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

main();
