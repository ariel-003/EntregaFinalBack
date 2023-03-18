import { CartsService } from '../services/cart.service.js';
import { transporter, getEmailDeCompra } from '../utils/nodemailer.js';

export const cartsService = new CartsService();

const miCarrito = async(req, res) => {
    let carrito = await cartsService.miCarrito(req);
    let productos = carrito.productos;
    res.render('carrito' , { productos });
}

const crearCarrito = async(req, res) => {
    let carrito = req.session.carrito;
    Object.assign(carrito, req.body);
    const email = getEmailDeCompra(req.user, carrito);
    transporter.sendMail(email);
    await cartsService.save(carrito);
    await cartsService.eliminarCarrito(req);
    res.redirect('/productos');
}

const getAll = async(req, res) => {
    let carritos = await cartsService.getAll();
    res.status(200).send(carritos); 
}

const agregarAlCarrito = async(req, res) => {
    let productos = await cartsService.agregarAlCarrito(req, req.body);
}

const sacarDelCarrito = async(req, res) => {
    await cartsService.sacarDelCarrito(req, req.body);
    res.redirect('/carrito');
}

const eliminarCarrito = async(req, res) => {
    await cartsService.eliminarCarrito(req);
    res.redirect('/productos');
}

export default {
    crearCarrito, getAll, miCarrito, agregarAlCarrito, sacarDelCarrito, eliminarCarrito
}