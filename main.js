import mongoose from "mongoose";
import { mongoConfig } from "./config.js";

mongoose.set("strictQuery", false);

function connectToMongoDB() {
    return mongoose.connect(mongoConfig["mongoUrl"], mongoConfig["options"])
      .then(() => {
        console.log("MongoDB database connection established successfully!");
      })
      .catch((error) => console.error("Error connecting to MongoDB: ", error));
  }

export default connectToMongoDB();

// import admin from "firebase-admin";
// import CRUD_Firebase from "./db_management/FirebaseDBManager.js";
// import { firebaseConfig } from './config.js';

// function connectToFirebase() {
//     admin.initializeApp(firebaseConfig);
//     const db = admin.firestore();
    
//     return db.listCollections()
//         .then(() => {
//             console.log("Firebase database connection established successfully!");
//             return db;
//         })
//         .catch((error) => {
//             console.error("Error connecting to Firestore: ", error);
//             throw error;
//         });
// }

// export default connectToFirebase();


// const testMongoCRUDOperations = async () => {
//     let contentExample = {
//         nombre: "Exploding kittens",
//         descripcion: "Juego de cartas",
//         codigo: "ME020",
//         foto: "https://www.weplay.cl/pub/media/catalog/product/cache/3f1b140c3c9f36fbf6b01dffb521c246/3/5/35583800561640_1.jpeg",
//         precio: 1100,
//         stock: 100,
//     };

//     try {
//         const productosMongoCRUD = new CRUD_MongoDB(MongoDB_DAO);
        
//         await productosMongoCRUD.create(contentExample);
//         await productosMongoCRUD.read({ codigo: "ME020" });
//         await productosMongoCRUD.update({ codigo: "ME020" }, { $set: { stock: 99 } });
//         await productosMongoCRUD.read({ codigo: "ME020" });
//         await productosMongoCRUD.delete({ codigo: "ME020" });
//         await productosMongoCRUD.read();
//     } catch (error) {
//         console.error("Error in CRUD operations: ", error);
//     }
// }



// const asObj = (doc) => ({ id: doc.id, ...doc.data() });
// const testFirebaseCRUDOperations = async () => {
//     let contentExample = {
//         nombre: "Exploding kittens",
//         descripcion: "Juego de cartas",
//         codigo: "ME020",
//         foto: "https://www.weplay.cl/pub/media/catalog/product/cache/3f1b140c3c9f36fbf6b01dffb521c246/3/5/35583800561640_1.jpeg",
//         precio: 1100,
//         stock: 100,
//     };

//     try {
//         // Create CRUD handler
//         const productosFirebaseCRUD = new CRUD_Firebase(db);

//         // CREATE
//         const createResponse = await productosFirebaseCRUD.create("productos", contentExample)
//         console.log("CREATE", createResponse.id);

//         // READ ALL
//         const readResponse = await productosFirebaseCRUD.readAll("productos");
//         let readResult = [];
//         readResponse.forEach((doc) => {
//             readResult.push(asObj(doc));
//         });
//         console.log("READ ALL", readResult);

//         // UPDATE
//         const updateResponse = await productosFirebaseCRUD.update(
//             "productos",
//             readResult[0]["id"],
//             {
//                 ...readResult[0],
//                 stock: 99,
//             }
//         );

//         console.log("UPDATE", updateResponse);

//         // READ ALL
//         const readResponse2 = await productosFirebaseCRUD.readAll("productos");
//         let readResult2 = [];
//         readResponse2.forEach((doc) => {
//             readResult2.push(asObj(doc));
//         });
//         console.log("READ ALL 2", readResult2);

//         // DELETE
//         const deleteResponse = await productosFirebaseCRUD.delete("productos", readResult[0]["id"]);
//         console.log("DELETE", deleteResponse);

//         // READ ALL
//         const readResponse3 = await productosFirebaseCRUD.readAll("productos");
//         let readResult3 = [];
//         readResponse3.forEach((doc) => {
//             readResult3.push(asObj(doc));
//         });
//         console.log("READ ALL 3", readResult3);
//     } catch (error) {
//         console.error("Error in CRUD operations: ", error);
//     }
// };