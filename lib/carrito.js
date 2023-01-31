class Carrito {
    constructor(_productos = [], _timestamp = Date.now()) {
        this.productos = _productos;
        this.timestamp = _timestamp;
    }
}

export { Carrito };
