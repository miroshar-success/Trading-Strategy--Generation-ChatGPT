const { Configuration, OpenAIApi } = require('openai');
const { apiKey } = require('../config/openai-config');

const configuration = new Configuration({
  apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

async function generateStrategy() {
  try {
    const response = await openai.createCompletion({
      model: 'gpt-4',
      prompt: `Generate a simple trading strategy in the following format:
        {
          "buyCondition": "condition for buying",
          "sellCondition": "condition for selling"
        }`,
      max_tokens: 100,
    });
    const strategy = JSON.parse(response.data.choices[0].text);
    return strategy;
  } catch (error) {
    console.error('Error generating strategy:', error);
    return null;
  }
}

module.exports = generateStrategy;
