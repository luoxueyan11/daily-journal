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

async function addUser(_, {user})
{
  const result = await db.collection('users').insertOne(user);
  const newUser = await db.collection('users').findOne({ _id: result.insertedId })
  return newUser;
}

async function addData(_, {data})
{
  const result = await db.collection('data').insertOne(data);
  const newData = await db.collection('data').findOne({ _id: result.insertedId })
  return newData;
}

async function updateData(_, {email, field, data})
{
  const result = await db.collection('data').updateOne(
    {user: email},
    {
      $set:
      {
        "plan":data
      }
    }
  );
  if (result.upsertedId) {
    return true;
  } else {
    return false;
  }
}

const resolvers = {
  Query: {
    listUsers,
    listData
  },
  Mutation: {
    addUser,
    addData,
    updateData
  }
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