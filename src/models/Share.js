import mongoose from "mongoose";
const Schema = mongoose.Schema;

let shareSchema = new Schema(
    {
        clinician: {
            type: String, // user sub
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        } 
    }
)

export default shareSchema;