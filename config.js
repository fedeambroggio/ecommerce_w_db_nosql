import fs from "fs";
import admin from "firebase-admin";

export const mongoConfig = {
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize:10,
        wtimeoutMS:2500
    },
    mongoUrl: "mongodb://localhost:27017/ecommerce"
}

const firebaseServiceAccount = JSON.parse(
    fs.readFileSync(
        "./db/ecommerce-e6362-firebase-adminsdk-jmqej-69f78380e7.json",
        "utf-8"
    )
);

export const firebaseConfig = {
    credential: admin.credential.cert(firebaseServiceAccount),
    databaseURL: "https://ecommerce-e6362.firebaseio.com",
};