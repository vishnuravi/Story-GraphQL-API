import "regenerator-runtime/runtime";

import express from "express";
import mongoose from "mongoose";

import { ApolloServer, AuthenticationError } from "apollo-server-express";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

import { validateToken } from "./validator";

require('dotenv').config();
const connectString = process.env.MONGODB_CONNECT_STRING;

// import custom schema directives
const IsPatientDirective = require('./directives/isPatient');
const IsClinicianDirective = require('./directives/isClinician');

// adddresses Mongoose deprecation warning with findOneAndUpdate()
//mongoose.set('useFindAndModify', false);


const run = async () => {
	const app = express();

	const server = new ApolloServer({
		typeDefs,
		resolvers,
		schemaDirectives: {
			isPatient: IsPatientDirective,
			isClinician: IsClinicianDirective
		  },
		context: async ({ req }) => {

			// verify token and create user object
			var user;
			try {
				let token = req.headers.authorization || '';
				if (token.startsWith("Bearer ")) {
					token = token.slice(7, token.length).trimLeft();
				}
				user = await validateToken(token);
			} catch (e){
				throw new AuthenticationError(e);
			}
			
			// if valid, add user object to the context
			return { user };
		
		},
	});

	server.applyMiddleware({ app });

	await mongoose.connect(connectString, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});

	app.listen({ port: process.env.PORT }, () =>
		console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`)
	);
};

run();
