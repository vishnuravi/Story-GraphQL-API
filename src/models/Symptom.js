import mongoose from "mongoose";
const Schema = mongoose.Schema;

let symptomSchema = new Schema(
    {
        code: [String],
        title: String,
        description: String
    }
)

export default symptomSchema;