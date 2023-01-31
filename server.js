import connectToMongoDB from './main.js'
import express from "express";
import {Producto} from "./lib/producto.js";
import {Carrito} from "./lib/carrito.js";
import CRUD_MongoDB from "./db_management/MongoDBManager.js";
import MongoDB_DAO from "./daos/index.js";

const app = express();
const routerProductos = express.Router();
const routerCarrito = express.Router();
const ADMINISTRADOR = true;
const productosMongoCRUD = new CRUD_MongoDB(MongoDB_DAO);

routerProductos.route("/")
    .get((req, res) => {
        connectToMongoDB.then(async () => { 
            try {
                let productosGet = await productosMongoCRUD.read();
                res.send(productosGet)
            } catch (error) {
                console.error("Error in READ operation: ", error);
            }
        })
    })
    .post((req, res) => {
        if (ADMINISTRADOR) {
            const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
            const newProduct = new Producto(nombre, descripcion, codigo, foto, precio, stock)
            connectToMongoDB.then(async () => { 
                try {
                    await productosMongoCRUD.create(newProduct);
                    res.send({success: `Producto ${JSON.stringify(newProduct)} añadido`})
                } catch (error) {
                    console.error("Error in CREATE operation: ", error);
                }
            })
        } else {
            res.send({ error: '-1', descripcion: 'ruta "/api/productos", método "POST" no autorizada' });
        }
    });

routerProductos.route("/:id")
    .get(async (req, res) => {
        connectToMongoDB.then(async () => { 
            try {
                let productoGet = await productosMongoCRUD.read({"_id": req.params.id});
                if (productoGet)
                    res.send({
                        success: `Producto ${req.params.id} encontrado`,
                        data: productoGet
                    })
                else 
                    res.send({error: "Producto no encontrado"})
            } catch (error) {
                console.error("Error in READ operation: ", error);
            }
        })
    })
    .put((req, res) => {
        if (ADMINISTRADOR) {
            // REVISAR
            connectToMongoDB.then(async () => { 
                try {
                    const productoUpdated = await productosMongoCRUD.update({ _id: req.params.id }, { $set: req.body });
                    if (productoUpdated)
                        res.send({success: `Producto ${req.params.id} editado`})
                    else 
                        res.send({ error: "Producto no encontrado" })
                } catch (error) {
                    console.error("Error in UPDATE operation: ", error);
                }
            })
            
        } else {
            res.send({ error: '-1', descripcion: 'ruta "/api/productos/:id", método "PUT" no autorizada' });
        }
    })
    .delete((req, res) => {
        if (ADMINISTRADOR) {
            connectToMongoDB.then(async () => { 
                try {
                    const productoDeleted = await productosMongoCRUD.delete({ _id: req.params.id });
                    if (productoDeleted)
                        res.send({success: `Producto ${req.params.id} eliminado`})
                    else 
                        res.send({error: "Producto no encontrado"})
                } catch (error) {
                    console.error("Error in UPDATE operation: ", error);
                }
            })
        } else {
            res.send({ error: '-1', descripcion: 'ruta "/api/productos/:id", método "DELETE" no autorizada' });
        }
    });

// routerCarrito.route("/")
//     .post(async (req, res) => {
//         const { productos } = req.body;
        
//         let productsToAdd = [];
//         if (productos.length > 0) {
//             await productos.map(async idProd => {
//                 const productoGet = await ProductosFileManager.getById(idProd)
                
//                 if (productoGet) {
//                     const { nombre, descripcion, codigo, foto, precio, stock } = productoGet;
//                     productsToAdd.push({ id: idProd, ...new Producto(nombre, descripcion, codigo, foto, precio, stock) })
//                 }
//             })
//         }
        
//         const newCarrito = new Carrito(productsToAdd)
//         CarritosFileManager.save(newCarrito)
//         res.send({success: `Carrito ${JSON.stringify(req.body)} añadido`})
//     });

// routerCarrito.route("/:id")
//     .delete((req, res) => {
//         const carritoDeleted = CarritosFileManager.deleteById(req.params.id)
//         if (carritoDeleted)
//             res.send({success: `Carrito ${carritoDeleted} eliminado`})
//         else 
//             res.send({error: "Carrito no encontrado"})
//     });

// routerCarrito.route("/:id/productos")
//     .get(async (req, res) => {
//         const productoGet = await CarritosFileManager.getProductosOnCarritoById(req.params.id)
//         if (productoGet)
//             res.send({
//                 success: `Productos de carrito ${req.params.id} encontrados`,
//                 data: productoGet
//             })
//         else
//             res.send({error: "Productos de carrito no encontrados"})
//     })
//     .post(async (req, res) => {

//         let productsToAdd = [];
//         const { productos } = req.body;
//         productos.map(async idProd => {
//             const productoGet = await ProductosFileManager.getById(idProd)
//             if (productoGet) {
//                 const { nombre, descripcion, codigo, foto, precio, stock } = productoGet;
//                 productsToAdd.push({ id: idProd, ...new Producto(nombre, descripcion, codigo, foto, precio, stock) })
//             }
//         })

//         const productoSaved = await CarritosFileManager.saveProductosOnCarritoById(req.params.id, productsToAdd)
//         if (productoSaved) {
//             res.send({success: `Productos ${JSON.stringify(req.body)} añadidos al carrito ${req.params.id}`})
//         } else 
//             res.send({error: "Productos de carrito no guardados"})
//     });

// routerCarrito.route("/:id/productos/:id_prod")
//     .delete((req, res) => {
//         const carritoDeleted = CarritosFileManager.deleteProductByIdOnCarritoById(req.params.id, req.params.id_prod)
//         if (carritoDeleted)
//             res.send({ success: `borrar ${req.params.id_prod} de ${req.params.id}` });
//         else 
//             res.send({error: "Carrito o producto no encontrado"})
//     });

// SERVER CONFIG
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies
// app.use(express.static('public'));
app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);

// SERVER INIT
const server = app.listen(8080, () => {
    console.log(`Servidor iniciado en puerto ${server.address().port}`);
});
// MANEJO DE ERRORES SERVIDOR
server.on("error", (e) => console.log(e));
