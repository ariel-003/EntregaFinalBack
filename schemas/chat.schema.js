import mongoose from 'mongoose';

export const chatSchema = new mongoose.Schema({
    idBack: {type: Number },
    email: {type: String},
    tipo: {type: String},
    timestamp: {type: String},
    mensaje: {type: String}
})