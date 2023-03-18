import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt'
import path from 'path';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValid = (user, password) => bcrypt.compareSync(password, user.password);


