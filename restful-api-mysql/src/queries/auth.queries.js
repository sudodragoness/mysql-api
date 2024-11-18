exports.CREATE_USERS_TABLE = `CREATE TABLE IF NOT EXISTS users (
        id INT NOT NULL AUTO_INCREMENT,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
    )`;

exports.INSERT_NEW_USER = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

exports.UPDATE_USER = 'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?';