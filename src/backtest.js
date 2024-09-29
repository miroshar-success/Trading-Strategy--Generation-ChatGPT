const FugleTrade = require('@fugle/trade');

async function backtest(strategy, data) {
  try {
    // Simulate strategy execution on historical data
    let profit = 0;
    let position = null;  // 'buy' or 'sell'

    data.forEach((point, index) => {
      const { time, close } = point;

      // Evaluate buy/sell conditions
      const buyCondition = eval(strategy.buyCondition.replace(/index/g, index));
      const sellCondition = eval(strategy.sellCondition.replace(/index/g, index));

      if (buyCondition && !position) {
        position = 'buy';
        console.log(`Buying at time ${time} with price ${close}`);
      } else if (sellCondition && position === 'buy') {
        profit += close - data[position].close;  // Calculate profit
        position = null;  // Close position
        console.log(`Selling at time ${time} with price ${close}`);
      }
    });

    return { totalProfit: profit };
  } catch (error) {
    console.error('Error during backtesting:', error);
    return null;
  }
}

module.exports = backtest;
