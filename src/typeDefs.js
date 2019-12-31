import { gql } from "apollo-server-express";

export const typeDefs = gql`
  directive @isPatient on FIELD_DEFINITION
  directive @isClinician on FIELD_DEFINITION

  scalar Date
  scalar Time
  scalar DateTime

  enum StoryColor {
	  teal,
	  red,
	  orange,
	  blue
  }

  enum Gender {
	  male,
	  female,
	  other,
	  blank
  }

  enum Pronouns {
	  she,
	  he,
	  they
  }

  enum Severity {
	  mild,
	  moderate,
	  severe
  }

  type Patient {
	id: ID!,
	active: Boolean,
	sub: String!,
	title: String,
	firstName: String,
	lastName: String,
	email: String,
	phone: String,
	birthDate: Date,
	gender: Gender,
	pronouns: Pronouns,
	favoriteColor: StoryColor,
	language: String
  }

  type Clinician {
	id: ID!,
	sub: String!,
	active: Boolean,
	title: String,
	firstName: String,
	lastName: String,
	email: String,
	phone: String,
	gender: Gender,
	practiceAddress: String,
	specialty: String,
	NPI: String
  }

  type Story {
	id: ID!,
	patient: Patient!,
	primarySymptom: Symptom,
	associatedSymptoms: [Symptom],
	onset: FuzzyDate,
	text: String,
	draft: Boolean,
	createdDate: DateTime,
	updatedDate: DateTime,
	timeline: Timeline,
	reviewedBy: [Review],
	sharedWith: [Share],
	shareCode: [ShareCode]
  }

  type Timeline {
	id: ID!,
	symptom: Symptom,
	points: [Point],
	createdDate: DateTime,
	updatedDate: DateTime
  }

  type Review {
	id: ID!,
	clinician: Clinician,
	date: Date
  }

  type Share {
	_id: ID!,
	clinician: Clinician,
	date: Date
  }

  type ShareCode {
	id: ID!,
	code: String,
	creator: Patient,
	story: Story,
	created: DateTime
  }

  type FuzzyDate {
	id: ID!,
	date: DateTime,
	precision: String
  }

  type Point {
	id: ID!,
    x: FuzzyDate,
	y: Severity,
	comments: String
  }

  type Symptom {
	id: ID!,
	code: [String],
	title: String,
	description: String
  }

  input StoryInput {
    patientID: String!,
    symptom: String,
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
	getStoriesByPatient: [Story] @isPatient,
	getStoriesByClinician: [Story] @isClinician,
	getStoryByCode(code: String): Story,
	story(id: String): Story,
	patient(id: String): Patient,
	clinician(sub: String): Clinician
  }

  type Mutation {
	createStory(storyInput: StoryInput): Story @isPatient,
	updateStory(id: String, storyInput: StoryInput): Story,
	deleteStory(id: String): Boolean @isPatient,
    markStoryReviewed(id: String, clinician: String): Boolean @isClinician,
	shareStory(id: String, clinician: String): Boolean @isPatient,
	createShareCode(storyID: String): ShareCode
	createTimeline: Timeline,
	updateTimeline: Timeline,
	deleteTimeline: Timeline,
	createPatient(patientInput: PatientInput): Patient,
	updatePatient(patientInput: PatientInput): Patient,
	deletePatient(sub: String): Boolean,
	createClinician(clinicianInput: ClinicianInput): Clinician,
	updateClinician(clinicianInput: ClinicianInput): Clinician,
	deleteClinician(sub: String): Boolean
  }
`;
