import mongoose from "mongoose";

const Schema = mongoose.Schema;
const collection = "patients";

let patientSchema = new Schema({
    sub: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    dateOfBirth: Date,
    gender: String,
    pronouns: String,
    favoriteColor: String
})

const Patient = mongoose.model("Patient", patientSchema, collection);

export default Patient;