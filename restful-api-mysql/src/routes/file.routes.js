const express = require('express');
const multer = require('multer');
const router = express.Router();
const fileQueries = require('../queries/file.queries');

const upload = multer({
    dest: './uploads/', // upload directory
    limits: { fileSize: 1000000 }, // 1MB file size limit
});

router.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).send({ message: 'No file uploaded' });
    }
    // Call the function that handles the metadata/file information
    fileQueries.saveFileMetadata(req.file, (err, result) => {
      if (err) {
        return res.status(500).send({ message: 'Error saving file metadata' });
      }
      const fileUrl = `http://localhost:4000/uploads/${req.file.filename}`;
      res.send({ message: 'File uploaded successfully', file: req.file, url: fileUrl });
    });
});
module.exports = router;
