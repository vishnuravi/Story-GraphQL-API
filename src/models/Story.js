import mongoose from "mongoose";

const Schema = mongoose.Schema;
const collection = "stories";

let storySchema = new Schema({
    owner: {
        type: String,
        required: true
    },
    symptom: {
        type: String,
        required: false
    },
    text: {
        type: String,
        required: false
    },
    createdDate: {
        type: String,
        required: false
    }
})

const Story = mongoose.model("Story", storySchema, collection);

export default Story;
