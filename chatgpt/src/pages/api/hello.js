// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;

const configuration = new Configuration({
  organization: "************",
  apiKey: "************",
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${message}`,
      max_tokens: 100,
      temperature: 0,
    });
    console.log(response.data);

    if (response.data.choices[0].text) {
      res.json({ message: response.data.choices[0].text });
    }
  } else {
    // Handle any other HTTP method
  }
  res.end();
}
