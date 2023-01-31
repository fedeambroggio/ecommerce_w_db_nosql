import dotenv from 'dotenv';
dotenv.config();

let MongoDB_DAO;
let exportName;

// console.log(process.env.MONGODB_DAO_PATH)

try {
    MongoDB_DAO = await import(process.env.MONGODB_DAO_PATH);
} catch (error) {
    console.log(error);
}

exportName = Object.keys(MongoDB_DAO)[0]

export default MongoDB_DAO[exportName];