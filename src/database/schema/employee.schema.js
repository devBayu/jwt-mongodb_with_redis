import mongoose from 'mongoose';

let Schema = mongoose.Schema;

const employee = new Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    bornPlace: String,
    birthDate: Date
});

export default employee;