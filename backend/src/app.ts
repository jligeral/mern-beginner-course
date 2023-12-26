import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import notesRouter from "./routes/notes-routes";
import usersRoutes from "./routes/users-routes";
import morgan from 'morgan';
import createHttpError, { isHttpError } from 'http-errors';
import session from "express-session";
import env from "./util/validateEnv";
import mongostore from "connect-mongo";

/* app is the name of the server */
const app = express();
/* Use morgan to log requests to the console */
app.use(morgan('dev'));
/* Use JSON for the body of the request */
app.use(express.json());
/* Use session middleware */
app.use(session({
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60, // 1 hour
  },
  rolling: true, // Reset cookie maxAge on every request
  store: mongostore.create({
    mongoUrl: env.MONGO_CONNECTION_STRING,
  }),
}));
/* Defines endpoint to obtain notes */
app.use('/api/notes', notesRouter);
/* Defines endpoint to obtain users */
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, 'Endpoint not found'));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  let errorMessage = 'An unknown error occurred';
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.statusCode;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ message: errorMessage });
});

export default app;