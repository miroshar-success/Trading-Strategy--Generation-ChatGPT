const FugleTrade = require('@fugle/trade');
const { apiToken } = require('../config/fugle-config')

// Helper function to format date to 'YYYY-MM-DD'
function formatDate(date) {
  return date.toISOString().split('T')[0];
}

async function fetchHistoricalData() {
  try {
    const client = new FugleTrade.Client({ apiToken: apiToken });

    // Get today's date and the date three months ago
    const today = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(today.getMonth() - 3);

    // Format the dates to 'YYYY-MM-DD'
    const startDate = formatDate(threeMonthsAgo);
    const endDate = formatDate(today);

    // Fetch historical data within the last 3 months
    const response = await client.chart('2330', {
      timeFrame: '1D',  // Daily data
      from: startDate,
      to: endDate
    });

    const historicalData = response.data.chart;

    return historicalData.map(dataPoint => ({
      time: dataPoint.timestamp,
      close: dataPoint.close,
    }));
  } catch (error) {
    console.error('Error fetching historical data:', error);
    return null;
  }
}

module.exports = fetchHistoricalData;
