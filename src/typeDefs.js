import { gql } from "apollo-server-express";

export const typeDefs = gql`
  directive @isPatient on FIELD_DEFINITION
  directive @isClinician on FIELD_DEFINITION

  scalar Date
  scalar Time
  scalar DateTime

  type Patient {
	_id: String!,
	sub: String!,
	firstName: String!,
	lastName: String!,
	email: String!,
	dateOfBirth: String,
	gender: String,
	pronouns: String,
	favoriteColor: String
  }

  type Clinician {
	_id: String!,
	sub: String!,
	firstName: String!,
	lastName: String!,
	email: String!
  }

  type Story {
	_id: ID!
	patient: String!
	symptom: String
	text: String
	createdDate: DateTime
	timeline: [Coords]
	reviewedBy: [String]
	sharedWith: [String]
  }

  type Coords {
    x: String
    y: Float
  }

  input StoryInput {
    patient: String!
    symptom: String
    text: String
  }

  input PatientInput {
	sub: String!,
	firstName: String!,
	lastName: String!,
	email: String!,
	dateOfBirth: String,
	gender: String,
	pronouns: String,
	favoriteColor: String
  }

  input ClinicianInput {
	sub: String!,
	firstName: String!,
	lastName: String!,
	email: String!
  }

  type Query {
	getStoriesByPatient: [Story] @isPatient
	getStoriesByClinician: [Story] @isClinician
	getStory(_id: String): Story
	getPatient(sub: String): Patient
	getClinician(sub: String): Clinician
  }

  type Mutation {
	createStory(storyInput: StoryInput): Story @isPatient
	updateStory(_id: String, storyInput: StoryInput): Story
	deleteStory(_id: String): Boolean @isPatient
    markStoryReviewed(_id: String, clinician: String): Boolean @isClinician
	shareStory(_id: String, clinician: String): Boolean @isPatient
	createPatient(patientInput: PatientInput): Patient
	updatePatient(patientInput: PatientInput): Patient
	deletePatient(sub: String): Boolean
	createClinician(clinicianInput: ClinicianInput): Clinician
	updateClinician(clinicianInput: ClinicianInput): Clinician
	deleteClinician(sub: String): Boolean
  }
`;
