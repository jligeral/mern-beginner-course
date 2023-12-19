import express from 'express';
/* app is the name of the server */
const app = express();
/* Avoid using 5000 on Mac for port */
/* Also avoid using 3000 because React uses it by default */
const port = 9000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

/* Starts server */
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
