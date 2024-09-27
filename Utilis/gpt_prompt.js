const fs = require("fs");
const path = require("path");
const axios = require("axios");

const apiKey = process.env.GPT_API_KEY;

const gpt_prompt = async (imageName) => {
  console.log("The image name is: ", imageName);

  const encodeImage = (imagePath) => {
    const imageBuffer = fs.readFileSync(imagePath);
    return imageBuffer.toString("base64");
  };

  const imagePath = path.join(__dirname, "../uploads/", imageName);

  const base64Image = encodeImage(imagePath);
  console.log("IAMGE ECONDED: ", base64Image);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  const payload = {
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `
                        return me response in JSON format only, without any extra text, for the required here is the dummy data:
                    {
                    key:"2",
                    name:'OD',
                    sphere:"+0.50",
                    cylinder:"0.00",
                    axis:"0",
                    pd:"30.5"
                    },
                    {
                    key:"1",
                    name:"OS",
                    sphere:"+0.50",
                    cylinder:"-0.25",
                    axis:"180",
                    pd:"30.0"
                    }
                    keys remain same as in the demo object, but data can be changed for given image, and important thing that if there is any missing field in the current image then set that field value to 0.
      you are required to return to fetch data from the image, and just return me json object like this , without any extra text
                        `,
          },
          {
            type: "image_url",
            image_url: {
              url: `data:image/jpg;base64,${base64Image}`,
            },
          },
        ],
      },
    ],
    max_tokens: 300,
  };

  const fetchOpenAIResponse = async () => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        payload,
        { headers }
      );
      var messageContent = response.data.choices[0].message.content;
      messageContent = messageContent.replace(/```json\n([\s\S]*?)\n```/, "$1");
      messageContent = messageContent.replace(/```([\s\S]*?)```/, "$1");

      console.log("Message Content:", messageContent);
      return JSON.parse(messageContent);
      // console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
      return error;
    }
  };

  // Execute the function
  const data = await fetchOpenAIResponse();

  return data;
};

module.exports = gpt_prompt;
