import mongoose from "mongoose";
const Schema = mongoose.Schema;

let symptomSchema = new Schema(
    {
        code: Number,
        title: String,
        description: String
    }
)

export default symptomSchema;