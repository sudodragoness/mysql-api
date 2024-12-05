const express = require('express');
const multer = require('multer');
const router = express.Router();
const fileQueries = require('../queries/file.queries');

const upload = multer({
  dest: './uploads/', // upload directory
  limits: { fileSize: 1000000 }, // 1MB file size limit
});

// Handle /upload route
router.post('/upload', upload.array('artFiles', 12), (req, res) => {
  try {
    // req.files is an array of uploaded files
    const files = req.files;

    // Process the uploaded files
    files.forEach((file) => {
      // Get the file name and path
      const fileName = file.originalname;
      const filePath = file.path;

      // Process the file (e.g., resize, compress, etc.)
      // Get the file extension
      const fileExt = fileName.split('.').pop();

      // Only process image files
      if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff'].includes(fileExt)) {
        // Resize the image to 500x500
        require('child_process').execSync(`mogrify -resize 500x500 "${filePath}"`);
      }

      // Save the processed file to the file system
      const fs = require('fs');
      const newPath = `./uploads/${fileName}`;
      fs.rename(filePath, newPath, (err) => {
        if (err) {
          throw err;
        }
      });

      // Save the file metadata to the database
      const fileMetadata = {
        fileName,
        filePath: newPath,
        fileExt,
      };

      fileQueries.addFile(fileMetadata, (err, results) => {
        if (err) {
          throw err;
        }

        console.log(`File metadata saved to database: ${fileName}`);
      });
    });

    // Return a JSON response to the client
    res.json({ message: 'Files uploaded and metadata saved to database!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error uploading files' });
  }
});

module.exports = router;