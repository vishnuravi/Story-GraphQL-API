import Story from "./models/Story";
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from 'graphql-iso-date';

export const resolvers = {
  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime,
  Query: {
    getStories: (_, args, { user }) => {
      return Story.find().sort( { createdDate: -1 })
        .then(stories => {
          return stories.map(story => {
            let isReviewed = story._doc.reviewedBy.includes(args.user);
            return {...story._doc, reviewedByUser: isReviewed};
          });
        })
          .catch(err => {
            throw err;
          })
        },
    getStory: (_, args) => {
      return Story.findOne({ _id: args._id })
      .then(result => {
          return {...result._doc}
      }).catch(err => {
        throw(err);
      });
    }
  },
  Mutation: {
    createStory: (_, args) => {
      const story = new Story({ 
        owner: args.storyInput.owner, 
        symptom: args.storyInput.symptom,
        text: args.storyInput.text,
        createdDate: Date.now()
      });
      return story.save()
      .then(result => {
        return {...result._doc}
      }).catch(err => {
        throw err;
      });
    },
    deleteStory: (_, args) => {
      return Story.deleteOne({_id: args._id})
      .then(result => {
        return !!result.n;
      }).catch(err =>{
        throw(err);
      });
    },
    markStoryReviewed: (_, args) => {
      return Story.updateOne(
       { _id: args._id },
       { $addToSet: { reviewedBy: args.reviewer }}
      ).then(result => {
        return !!result.nModified;
      }).catch(err =>{
        throw(err);
      });
    },
    shareStory: (_, args) => {
      return Story.updateOne(
        { _id: args._id },
        { $addToSet: { sharedWith: args.clinician }}
      ).then(result =>{
        return !!result.nModified;
      }).catch(err => {
        throw(err);
      })
    }
  }
};
