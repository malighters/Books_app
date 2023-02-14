import * as dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

export default {
  MONGODB_URI,
  PORT,
};
