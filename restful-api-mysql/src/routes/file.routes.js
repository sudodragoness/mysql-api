const express = require('express');
const path = require('path');
const router = express.Router();
const upload = require('../controllers/file.controller').uploadFile;
const fileQueries = require('../queries/file.queries');

router.post('/upload', upload, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const file = req.file;
    const newFile = {
      filename: file.originalname,
      filepath: file.path,
      fileext: file.originalname ? path.extname(file.originalname) : '',
      filesize: file.size,
      user_id: req.user ? req.user.id : null,
    };
    const result = await fileQueries.createFile(newFile);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating file', error: err.message });
  }
});

module.exports = router;