import 'dotenv/config';
import express from 'express';

/* app is the name of the server */
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;