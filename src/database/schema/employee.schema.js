import mongoose from 'mongoose';

let Schema = mongoose.Schema;

const employee = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    firstName: String,
    lastName: String,
    bornPlace: String,
    birthDate: Date,
    gender: String
});

export default employee;