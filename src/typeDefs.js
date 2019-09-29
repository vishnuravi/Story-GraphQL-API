import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Story {
    _id: ID!
    owner: String!
    symptom: String
    text: String
    createdDate: String
  }
  input StoryInput {
    owner: String!,
    text: String
  }

  type Query {
    stories: [Story]!
    getStory(_id: String): Story
  }
  type Mutation {
    createStory(storyInput: StoryInput): Story
    deleteStory(_id: String): Boolean
  }
`;
