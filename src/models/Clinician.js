import mongoose from "mongoose";

const Schema = mongoose.Schema;
const collection = "clinicians";

let clinicianSchema = new Schema({
    sub: String,
    title: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    practiceAddress: String,
    specialty: String,
    NPI: String
})

const Clinician = mongoose.model("Clinician", clinicianSchema, collection);

export default Clinician;