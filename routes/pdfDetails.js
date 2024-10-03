const express = require("express");
const pdfDetailsCtrl = require("../controller/pdfDetails");
const upload = require("../middlewares/multer"); // Assuming you have saved the multer setup in middleware/multer.js
const isAuthenticated = require("../middlewares/isAuth");

const router = express.Router();

//!Register
router.post("/api/pdfDetails/uploadFile", upload.single("file"), pdfDetailsCtrl.uploadFile);
router.post("/api/pdfDetails/deleteFile/:id", pdfDetailsCtrl.deleteFile);
router.get("/api/pdfDetails/getFiles", pdfDetailsCtrl.getFiles);
router.get("/api/pdfDetails/files/:filename", pdfDetailsCtrl.getFile);
router.get("/api/pdfDetails/getFilesByHeading/:heading", pdfDetailsCtrl.getFilesByHeading);

module.exports = router;
