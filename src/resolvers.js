import Story from "./models/Story";
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from 'graphql-iso-date';

export const resolvers = {
  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime,
  Query: {
    stories: () => {
      return Story.find()
        .then(stories => {
          return stories.map(story => {
            return {...story._doc};
          })
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
    addReviewer: (_, args) => {
      return Story.updateOne(
       { _id: args._id },
       { $push: { reviewedBy: args.reviewer }}
      ).then(result => {
        return !!result.n;
      }).catch(err =>{
        throw(err);
      })
    }
  }
};
