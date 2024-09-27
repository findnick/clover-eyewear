const express = require("express");
const routes = express.Router();

// Middlewares
const testing = require("../Middlewares/testing");

// @Image upload and eyeparameter checking

const { eyeChecking } = require("../Controllers/eye-parameter-checking");

// 1: File Uploading and Parameters checking
// This api handling fileUploading and parameter checking
// IF you want to just return data retrieved from the image, then remove the next() function and uncomment the
// line return res.status(200).json(req.eyeData); in testing middleware, this will return the data retreived from the image by GPT
routes.post("/", testing, eyeChecking);

module.exports = routes;
