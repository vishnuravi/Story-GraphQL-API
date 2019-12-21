import { gql } from "apollo-server-express";

export const typeDefs = gql`
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
    getStoriesByPatient: [Story]
    getStoriesByClinician: [Story]
    getStory(_id: String): Story
  }

  type Mutation {
    createStory(storyInput: StoryInput): Story
    deleteStory(_id: String): Boolean
    markStoryReviewed(_id: String, clinician: String): Boolean
    shareStory(_id: String, clinician: String): Boolean
  }
`;
