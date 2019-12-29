import mongoose from "mongoose";
const Schema = mongoose.Schema;

let timelinePointSchema = new Schema(
    {
        x: {
            date: {
                type: Date,
                required: true
            },
            precision: {
                type: Schema.Types.Mixed,
                default: 'mm-dd-yyyy'
            }
        },
        y: String,
        comments: String
    }
)

export default timelinePointSchema;