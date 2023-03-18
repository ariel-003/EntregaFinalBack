import { Service } from './model.service.js';
import { chatDao } from '../daos/chat.dao.js'

export class ChatService extends Service {
    constructor(){
        super(chatDao);
    }

    getByEmail = async email => {
        let db = await this.getAll();
        const result = db.filter(db=> db.email == email);
        return result;
    }
}