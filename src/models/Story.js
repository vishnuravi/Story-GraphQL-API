import mongoose from "mongoose";

const Schema = mongoose.Schema;
const collection = "stories";

let storySchema = new Schema({
    patient: {
        type: String,
        required: true
    },
    symptom: String,
    text: String,
    createdDate: {
        type: Date,
        required: true
    },
    timeline: [{ x: String, y: Number }],
    reviewedBy: [String],
    sharedWith: [String]
})

const Story = mongoose.model("Story", storySchema, collection);

export default Story;
