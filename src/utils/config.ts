import * as dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const POSTGRES_URI = process.env.POSTGRES_URI;
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET;
const AUTH0_CALLBACK_URL = process.env.AUTH0_CALLBACK_URL;
const SESSION_SECRET = process.env.SESSION_SECRET;

export default {
  MONGODB_URI,
  POSTGRES_URI,
  PORT,
  AUTH0_CLIENT_ID,
  AUTH0_DOMAIN,
  AUTH0_CLIENT_SECRET,
  AUTH0_CALLBACK_URL,
  SESSION_SECRET,
};
