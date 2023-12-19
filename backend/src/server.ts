import app from "./app";
import env from './util/validateEnv';
import mongoose from 'mongoose';

/* Avoid using 5000 on Mac for port */
/* Also avoid using 3000 because React uses it by default */
const port = env.PORT || 9000;

mongoose.connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log('Connected to MongoDB');
    /* Start the server */
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(console.error);
