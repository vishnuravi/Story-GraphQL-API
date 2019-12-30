import mongoose from "mongoose";
const Schema = mongoose.Schema;

let fuzzyDateSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    precision: {
        type: String,
        default: 'day'
    }
})

export default fuzzyDateSchema;