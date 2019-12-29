import mongoose from "mongoose";

const Schema = mongoose.Schema;
const collection = "stories";

let timelineSchema = new Schema({
    timeline: {
        x: String,
        y: Number
    }
});

let storySchema = new Schema({
    patient: {
        // reference to sub from patient collection
        type: String,
        required: true
    },
    symptom: String,
    onset: {
        date: {
            type: Date,
            required: true
        },
        precision: {
            type: Schema.Types.Mixed,
            default: 'mm-dd-yyyy'
        }
    },
    timeline: {
        type: Schema.Types.ObjectId,
        ref: 'Timeline'
    },
    text: String,
    reviewedBy: [{
        clinician: {
            type: String, // user sub
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        } 
    }],
    sharedWith: [{
        clinician: {
            type: String, // user sub
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        } 
    }],
    draft: Boolean,
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: Date.now
    }
})


const Story = mongoose.model("Story", storySchema, collection);

export default Story;
