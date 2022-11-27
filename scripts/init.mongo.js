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
        customer_name: "rose",
        customer_email: "rose@gmail.com",
        customer_pass1: "r",
        customer_pass2: "r",
        nullError: false,   // check null inputs
        userError: false,   // check exist username
        emailError: false,  // check exist email
        passwordError: false // check different password
    },

]);