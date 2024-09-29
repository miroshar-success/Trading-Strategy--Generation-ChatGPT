const fetchHistoricalData = require('./fetch-data');
const generateStrategy = require('./strategy-gen');
const backtest = require('./backtest');
const optimizeStrategy = require('./optimize');
const fs = require('fs');
const path = require('path');

async function main() {
  let strategy, result, data;

  // Fetch historical data
  data = await fetchHistoricalData();
  if (!data) return;

  let successfulStrategy = false;  // Track whether we found a good strategy
  
  // Retry until a good strategy is found
  while (!successfulStrategy) {
    // Generate a trading strategy using the historical data
    strategy = await generateStrategy(data);
    if (!strategy) {
      console.log('Failed to generate a strategy. Retrying...');
      continue;  // Retry generating a strategy
    }

    // Backtest the generated strategy on historical data
    result = await backtest(strategy, data);
    if (!result) {
      console.log('Backtest failed. Retrying with a new strategy...');
      continue;  // Retry generating a new strategy if backtest fails
    }

    // Evaluate backtest results (for example: total profit or other performance metrics)
    if (result.totalProfit > 0) {  // Customize your evaluation criteria here
      console.log('Found a successful strategy!');

      successfulStrategy = true;  // Mark that we found a good strategy

      // Save the successful strategy
      const strategyPath = path.join(__dirname, '..', 'strategies', 'successful-strategy.json');
      fs.writeFileSync(strategyPath, JSON.stringify(strategy, null, 2));
      console.log('Strategy saved at:', strategyPath);

      // Optimize the successful strategy
      const optimizedStrategy = optimizeStrategy(strategy);
      console.log('Optimized strategy:', optimizedStrategy);

      // Save the optimized strategy
      const optimizedStrategyPath = path.join(__dirname, '..', 'strategies', 'optimized-strategy.json');
      fs.writeFileSync(optimizedStrategyPath, JSON.stringify(optimizedStrategy, null, 2));
      console.log('Optimized strategy saved at:', optimizedStrategyPath);

    } else {
      console.log('Strategy was unsuccessful (totalProfit <= 0). Trying a new strategy...');
    }
  }
}

main();
