import mongoose from "mongoose";

const Schema = mongoose.Schema;
const collection = "stories";

import reviewSchema from "./Review";
import shareSchema from "./Share";
import fuzzyDateSchema from "./FuzzyDate";

let storySchema = new Schema({
    patient: {
        // reference to sub from patient collection
        type: String,
        required: true
    },
    primarySymptom: {
       code: Number,
       title: String,
       description: String 
    },
    associatedSymptoms: [{
        code: Number,
        title: String,
        description: String 
    }],
    onset: fuzzyDateSchema,
    timeline: {
        type: Schema.Types.ObjectId,
        ref: 'Timeline'
    },
    text: String,
    reviewedBy: [reviewSchema],
    sharedWith: [shareSchema],
    draft: Boolean,
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: Date.now
    },
    shareCode: [{
        code: String,
        creator: String,
        story: String,
        created: {
            type: Date,
            default: Date.now
        }
    }]
})


const Story = mongoose.model("Story", storySchema, collection);

export default Story;
