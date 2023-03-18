import { MongoDAO } from './mongo.dao.js';
import { chatSchema } from '../schemas/chat.schema.js';

class ChatDao extends MongoDAO {
    constructor(){
        super('chat', chatSchema);
    }
}

export const chatDao = new ChatDao();