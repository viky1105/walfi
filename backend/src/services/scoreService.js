const scoreRepository = require("../repositories/scoreRepository");

async function getWalletScores(userId) {
  return scoreRepository.getWalletScores(userId);
}

module.exports = {
  getWalletScores,
};
