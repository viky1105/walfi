const executionEngine = require("./executionEngine");

const queue = [];
let processing = false;

async function processQueue() {
  if (processing) return;

  processing = true;

  while (queue.length > 0) {
    const trade = queue.shift();

    try {
      await executionEngine.executeTrade(trade);
    } catch (err) {
      console.error("Execution Queue Error:", err);
    }
  }

  processing = false;
}

function addTrade(trade) {
  queue.push(trade);

  processQueue();
}

module.exports = {
  addTrade,
};
