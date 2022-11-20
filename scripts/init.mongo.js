/*
 * Run using the mongo shell. For remote databases, ensure that the
 * connection string is supplied in the command line. For example:
 * localhost:
 *   mongo project scripts/init.mongo.js
 */

db.users.remove({});


db.users.insertMany([
    {email:"jack@gmail.com", password:"password", firstName:"Jack", lastName:"Smith"},
    {email:"rose@gmail.com", password:"password", firstName:"Rose", lastName:"Evans"}
]);