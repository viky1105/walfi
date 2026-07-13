const axios = require("axios");

const JUPITER_API = "https://api.jup.ag/swap/v1";

async function getQuote(inputMint, outputMint, amount, slippageBps = 50) {
  if (inputMint === outputMint) {
    throw new Error(
      "Jupiter quote request invalid: inputMint and outputMint cannot be equal",
    );
  }

  try {
    const { data } = await axios.get(`${JUPITER_API}/quote`, {
      params: {
        inputMint,
        outputMint,
        amount,
        slippageBps,
      },
    });

    return data;
  } catch (err) {
    console.error("Jupiter Quote Error:", err.response?.data || err.message);
    throw err;
  }
}

module.exports = {
  getQuote,
};
