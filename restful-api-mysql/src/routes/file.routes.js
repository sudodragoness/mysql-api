// file.routes.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const upload = require('../controllers/file.controller').uploadFile;
const fileQueries = require('../queries/file.queries');
const verifyToken = require('../middleware/auth.middleware'); // Middleware for authentication

// Upload Route (protected)
router.post('/upload', verifyToken, upload, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const file = req.file;
    const newFile = {
      fileName: file.originalname,
      filePath: `/uploads/${file.filename}`, // Public URL to access the file
      fileExt: path.extname(file.originalname),
    };

    console.log('Attempting to create file in database:', newFile);

    const result = await fileQueries.createFile(newFile);
    console.log('File created in database:', result);

    // Return the URL so the client can use it
    res.json({
      url: newFile.filePath, // Return the file URL
    });
  } catch (err) {
    console.error('Error during file upload:', err);
    res.status(500).json({ message: 'Error creating file', error: err.message });
  }
});

// Public Route to retrieve all files
router.get('/', (req, res) => {
  const uploadsDir = path.join(__dirname, '../uploads');
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error retrieving files' });
    }
    // Map files to public URLs
    const filePaths = files.map(file => `/uploads/${file}`);
    res.json(filePaths); // Return the file paths as a JSON array
  });
});

// DELETE Route to delete a file (protected)
router.delete('/:fileName', verifyToken, async (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, `../uploads/${fileName}`);

  try {
    // Check if the file exists before attempting to delete
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.log('File not found:', filePath);
        return res.status(404).json({ message: 'File not found' });
      }

      // Asynchronous delete to avoid blocking event loop
      fs.unlink(filePath, async (unlinkErr) => {
        if (unlinkErr) {
          console.error('Error deleting file:', unlinkErr);
          return res.status(500).json({ message: 'Error deleting file from filesystem' });
        }

        console.log('File deleted from filesystem:', filePath);

        try {
          // Delete the corresponding entry from the database
          await fileQueries.deleteFile(fileName);  // Ensure this method works correctly
          console.log('File deleted from database:', fileName);

          res.status(200).json({ message: 'File deleted successfully' });  // Send response once everything is done
        } catch (err) {
          console.error('Error deleting file from database:', err);
          res.status(500).json({ message: 'Error deleting file from database' });
        }
      });
    });
  } catch (err) {
    console.error('Error during delete:', err);
    res.status(500).json({ message: 'Error deleting file', error: err.message });
  }
});

module.exports = router;
