function optimizeStrategy(strategy) {
    try {
      // Example optimization: slightly adjust the buy and sell conditions
      strategy.buyCondition = strategy.buyCondition.replace(/close/g, 'close * 1.01');  // Buy with a 1% margin increase
      strategy.sellCondition = strategy.sellCondition.replace(/close/g, 'close * 0.99');  // Sell with a 1% margin decrease
      return strategy;
    } catch (error) {
      console.error('Error optimizing strategy:', error);
      return strategy;
    }
  }
  
  module.exports = optimizeStrategy;
  