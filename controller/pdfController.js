const fs = require('fs');
const pdfModel = require('../model/pdfModel');

// Controller to upload a PDF
exports.uploadPdf = async (req, res) => {
    try {
        // Access the uploaded file from req.file
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        const pdfData = file.buffer; // The binary data of the uploaded file
        const name = file.originalname; // The original file name

        // Save the PDF to the database
        await pdfModel.savePdf(name, pdfData);

        res.status(201).json({ message: 'PDF uploaded successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to upload PDF.' });
    }
};

// Controller to download a PDF
exports.downloadPdf = async (req, res) => {
    try {
        const { name } = req.params;

        // Retrieve PDF data from the database
        const pdfData = await pdfModel.getPdfByName(name);

        if (!pdfData) {
            return res.status(404).json({ error: 'PDF not found.' });
        }

        // Write to a file
        const filePath = `retrieved_${name}`;
        fs.writeFileSync(filePath, pdfData);

        res.download(filePath, () => {
            // Optionally delete the file after download
            fs.unlinkSync(filePath);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to download PDF.' });
    }
};

exports.deletePdf = async (req, res) => {
    try {
        const { name } = req.params; // Get the PDF file name from URL

        // Delete PDF from the database
        const result = await pdfModel.deletePdfByName(name);

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'PDF not found or already deleted' });
        }

        res.status(200).json({ message: 'PDF deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete PDF' });
    }
};