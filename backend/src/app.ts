import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import notesRouter from "./routes/notes-routes";
import morgan from 'morgan';

/* app is the name of the server */
const app = express();
/* Use morgan to log requests to the console */
app.use(morgan('dev'));
/* Use JSON for the body of the request */
app.use(express.json());
/* Defines endpoint to obtain notes */
app.use('/api/notes', notesRouter);

app.use((req, res, next) => {
  next(Error('Endpoint not found'));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  let errorMessage = 'An unknown error occurred';
  if (error instanceof Error) errorMessage = error.message;
  res.status(500).json({ message: errorMessage });
});

export default app;