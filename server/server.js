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

async function listData()
{
  const data = db.collection('data').find().toArray();
  return data;
}


const resolvers = {
  Query: {
    listUsers,
    listData
  },

};



const app = express();
const server = new ApolloServer({
  typeDefs: fs.readFileSync('./schema.graphql', 'utf-8'),
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
    await applyGraphql();
    await connectToDb();
    app.listen(4000, function () {
      console.log('API server started on port 4000');
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
})();