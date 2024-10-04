const mongoose = require("mongoose");

const PdfDetailsSchema = new mongoose.Schema(
  {
    heading: String,
    pdfUrl: String,
    title: String,
    filePath:String
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("PdfDetails", PdfDetailsSchema);