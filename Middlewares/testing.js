const gpt_prompt = require("../Utilis/gpt_prompt");

const testing = async (req, res, next) => {
  console.log("The File is: ", req.file);
  if (!req.file) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  try {
    console.log("Data settled");
    console.log("Image Name: ", req.file.originalname);
    const data = await gpt_prompt(req.file.originalname);
    req.eyeData = data;
    // return res.status(200).json(req.eyeData);
    next();
  } catch (processingError) {
    return res.status(500).json({ error: "Error processing image" });
  }
};

module.exports = testing;
