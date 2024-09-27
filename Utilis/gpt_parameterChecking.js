const axios = require("axios");

const apiKey = process.env.GPT_API_KEY;

const gpt_prompt = async (eyedata) => {
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
      you will receive that type of data, just you are required to run test case like :
   
      1: Sphere: Greater than -12.00 to OR greater than +3.00
      2: Cylinder: >= -2.00
      3: Value difference between OS and OD Sphere: >= +/-3.00

      if any of these conditions meet, then you are require to return data like this
      {
status: Fail,
Field: Sphere
Reason: Greater than -12.00
}

if not any of those condition meet, then just return

                    {
testCase:'pass'}

      you are required to return to fetch data from the image, and just return me json object like this , without any extra text

      Here is the data: ${eyedata}
                        `,
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
