import { ChatService } from '../services/chat.service.js';

export const chatService = new ChatService();

const crearChat = async(req, res) => {
    const mensaje = {
        email: req.user.email,
        tipo: 'usuario',
        timestamp: new Date().toLocaleString(),
        mensaje: req.body.mensaje
    }
    let result = await chatService.save(mensaje);
    res.send(result);
}

const renderChat = async(req, res) => {
    res.render('chat'); 
}

const findByEmail = async(req, res) => {
    let db = await chatService.getByEmail(req.params.email)
    let mensajes = db.map(res=> res.toObject());
    if (mensajes[0] == undefined) res.render('failure', {mensaje: 'No existen mensajes con el email provisto', ruta: 'chat'})
    else res.render('chat', { mensajes });           
}

export default {
    crearChat,  renderChat, findByEmail
}