import mongoose from "mongoose";

const Schema = mongoose.Schema;
const collection = "patients";

let patientSchema = new Schema({
    sub: String,
    active: Boolean,
    title: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    birthDate: Date,
    gender: String,
    pronouns: String,
    favoriteColor: String, 
    language: String
})

const Patient = mongoose.model("Patient", patientSchema, collection);

export default Patient;