import mongoose from 'mongoose';

export default async function createConnection() {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
        console.log(`Success Connected ${process.env.MONGO_URI}`)
    } catch (error) {
        console.log(`Failed To Connect ${process.env.MONGO_URI}`, error);
    }
}
