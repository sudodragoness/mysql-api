const db = require('../db-config'); // db is the MySQL connection object


exports.CREATE_FILES_TABLE = `CREATE TABLE IF NOT EXISTS files (
        id INT NOT NULL AUTO_INCREMENT,
        filename VARCHAR(255) NOT NULL,
        filepath VARCHAR(255) NOT NULL,
        fileext VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
    )`;
db.query(exports.CREATE_FILES_TABLE, (err, result) => {
    if (err) {
        console.error('Error creating Files table:', err);
        throw err;
    }
    console.log('Files Table created or exists already');
});
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
exports.getFiles = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM files';
    db.query(query, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
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
// Modify deleteFile to return a Promise instead of using a callback
exports.deleteFile = (fileName) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM files WHERE filename = ?';
    db.query(query, [fileName], (err, result) => {
      if (err) {
        console.error(err);
        reject(err); // Reject the promise if an error occurs
      } else {
        resolve(result); // Resolve the promise with the result
      }
    });
  });
};


/**
 * Creates a new file in the database.
 * @param {Object} file - The file metadata.
 */
exports.createFile = (file) => {
  return new Promise((resolve, reject) => {
      const query = 'INSERT INTO files (filename, filepath, fileext) VALUES (?, ?, ?)';
      const values = [file.fileName, file.filePath, file.fileExt];
      db.query(query, values, (err, result) => {
          if (err) reject(err);
          else resolve(result);
      });
  });
};
