import { ProductosService } from '../services/producto.service.js';
import { productosPrueba } from '../utils/productos.prueba.js'
export const productosService = new ProductosService();

const crearProducto = async(req, res) => {
    let result = await productosService.save(req.body);
    res.send(result);
}

const crearProductosPrueba = async(req, res) => {
    for (let prod of productosPrueba) await productosService.save(prod);
    res.redirect('/productos');
}

const getAll = async(req, res) => {
    let db = await productosService.getAll();
    let productos = db.map(item => item.toObject());
    let categorias = [];
    for (let prod of productos) {
        if (! categorias.includes(prod['categoria'])) categorias.push(prod['categoria']);
    }
    res.render('productos' , { productos, categorias });
}

const findById = async(req, res) => {
    let db = await productosService.findById(req.params.id);
    let productos = db.map(item => item.toObject());
    res.render('productos' , { productos });        
}

const actualizarProducto = async(req, res) => {
    let id = parseInt(req.params.id);
    let result = await productosService.update(id, req.body);
    res.status(200).send(result); 
}

const borrarProducto = async(req, res) => {
    let result = await productosService.deleteById(req.params.id);
    res.status(200).send(result); 
}

const getByCategoria = async(req, res) => {
    let productos = await productosService.getByCategoria(req.params.categoria);
    res.render('productos' , { productos });
}

export default {
     crearProducto, crearProductosPrueba, getAll, findById, actualizarProducto, borrarProducto, getByCategoria
}