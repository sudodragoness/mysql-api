const db = require('../db-config');

exports.CREATE_FILES_TABLE = `CREATE TABLE IF NOT EXISTS files (
        id INT NOT NULL AUTO_INCREMENT,
        filename VARCHAR(255) NOT NULL,
        filepath VARCHAR(255) NOT NULL,
        fileext VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
    )`;

/**
 * Inserts a new file into the database.
 * @param {Object} file - The file metadata.
 */
exports.addFile = (file, callback) => {
  const query = 'INSERT INTO files (filename, filepath, fileext) VALUES (?, ?, ?)';
  const values = [file.fileName, file.filePath, file.fileExt];
  db.query(query, values, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

/**
 * Retrieves a file by its ID from the database.
 * @param {Number} id - The file ID.
 */
exports.getFileById = (id, callback) => {
  const query = 'SELECT * FROM files WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

/**
 * Retrieves all files from the database.
 */
exports.getFiles = (callback) => {
  const query = 'SELECT * FROM files';
  db.query(query, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

/**
 * Updates a file in the database.
 * @param {Object} file - The file metadata.
 * @param {Number} id - The file ID.
 */
exports.updateFile = (file, id, callback) => {
  const query = 'UPDATE files SET filename = ?, filepath = ?, fileext = ? WHERE id = ?';
  const values = [file.fileName, file.filePath, file.fileExt, id];
  db.query(query, values, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

/**
 * Deletes a file from the database.
 * @param {Number} id - The file ID.
 */
exports.deleteFile = (id, callback) => {
  const query = 'DELETE FROM files WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};