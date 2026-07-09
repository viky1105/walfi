const { getQuote } = require("./src/services/jupiterService");

async function run() {
  const quote = await getQuote(
    "So11111111111111111111111111111111111111112", // SOL
    "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263", // BONK
    100000000, // 0.1 SOL (lamports)
  );

  console.log(JSON.stringify(quote, null, 2));
}

run();
