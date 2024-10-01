const mongoose = require("mongoose");

const PdfDetailsSchema = new mongoose.Schema(
  {
    heading: String,
    pdf: String,
    title: String,
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("PdfDetails", PdfDetailsSchema);