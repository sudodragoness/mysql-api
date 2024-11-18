exports.GET_ME_BY_ID = 'SELECT id, username, email FROM users WHERE id = ?'; // Don't return password

exports.GET_ME_BY_USERNAME = 'SELECT id, username, email FROM users WHERE username = ?'; // Don't return password

exports.GET_ME_BY_ID_WITH_PASSWORD = 'SELECT * FROM users WHERE id = ?'; 

exports.GET_ME_BY_USERNAME_WITH_PASSWORD = 'SELECT * FROM users WHERE username = ?';
