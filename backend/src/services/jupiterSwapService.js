const axios = require("axios");

const JUPITER_API = "https://api.jup.ag/swap/v1";

async function getSwapTransaction(quoteResponse, userPublicKey) {
  const { data } = await axios.post(`${JUPITER_API}/swap`, {
    quoteResponse,
    userPublicKey,
    wrapAndUnwrapSol: true,
    dynamicComputeUnitLimit: true,
  });

  return data;
}

module.exports = {
  getSwapTransaction,
};
