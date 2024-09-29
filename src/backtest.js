const { Backtest, Strategy } = require('fugle-backtest-node');

async function backtestStrategy(strategy, data) {
  try {
    const myStrategy = new Strategy({
      entryRule: (index) => {
        return eval(strategy.buyCondition);
      },
      exitRule: (index) => {
        return eval(strategy.sellCondition);
      },
    });

    const backtest = new Backtest({
      data: data,
      strategy: myStrategy,
    });

    const result = await backtest.run();
    return result;
  } catch (error) {
    console.error('Error during backtesting:', error);
    return null;
  }
}

module.exports = backtestStrategy;
