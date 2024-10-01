const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/users");
const pdfDetailsRouter = require("./routes/pdfDetails");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
//! Connect to mongodb
mongoose
  .connect("mongodb+srv://barannalp:barannalp@cluster0.rkumy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/auth-api")
  .then(() => console.log("Db connected successfully"))
  .catch((e) => console.log(e));
  const multer = require("multer");

//! Middlewares
app.use(express.json()); //pass incoming json data from the user
//!Routes
app.use("/", pdfDetailsRouter);
//!error handler
app.use(errorHandler);
//! Start the server
const PORT = 8000;
app.listen(PORT, console.log(`Server is up and running`));
