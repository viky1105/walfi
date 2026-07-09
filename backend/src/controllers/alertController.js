const alertService = require("../services/alertService");

exports.getAlerts = async (req, res) => {
  try {
    const alerts = await alertService.getAlerts(req.user.id);

    res.json(alerts);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const alert = await alertService.markAsRead(req.user.id, req.params.id);

    res.json(alert);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};
