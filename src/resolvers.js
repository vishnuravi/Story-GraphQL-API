import Story from "./models/Story";
import Patient from "./models/Patient";
import Clinician from "./models/Clinician";
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from "graphql-iso-date";

export const resolvers = {
	Date: GraphQLDate,
	Time: GraphQLTime,
	DateTime: GraphQLDateTime,

	Query: {
		// get a patient by id
		getPatient: async (_, args) => {
			const patient = await Patient.findOne({ sub: args.sub }).exec();
			return patient;
		},

		// get a clinician by id
		getClinician: async (_, args) => {
			const clinician = await Clinician.findOne({ sub: args.sub }).exec();
			return clinician;
		},

		// get a story by id
		getStory: async (_, args) => {
			const story = await Story.findOne({ _id: args._id }).exec();
			return story;
		},

		// get all stories created by a patient
		getStoriesByPatient: async (_, args, { user }) => {
			const stories = await Story.find({ patient: user.sub })
				.sort({ createdDate: -1 })
				.exec();
			return stories;
		},

		// get all stories shared with a clinician
		getStoriesByClinician: async (_, args, { user }) => {
			const stories = await Story.find({ sharedWith: user.sub })
				.sort({ createdDate: -1 })
				.exec();
			return stories;
		}
	},

	Mutation: {
		// create a new patient
		createPatient: async (_, args) => {
			const patient = new Patient({
				sub: args.patientInput.sub,
				firstName: args.patientInput.firstName,
				lastName: args.patientInput.lastName,
				email: args.patientInput.email,
				dateOfBirth: args.patientInput.dateOfBirth,
				gender: args.patientInput.gender,
				pronouns: args.patientInput.pronouns,
				favoriteColor: args.patientInput.favoriteColor,
				createdDate: Date.now()
			});
			const result = await patient.save()
			return result;
		},

		// update an existing patient
		updatePatient: async (_, args) => {
			const result = await Patient.findOneAndUpdate({ sub: args.patientInput.sub },
				{
					$set: {
						sub: args.patientInput.sub,
						firstName: args.patientInput.firstName,
						lastName: args.patientInput.lastName,
						email: args.patientInput.email,
						dateOfBirth: args.patientInput.dateOfBirth,
						gender: args.patientInput.gender,
						pronouns: args.patientInput.pronouns,
						favoriteColor: args.patientInput.favoriteColor,
					}
				},
				{
					new: true
				}
			);
			return result;

		},

		// create a new clinician
		createClinician: async (_, args) => {
			const clinician = new Clinician({
				sub: args.clinicianInput.sub,
				firstName: args.clinicianInput.firstName,
				lastName: args.clinicianInput.lastName,
				email: args.clinicianInput.email,
				createdDate: Date.now()
			});

			const result = await clinician.save()
			return result;
		},

		// update an existing clinician
		updateClinician: async (_, args) => {
			const result = await Clinician.findOneAndUpdate({ sub: args.clinicianInput.sub },
				{
					$set: {
						sub: args.clinicianInput.sub,
						firstName: args.clinicianInput.firstName,
						lastName: args.clinicianInput.lastName,
						email: args.clinicianInput.email
					}
				},
				{
					new: true
				});
			return result;

		},

		// create a new story
		createStory: async (_, args) => {
			const story = new Story({
				patient: args.storyInput.patient,
				symptom: args.storyInput.symptom,
				text: args.storyInput.text,
				createdDate: Date.now()
			});
			const result = await story.save()
			return result;
		},

		// update an existing story
		updateStory: async (_, args) => {
			const result = await Story.findOneAndUpdate({ _id: args._id },
				{
					$set: {
						patient: args.storyInput.patient,
						symptom: args.storyInput.symptom,
						text: args.storyInput.text,
					}
				},
				{
					new: true
				});
			return result;
		},

		// delete a story
		deleteStory: async (_, args) => {
			const result = await Story.deleteOne({ _id: args._id })
			return !!result.n;
		},

		// mark a story reviewed by a clinician
		markStoryReviewed: async (_, args) => {
			const result = await Story.updateOne(
				{ _id: args._id },
				{ $addToSet: { reviewedBy: args.clinician } }
			)
			return !!result.nModified;
		},

		// share a story with a clinician
		shareStory: async (_, args) => {
			const result = await Story.updateOne(
				{ _id: args._id },
				{ $addToSet: { sharedWith: args.clinician } }
			)
			return !!result.nModified;
		}
	}
};
