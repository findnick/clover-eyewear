const gpt_parameterChecking = require("../Utilis/gpt_parameterChecking");

const eyeChecker = (req, res) => {
  console.log("------------From Controller---------");
  return res.status(200).json({
    sphere: req.spheres,
    cylinder: req.cylinders,
    difference: req.difference,
  });
};

const eyeChecking = async (req, res) => {
  try {
    const eyeData = req.eyeData;
    const data = await gpt_parameterChecking(eyeData);
    req.finalData = data;
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = { eyeChecker, eyeChecking };
