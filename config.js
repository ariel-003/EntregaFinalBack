import dotenv  from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT;
export const MONGO_URL = process.env.MONGO_URL;
export const GMAIL_EMAIL = process.env.GMAIL_EMAIL;
export const GMAIL_PASS = process.env.GMAIL_PASS;
export const COOKIE_MAXAGE =  parseInt(process.env.COOKIE_MAXAGE);
export const TTL =  parseInt(process.env.TTL);