const mysql = require('mysql2');
const queries = require('./queries/social.queries');

// Get the Host from environment variable
const host = process.env.DB_HOST || 'localhost';

// Get the User from environment variable
const user = process.env.DB_USER || 'root';

// Get the Password from environment variable
const password = process.env.DB_PASSWORD || '1qaz!QAZ2wsx@WSX';

// Get the Database from environment variable
const database = process.env.DB_DATABASE || 'classapp';

// Create a connection to the database
const con = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database,
});

// Connect to the database
con.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
    con.query(queries.CREATE_SOCIAL_MEDIA_ACCOUNTS_TABLE, (err, result) => {
        if (err) throw err;
        console.log('Table created');
    });
});

module.exports = con;