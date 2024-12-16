const mysql = require('mysql2');

// Create a connection to the database
const con = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '1qaz!QAZ2wsx@WSX',
    database: process.env.DB_DATABASE || 'classapp',
});

// Export the connection so it can be used in query files
module.exports = con;
