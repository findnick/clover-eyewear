const express = require("express");
const app = express();
const multer = require("multer");
const cors = require("cors");
require("dotenv").config();

app.use(express.json({ extended: false }));
app.use(cors());

// File Upload
// Define storage with a custom filename function
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the destination folder
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    // Use the original filename or add logic to rename
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// API for EYE
app.use(
  "/api/eye",
  upload.single("image"),
  require("./Routes/eye-parameter-checking")
);

app.listen(8080, () => {
  console.log("Server Running on Port 8080");
});
