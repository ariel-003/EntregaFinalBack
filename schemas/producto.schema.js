import mongoose from 'mongoose';

export const productoSchema = new mongoose.Schema({
    idBack: {type: Number },
    nombre: {type: String},
    thumbnail: {type: String},
    precio: {type: Number},
    descripcion: {type: String},
    categoria: {type: String}
})