// controllers/file.controller.js
const path = require('path');
const Joi = require('joi');
const multer = require('multer');
const fs = require('fs');
const fileQueries = require('../queries/file.queries');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/');
    fs.mkdirSync(uploadPath, { recursive: true }); // Ensure directory exists
    cb(null, uploadPath);
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

const isDev = process.env.NODE_ENV === 'development'; // Check environment

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
    res.status(500).json({
      message: 'Error getting file',
      ...(isDev && { error: err.message }), // Include error details in development mode
    });
  }
};

// Define a validation schema for updating files
const updateFileSchema = Joi.object({
  filename: Joi.string().optional(),
  filepath: Joi.string().optional(),
  fileext: Joi.string().optional(),
  filesize: Joi.number().optional(),
});

exports.updateFile = async (req, res) => {
  try {
    const fileId = req.params.id;
    // Validate the incoming data
    const validation = updateFileSchema.validate(req.body);
    if (validation.error) {
      return res.status(400).json({ message: validation.error.details[0].message });
    }

    // Fetch the existing file metadata
    const file = await fileQueries.getFile(fileId);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Merge new data with existing file metadata
    const updatedFile = {
      ...file,
      ...req.body,
    };

    // Update the file in the database
    const result = await fileQueries.updateFile(fileId, updatedFile);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating file' });
  }
};

// Controller function to delete a file
exports.deleteFile = async (req, res) => {
  try {
    const fileName = req.params.fileName; // Extract file name from request params
    const file = await fileQueries.getFileByFileName(fileName); // Fetch file metadata by filename
    
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Delete the file from the database
    await fileQueries.deleteFile(fileName);  // Wait for the deletion from the database

    // Attempt to delete the physical file
    const filePath = path.join(__dirname, `../uploads/${fileName}`);
    try {
      await fs.promises.unlink(filePath);  // Use fs.promises for better async handling
    } catch (unlinkErr) {
      console.warn(`Failed to delete file at ${filePath}:`, unlinkErr);
    }

    res.json({ message: 'File deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting file', error: err.message });
  }
};
