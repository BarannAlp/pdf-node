const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/users");
const pdfDetailsRouter = require("./routes/pdfDetails");
const accordionItemsRouter = require("./routes/accordionItems");
const errorHandler = require("./middlewares/errorHandler");
const cors = require('cors');


const corsOptions = {
  origin: ['http://localhost:3000', 'https://pdf-node-seven.vercel.app', 'https://yurtcim-talimat-yonetim.vercel.app'], // Add the correct origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // If you are using cookies or authentication, enable credentials
};

// Use CORS with the options
const app = express();
app.use(cors(corsOptions));
app.use(express.json());

//! Connect to mongodb
mongoose
  .connect("mongodb+srv://yurtcim:yurtcim@yurtcim.vuqrf.mongodb.net/?retryWrites=true&w=majority&appName=yurtcim")
  .then(() => console.log("Db connected successfully"))
  .catch((e) => console.log(e));
  const multer = require("multer");

//! Middlewares
app.use(express.json()); //pass incoming json data from the user
//!Routes
app.use("/", pdfDetailsRouter);
app.use("/", accordionItemsRouter);
app.use("/", userRouter);
//!error handler
app.use(errorHandler);
//! Start the server
const PORT = 8000;
app.listen(PORT, console.log(`Server is up and running`));
