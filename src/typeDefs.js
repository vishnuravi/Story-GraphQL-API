import { gql } from "apollo-server-express";

export const typeDefs = gql`
  directive @isPatient on FIELD_DEFINITION
  directive @isClinician on FIELD_DEFINITION

  scalar Date
  scalar Time
  scalar DateTime

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

  type Query {
    getStoriesByPatient: [Story] @isPatient
    getStoriesByClinician: [Story] @isClinician
    getStory(_id: String): Story
  }

  type Mutation {
    createStory(storyInput: StoryInput): Story @isPatient
    deleteStory(_id: String): Boolean @isPatient
    markStoryReviewed(_id: String, clinician: String): Boolean @isClinician
    shareStory(_id: String, clinician: String): Boolean @isPatient
  }
`;
