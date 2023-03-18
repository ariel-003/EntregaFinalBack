import mongoose from 'mongoose';

export const cartSchema = new mongoose.Schema({
    idBack: {type: Number },
    email: {type: String},
    timestamp: {type: String},
    productos: {type: Array },
    direccion: {type: String}
})