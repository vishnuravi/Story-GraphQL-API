import "regenerator-runtime/runtime";

import express from "express";
import mongoose from "mongoose";

import { ApolloServer, AuthenticationError } from "apollo-server-express";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

require('dotenv').config();
const connectString = process.env.MONGODB_CONNECT_STRING;

// cognito variables
const userpoolID = "us-east-1_zJq0ibhEs";
const webClientID = "hpsb1ak8n8qieei3sveaq4075";
const iOSClientID = "36h0h07bo8qa917dndm1ap4j5";

const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

const client = jwksClient({
	jwksUri: `https://cognito-idp.us-east-1.amazonaws.com/${userpoolID}/.well-known/jwks.json`
});

function getKey(header, cb) {
	client.getSigningKey(header.kid, function(err, key) {
		var signingKey = key.publicKey || key.rsaPublicKey;
		cb(null, signingKey);
	});
}

function validateToken(token){
	return new Promise((resolve, reject) => {
		jwt.verify(token, getKey, options, (err, decoded) => {
			if (err) return reject(err);
			resolve(decoded);
		});
	});
}

const options = {
	audience: [webClientID, iOSClientID],
	issuer: `https://cognito-idp.us-east-1.amazonaws.com/${userpoolID}`,
	algorithms: ["RS256"]
};

const run = async () => {
	const app = express();

	const server = new ApolloServer({
		typeDefs,
		resolvers,
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

			// if valid, add user to the context
			return { user };
		
		},
	});

	server.applyMiddleware({ app });

	await mongoose.connect(connectString, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});

	app.listen({ port: 4000 }, () =>
		console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
	);
};

run();
