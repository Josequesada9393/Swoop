import mongoose from 'mongoose';
import { ConnectOptions } from 'mongoose';

const DB_NAME = process.env.DB_NAME
const DB_PORT = process.env.DB_PORT

mongoose.connect(
  `${DB_PORT}${DB_NAME}`,
  (err) => {
    if (err) {
      console.log(`Sorry, something went wrong! ${err}`);
    } else {
      console.log(`Database connected @ port ${DB_PORT}!`)
  }
 }
);

export default mongoose;