import mongoose from "mongoose";
const Schema = mongoose.Schema;

let reviewSchema = new Schema(
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

export default reviewSchema;