const copyRepository = require("../repositories/copyRepository");

async function getSettings(userId) {
  return copyRepository.getSettings(userId);
}

async function saveSettings(userId, settings) {
  return copyRepository.saveSettings(userId, settings);
}

module.exports = {
  getSettings,
  saveSettings,
};
