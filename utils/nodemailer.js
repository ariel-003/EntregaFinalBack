import nodemailer from 'nodemailer';
import { GMAIL_EMAIL, GMAIL_PASS } from '../config.js'


export const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth:{
        user: GMAIL_EMAIL,
        pass: GMAIL_PASS
    }
})

export const getEmailDeRegistro = (user) =>  {
    let email = {
        from: "Ecommerce <Ecommerce@test.com>",
        to: GMAIL_EMAIL,
        subject: `${user.nombre} ${user.apellido} se registro!`,
        html:`<b>Datos del usuario registrado:</b><br>
        <ul>
            <li><b>Nombre:</b> ${user.nombre} ${user.apellido}</li>
            <li><b>Teléfono:</b> ${user.telefono}</li>
            <li><b>Email:</b> ${user.username}</li>
        </ul>`
    }
    return email;
}

export const getEmailDeCompra = (user, carrito) =>  {
    let productosHTML = '';
    for (let i = 0; i < carrito.productos.length; i++) {
        const producto = carrito.productos[i];
        const HTML = `
          <ul>
            <li><b>ID:</b> ${producto.idBack}</li>
            <li><b>Nombre:</b> ${producto.nombre}</li>
            <li><b>Precio:</b> ${producto.precio}</li>
            <li><b>Categoria:</b> ${producto.categoria}</li>
            <li><b>Cantidad:</b> ${producto.cantidad}</li>
          </ul>`;
        productosHTML += HTML;
      }
    let email = {
        from: "Ecommerce <Ecommerce@test.com>",
        to: GMAIL_EMAIL,
        subject: `Nuevo pedido de: ${user.nombre} ${user.apellido}`,
        html:`<b>Datos del Cliente:</b><br>
        <ul>
            <li><b>Nombre:</b> ${user.nombre} ${user.apellido}</li>
            <li><b>Teléfono:</b> ${user.telefono}</li>
            <li><b>Email:</b> ${user.email}</li>
        </ul>
        <b>Datos del Pedido:</b><br>
        ${productosHTML}
        <ul>
            <li><b>Timestamp:</b> ${carrito.timestamp}</li>
            <li><b>Direccion de entrega:</b> ${carrito.direccion}</li>
        </ul>`
    }
    return email;
}