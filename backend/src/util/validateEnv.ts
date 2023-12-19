import { cleanEnv } from 'envalid';
import { port, str } from 'envalid/dist/validators';

/* cleanEnv will validate each environment variable to enforce type safety */
export default cleanEnv(process.env, {
  MONGO_CONNECTION_STRING: str(),
  PORT: port(),
});
