const copyService = require("../services/copyService");

exports.getSettings = async (req, res) => {
  const settings = await copyService.getSettings(req.user.id);
  res.json(settings);
};

exports.saveSettings = async (req, res) => {
  const settings = await copyService.saveSettings(req.user.id, req.body);

  res.json(settings);
};
