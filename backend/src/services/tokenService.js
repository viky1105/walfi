const axios = require("axios");
const tokenRepository = require("../repositories/tokenRepository");
const { JUPITER_TOKEN_LIST } = require("../config/constants");

let tokenCache = null;

async function loadTokens() {
  if (tokenCache) return tokenCache;

  const { data } = await axios.get(JUPITER_TOKEN_LIST);

  tokenCache = data;

  return tokenCache;
}

async function getMetadata(mint) {
  const cached = await tokenRepository.getToken(mint);

  if (cached) return cached;

  const tokens = await loadTokens();

  const token = tokens.find((t) => t.address === mint);

  const metadata = {
    mint,

    symbol: token?.symbol || mint.slice(0, 6),

    name: token?.name || mint.slice(0, 12),

    decimals: token?.decimals || 0,

    image: token?.logoURI || null,
  };

  await tokenRepository.saveToken(metadata);

  return metadata;
}

module.exports = {
  getMetadata,
};
