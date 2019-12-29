import mongoose from "mongoose";

const Schema = mongoose.Schema;
const collection = "timelines";

let timelineSchema = new Schema({
    symptom: {
        code: Number,
        title: String,
        description: String
    },
    points: [{
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
    }]
});

const Timeline = mongoose.model("Timeline", timelineSchema, collection);

export default Timeline;