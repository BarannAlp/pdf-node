const asyncHandler = require("express-async-handler");
const pdfDetail = require("../model/PdfDetails"); // Assuming you have a model for saving PDF details
const path = require("path");
const fs = require("fs");

const pdfDetailsCtrl = {
  uploadFile: asyncHandler(async (req, res) => {
    const { title,heading } = req.body; // Access the title from req.body
    const file = req.file; // Access the uploaded file from req.file

    if (!file) {
      return res.status(400).json({ status: "error", message: "No file uploaded" });
    }

    try {
      // Save the PDF details to the database
      await pdfDetail.create({
        heading: heading,
        title: title,
        pdf: file.filename, // Save the file name or path as needed
      });
      
      res.status(200).json({ status: "ok", message: "File uploaded successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", message: "File upload failed" });
    }
  }),

  deleteFile: asyncHandler(async (req, res) => {
    const { id } = req.params; // Get the file ID from the request parameters
  
    try {
      // Find the record in the database
      console.log(id)
      const detail = await pdfDetail.findById(id); // Assuming you're using Mongoose
  
      if (!detail) {
        return res.status(404).json({ status: "error", message: "File not found" });
      }
  
      const filePath = path.join(__dirname, '..', 'uploads', detail.pdf); // Construct file path
  
      // Delete the file from the file system
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('File deletion error:', err);
          return res.status(500).json({ status: "error", message: "File deletion failed" });
        }
      });
  
      // Delete the record from the database
      await pdfDetail.findByIdAndDelete(id);
  
      res.status(200).json({ status: "ok", message: "File and record deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", message: "File deletion failed" });
    }
  }),

  getFiles: asyncHandler(async (req, res) => {
    try {
      pdfDetail.find({}).then((data) => {
        res.send({ status: "ok", data: data });
      });
    } catch (error) {}
  }),

  getFilesByHeading: asyncHandler(async (req, res) => {
    const { heading } = req.params;
    try {

      // Check if heading is provided
      if (!heading) {
          return res.status(400).send({ status: "error", message: "Heading parameter is required." });
      }

      // Fetch the data from the pdfDetail collection where heading matches
      const data = await pdfDetail.find({ heading });

      // Check if any data was found
      if (data.length === 0) {
          return res.status(404).send({ status: "error", message: "No documents found with the specified heading." });
      }

      // Send the response with status and data
      res.send({ status: "ok", data });
  } catch (error) {
      // Handle errors appropriately
      console.error(error);
      res.status(500).send({ status: "error", message: "An error occurred while fetching files." });
  }
  }),

  getFile: asyncHandler(async (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, "../uploads", filename); // Construct the full file path
console.log(filename)
    // Check if the file exists
    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        return res.status(404).json({ status: "error", message: "File not found" });
      }

      // Set headers and send the file
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
      res.sendFile(filePath);
    });
  }),

};

module.exports = pdfDetailsCtrl;
