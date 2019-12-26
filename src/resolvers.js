import Story from "./models/Story";
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from "graphql-iso-date";
import { AuthenticationError } from "apollo-server-express";

export const resolvers = {
  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime,

  Query: {
    // get a single story by id
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
    createStory: (_, args) => {
      const story = new Story({
        patient: args.storyInput.patient,
        symptom: args.storyInput.symptom,
        text: args.storyInput.text,
        createdDate: Date.now()
      });
      return story
        .save()
        .then(result => {
          return { ...result._doc };
        })
        .catch(err => {
          throw err;
        });
    },

    deleteStory: (_, args) => {
      return Story.deleteOne({ _id: args._id })
        .then(result => {
          return !!result.n;
        })
        .catch(err => {
          throw err;
        });
    },

    markStoryReviewed: (_, args) => {
      return Story.updateOne(
        { _id: args._id },
        { $addToSet: { reviewedBy: args.clinician } }
      )
        .then(result => {
          return !!result.nModified;
        })
        .catch(err => {
          throw err;
        });
    },

    shareStory: (_, args) => {
      return Story.updateOne(
        { _id: args._id },
        { $addToSet: { sharedWith: args.clinician } }
      )
        .then(result => {
          return !!result.nModified;
        })
        .catch(err => {
          throw err;
        });
    }
  }
};
