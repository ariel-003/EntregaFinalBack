import { MongoDAO } from './mongo.dao.js';
import { userSchema } from '../schemas/user.schema.js';

class UserDao extends MongoDAO {
    constructor(){
        super('usuarios', userSchema);
    }

}

export const usersDao = new UserDao();