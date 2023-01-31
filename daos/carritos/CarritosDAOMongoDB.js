// Clase para trabajar carritos en MongoDB
import mongoose from "mongoose";

const carritosCollection = "carritos";

const CarritosSchema = new mongoose.Schema({
    productos: { type: Array, require: true, default: []},
    timestamp: { type: Date, require: true },
});

export const CarritosDAO = mongoose.model(carritosCollection, CarritosSchema);
