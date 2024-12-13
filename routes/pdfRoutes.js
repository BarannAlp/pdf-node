const express = require('express');
const multer = require('multer');
const pdfController = require('../controller/pdfController');

// Configure Multer to store files in memory
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

// Use Multer middleware for /upload route
router.post('/upload', upload.single('pdf'), pdfController.uploadPdf);

router.get('/download/:name', pdfController.downloadPdf);

router.delete('/delete/:name', pdfController.deletePdf);

module.exports = router;
