import mongoose from "mongoose";
const Schema = mongoose.Schema;
import fuzzyDateSchema from "./FuzzyDate";

let timelinePointSchema = new Schema(
    {
        x: fuzzyDateSchema,
        y: String,
        comments: String
    }
)

export default timelinePointSchema;