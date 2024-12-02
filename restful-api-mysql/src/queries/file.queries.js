const db = require('../db-config');

exports.CREATE_FILES_TABLE = `CREATE TABLE IF NOT EXISTS files (
        id INT NOT NULL AUTO_INCREMENT,
        filename VARCHAR(255) NOT NULL,
        filetype VARCHAR(255) NOT NULL,
        filesize INT NOT NULL,
        user_id INT NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (user_id) REFERENCES users(id)
    )`;

/**
 * Inserts a new file into the database.
 * @param {String} filename - The file name.
 * @param {String} filetype - The file type.
 * @param {Number} filesize - The file size in bytes.
 * @param {Number} user_id - The user ID.
 */
exports.INSERT_NEW_FILE = 'INSERT INTO files (filename, filetype, filesize, user_id) VALUES (?, ?, ?, ?)';

/**
 * Retrieves a file by its ID from the database.
 * @param {Number} id - The file ID.
 */
exports.GET_FILE_BY_ID = 'SELECT * FROM files WHERE id = ?';

/**
 * Retrieves all files for a user by their user ID from the database.
 * @param {Number} user_id - The user ID.
 */
exports.GET_FILES_BY_USER_ID = 'SELECT * FROM files WHERE user_id = ?';

/**
 * Updates a file in the database.
 * @param {String} filename - The file name.
 * @param {String} filetype - The file type.
 * @param {Number} filesize - The file size in bytes.
 * @param {Number} id - The file ID.
 */
exports.UPDATE_FILE = 'UPDATE files SET filename = ?, filetype = ?, filesize = ? WHERE id = ?';

/**
 * Deletes a file from the database.
 * @param {Number} id - The file ID.
 */
exports.DELETE_FILE = 'DELETE FROM files WHERE id = ?';

/**
 * Saves file metadata to the database.
 * @param {Object} file - The file metadata.
 * @param {Number} user_id - The user ID.
 * @param {Function} callback - The callback function.
 */
exports.saveFileMetadata = (file, user_id, callback) => {
  const query = exports.INSERT_NEW_FILE;
  const values = [file.originalname, file.mimetype, file.size, user_id];
  db.query(query, values, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};