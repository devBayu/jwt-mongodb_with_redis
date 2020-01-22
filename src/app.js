import express from 'express';
import configure from "./config";
import createDbConnection from './database/connection';

export async function app() {
    configure();

    try {
        const connection = await createDbConnection();
        const app = express();

        if (connection.isConnected) {
            console.log(`Connected to ${process.env.DB_DRIVER} database at ${process.env.DB_HOST}`);
            app.use(express.json());
            app.use(express.urlencoded());
        } else {
            throw new Error(`Connection Failed to ${process.env.DB_HOST} using current credential`);
        }

        return app;
    } catch (error) {
        throw error;
    }
}