import express from 'express';
import chatController  from '../controller/chat.controller.js';
import { idValidator, autentificacion } from '../utils/validators.js';

export const chatRouter = express.Router();

chatRouter.use(autentificacion);

chatRouter.get('/',  chatController.renderChat);

chatRouter.get('/:email',  chatController.findByEmail);

chatRouter.post('/', chatController.crearChat);