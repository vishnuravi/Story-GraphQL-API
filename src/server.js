import "regenerator-runtime/runtime";

import express from "express";
import mongoose from "mongoose";

import { ApolloServer } from "apollo-server-express";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

require('dotenv').config();
const connectString = process.env.MONGODB_CONNECT_STRING;

// cognito variables
const userpoolID = "us-east-1_zJq0ibhEs";
const appClientID = "hpsb1ak8n8qieei3sveaq4075";

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

const options = {
	audience: `${appClientID}`,
	issuer: `https://cognito-idp.us-east-1.amazonaws.com/${userpoolID}`,
	algorithms: ["RS256"]
};

const run = async () => {
	const app = express();

	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: ({ req }) => {
			// get user token from header
			let token = req.headers.authorization;
			if (token.startsWith("Bearer ")) {
				token = token.slice(7, token.length).trimLeft();
			}

			// verify user token
			const user = new Promise((resolve, reject) => {
				jwt.verify(token, getKey, options, (err, decoded) => {
					if (err) return reject(err);
					resolve(decoded);
				});
			});

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
