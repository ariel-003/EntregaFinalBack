import { MongoDAO } from './mongo.dao.js';
import { productoSchema } from '../schemas/producto.schema.js';

class ProductosDao extends MongoDAO {
    constructor(){
        super('productos', productoSchema);
    }
}

export const productosDao = new ProductosDao();