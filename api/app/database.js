//Pooling

const { Pool }  = require('pg');

const db = new Pool({
    connectionString: process.env.PG_URL,
    // ssl: {
    //     rejectUnauthorized: false
    // }
});


console.log("connection to db sucessful");

module.exports = db;