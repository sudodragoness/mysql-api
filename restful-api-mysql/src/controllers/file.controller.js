// controllers/file.controller.js
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const fileQueries = require('../queries/file.queries');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

exports.uploadFile = upload.single('file');

exports.getFiles = async (req, res) => {
  try {
    const files = await fileQueries.getFiles();
    res.json(files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error getting files' });
  }
};

exports.getFile = async (req, res) => {
  try {
    const fileId = req.params.id;
    const file = await fileQueries.getFile(fileId);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
    res.json(file);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error getting file' });
  }
};

exports.updateFile = async (req, res) => {
  try {
    const fileId = req.params.id;
    const file = await fileQueries.getFile(fileId);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
    const updatedFile = {
      filename: req.body.filename || file.filename,
      filepath: req.body.filepath || file.filepath,
      fileext: req.body.fileext || file.fileext,
      filesize: req.body.filesize || file.filesize,
      user_id: req.user.id,
    };
    const result = await fileQueries.updateFile(fileId, updatedFile);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating file' });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const fileId = req.params.id;
    const file = await fileQueries.getFile(fileId);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
    await fileQueries.deleteFile(fileId);
    fs.unlinkSync(file.filepath);
    res.json({ message: 'File deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting file' });
  }
};