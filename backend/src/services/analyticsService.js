const analyticsRepository = require("../repositories/analyticsRepository");

async function getAnalytics(userId) {
  return analyticsRepository.getAnalytics(userId);
}

module.exports = {
  getAnalytics,
};
