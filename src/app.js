import express from 'express';
import configure from "./config";
import createConnection from './database/connection';
import routes from './routes'

export default async function app() {
    configure();
    try {
        const connection = await createConnection();
        const app = express();

        try {
            console.log(`Connected to ${process.env.DB_DRIVER} database at ${process.env.DB_HOST}`);
            app.use(express.json());
            app.use(express.urlencoded());
            app.use(routes)
        } catch (error) {
            throw new Error(`Connection Failed to ${process.env.DB_HOST} using current credential`);
        }

        return app;
    } catch (error) {
        throw error;
    }
}