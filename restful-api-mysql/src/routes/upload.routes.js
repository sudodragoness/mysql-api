// const express = require('express');
// const multer = require('multer');
// const router = express.Router();

// const upload = multer({
//   dest: './uploads/', // upload directory
//   limits: { fileSize: 1000000 }, // 1MB file size limit
// });

// router.post('/upload', upload.array('artFiles', 12), (req, res) => {
//   // req.files is an array of uploaded files
//   const files = req.files;

//   // Process the uploaded files
//   files.forEach((file) => {
//     // Get the file name and path
//     const fileName = file.originalname;
//     const filePath = file.path;

//     // Process the file (e.g., resize, compress, etc.)
//     // Get the file extension
//     const fileExt = fileName.split('.').pop();

//     // Only process image files
//     if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff'].includes(fileExt)) {
//       // Resize the image to 500x500
//       require('child_process').execSync(`mogrify -resize 500x500 "${filePath}"`);
//     }

//     // Save the processed file to the file system
//     const fs = require('fs');
//     const newPath = `./uploads/${fileName}`;
//     fs.rename(filePath, newPath, (err) => {
//       if (err) {
//         console.error(err);
//         return;
//       }
//     });
//   });

//   // Return a JSON response to the client
//   res.json({ message: 'Files uploaded successfully!' });
// });

// module.exports = router;