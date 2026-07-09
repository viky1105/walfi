const analyticsService = require("../services/analyticsService");

exports.getAnalytics = async (req, res) => {
  try {
    const analytics = await analyticsService.getAnalytics(req.user.id);

    res.json(analytics);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};
