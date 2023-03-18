import { Service } from './model.service.js';
import { productosDao } from '../daos/productos.dao.js';

export class ProductosService extends Service {
    constructor(){
        super(productosDao);
    }

    getByCategoria = async categoria => {
        let db = await this.getAll();
        let productos = db.map(obj=> obj.toObject());
        let result = productos.filter(producto => producto.categoria.toLowerCase() == categoria.toLowerCase());
        return result;
    }
}