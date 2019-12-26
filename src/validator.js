//settings from .env
require('dotenv').config();

// cognito variables
const userpoolID = process.env.COGNITO_USERPOOLID;
const webClientID = process.env.COGNITO_WEBCLIENTID;
const iOSClientID = process.env.COGNITO_IOSCLIENTID;

const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

const client = jwksClient({
	jwksUri: `https://cognito-idp.us-east-1.amazonaws.com/${userpoolID}/.well-known/jwks.json`
});

const options = {
	audience: [webClientID, iOSClientID],
	issuer: `https://cognito-idp.us-east-1.amazonaws.com/${userpoolID}`,
	algorithms: ["RS256"]
};

const getKey = (header, cb) => {
	client.getSigningKey(header.kid, function(err, key) {
		var signingKey = key.publicKey || key.rsaPublicKey;
		cb(null, signingKey);
	});
}

const validateToken = (token) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, getKey, options, (err, decoded) => {
			if (err) return reject(err);
			resolve(decoded);
		});
	});
}

exports.validateToken = validateToken;