import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import noteSchema from './models/note';

/* app is the name of the server */
const app = express();

app.get('/', async (req, res, next) => {
  try {
      const notes = await noteSchema.find().exec();
      res.status(200).json(notes);
  } catch (error) {
      next(error);
  }
});

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