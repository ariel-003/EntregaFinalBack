import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
    nombre: {type: String},
    apellido: {type: String},
    telefono: {type: Number},
    email: {type: String},
    password: {type: String}
})