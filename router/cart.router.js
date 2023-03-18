import express from 'express';
import cartController  from '../controller/cart.controller.js';
import { idValidator, autentificacion } from '../utils/validators.js';

export const cartRouter = express.Router();

cartRouter.use(autentificacion);

cartRouter.get('/', cartController.miCarrito);

cartRouter.post('/', cartController.crearCarrito);

cartRouter.post('/miCarrito', cartController.agregarAlCarrito);

cartRouter.post('/sacarDelCarrito', cartController.sacarDelCarrito);

cartRouter.post('/eliminarCarrito', cartController.eliminarCarrito);






