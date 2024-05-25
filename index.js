
const express = require('express');
const path = require('path');
const fetch = require('node-fetch'); 
const { GoogleGenerativeAI } = require("@google/generative-ai"); 
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'public')));

require('dotenv').config();

app.post('/generate-text', async (req, res) => {

  const prompt = req.body.prompt;

  try {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    async function run() {
      const model = genAI.getGenerativeModel({ model: "gemini-pro"});
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      console.log(prompt);
      console.log(text);
      
      res.json({ generatedText: text }); 
    }

    await run();

  } catch (error) {
    console.error('Error generating text:', error);
    if (error instanceof fetch.FetchError) {
      res.status(500).json({ error: 'Failed to communicate with API' });
    } else {
      res.status(500).json({ error: 'Error generating text' });
    }
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
