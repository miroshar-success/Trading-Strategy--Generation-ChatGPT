const axios = require('axios');

async function fetchHistoricalData() {
  // Replace with your actual API for historical data
  try {
    const response = await axios.get('https://api.example.com/market-data?last=3months');
    return response.data;
  } catch (error) {
    console.error('Error fetching historical data:', error);
    return null;
  }
}

module.exports = fetchHistoricalData;
