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
			return Patient.findOne({ sub: args.sub }).exec();
		},

		// get a clinician by id
		getClinician: async (_, args) => {
			return Clinician.findOne({ sub: args.sub }).exec();
		},

		// get a story by id
		getStory: async (_, args) => {
			return Story.findOne({ _id: args._id }).exec();
		},

		// get all stories created by a patient
		getStoriesByPatient: async (_, args, { user }) => {
			return Story.find({ patient: user.sub })
				.sort({ createdDate: -1 })
				.exec();
		},

		// get all stories shared with a clinician
		getStoriesByClinician: async (_, args, { user }) => {
			return Story.find({ sharedWith: user.sub })
				.sort({ createdDate: -1 })
				.exec();
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
			return patient.save()
		},

		// update an existing patient
		updatePatient: async (_, args) => {
			return Patient.findOneAndUpdate({ sub: args.patientInput.sub },
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

		},

		// delete a patient
		deleteStory: async (_, args) => {
			const result = await Story.deleteOne({ sub: args.sub })
			return !!result.n;
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

			return clinician.save()
		},

		// update an existing clinician
		updateClinician: async (_, args) => {
			return Clinician.findOneAndUpdate({ sub: args.clinicianInput.sub },
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

		},

		// delete a clinician
		deleteClinician: async (_, args) => {
			const result = await Clinician.deleteOne({ sub: args.sub })
			return !!result.n;
		},

		// create a new story
		createStory: async (_, args) => {
			const story = new Story({
				patient: args.storyInput.patient,
				symptom: args.storyInput.symptom,
				text: args.storyInput.text,
				createdDate: Date.now()
			});
			return story.save()
		},

		// update an existing story
		updateStory: async (_, args) => {
			return Story.findOneAndUpdate({ _id: args._id },
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
