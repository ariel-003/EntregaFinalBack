import { Service } from './model.service.js';
import { cartDao } from '../daos/cart.dao.js';
import { productosService } from '../controller/productos.controller.js';

export class CartsService extends Service {
    constructor(){
        super(cartDao);
    }
    
    obtenerProducto = async idBack => {
        let id = parseInt(idBack);
        let productoarr = await productosService.findById(id);
        let producto = productoarr[0]._doc;
        return producto;
    }

    miCarrito = async(req) => {
        let carrito = req.session.carrito;
        if (carrito == undefined) {
            carrito = {
            email: req.user.email,
            timestamp: new Date().toLocaleString(),
            productos : []
            }; 
        req.session.carrito = carrito;
        req.session.save();
        }
        return carrito;
    }

    agregarAlCarrito = async(req, pedido) => {
        let carrito = req.session.carrito;
        if (carrito == undefined) { 
            carrito = await this.miCarrito(req); 
        }
        let producto = await this.obtenerProducto(pedido.idBack);
        Object.assign(producto, pedido);
        let productoEnCarrito = false;
        for (const prod of carrito.productos) {
            if(prod.idBack == pedido.idBack) {
                productoEnCarrito = true;
                let cantidadDb = parseInt(prod.cantidad);
                let cantidadPedido = parseInt(pedido.cantidad);
                prod.cantidad = cantidadDb + cantidadPedido; 
            }
        }
        if (productoEnCarrito == false) carrito.productos.push(producto);
        req.session.save();
        return carrito.productos;
    }

    sacarDelCarrito = async(req, pedido) => {
        let carrito = req.session.carrito;
        await this.obtenerProducto(pedido.idBack);
        for (const prod of carrito.productos) {
            if(prod.idBack == pedido.idBack) {
                let cantidadDb = parseInt(prod.cantidad);
                let cantidadPedido = parseInt(pedido.cantidad);
                prod.cantidad = cantidadDb - cantidadPedido; 
                if (prod.cantidad == 0) {
                    let index = carrito.productos.indexOf(prod);
                    carrito.productos.splice(index, 1);
                }
            }
        }
        req.session.save();
    }

    eliminarCarrito = async(req) => {
        req.session.carrito = undefined;
        req.session.save();
    }
}