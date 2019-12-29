import mongoose from "mongoose";

const Schema = mongoose.Schema;
const collection = "timelines";

let timelineSchema = new Schema({
    timeline: {
        x: String,
        y: Number
    }
});

const Timeline = mongoose.model("Timeline", timelineSchema, collection);

export default Timeline;