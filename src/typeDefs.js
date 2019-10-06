import { gql } from "apollo-server-express";

export const typeDefs = gql`
  scalar Date
  scalar Time
  scalar DateTime
  type Story {
    _id: ID!
    owner: String!
    symptom: String
    text: String
    createdDate: DateTime
    timeline: [Coords]
    reviewedByUser: Boolean
  }
  type Coords {
    x: String
    y: Float
  }
  input StoryInput {
    owner: String!
    symptom: String
    text: String
  }
  type Query {
    getStories(user: String): [Story]
    getStory(_id: String): Story
  }
  type Mutation {
    createStory(storyInput: StoryInput): Story
    deleteStory(_id: String): Boolean
    markStoryReviewed(_id: String, reviewer: String): Boolean
  }
`;
