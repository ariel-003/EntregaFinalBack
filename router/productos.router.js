import express from 'express';
import productosController from '../controller/productos.controller.js';
import { idValidator, thunderIDValidator, productValidator, autentificacion } from '../utils/validators.js';

export const productosRouter = express.Router();

productosRouter.get('/',  autentificacion, productosController.getAll);

productosRouter.get('/categoria/:categoria',autentificacion, productosController.getByCategoria);

productosRouter.get('/:id', autentificacion, idValidator, productosController.findById);

productosRouter.post('/', productValidator, productosController.crearProducto);

productosRouter.post('/prueba', productosController.crearProductosPrueba);

productosRouter.put('/:id', productValidator, productosController.actualizarProducto);

productosRouter.delete('/:id', thunderIDValidator, productosController.borrarProducto);

