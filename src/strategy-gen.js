const { Configuration, OpenAIApi } = require('openai');
const { apiKey } = require('../config/openai-config');

const configuration = new Configuration({
  apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

async function generateStrategy(data) {
  try {
    const formattedData = JSON.stringify(data.slice(-10));  // Use the last 10 data points to generate the strategy

    const response = await openai.createCompletion({
      model: 'gpt-4',
      prompt: `Based on the following historical data, generate a trading strategy in JSON format:
        Data: ${formattedData}
        Strategy Format: {
          "buyCondition": "condition for buying",
          "sellCondition": "condition for selling"
        }`,
      max_tokens: 150,
    });

    const strategy = JSON.parse(response.data.choices[0].text);
    return strategy;
  } catch (error) {
    console.error('Error generating strategy:', error);
    return null;
  }
}

module.exports = generateStrategy;
