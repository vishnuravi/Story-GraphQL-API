import mongoose from "mongoose";

const Schema = mongoose.Schema;
const collection = "stories";

let storySchema = new Schema({
    owner: {
        type: String,
        required: true
    },
    symptom: String,
    text: String,
    createdDate: Date,
    timeline: [{ x: String, y: Number }],
    reviewedBy: [String]
})

const Story = mongoose.model("Story", storySchema, collection);

export default Story;
