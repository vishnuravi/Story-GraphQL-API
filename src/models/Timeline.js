import mongoose from "mongoose";
import timelinePointSchema from "./TimelinePoint";
import symptomSchema from "./Symptom";

const Schema = mongoose.Schema;
const collection = "timelines";

let timelineSchema = new Schema({
    symptom: symptomSchema,
    points: [timelinePointSchema]
});

const Timeline = mongoose.model("Timeline", timelineSchema, collection);

export default Timeline;