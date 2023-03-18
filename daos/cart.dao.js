import { MongoDAO } from './mongo.dao.js';
import { cartSchema } from '../schemas/cart.schema.js';

class CartDao extends MongoDAO {
    constructor(){
        super('carritos', cartSchema);
    }
}

export const cartDao = new CartDao();