// Clase para trabajar productos en MongoDB
import mongoose from "mongoose";

const productosCollection = "productos";

const ProductosSchema = new mongoose.Schema({
    nombre: { type: String, require: true, max: 100 },
    descripcion: { type: String, require: true, max: 200 },
    codigo: { type: String, require: true, max: 12 },
    foto: { type: String, require: true, max: 200 },
    precio: { type: Number, require: true },
    stock: { type: Number, require: true },
    timestamp: { type: Date, require: true },
});

export const ProductosDAO = mongoose.model(productosCollection, ProductosSchema);
