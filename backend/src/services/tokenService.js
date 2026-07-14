const axios = require("axios");
const tokenRepository = require("../repositories/tokenRepository");
const { JUPITER_TOKEN_LIST } = require("../config/constants");

let tokenCache = null;

function isFallbackMetadata(metadata, mint) {
  return (
    metadata?.symbol === mint.slice(0, 6) ||
    metadata?.name === mint.slice(0, 12) ||
    metadata?.name === "Unknown token"
  );
}

async function loadTokens() {
  if (tokenCache) return tokenCache;

  const { data } = await axios.get(JUPITER_TOKEN_LIST);

  tokenCache = data;

  return tokenCache;
}

async function getDexScreenerMetadata(mint) {
  try {
    const { data: pairs } = await axios.get(
      `https://api.dexscreener.com/tokens/v1/solana/${mint}`,
      { timeout: 5_000 },
    );
    const matchingPairs = (pairs || []).filter(
      (pair) =>
        pair.baseToken?.address === mint || pair.quoteToken?.address === mint,
    );
    const pair = matchingPairs.sort(
      (a, b) => Number(b.liquidity?.usd || 0) - Number(a.liquidity?.usd || 0),
    )[0];
    const token =
      pair?.baseToken?.address === mint ? pair.baseToken : pair?.quoteToken;

    if (!token?.name && !token?.symbol) {
      return null;
    }

    return {
      symbol: token.symbol,
      name: token.name,
      image: pair.info?.imageUrl || null,
    };
  } catch (err) {
    console.warn(`DEX Screener metadata lookup failed for ${mint}:`, err.message);
    return null;
  }
}

async function getMetadata(mint) {
  const cached = await tokenRepository.getToken(mint);

  if (cached && !isFallbackMetadata(cached, mint)) return cached;

  let tokens = [];
  try {
    tokens = await loadTokens();
  } catch (err) {
    console.warn("Jupiter token list lookup failed:", err.message);
  }

  const token = tokens.find((t) => t.address === mint);
  const dexScreenerToken = token ? null : await getDexScreenerMetadata(mint);

  const metadata = {
    mint,

    symbol: token?.symbol || dexScreenerToken?.symbol || "Unknown",

    name: token?.name || dexScreenerToken?.name || "Unknown token",

    decimals: token?.decimals || 0,

    image: token?.logoURI || dexScreenerToken?.image || null,
  };

  await tokenRepository.saveToken(metadata);

  return metadata;
}

module.exports = {
  getMetadata,
};
