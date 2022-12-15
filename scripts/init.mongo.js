/*
 * Run using the mongo shell. For remote databases, ensure that the
 * connection string is supplied in the command line. For example:
 * localhost:
 *   mongo project scripts/init.mongo.js
 * 
 * Note: This file is un-used for current implementation. It can be integrated with frontend if necessary.
 */

db.users.remove({});
db.users.insertMany([
    {
        name: "m",
        email: "m@gmail.com",
        password: "m",
    },

    {
        name: "n",
        email: "n@gmail.com",
        password: "n",
    },

    {
        name: "o",
        email: "o@gmail.com",
        password: "o",
    },

]);


db.data.remove({});
db.data.insertMany([
    {
        user: "m@gmail.com",
        username: "m",
        plans:[],
        completed:[],
        allJournals:[]
      },

      {
        user: "n@gmail.com",
        username: "n",
        plans:[],
        completed:[],
        allJournals:[]
      },

      {
        user: "o@gmail.com",
        username: "o",
        plans:[],
        completed:[],
        allJournals:[]
      }



]);