/*
This file is un-used for current implementation. It can be integrated with frontend if necessary.
*/

const fs = require('fs');
const express = require('express');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { MongoClient } = require('mongodb');

let db;//Variable that points to the real DB.



async function listUsers()
{
  const users = db.collection('users').find().toArray();
  return users;
}


const resolvers = {
  Query: {
    listUsers
  },

};



const app = express();
const server = new ApolloServer({
  typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
});



async function applyGraphql() {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
}


async function connectToDb() {
	  const url = 'mongodb://localhost/project';
	  const client = new MongoClient(url, { useNewUrlParser: true });
	  await client.connect();
	  console.log('Connected to project MongoDB at', url);
	  db = client.db();
}

(async function () {
  try {
    await connectToDb();
    app.listen(4000, function () {
      console.log('API server started on port 4000');
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
})();