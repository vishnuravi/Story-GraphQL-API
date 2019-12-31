import mongoose from "mongoose";

const Schema = mongoose.Schema;
const collection = "clinicians";

let clinicianSchema = new Schema({
    sub: String,
    active: Boolean,
    title: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    gender: String,
    practiceAddress: String,
    specialty: String,
    NPI: String
})

const Clinician = mongoose.model("Clinician", clinicianSchema, collection);

export default Clinician;