const { getQuote } = require("./src/services/jupiterService");
const { getSwapTransaction } = require("./src/services/jupiterSwapService");

async function run() {
  const quote = await getQuote(
    "So11111111111111111111111111111111111111112",
    "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
    100000000,
  );

  const swap = await getSwapTransaction(
    quote,
    "7xf7uSJSwS576E5o7JAZyuRJLtHGrEtbGjv8pew5fjff",
  );

  console.log(JSON.stringify(swap, null, 2));
}

run();
