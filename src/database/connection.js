import {createConnection} from "typeorm";

async function createDbConnection() {
    const connection = await createConnection({
        type: process.env.DB_DRIVER || 'mongodb',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 27017,
        dbs: process.env.DB_NAME || 'bayurahmanadinata',
    });

    return connection;
}
export default createDbConnection;

// const mongoose = require ('mongoose');
// mongoose.connect('mongodb://localhost:27017/bayurahmanadinata_dbs');
// mongoose.connection.once('open', function () {
//     console.log('Connect Success')
// }).on('error', function (error) {
//     console.log('Connection Error', error)
// });

// import mongoose from 'mongoose';
//
// const connectDb = () => {
//     mongoose.connect(process.env.MONGO_URL);
//     mongoose.connection.once('open', function () {
//         console.log('Connect Success')
//     }).on('error', function (error) {
//         console.log('Connection Error', error)
//     })
// };
//
// export {connectDb}